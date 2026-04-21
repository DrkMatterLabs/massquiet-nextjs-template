import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// `postgres/cf` uses `cloudflare:sockets` instead of Node's `net`/`tls` — required
// for the Edge runtime on Cloudflare Pages (via @cloudflare/next-on-pages).
import postgres from "postgres/cf";
import bcrypt from "bcryptjs";

// Cached connection per lambda/worker instance.
let _sql: ReturnType<typeof postgres> | null = null;
function sql() {
  if (_sql) return _sql;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  _sql = postgres(url, {
    // DO Managed Postgres uses a private CA — skip verification here.
    // The app runs over TLS; the connection is still encrypted.
    ssl: { rejectUnauthorized: false },
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
  });
  return _sql;
}

type SeedUserRow = {
  id: string;
  name: string | null;
  email: string | null;
  password_hash: string | null;
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = String(credentials?.username ?? "").trim();
        const password = String(credentials?.password ?? "");
        if (!username || !password) return null;

        const rows = (await sql()`
          SELECT id, name, email, password_hash
          FROM users
          WHERE email = ${username}
          LIMIT 1
        `) as unknown as SeedUserRow[];

        const user = rows[0];
        if (!user?.password_hash) return null;

        const ok = await bcrypt.compare(password, user.password_hash);
        if (!ok) return null;

        return {
          id: user.id,
          name: user.name ?? undefined,
          email: user.email ?? undefined,
        };
      },
    }),
  ],
});
