"use client";

import { LocaleString } from "@/config/intl";
import { cn } from "@/lib/utils";
import { useScroll, motion, MotionValue, useTransform } from "framer-motion";
import React, { useRef } from "react";

type ScrollOpacityTextProps = {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  locale?: LocaleString;
};

const ScrollOpacityText = ({
  text,
  el: Wrapper = "p",
  className,
  locale,
}: ScrollOpacityTextProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.45"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={cn("", className)}>
      {words.map((word, index) => {
        const start = index / words.length;
        const end = start + 1 / words.length;

        return (
          <span key={`${word}${index}`}>
            <Word
              range={[start, end]}
              progress={scrollYProgress}
              text={word}
              locale={locale}
            />
            <span className="inline-block">&nbsp;</span>
          </span>
        );
      })}
    </p>
  );
};

export default ScrollOpacityText;

type WordProps = {
  range: [number, number];
  progress: MotionValue<number>;
  text: string;
  locale?: LocaleString;
};

const Word = ({ progress, range, text, locale }: WordProps) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  const characters = text.split("");
  const amount = range[1] - range[0];
  const step = amount / characters.length;

  return (
    <span className="">
      {locale === "jp" ? (
        characters?.map((char, index) => {
          const start = range[0] + step * index;
          const end = range[0] + step * (index + 1);

          return (
            <Character
              key={`${char}${index}`}
              range={[start, end]}
              progress={progress}
              text={char}
            />
          );
        })
      ) : (
        <motion.span style={{ opacity }}>{text}</motion.span>
      )}
    </span>
  );
};

type CharacterProps = {
  range: [number, number];
  progress: MotionValue<number>;
  text: string;
};

const Character = ({ range, progress, text }: CharacterProps) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <motion.span className="" style={{ opacity }}>
      {text}
    </motion.span>
  );
};
