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
    <div className="text-display relative grid min-h-screen place-items-center bg-background">
      <div
        className={cn(
          "z-10 grid w-full place-items-center gap-16",
          locale === "en" ? "max-w-5xl" : "max-w-6xl",
        )}
      >
        <h1 className="flex w-full flex-col gap-8 text-9xl font-bold uppercase">
          <StaggeredText
            text={t("titleTop")}
            el="span"
            once
            staggerChildren={locale === "en" ? 0.05 : 0.08}
          />
          <StaggeredText
            text={t("titleBottom")}
            el="span"
            className="text-end"
            once
            delayChildren={0.5}
            staggerChildren={locale === "en" ? 0.05 : 0.08}
          />
        </h1>
        <FadeIn delay={1.5} duration={0.6}>
          <p
            className={cn(
              "text-body grid place-items-center text-2xl tracking-wide",
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