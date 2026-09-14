import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Object Lab | CS F213 Java Practice",
  description: "A private, exam-focused Java coding practice lab for CS F213.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
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
