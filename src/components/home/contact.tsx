import React from "react";
import StaggeredText from "../animation/staggered-text";
import FadeIn from "../animation/fade-in";
import { Link } from "@/navigation";

const Contact = () => {
  return (
    <section className="py-20">
      <div className="grid min-h-[600px] place-items-center">
        <div className="grid w-full max-w-7xl place-items-center gap-6 md:gap-10 lg:gap-16">
          <h4 className="sr-only">Get in touch!</h4>
          <Link href="contact">
            <StaggeredText
              text={"Get in touch!"}
              el="h4"
              className="text-5xl font-bold uppercase text-display md:text-8xl lg:text-9xl"
              once
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;
