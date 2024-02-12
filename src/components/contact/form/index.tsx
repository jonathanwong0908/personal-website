"use client";

import React from "react";
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
import { SendHorizontal } from "lucide-react";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  message: z.string().min(1, "Message is required"),
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
              className="bg-secondary-inverted text-display-inverted flex rounded-lg p-0 text-lg font-semibold"
              disabled={isPending}
            >
              <HoverRollText
                text={t(isPending ? "sending" : "submit")}
                className="grid w-36 place-content-center py-4 "
              />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
