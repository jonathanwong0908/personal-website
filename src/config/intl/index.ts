import { Pathnames } from "next-intl/navigation";

export const locales = ["en", "jp"] as const;
export const localePrefix = undefined;

export const pathnames = {
  "/": "/",
  "/hello ": {
    en: "/hello",
    jp: "/こんにちは",
  },
} satisfies Pathnames<typeof locales>;

export type LocaleString = "en" | "jp";

export const localeTranslations: Record<string, string> = {
  en: "English",
  jp: "日本語",
};

export type AppPathnames = keyof typeof pathnames;
