import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";
import HoverRollText from "../animation/hover-roll-text";

const ContactAside = async () => {
  const t = await getTranslations("contact");

  return (
    <aside className="space-y-8 md:space-y-12">
      <div className="grid gap-4">
        <h2 className="text-md font-semibold uppercase text-display md:text-lg">
          {t("furtherEnquiries")}
        </h2>
        <Link
          href="mailto:jonathanwong0908@gmail.com"
          className="text-md text-body md:text-lg"
        >
          <HoverRollText text="jonathanwong0908@gmail.com" />
        </Link>
      </div>
      <div className="grid gap-4">
        <h2 className="text-md font-semibold uppercase text-display md:text-lg">
          {t("socials")}
        </h2>
        <div className="grid gap-2">
          {socialLinks?.map((link, index) => (
            <div key={index} className="flex">
              <Link
                href={link?.href}
                className="text-md text-body md:text-lg"
                target={link?.target ?? "_self"}
              >
                <HoverRollText text={link?.text} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ContactAside;

const socialLinks: SocialLink[] = [
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
];

type SocialLink = {
  href: string;
  target?: string;
  text: string;
};
