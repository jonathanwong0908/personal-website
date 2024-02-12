import React from "react";
import { Control, FieldError } from "react-hook-form";
import { ContactFormType } from ".";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { Textarea } from "@/components/ui/textarea";

type FieldProps = {
  control: Control<ContactFormType>;
  error?: FieldError;
};

const MessageField = ({ control, error }: FieldProps) => {
  const t = useTranslations("contact.form");

  return (
    <FormField
      control={control}
      name="message"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-md flex items-center gap-1 font-semibold tracking-wide text-body md:text-lg">
            {t("message")}
            <span className="text-warning font-normal">*</span>
          </FormLabel>
          <FormControl>
            <Textarea
              {...field}
              className="text-md resize-none px-5 py-3.5 font-semibold md:text-lg"
              placeholder={t("messagePlaceholder")}
              value={field.value || ""}
            />
          </FormControl>
          {error ? (
            <p className="text-warning md:text-md text-sm font-semibold">
              {t(error?.message)}
            </p>
          ) : null}
        </FormItem>
      )}
    />
  );
};

export default MessageField;
