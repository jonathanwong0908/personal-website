import { SidebarTrigger } from "@workspace/ui/components/sidebar";

import { ThemeSwitcher } from "@/components/core/theme-switcher";

export function Header() {
  return (
    <div className="bg-sidebar flex h-12 w-full items-center border-b px-2">
      <SidebarTrigger />
      <ThemeSwitcher />
    </div>
  );
}
