import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/header/navigation";
import Header from "@/components/header/header";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/header/sidebar";

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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-poppins">
        <Sidebar />
        <div className="max-w-screen-sm min-h-svh mx-auto border-x">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="px-6 mt-4">{children}</main>
            <Navigation />
            <Toaster />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
