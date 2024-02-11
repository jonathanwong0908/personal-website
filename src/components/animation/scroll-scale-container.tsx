"use client";

import { useScroll, motion, useTransform } from "framer-motion";
import React, { useRef } from "react";

type ScrollScaleContainerProps = {
  children: React.ReactNode;
  scale?: [number, number];
  className?: string;
};

const ScrollScaleContainer = ({
  children,
  scale,
  className,
}: ScrollScaleContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1 1"],
  });

  const scaleProgress = useTransform(
    scrollYProgress,
    [0, 1],
    scale ?? [0.85, 0.98],
  );

  return (
    <motion.div
      ref={ref}
      style={{ scale: scaleProgress }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollScaleContainer;
