import { getTranslations } from "next-intl/server";
import React from "react";

const Journey = async () => {
  const t = await getTranslations("home.about");

  return (
    <div className="mx-auto grid max-w-7xl gap-8 md:gap-12">
      <h2 className="text-display-inverted text-3xl font-bold uppercase md:text-5xl lg:text-6xl">
        {t("journeyTitle")}
      </h2>
      <div className="space-y-10 border-l pl-8 md:pl-12">
        {experiences.map((exp) => (
          <div key={exp.title} className="space-y-2 ">
            <h3 className="text-display-inverted text-xl font-bold uppercase md:text-2xl">
              {exp.title}
            </h3>
            <p className="text-body-inverted text-lg md:text-xl">
              {exp.description}
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
    title: "Frontend Developer",
    description: "Hard grinded to learn the depths of programming",
    realTitle: "",
    year: "NOW",
  },
  {
    title: "Marketing Executive",
    description: "Experienced the power of good UI/UX",
    realTitle: "",
    year: "2022",
  },
  {
    title: "Finance Intern",
    description: "Entered the world of coding with VBA",
    realTitle: "",
    year: "2020",
  },
];
