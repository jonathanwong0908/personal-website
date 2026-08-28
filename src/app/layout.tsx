import type { Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body
        className={`${coolvetica.variable} font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
