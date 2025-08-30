import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@workspace/ui/lib/utils";

const headingVariants = cva("text-foreground tracking-tighter", {
  variants: {
    variant: {
      default: "text-foreground",
    },
    size: {
      default: "text-3xl",
      xxs: "text-lg",
      xs: "text-xl",
      sm: "text-2xl",
      lg: "text-4xl",
      xl: "text-5xl",
    },
    font: {
      serif: "font-serif",
      sans: "font-sans",
    },
    weight: {
      default: "font-bold",
      medium: "font-medium",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    font: "serif",
    weight: "default",
  },
});

export function Heading({
  className,
  variant,
  size,
  font,
  weight,
  as,
  ...props
}: React.ComponentProps<"h1"> &
  VariantProps<typeof headingVariants> & { as?: React.ElementType }) {
  const Comp = as ?? "h1";

  return (
    <Comp
      className={cn(
        headingVariants({ variant, size, font, weight, className }),
      )}
      {...props}
    />
  );
}
