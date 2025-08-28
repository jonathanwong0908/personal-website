import { Geist_Mono, Inter, Libre_Baskerville } from "next/font/google";
import "@workspace/ui/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { Header } from "@/components/layout/header";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const fontSerif = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} ${fontSerif.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider>
          <ThemeProvider>
            <ConvexClientProvider>
              <div className="relative min-h-svh">
                <Header />
                <div className="mx-auto grid min-h-screen max-w-screen-2xl grid-cols-6 gap-5 px-7 sm:px-8 md:grid-cols-12 md:px-10 md:pt-28 lg:px-20">
                  <div className="col-start-1 col-end-7 md:col-start-4 md:col-end-12 lg:col-end-10">
                    {children}
                  </div>
                </div>
              </div>
            </ConvexClientProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
