import Footer from "@/components/core/footer";
import LocaleSwitcher from "@/components/core/locale-switcher";
import Navbar from "@/components/core/navbar";
import ReactQueryProvider from "@/components/core/react-query-provider";
import { ThemeProvider } from "@/components/core/theme-provider";
import { LocaleString, locales } from "@/config/intl";
import { generalSans } from "@/lib/fonts";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Toaster } from "sonner";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata() {
  const t = await getTranslations("rootLayout");

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_FRONTEND_URL as string),
    alternates: {
      canonical: process.env.NEXT_PUBLIC_FRONTEND_URL,
      languages: {
        "en-US": "/en",
        "ja-JP": "/jp",
      },
    },
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: process.env.NEXT_PUBLIC_FRONTEND_URL,
      type: "website",
      images: [
        { url: "/seo/og-image.png", width: 1200, height: 630, alt: t("title") },
      ],
    },
  };
}

type RootLayoutProps = {
  children: React.ReactNode;
  params: { locale: LocaleString };
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
            defaultTheme="light"
            themes={["light"]}
          >
            <ReactQueryProvider>
              <div className="relative flex min-h-screen flex-col justify-between bg-background">
                <div className="">
                  <Navbar locale={locale} />
                  {children}
                </div>
                <Footer />
              </div>
              <Toaster />
            </ReactQueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
