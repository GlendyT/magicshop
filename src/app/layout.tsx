import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Magic Shop",
  description: "Created by ARMY for ARMY and BTS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
