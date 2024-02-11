import { getTranslations } from "next-intl/server";
import React from "react";

const Projects = async () => {
  const t = await getTranslations("home.about");
  return (
    <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:gap-12">
      <div className="space-y-4 lg:space-y-6">
        <h2 className="text-display-inverted text-3xl font-bold uppercase md:text-5xl lg:text-6xl">
          {t("projectsTitle")}
        </h2>
        <p className="text-muted-inverted max-w-xl text-lg md:text-2xl">
          {t("projectsSubtitle")}
        </p>
      </div>
    </div>
  );
};

export default Projects;
