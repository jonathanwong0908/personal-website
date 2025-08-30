import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@workspace/ui/lib/utils";

const textVariants = cva("text-foreground", {
  variants: {
    variant: {
      default: "text-foreground",
    },
    size: {
      xs: "text-xs",
      default: "text-base",
      sm: "text-sm",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
});

function Text({
  className,
  variant,
  size,
  as,
  ...props
}: React.ComponentProps<"p"> &
  VariantProps<typeof textVariants> & { as?: React.ElementType }) {
  const Comp = as ?? "p";

  return (
    <Comp
      className={cn(textVariants({ variant, size, className }))}
      {...props}
    />
  );
}
