import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { locales, localePrefix } from "./config/intl";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
