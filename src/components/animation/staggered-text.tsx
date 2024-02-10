"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

type StaggeredTextProps = {
  text: string | string[];
  el: keyof JSX.IntrinsicElements;
  className?: string;
  once?: boolean;
  staggerChildren?: number;
  delayChildren?: number;
};

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const StaggeredText = ({
  text,
  el: Wrapper = "p",
  className,
  once,
  staggerChildren,
  delayChildren,
}: StaggeredTextProps) => {
  const textArray = Array.isArray(text) ? text : [text];
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView]);

  return (
    <Wrapper className={className}>
      <motion.span
        ref={ref}
        className=""
        initial="hidden"
        animate={controls}
        transition={{
          staggerChildren: staggerChildren ?? 0.1,
          delayChildren: delayChildren ?? 0,
        }}
        aria-hidden
      >
        {textArray.map((line, index) => (
          <span className="block" key={`${line}${index}`}>
            {line.split(" ").map((word, index) => (
              <span key={`${word}${index}`} className="inline-block">
                {word.split("").map((char, index) => (
                  <motion.span
                    className="inline-block"
                    variants={defaultAnimations}
                    transition={{ type: "just" }}
                    key={index}
                  >
                    {char}
                  </motion.span>
                ))}
                <span className="inline-block">&nbsp;</span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

export default StaggeredText;
