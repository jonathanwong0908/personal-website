"use client";

import React, { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  once?: boolean;
  delay?: number;
  duration?: number;
  direction?: "up" | "down";
};

const FadeIn = ({
  children,
  className,
  once,
  delay,
  duration,
  direction,
}: FadeInProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: once || true });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "down" ? -20 : 20,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      className={cn("", className)}
      ref={ref}
      initial="hidden"
      variants={variants}
      animate={isInView && "show"}
      exit="hidden"
      transition={{ duration: duration || 0.55, delay: delay || 0 }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
