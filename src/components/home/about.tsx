import { getTranslations } from "next-intl/server";
import ScrollOpacityText from "../animation/scroll-opacity-text";
import ScrollScaleContainer from "../animation/scroll-scale-container";
import StaggeredText from "../animation/staggered-text";

const About = async () => {
  const t = await getTranslations("home.about");

  return (
    <ScrollScaleContainer className="rounded-lg bg-inverted px-4 py-8 md:p-12 lg:p-20">
      <section id="about-section h-full">
        <h2 className="sr-only">{t("title")}</h2>
        <p className="sr-only">{t("paragraph")}</p>

        <div className="mx-auto grid max-w-7xl gap-12">
          <StaggeredText
            aria-hidden
            text={t("title")}
            el="h2"
            className="text-display-inverted text-3xl font-bold uppercase md:text-5xl lg:text-6xl"
            once
          />
          <ScrollOpacityText
            aria-hidden
            className="text-body-inverted w-full max-w-4xl text-lg md:text-2xl"
            text={t("paragraph")}
          />
        </div>
      </section>
    </ScrollScaleContainer>
  );
};

export default About;
