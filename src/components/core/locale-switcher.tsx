"use client";

import { Button } from "@/components/ui/button";
import { LocaleString } from "@/config/intl";
import { usePathname, useRouter } from "@/navigation";
import React from "react";
import MagneticWrapper from "../animation/magnetic-wrapper";
import FadeIn from "../animation/fade-in";
import { cn } from "@/lib/utils";

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
    <MagneticWrapper>
      <Button
        size="sm"
        onClick={changeLanguage}
        className={cn(
          "border-inverted grid aspect-square w-12 place-items-center rounded-full border-[2px] text-xl font-semibold text-display md:w-16 md:text-3xl",
        )}
      >
        {locale == "jp" ? "英" : "日"}
      </Button>
    </MagneticWrapper>
  );
};

export default LocaleSwitcher;
