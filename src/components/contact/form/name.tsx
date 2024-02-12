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

const NameField = ({ control, error }: FieldProps) => {
  const t = useTranslations("contact.form");

  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-md flex items-center gap-1 font-semibold tracking-wide text-body md:text-lg">
            {t("name")}
            <span className="text-warning font-normal">*</span>
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              className="text-md px-5 py-3.5 font-semibold md:text-lg"
              placeholder={t("namePlaceholder")}
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

export default NameField;
