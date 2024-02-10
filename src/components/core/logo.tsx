import { rockNRoll } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import React from "react";
import MagneticWrapper from "../animation/magnetic-wrapper";
import { Link } from "@/navigation";

const Logo = () => {
  return (
    <div className="relative grid aspect-square w-16 place-items-center rounded-full">
      <MagneticWrapper>
        <Link href="/" className="">
          <span
            className={cn(
              "grid aspect-square w-16 rotate-45 place-items-center rounded-full bg-slate-700 text-3xl font-bold text-slate-100",
            )}
          >
            ジ
          </span>
        </Link>
      </MagneticWrapper>
    </div>
  );
};

export default Logo;
