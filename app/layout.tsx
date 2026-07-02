import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI HR Management Portal",
  description: "AI-powered HR dashboard for policy Q&A, candidate skill scoring, and onboarding roadmaps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
