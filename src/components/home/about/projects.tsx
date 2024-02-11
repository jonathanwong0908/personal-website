import { getTranslations } from "next-intl/server";
import React from "react";

const Projects = async () => {
  const t = await getTranslations("home.about.projects");
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
      <div>
        {projects.map((project) => (
          <div key={project.title} className="">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 md:gap-4">
                <h3 className="text-display-inverted text-xl font-bold uppercase md:text-3xl">
                  {t(project.title)}
                </h3>
                <span className="text-muted-inverted">-</span>
                <span className="text-subdued-inverted md:text-md rounded-full border px-3 py-1 text-sm uppercase">
                  {t(project.status)}
                </span>
              </div>
              <p className="text-body-inverted text-lg md:text-xl">
                {t(project.description)}
              </p>
              <ul className="flex gap-4">
                {project.tech.map((t) => (
                  <li
                    key={t}
                    className="text-muted-inverted text-sm md:text-lg"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;

const projects = [
  {
    title: "project1",
    description: "project1Description",
    tech: ["Next.js", "Supabase", "Directus (CMS)", "S3"],
    status: "building",
    link: "",
  },
];
