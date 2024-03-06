import { Link } from "@/navigation";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import React from "react";

const Projects = async () => {
  const t = await getTranslations("home.about.projects");
  return (
    <div className="mx-auto grid max-w-7xl gap-8 md:gap-12">
      <div className="space-y-4 lg:space-y-6">
        <h2 className="text-3xl font-bold uppercase text-display-inverted md:text-5xl lg:text-6xl">
          {t("title")}
        </h2>
        <p className="max-w-xl text-lg text-body-inverted md:text-2xl">
          {t("subtitle")}
        </p>
      </div>
      <div>
        {projects.map((project) => (
          <Link
            href={project?.link ?? "/"}
            key={project?.title}
            className="group flex items-center justify-between gap-8"
            target="_blank"
          >
            <div className="grid gap-2">
              <div className="flex items-center gap-2 md:gap-4">
                <h3 className="text-xl font-bold uppercase text-display-inverted md:text-3xl">
                  {t(project.title)}
                </h3>
                <span className="text-muted-inverted">-</span>
                <span className="md:text-md rounded-full border px-2 py-1 text-xs uppercase text-body-inverted md:text-sm">
                  {t(project.status)}
                </span>
              </div>
              <p className="text-lg text-body-inverted md:text-xl">
                {t(project.description)}
              </p>
              <ul className="flex gap-4">
                {project.tech.map((t) => (
                  <li
                    key={t}
                    className="text-sm text-muted-inverted md:text-lg"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <span className="flex items-center gap-2 text-muted-inverted transition duration-300 group-hover:translate-x-2 group-hover:text-body-inverted">
              Demo
              <ArrowUpRight />
            </span>
          </Link>
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
    tech: ["Next.js", "Postgres", "Directus (CMS)", "S3"],
    status: "building",
    link: "https://manabo.vercel.app/en",
  },
];
