import React from "react";
import Logo from "../logo";
import FadeIn from "../../animation/fade-in";
import Link from "next/link";

const Navbar = () => {
  return (
    <FadeIn delay={1.5} direction="down">
      <nav className="flex items-start justify-between p-4 md:p-8">
        <Logo />
        <div className="flex flex-col gap-2">
          <Link href="/contact" target="_blank">
            Contact
          </Link>
          <Link
            href="/resume/jonathan-wong-frontend-developer.pdf"
            target="_blank"
          >
            Resume
          </Link>
        </div>
      </nav>
    </FadeIn>
  );
};

export default Navbar;
