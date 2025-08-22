"use client";

import { ImageIcon } from "lucide-react";

import { useToolbarContext } from "@workspace/ui/components/editor/context/toolbar-context";
import { InsertImageDialog } from "@workspace/ui/components/editor/plugins/images-plugin";
import { SelectItem } from "@workspace/ui/components/select";

export function InsertImage() {
  const { activeEditor, showModal } = useToolbarContext();

  return (
    <SelectItem
      value="image"
      onPointerUp={(e) => {
        showModal("Insert Image", (onClose) => (
          <InsertImageDialog activeEditor={activeEditor} onClose={onClose} />
        ));
      }}
      className=""
    >
      <div className="flex items-center gap-1">
        <ImageIcon className="size-4" />
        <span>Image</span>
      </div>
    </SelectItem>
  );
}
