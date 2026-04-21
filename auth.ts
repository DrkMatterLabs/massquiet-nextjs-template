import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Smoke-test auth: hardcoded `admin` / `123123123` credential.
//
// Why not query the Postgres users table? The Cloudflare Pages + next-on-pages
// v1 pipeline forces `runtime = "edge"` on all non-static routes, and none of
// the common Postgres clients (`postgres`, `pg`) bundle cleanly for the Edge
// runtime — they need Node built-ins that next-on-pages can't polyfill.
//
// The project-create wizard still provisions the cluster, creates the app DB,
// runs Auth.js-compatible migrations, and seeds the same admin user with a
// bcrypt hash of this password. Any real app that migrates off of this
// smoke-test template (e.g. to `@opennextjs/cloudflare` or an HTTP Postgres
// client) can swap this block for a DB query against `users.password_hash`
// without touching the schema.
const SEED_USER = {
  username: "admin",
  password: "123123123",
  user: { id: "seed-admin", name: "Admin", email: "admin" },
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
        if (username === SEED_USER.username && password === SEED_USER.password) {
          return SEED_USER.user;
        }
        return null;
      },
    }),
  ],
});
