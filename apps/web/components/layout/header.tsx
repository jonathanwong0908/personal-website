"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@workspace/ui/lib/utils";

const headerLinks = [
  {
    label: "Me",
    href: "/",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Life",
    href: "/life",
  },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-background pointer-events-none sticky left-0 right-0 top-0 z-50 flex h-[48px] w-full items-center justify-between md:fixed md:top-28 md:h-auto md:bg-transparent">
      <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-6 px-7 sm:px-8 md:grid-cols-12 md:px-10 lg:px-7">
        <div className="pointer-events-auto col-start-1 col-end-7 flex w-full flex-row items-center justify-between gap-4 py-5 md:col-end-3 md:flex-col md:items-start md:py-0 lg:col-end-4 xl:col-start-2">
          <div className="flex flex-col gap-1">
            {headerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "font-medium",
                  pathname === link.href
                    ? "text-foreground cursor-default"
                    : "text-foreground/50 hover:text-foreground transition-colors",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
