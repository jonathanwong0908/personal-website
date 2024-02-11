import { getTranslations } from "next-intl/server";
import ScrollOpacityText from "../../animation/scroll-opacity-text";
import ScrollScaleContainer from "../../animation/scroll-scale-container";
import StaggeredText from "../../animation/staggered-text";
import FadeIn from "../../animation/fade-in";
import Toolbox from "./toolbox";
import Projects from "./projects";
import Journey from "./journey";

const About = async () => {
  const t = await getTranslations("home.about");

  return (
    <ScrollScaleContainer className="rounded-lg bg-inverted px-4 py-8 md:p-12 lg:px-16 lg:py-24">
      <section id="about-section h-full">
        <h2 className="sr-only">{t("title")}</h2>
        <p className="sr-only">{t("paragraph")}</p>

        <div className="space-y-16 md:space-y-36">
          <div className="mx-auto grid max-w-7xl gap-8 md:gap-12">
            <StaggeredText
              text={t("title")}
              el="h2"
              className="text-display-inverted text-3xl font-bold uppercase md:text-5xl lg:text-6xl"
              once
            />
            <ScrollOpacityText
              aria-hidden
              className="text-body-inverted w-full max-w-3xl text-lg md:text-2xl"
              text={t("paragraph")}
            />
          </div>

          <FadeIn delay={0.2} duration={0.8}>
            <Toolbox />
          </FadeIn>

          <FadeIn delay={0.2} duration={0.8}>
            <Journey />
          </FadeIn>

          <FadeIn delay={0.2} duration={0.8}>
            <Projects />
          </FadeIn>
        </div>
      </section>
    </ScrollScaleContainer>
  );
};

export default About;
