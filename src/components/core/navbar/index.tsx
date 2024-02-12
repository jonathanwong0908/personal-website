import React from "react";
import Logo from "../logo";
import FadeIn from "../../animation/fade-in";
import Link from "next/link";
import HoverRollText from "@/components/animation/hover-roll-text";
import { getTranslations } from "next-intl/server";
import { LocaleString } from "@/config/intl";

type NavbarProps = {
  locale: LocaleString;
};

const Navbar = async ({ locale }: NavbarProps) => {
  const t = await getTranslations("navigation");

  return (
    <header className="absolute top-0 z-40 w-full">
      <FadeIn delay={1.5} direction="down">
        <nav className="flex items-start justify-between p-4 md:p-8">
          <Logo />
          <div className="flex flex-col items-end gap-2">
            {navbarLinks.map((link, index) => (
              <Link
                key={index}
                href={link?.href}
                className="text-md md:text-lg"
              >
                <HoverRollText text={t(link?.text)} isStagger />
              </Link>
            ))}
          </div>
        </nav>
      </FadeIn>
    </header>
  );
};

export default Navbar;

const navbarLinks: NavbarLink[] = [
  {
    href: "/contact",
    text: "contact",
  },
  {
    href: "/resume/jonathan-wong-frontend-developer.pdf",
    target: "_blank",
    text: "resume",
  },
];

type NavbarLink = {
  href: string;
  text: string;
  target?: string;
};
