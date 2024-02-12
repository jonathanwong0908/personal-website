import { getTranslations } from "next-intl/server";
import React from "react";
import FadeIn from "../animation/fade-in";
import Link from "next/link";
import HoverRollText from "../animation/hover-roll-text";

const Footer = async () => {
  const t = await getTranslations("footer");

  return (
    <footer className="w-full bg-background pb-8 text-display md:pb-12">
      <FadeIn delay={0.5}>
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 md:flex-row md:justify-between md:px-8 xl:px-0">
          <div className="flex flex-col-reverse gap-4 md:flex-row md:justify-start md:gap-32">
            <p>
              {t("name")} © {new Date().getFullYear()}
            </p>
            {footerLinks?.map((section) => (
              <div className="flex gap-4 md:gap-12" key={section?.name}>
                {section?.links?.map((link, index) => (
                  <Link href={link?.href} key={index}>
                    <HoverRollText text={t(link?.text)} isStagger />
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </footer>
  );
};

export default Footer;

const footerLinks: FooterItem[] = [
  {
    name: "socials",
    links: [
      {
        href: "https://www.linkedin.com/in/jonathan-thomas-wong/",
        target: "_blank",
        text: "linkedin",
      },
      {
        href: "https://github.com/jonathanwong0908",
        target: "_blank",
        text: "github",
      },
    ],
  },
  {
    name: "navigation",
    links: [
      {
        href: "/contact",
        text: "contact",
      },
      {
        href: "/resume/jonathan-wong-frontend-developer.pdf",
        target: "_blank",
        text: "resume",
      },
    ],
  },
];

type FooterItem = {
  name: string;
  links: FooterLink[];
};

type FooterLink = {
  href: string;
  target?: string;
  text: string;
};
