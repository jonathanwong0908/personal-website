import { cn } from "@/lib/utils";
import React from "react";
import MagneticWrapper from "../../animation/magnetic-wrapper";
import { Link } from "@/navigation";
import LogoRotateWrapper from "./rotate-wrapper";

const Logo = () => {
  return (
    <MagneticWrapper>
      <Link href="/" className="">
        <span
          className={cn(
            "border-inverted grid aspect-square w-12 place-items-center rounded-full border-[2px] text-xl font-semibold text-display md:w-16 md:text-3xl",
          )}
        >
          <LogoRotateWrapper>ジ</LogoRotateWrapper>
        </span>
      </Link>
    </MagneticWrapper>
  );
};

export default Logo;
