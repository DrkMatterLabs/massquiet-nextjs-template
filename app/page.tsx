import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export const runtime = "edge";

export default async function Home() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          marginBottom: "0.5rem",
          letterSpacing: "-0.04em",
        }}
      >
        Login works
      </h1>
      <p
        style={{
          color: "#B5B09A",
          fontSize: "1.05rem",
          marginBottom: "2.5rem",
        }}
      >
        Hello, {session.user?.name ?? session.user?.email ?? "admin"}
      </p>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <button
          type="submit"
          style={{
            background: "transparent",
            color: "#EDEDED",
            border: "1px solid #333",
            borderRadius: "6px",
            padding: "0.6rem 1.2rem",
            fontSize: "0.8rem",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            cursor: "pointer",
          }}
        >
          Sign out
        </button>
      </form>
    </main>
  );
}
