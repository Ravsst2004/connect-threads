import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Connect Threads",
  description:
    "A discussion platform where users can create, reply, and follow threads based on different topics. Users can create accounts, authenticate themselves, and interact with threads.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-poppins max-w-3xl mx-auto antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
