import { getTranslations } from "next-intl/server";
import React from "react";

const Toolbox = async () => {
  const t = await getTranslations("home.about.tools");
  return (
    <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:gap-12">
      <div className="space-y-4 lg:space-y-6">
        <h2 className="text-display-inverted text-3xl font-bold uppercase md:text-5xl lg:text-6xl">
          {t("title")}
        </h2>
        <p className="text-body-inverted max-w-xl text-lg md:text-2xl">
          {t("subtitle")}
        </p>
      </div>
      <div className="flex gap-24 md:gap-16 lg:gap-24">
        {tools.map((tool) => (
          <div key={tool.title} className="space-y-6">
            <h3 className="text-display-inverted text-xl font-bold uppercase md:text-3xl">
              {t(tool.title)}
            </h3>
            <ul className="grid gap-2">
              {tool.tools.map((t) => (
                <li key={t} className="text-body-inverted text-lg md:text-xl">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toolbox;

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
