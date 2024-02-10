import SmoothScrollWrapper from "@/components/animation/smooth-scroll-wrapper";
import LocaleSwitcher from "@/components/core/locale-switcher";
import ThemeSwitcher from "@/components/core/theme-switcher";
import Hero from "@/components/home/hero";
import { LocaleString } from "@/config/intl";

type HomePageProps = {
  params: {
    locale: LocaleString;
  };
};

export default function Home({ params: { locale } }: HomePageProps) {
  return (
    <SmoothScrollWrapper>
      <Hero locale={locale} />
    </SmoothScrollWrapper>
  );
}
