import LocaleSwitcher from "@/components/core/locale-switcher";
import ThemeSwitcher from "@/components/core/theme-switcher";
import { LocaleString } from "@/config/intl";

type HomePageProps = {
  params: {
    locale: LocaleString;
  };
};

export default function Home({ params: { locale } }: HomePageProps) {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <ThemeSwitcher />
      <LocaleSwitcher locale={locale} />
    </main>
  );
}
