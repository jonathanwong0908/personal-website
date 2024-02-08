"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleClick() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  if (!mounted) {
    return null;
  }

  return (
    <Button className="" onClick={handleClick}>
      Change Theme
    </Button>
  );
};

export default ThemeSwitcher;
