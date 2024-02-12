"use client";

import React from "react";
import { stagger, useAnimate } from "framer-motion";

interface HoverRollTextProps {
  text: string;
  className?: string;
  isStagger?: boolean;
}

const HoverRollText = (props: HoverRollTextProps) => {
  const { text, className, isStagger } = props;
  const [scope, animate] = useAnimate();

  const onHover = () => {
    animate([
      [
        ".letter",
        { y: -24 },
        { duration: 0.4, delay: isStagger ? stagger(0.02) : 0 },
      ],
    ]);
  };

  const onMouseLeave = () => {
    animate([[".letter", { y: 0 }, { duration: 0.000001 }]]);
  };

  return (
    <span
      ref={scope}
      onMouseEnter={onHover}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden className="flex h-6 overflow-hidden">
        {text.split("").map((letter, index) => (
          <span
            className="letter relative inline-block h-6 leading-6 after:absolute after:left-0 after:top-full after:h-6 after:content-[attr(data-letter)]"
            key={`${letter}${index}`}
            data-letter={letter}
          >
            {letter}
          </span>
        ))}
      </span>
    </span>
  );
};

export default HoverRollText;
