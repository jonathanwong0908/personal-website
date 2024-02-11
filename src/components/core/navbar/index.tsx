import React from "react";
import Logo from "../logo";
import FadeIn from "../../animation/fade-in";

const Navbar = () => {
  return (
    <FadeIn delay={1.5} direction="down">
      <nav className="p-4 md:p-8">
        <Logo />
      </nav>
    </FadeIn>
  );
};

export default Navbar;
