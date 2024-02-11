import { getTranslations } from "next-intl/server";
import React from "react";

const Journey = async () => {
  const t = await getTranslations("home.about.journey");

  return (
    <div className="mx-auto grid max-w-7xl gap-8 md:gap-12">
      <div className="space-y-4 lg:space-y-6">
        <h2 className="text-display-inverted text-3xl font-bold uppercase md:text-5xl lg:text-6xl">
          {t("title")}
        </h2>
        <p className="text-body-inverted max-w-xl text-lg md:text-2xl">
          {t("subtitle")}
        </p>
      </div>
      <div className="space-y-10 border-l-2 pl-8 md:pl-12">
        {experiences.map((exp) => (
          <div key={exp.title} className="space-y-2 ">
            <h3 className="text-display-inverted text-xl font-bold uppercase md:text-2xl">
              {t(exp.title)}
            </h3>
            <p className="text-body-inverted text-lg md:text-xl">
              {t(exp.description)}
            </p>
            <p className="text-muted-inverted text-md md:text-lg">{exp.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journey;

const experiences = [
  {
    title: "frontendDeveloper",
    description: "frontendDeveloperDescription",
    realTitle: "",
    year: "NOW",
  },
  {
    title: "marketingExecutive",
    description: "marketingExecutiveDescription",
    realTitle: "",
    year: "2022",
  },
  {
    title: "financeIntern",
    description: "financeInternDescription",
    realTitle: "",
    year: "2020",
  },
];
