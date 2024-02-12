"use client";

import FadeIn from "@/components/animation/fade-in";
import HoverRollText from "@/components/animation/hover-roll-text";
import StaggeredText from "@/components/animation/staggered-text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import React from "react";

const NotFound = () => {
  const t = useTranslations("notFound");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl px-4 pt-40 md:items-center md:px-8 md:py-48 xl:px-0">
      <h1 className="sr-only">{t("title")}</h1>
      <div className="space-y-8 md:space-y-12">
        <h1
          aria-hidden
          className={cn(
            "flex w-full max-w-5xl flex-col text-4xl font-bold uppercase text-display md:gap-4 md:text-5xl lg:text-8xl",
          )}
        >
          <StaggeredText
            text={t("title")}
            el="span"
            once
            delayChildren={0.4}
            staggerChildren={0.04}
            className="lg:leading-[8rem]"
          />
        </h1>
        <FadeIn delay={1.5}>
          <p className="text-muted text-xl font-semibold md:text-3xl">
            {t("subtitle")}
          </p>
        </FadeIn>
        <FadeIn delay={1.8}>
          <div className="flex">
            <Link href="/">
              <Button className="bg-secondary-inverted text-display-inverted text-md flex rounded-lg p-0 font-semibold md:text-lg">
                <HoverRollText
                  text={t("home")}
                  className="px-4 py-2 md:px-8 md:py-4"
                />
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </main>
  );
};

export default NotFound;
