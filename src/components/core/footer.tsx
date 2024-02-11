import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

const Footer = async () => {
  const t = await getTranslations("footer");

  return (
    <footer className="w-full pb-12 text-display">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-8 md:flex-row md:justify-between xl:px-0">
        <div className="flex justify-between gap-20 md:justify-start md:gap-32">
          <div className="flex gap-4 md:gap-12">
            <Link
              href="https://www.linkedin.com/in/jonathan-thomas-wong/"
              target="_blank"
            >
              LinkedIn
            </Link>
            <Link href="https://github.com/jonathanwong0908" target="_blank">
              Github
            </Link>
          </div>
          <div className="flex gap-4 md:gap-12">
            <Link href="/contact">Contact</Link>
            <a
              href="/resume/jonathan-wong-frontend-developer.pdf"
              target="_blank"
            >
              Resume
            </a>
          </div>
        </div>
        <p>
          {t("name")} © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
