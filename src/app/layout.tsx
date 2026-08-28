import type { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";

const coolvetica = localFont({
  src: "../../public/fonts/Coolvetica Rg.otf",
  variable: "--font-coolvetica",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jonathan Wong",
  description: "Software design and development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${coolvetica.variable} font-sans text-lg antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
