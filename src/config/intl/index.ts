export const locales = ["en", "hk"] as const;

export type LocaleString = "en" | "jp";

export const localeTranslations: Record<string, string> = {
  en: "English",
  jp: "日本語",
};
