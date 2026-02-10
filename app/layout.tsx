import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MASS · QUIET",
  description: "Infrastructure for B2B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#0E0E10', color: '#EDEDED', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
