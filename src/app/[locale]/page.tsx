import SmoothScrollWrapper from "@/components/animation/smooth-scroll-wrapper";
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
    <SmoothScrollWrapper>
      <main className="flex min-h-screen flex-col items-center gap-4 p-24">
        <ThemeSwitcher />
        <LocaleSwitcher locale={locale} />
        <div className="h-[1000px] bg-sky-200 w-full"></div>
        <div className="h-[1000px] bg-green-200 w-full"></div>
        <div className="h-[1000px] bg-purple-200 w-full"></div>
      </main>
    </SmoothScrollWrapper>
  );
}
