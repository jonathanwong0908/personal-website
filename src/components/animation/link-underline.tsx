"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const variants = {
  hidden: {
    width: 0,
  },
  show: {
    width: "100%",
  },
};

type LinkUnderlineProps = {
  className?: string;
  once?: boolean;
  duration?: number;
  delay?: number;
};

const LinkUnderline = ({
  className,
  once,
  duration,
  delay,
}: LinkUnderlineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: once || true });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      variants={variants}
      animate={isInView && "show"}
      className={cn("", className)}
      transition={{ duration: duration || 0.55, delay: delay || 0 }}
      // whileHover={{ width: "100%" }}
      // whileHover="hover"
    />
  );
};

export default LinkUnderline;
