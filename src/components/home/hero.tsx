import { LocaleString } from "@/config/intl";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import React from "react";

type Props = {
  locale: LocaleString;
};

const Hero = async ({ locale }: Props) => {
  const t = await getTranslations("home.hero");

  return (
    <div className="text-display relative grid min-h-screen place-items-center bg-background">
      <div
        className={cn(
          "grid w-full place-items-center gap-16",
          locale === "en" ? "max-w-5xl" : "max-w-6xl",
        )}
      >
        <h1 className="flex w-full flex-col gap-8 text-9xl font-bold uppercase">
          <span>{t("titleTop")}</span>
          <span className="text-end">{t("titleBottom")}</span>
        </h1>
        <h2
          className={cn(
            "grid place-items-center text-2xl tracking-wide",
            locale === "en" ? "font-normal" : "font-normal",
          )}
        >
          {t("subtitle")}
        </h2>
      </div>
    </div>
  );
};

export default Hero;
