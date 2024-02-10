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
              "grid aspect-square w-16 rotate-12 place-items-center rounded-full bg-slate-700 text-3xl text-slate-100",
              rockNRoll.className,
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
