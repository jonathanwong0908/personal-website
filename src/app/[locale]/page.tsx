import Cursor from "@/components/animation/cursor";
import SmoothScrollWrapper from "@/components/animation/smooth-scroll-wrapper";
import LocaleSwitcher from "@/components/core/locale-switcher";
import ThemeSwitcher from "@/components/core/theme-switcher";
import About from "@/components/home/about";
import Contact from "@/components/home/contact";
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
      <div className="relative">
        <Hero locale={locale} />
        <div className="bg-background">
          <About />
        </div>
        <Contact />
      </div>
    </SmoothScrollWrapper>
  );
}
