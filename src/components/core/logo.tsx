import { rockNRoll } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import React from "react";

const Logo = () => {
  return (
    <div className="relative grid aspect-square w-16 place-items-center rounded-full bg-slate-800">
      <span
        className={cn("rotate-12 text-3xl text-slate-100", rockNRoll.className)}
      >
        ジ
      </span>
    </div>
  );
};

export default Logo;
