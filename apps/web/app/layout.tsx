import { routing } from "@/i18n/routing";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Redirect to the default locale for the root
  redirect(`/${routing.defaultLocale}`);
}
