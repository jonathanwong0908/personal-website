"use client";

import React from "react";
import { ReactLenis } from "@studio-freight/react-lenis";

type Props = {
  children: React.ReactNode;
};

const SmoothScrollWrapper = ({ children }: Props) => {
  return <ReactLenis root>{children}</ReactLenis>;
};

export default SmoothScrollWrapper;
