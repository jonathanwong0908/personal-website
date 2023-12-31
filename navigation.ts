import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { locales } from "./i18n";

export const localePrefix = "always"; // Default

const myLocales = locales.map((locale) => locale);

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales: myLocales, localePrefix });
