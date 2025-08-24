"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { Plus } from "lucide-react";
import { AddArticleForm } from "./add-article-form";
import { useState } from "react";

export function AddArticleSheet() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setIsOpen(open);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button size="icon" className="size-7">
          <Plus />
        </Button>
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader className="border-b">
          <SheetTitle>New Article</SheetTitle>
        </SheetHeader>
        <div className="px-4 h-full">
          <AddArticleForm onClose={() => setIsOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
