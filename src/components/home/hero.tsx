import { LocaleString } from "@/config/intl";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import React from "react";
import StaggeredText from "../animation/staggered-text";
import FadeIn from "../animation/fade-in";

type Props = {
  locale: LocaleString;
};

const Hero = async ({ locale }: Props) => {
  const t = await getTranslations("home.hero");

  return (
    <div className="relative flex min-h-screen items-end justify-center bg-background text-display md:items-center">
      <div
        className={cn(
          "flex w-full flex-col gap-4 px-4 py-8 md:gap-16",
          locale === "en" ? "max-w-5xl" : "max-w-6xl",
        )}
      >
        <h1 className="sr-only">{t("title")}</h1>
        <h1 className="flex w-full flex-col text-4xl font-bold uppercase md:gap-8 md:text-8xl lg:text-9xl">
          <StaggeredText
            text={t("titleTop")}
            el="span"
            once
            staggerChildren={locale === "en" ? 0.05 : 0.08}
          />
          <StaggeredText
            text={t("titleBottom")}
            el="span"
            className="md:text-end"
            once
            delayChildren={0.5}
            staggerChildren={locale === "en" ? 0.05 : 0.08}
          />
        </h1>
        <FadeIn delay={1.5} duration={0.6}>
          <p
            className={cn(
              "grid tracking-wide text-body md:place-items-center md:text-2xl",
              locale === "en" ? "font-normal" : "font-normal",
            )}
          >
            {t("subtitle")}
          </p>
        </FadeIn>
      </div>
    </div>
  );
};

export default Hero;
