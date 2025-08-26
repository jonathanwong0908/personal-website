import { ThemeSwitcher } from "@/components/core/theme-switcher";

export function Header() {
  return (
    <header className="pointer-events-none sticky left-0 right-0 top-0 z-50 flex h-[48px] w-full items-center justify-between px-4 md:fixed md:top-28 md:px-8 lg:px-32">
      <div className="pointer-events-auto">
        <ThemeSwitcher />
      </div>
    </header>
  );
}
