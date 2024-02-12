import React from "react";
import Logo from "../logo";
import FadeIn from "../../animation/fade-in";
import AnimatedLink from "@/components/animation/animated-link";

const Navbar = () => {
  return (
    <FadeIn delay={1.5} direction="down">
      <nav className="flex items-start justify-between p-4 md:p-8">
        <Logo />
        <div className="flex flex-col gap-2">
          {navbarLinks.map((link, index) => (
            <AnimatedLink
              key={index}
              href={link.href}
              target={link.target}
              text={link.text}
            />
          ))}
        </div>
      </nav>
    </FadeIn>
  );
};

export default Navbar;

const navbarLinks: NavbarLink[] = [
  {
    href: "/contact",
    text: "Contact",
  },
  {
    href: "/resume/jonathan-wong-frontend-developer.pdf",
    target: "_blank",
    text: "Resume",
  },
];

type NavbarLink = {
  href: string;
  text: string;
  target?: string;
};
