"use client";

import React from "react";
import { motion } from "framer-motion";

type LogoRotateWrapperProps = {
  children: React.ReactNode;
};

const variants = {
  firstLoaded: {
    rotate: "0deg",
  },
  loaded: {
    rotate: "38deg",
  },
};

const LogoRotateWrapper = ({ children }: LogoRotateWrapperProps) => {
  return (
    <motion.span
      variants={variants}
      initial="firstLoaded"
      animate="loaded"
      transition={{ delay: 2.5, duration: 0.5 }}
    >
      {children}
    </motion.span>
  );
};

export default LogoRotateWrapper;
