"use client";

import Link, { LinkProps } from "next/link";
import React from "react";
import { stagger, useAnimate } from "framer-motion";

interface AnimatedLinkProps extends LinkProps {
  text: string;
  className?: string;
  target?: string;
}

const AnimatedLink = ({ text, className, href, target }: AnimatedLinkProps) => {
  const [scope, animate] = useAnimate();

  const onHover = () => {
    animate([[".letter", { y: -24 }, { duration: 0.4, delay: stagger(0.02) }]]);
  };

  const onMouseLeave = () => {
    animate([[".letter", { y: 0 }, { duration: 0.000001 }]]);
  };

  return (
    <Link
      href={href}
      className={className}
      ref={scope}
      onMouseEnter={onHover}
      onMouseLeave={onMouseLeave}
      target={target ?? "_self"}
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
    </Link>
  );
};

export default AnimatedLink;
