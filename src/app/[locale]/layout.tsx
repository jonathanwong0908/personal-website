import FadeIn from "@/components/animation/fade-in";
import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";
import ReactQueryProvider from "@/components/core/react-query-provider";
import { ThemeProvider } from "@/components/core/theme-provider";
import { locales } from "@/config/intl";
import { generalSans } from "@/lib/fonts";
import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata() {
  const t = await getTranslations("rootLayout");

  return {
    title: t("title"),
  };
}

type RootLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={generalSans.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            storageKey="theme"
            attribute="class"
            defaultTheme="dark"
            themes={["dark", "light"]}
          >
            <ReactQueryProvider>
              <div className="relative flex min-h-screen flex-col justify-between bg-background">
                <div>
                  <Navbar />
                  {children}
                </div>
                <Footer />
              </div>
            </ReactQueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
