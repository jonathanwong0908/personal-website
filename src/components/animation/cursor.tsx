"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Cursor = () => {
  const cursorSize = 20;

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const onMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;

    mouse.x.set(clientX - cursorSize / 2);
    mouse.y.set(clientY - cursorSize / 2);
  };

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };

  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 aspect-square w-[20px] rounded-full bg-slate-900"
      style={{ x: smoothMouse.x, y: smoothMouse.y }}
    />
  );
};

export default Cursor;
