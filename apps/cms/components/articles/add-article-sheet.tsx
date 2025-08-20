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

export function AddArticleSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="size-7">
          <Plus />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="border-b">
          <SheetTitle>New Article</SheetTitle>
        </SheetHeader>
        <div className="px-4">
          <AddArticleForm />
        </div>
      </SheetContent>
    </Sheet>
  );
}
