import { ContentEditable as LexicalContentEditable } from "@lexical/react/LexicalContentEditable";
import { JSX } from "react";

type Props = {
  placeholder: string;
  className?: string;
  placeholderClassName?: string;
};

export function ContentEditable({
  placeholder,
  className,
  placeholderClassName,
}: Props): JSX.Element {
  return (
    <LexicalContentEditable
      className={
        className ??
        `ContentEditable__root max-h-100 relative block min-h-72 overflow-auto focus:outline-none`
      }
      aria-placeholder={placeholder}
      placeholder={
        <div
          className={
            placeholderClassName ??
            `text-muted-foreground pointer-events-none absolute left-0 top-0 select-none overflow-hidden text-ellipsis p-4`
          }
        >
          {placeholder}
        </div>
      }
    />
  );
}
