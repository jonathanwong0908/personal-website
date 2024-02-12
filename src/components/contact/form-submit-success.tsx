import { getTranslations } from "next-intl/server";
import React from "react";
import StaggeredText from "../animation/staggered-text";
import FadeIn from "../animation/fade-in";
import { Link } from "@/navigation";
import HoverRollText from "../animation/hover-roll-text";
import { ArrowLeft } from "lucide-react";

const SubmitSuccess = async () => {
  const t = await getTranslations("contact.form");

  return (
    <div className="grid gap-12 md:gap-20">
      <h1 className="sr-only">{t("successTitle")}</h1>
      <h1
        aria-hidden
        className="flex w-full max-w-3xl flex-col text-4xl font-bold uppercase text-display md:gap-4 md:text-7xl lg:text-8xl"
      >
        <StaggeredText
          text={t("successTitle")}
          el="span"
          once
          delayChildren={0.4}
          staggerChildren={0.04}
        />
      </h1>
      <FadeIn delay={2}>
        <p className="text-lg font-semibold text-body md:text-2xl">
          {t("successMessage")}
        </p>
      </FadeIn>
      <FadeIn delay={2.2}>
        <div className="flex">
          <Link href="/" className="flex items-center gap-2 text-body">
            <ArrowLeft size={18} />
            <HoverRollText text={t("home")} />
          </Link>
        </div>
      </FadeIn>
    </div>
  );
};

export default SubmitSuccess;
