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
import { Input } from "@/components/ui/input";

type FieldProps = {
  control: Control<ContactFormType>;
  error?: FieldError;
};

const EmailField = ({ control, error }: FieldProps) => {
  const t = useTranslations("contact.form");

  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-md flex items-center gap-1 font-semibold tracking-wide text-body md:text-lg">
            {t("email")}
            <span className="text-warning font-normal">*</span>
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              className="text-md px-5 py-3.5 font-semibold md:text-lg"
              placeholder="ohtani@dodgers.com"
              type="email"
              value={field.value || ""}
            />
          </FormControl>
          <FormMessage className="text-warning text-md md:text-lg" />
        </FormItem>
      )}
    />
  );
};

export default EmailField;
