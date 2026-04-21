"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    setBusy(false);
    if (!res || res.error) {
      setError("Invalid credentials");
      return;
    }
    window.location.href = "/";
  }

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: 360, width: "100%" }}>
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: 700,
            marginBottom: "0.25rem",
            letterSpacing: "-0.04em",
          }}
        >
          Welcome
        </h1>
        <p style={{ color: "#B5B09A", marginBottom: "2rem", fontSize: "0.95rem" }}>
          MASS · QUIET · Login
        </p>
        <form
          onSubmit={onSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <span style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#888" }}>
              User
            </span>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
              disabled={busy}
              style={{
                background: "#1A1A1D",
                color: "#EDEDED",
                border: "1px solid #333",
                borderRadius: "6px",
                padding: "0.65rem 0.8rem",
                fontSize: "0.95rem",
                outline: "none",
              }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <span style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#888" }}>
              Password
            </span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={busy}
              style={{
                background: "#1A1A1D",
                color: "#EDEDED",
                border: "1px solid #333",
                borderRadius: "6px",
                padding: "0.65rem 0.8rem",
                fontSize: "0.95rem",
                outline: "none",
              }}
            />
          </label>
          {error && (
            <div
              style={{
                background: "#3b1d1d",
                color: "#ff8b8b",
                padding: "0.6rem 0.8rem",
                borderRadius: "6px",
                fontSize: "0.85rem",
              }}
            >
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={busy || !username || !password}
            style={{
              marginTop: "0.5rem",
              background: "#EDEDED",
              color: "#0E0E10",
              border: "none",
              borderRadius: "6px",
              padding: "0.75rem 1rem",
              fontSize: "0.9rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              cursor: busy ? "wait" : "pointer",
              opacity: busy ? 0.5 : 1,
            }}
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
