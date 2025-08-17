import { SidebarTrigger } from "@workspace/ui/components/sidebar";

export function Header() {
  return (
    <div className="h-12 border-b w-full flex items-center px-2 bg-sidebar">
      <SidebarTrigger />
    </div>
  );
}
