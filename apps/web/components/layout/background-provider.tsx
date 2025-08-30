"use client";

import { usePathname } from "@/i18n/navigation";

export function BackgroundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const backgroundConfig = {
    "/": "bg-secondary",
    "/projects": "bg-secondary",
    "/life": "bg-secondary",
  };

  return (
    <div
      className={backgroundConfig[pathname as keyof typeof backgroundConfig]}
    >
      {children}
    </div>
  );
}
