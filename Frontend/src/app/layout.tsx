import "./globals.css";
import React from "react";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "QuickMOM",
  description: "AI-powered Minutes of Meeting",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
