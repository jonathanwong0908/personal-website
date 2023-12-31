type Locale = {
  name: string;
  prefix: string;
  display: string;
  label: string;
};

export type LocalString = "en" | "jp";

export const locales: Locale[] = [
  {
    name: "en",
    prefix: "en",
    display: "English",
    label: "English",
  },
  {
    name: "jp",
    prefix: "jp",
    display: "日本語",
    label: "Japanese",
  },
];

export const localeTranslations: Record<string, string> = {
  en: "English",
  jp: "日本語",
};
