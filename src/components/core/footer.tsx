import { getTranslations } from "next-intl/server";
import React from "react";
import AnimatedLink from "../animation/animated-link";

const Footer = async () => {
  const t = await getTranslations("footer");

  return (
    <footer className="w-full pb-12 text-display">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-8 md:flex-row md:justify-between xl:px-0">
        <div className="flex justify-between gap-20 md:justify-start md:gap-32">
          {footerLinks?.map((section) => (
            <div className="flex gap-4 md:gap-12" key={section?.name}>
              {section?.links?.map((link, index) => (
                <AnimatedLink
                  key={index}
                  href={link?.href}
                  target={link?.target}
                  text={link?.text}
                />
              ))}
            </div>
          ))}
        </div>
        <p>
          {t("name")} © {new Date().getFullYear()}
        </p>
      </div>
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
        text: "LinkedIn",
      },
      {
        href: "https://github.com/jonathanwong0908",
        target: "_blank",
        text: "Github",
      },
    ],
  },
  {
    name: "navigation",
    links: [
      {
        href: "/contact",
        text: "Contact",
      },
      {
        href: "/resume/jonathan-wong-frontend-developer.pdf",
        target: "_blank",
        text: "Resume",
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
