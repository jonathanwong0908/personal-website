import { getTranslations } from "next-intl/server";
import ScrollOpacityText from "../animation/scroll-opacity-text";
import ScrollScaleContainer from "../animation/scroll-scale-container";
import StaggeredText from "../animation/staggered-text";
import FadeIn from "../animation/fade-in";

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
              className="text-body-inverted w-full max-w-4xl text-lg md:text-2xl"
              text={t("paragraph")}
            />
          </div>

          <FadeIn delay={0.2} duration={0.8}>
            <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:gap-12">
              <h2 className="text-display-inverted text-3xl font-bold uppercase md:text-5xl lg:text-6xl">
                {t("toolsTitle")}
              </h2>
              <div className="flex flex-col gap-12 md:flex-row md:gap-16 lg:gap-24">
                {tools.map((tool) => (
                  <div key={tool.title} className="space-y-6">
                    <h3 className="text-display-inverted text-xl font-bold uppercase md:text-3xl">
                      {t(tool.title)}
                    </h3>
                    <ul className="grid gap-2">
                      {tool.tools.map((t) => (
                        <li
                          key={t}
                          className="text-body-inverted text-lg md:text-xl"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </ScrollScaleContainer>
  );
};

export default About;

const tools = [
  {
    title: "frontend",
    tools: [
      "Next.js",
      "React (Native)",
      "Typescript",
      "Radix UI",
      "Tailwind",
      "Framer Motion",
    ],
  },
  {
    title: "backend",
    tools: ["Node.js", "Express", "Supabase", "Directus (CMS)"],
  },
];
