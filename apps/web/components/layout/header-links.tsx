"use client";

import { Link, usePathname } from "@/i18n/navigation";

import { cn } from "@workspace/ui/lib/utils";

import { HoverRollText } from "@/components/animation/hover-roll-text";

const headerLinks = [
  {
    label: "Me",
    href: "/",
  },
  // {
  //   label: "Projects",
  //   href: "/projects",
  // },
  {
    label: "Life",
    href: "/life",
  },
];

type HeaderLinksProps = {
  onLinkClick?: () => void;
  className?: string;
};

export function HeaderLinks({ onLinkClick, className }: HeaderLinksProps) {
  const pathname = usePathname();

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {headerLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={cn(
            "font-medium",
            pathname === link.href ||
              (pathname.startsWith(link.href) && link.href !== "/")
              ? "text-foreground cursor-default"
              : "text-foreground/50 hover:text-foreground transition-colors",
          )}
          onClick={onLinkClick ?? undefined}
        >
          <HoverRollText text={link.label} isStagger />
        </Link>
      ))}
    </div>
  );
}
