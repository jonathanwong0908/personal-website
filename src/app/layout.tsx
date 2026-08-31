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

const caros = localFont({
  src: "../../public/fonts/Caros.otf",
  variable: "--font-caros",
  display: "swap",
});

const carosMedium = localFont({
  src: "../../public/fonts/Caros Medium.otf",
  variable: "--font-caros-medium",
  display: "swap",
});

const carosBold = localFont({
  src: "../../public/fonts/Caros Bold.otf",
  variable: "--font-caros-bold",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jonathan Wong",
  description: "Life enjoyer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${coolvetica.variable} ${caros.variable} ${carosMedium.variable} ${carosBold.variable}`}
    >
      <body
        className={`${coolvetica.className} text-[17px] tracking-[0.009rem] antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
