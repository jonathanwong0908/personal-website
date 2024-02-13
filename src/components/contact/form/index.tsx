"use client";

import React, { useEffect } from "react";
import { useContact } from "@/hooks/contact";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Form } from "@/components/ui/form";
import EmailField from "./email";
import { Button } from "@/components/ui/button";
import NameField from "./name";
import MessageField from "./message";
import HoverRollText from "@/components/animation/hover-roll-text";
import { toast } from "sonner";

const schema = z.object({
  name: z.string(),
  email: z.string().email("invalidEmail").min(1, "required"),
  message: z.string(),
});

export type ContactFormType = z.infer<typeof schema>;

const ContactForm = () => {
  const t = useTranslations("contact.form");

  const form = useForm<ContactFormType>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      // name: "Jonathan",
      // email: "test@email.com",
      // message: "Hello",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { mutate, isPending, error } = useContact();

  useEffect(() => {
    if (error) {
      toast.error(t("error"));
    }
  }, [error]);

  const onSubmit = (data: ContactFormType) => {
    mutate(data);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-8 md:gap-12"
        >
          <NameField control={control} error={errors?.name} />
          <EmailField control={control} error={errors?.email} />
          <MessageField control={control} error={errors?.message} />
          <div>
            <Button
              type="submit"
              className="bg-secondary-inverted text-display-inverted text-md flex rounded-lg p-0 font-semibold md:text-lg"
              disabled={isPending}
            >
              <HoverRollText
                text={t(isPending ? "sending" : "submit")}
                className="grid w-24 place-content-center py-3 md:w-28 md:py-4 "
              />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
