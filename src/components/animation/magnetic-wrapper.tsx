"use client";

import React, { MouseEventHandler, useRef, useState } from "react";
import { motion } from "framer-motion";

type MagneticWrapperProps = {
  children: React.ReactNode;
};

const MagneticWrapper = ({ children }: MagneticWrapperProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const onMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;

    if (!ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    setPosition({ x, y });
  };

  const onMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      // @ts-ignore
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export default MagneticWrapper;
