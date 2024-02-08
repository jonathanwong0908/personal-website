"use client";

import { Button } from "@/components/ui/button";
import { LocaleString } from "@/config/intl";
import { usePathname, useRouter } from "@/navigation";
import React from "react";

interface LanguageSwitcherInterface {
  className?: string;
  locale: LocaleString;
}

const LocaleSwitcher = ({ className, locale }: LanguageSwitcherInterface) => {
  const router = useRouter();
  const pathname = usePathname();

  function createNewPathname(newLocale: string) {
    const arr = pathname.split("/");
    arr[1] = newLocale;
    return arr.join("/");
  }

  function changeLanguage() {
    if (locale == "jp") {
      router.push(pathname, { locale: "en" });
    } else if (locale == "en") {
      router.push(pathname, { locale: "jp" });
    }
  }

  return (
    <Button size="sm" onClick={changeLanguage}>
      {locale == "jp" ? "日本語" : "EN"}
    </Button>
  );
};

export default LocaleSwitcher;
