import React from "react";
import StaggeredText from "../animation/staggered-text";
import { getTranslations } from "next-intl/server";
import { LocaleString } from "@/config/intl";
import { cn } from "@/lib/utils";

type PageHeadingProps = {
  locale: LocaleString;
};

const PageHeading = async ({ locale }: PageHeadingProps) => {
  const t = await getTranslations("contact");

  return (
    <div>
      <h1 className="sr-only">{t("title")}</h1>
      <h1
        aria-hidden
        className={cn(
          "flex w-full max-w-3xl flex-col text-4xl font-bold uppercase text-display md:gap-4 md:text-7xl lg:text-8xl",
          locale === "jp" ? "max-w-4xl" : "max-w-3xl",
        )}
      >
        <StaggeredText
          key="contact-page-heading"
          text={t("title")}
          el="span"
          once
          delayChildren={0.4}
          staggerChildren={0.04}
        />
      </h1>
    </div>
  );
};

export default PageHeading;
