"use client";

import { Button } from "@/components/ui/button";
import { LocaleString } from "@/config/intl";
import { usePathname, useRouter } from "@/navigation";
import React from "react";
import MagneticWrapper from "../animation/magnetic-wrapper";
import FadeIn from "../animation/fade-in";

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
    <div className="fixed bottom-8 right-8 mix-blend-difference">
      <FadeIn delay={1.5}>
        <MagneticWrapper>
          <Button
            size="sm"
            onClick={changeLanguage}
            className="aspect-square w-16 rounded-full bg-background text-xl font-bold mix-blend-difference"
          >
            {locale == "jp" ? "英" : "日"}
          </Button>
        </MagneticWrapper>
      </FadeIn>
    </div>
  );
};

export default LocaleSwitcher;
