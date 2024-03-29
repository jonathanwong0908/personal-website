import SmoothScrollWrapper from "@/components/animation/smooth-scroll-wrapper";
import About from "@/components/home/about";
import Contact from "@/components/home/contact";
import Hero from "@/components/home/hero";
import { LocaleString } from "@/config/intl";
import { unstable_setRequestLocale } from "next-intl/server";

type HomePageProps = {
  params: {
    locale: LocaleString;
  };
};

export default function Home({ params: { locale } }: HomePageProps) {
  unstable_setRequestLocale(locale);

  return (
    <SmoothScrollWrapper>
      <main>
        <Hero locale={locale} />
        <About locale={locale} />
        <Contact />
      </main>
    </SmoothScrollWrapper>
  );
}
