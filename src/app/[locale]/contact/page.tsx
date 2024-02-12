import SmoothScrollWrapper from "@/components/animation/smooth-scroll-wrapper";
import StaggeredText from "@/components/animation/staggered-text";
import { getTranslations } from "next-intl/server";
import React from "react";

const ContactPage = async () => {
  const t = await getTranslations("contact");

  return (
    <SmoothScrollWrapper>
      <main className="mx-auto max-w-7xl px-4 pt-40 md:px-8 md:pt-48 lg:pt-60">
        <h1 className="sr-only">{t("title")}</h1>
        <h1
          aria-hidden
          className="flex w-full max-w-3xl flex-col text-4xl font-bold uppercase text-display md:gap-4 md:text-7xl lg:text-8xl"
        >
          <StaggeredText
            text={t("title")}
            el="span"
            once
            delayChildren={0.4}
            staggerChildren={0.04}
          />
        </h1>
      </main>
    </SmoothScrollWrapper>
  );
};

export default ContactPage;
