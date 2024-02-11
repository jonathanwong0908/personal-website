import React from "react";
import StaggeredText from "../animation/staggered-text";
import FadeIn from "../animation/fade-in";
import Link from "next/link";

const Contact = () => {
  return (
    <section className="py-20">
      <div className="px-8">
        <h3>Contact</h3>
        <div className="">
          <div className="h-[2px] w-full bg-inverted" />
        </div>
      </div>
      <div className="grid min-h-[800px] place-items-center">
        <div className="grid w-full max-w-7xl place-items-center gap-6 md:gap-10 lg:gap-16">
          <h4 className="sr-only">Get in touch!</h4>
          <StaggeredText
            text={"Get in touch!"}
            el="h4"
            className="font-bold uppercase text-display sm:text-5xl md:text-7xl lg:text-8xl"
            once
          />
          <FadeIn delay={1}>
            <Link href="mailto:jonathanwong0908@gmail.com">
              <span className="text-2xl font-semibold uppercase text-body md:text-4xl lg:text-5xl xl:text-6xl">
                jonathanwong0908@gmail.com
              </span>
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Contact;
