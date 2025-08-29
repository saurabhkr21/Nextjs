"use client";
import UserContextProvider from "@/contexts/UserContextProvider";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { JobProvider } from "../context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <UserContextProvider>
            <JobProvider>
              <Theme>{children}</Theme>
            </JobProvider>
          </UserContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
