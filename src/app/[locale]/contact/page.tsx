import FadeIn from "@/components/animation/fade-in";
import SmoothScrollWrapper from "@/components/animation/smooth-scroll-wrapper";
import StaggeredText from "@/components/animation/staggered-text";
import ContactAside from "@/components/contact/aside";
import ContactForm from "@/components/contact/form";
import SubmitSuccess from "@/components/contact/form-submit-success";
import PageHeading from "@/components/contact/heading";
import { LocaleString } from "@/config/intl";
import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";

type ContactPageProps = {
  searchParams: {
    status?: string;
  };
  params: {
    locale: LocaleString;
  };
};

const ContactPage = ({
  searchParams,
  params: { locale },
}: ContactPageProps) => {
  unstable_setRequestLocale(locale);

  const isSuccess = searchParams?.status === "success";

  return (
    <SmoothScrollWrapper>
      <main className="mx-auto max-w-7xl px-4 py-40 md:px-8 md:py-48 xl:px-0">
        {isSuccess ? (
          <SubmitSuccess />
        ) : (
          <>
            <PageHeading locale={locale} />
            <FadeIn delay={1.5}>
              <div className="flex flex-col justify-start gap-20 pt-16 md:flex-row  md:pt-20 lg:pt-28">
                <div className="w-full max-w-3xl">
                  <ContactForm />
                </div>
                <ContactAside />
              </div>
            </FadeIn>
          </>
        )}
      </main>
    </SmoothScrollWrapper>
  );
};

export default ContactPage;
