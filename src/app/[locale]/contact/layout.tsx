import { LocaleString, locales } from "@/config/intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import React from "react";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata() {
  const t = await getTranslations("contactLayout");

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  };
}

type ContactLayoutProps = {
  children: React.ReactNode;
  params: { locale: LocaleString };
};

const ContactLayout = ({
  children,
  params: { locale },
}: ContactLayoutProps) => {
  unstable_setRequestLocale(locale);

  return <React.Fragment>{children}</React.Fragment>;
};

export default ContactLayout;
