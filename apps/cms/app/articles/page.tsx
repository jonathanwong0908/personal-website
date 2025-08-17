import { Button } from "@workspace/ui/components/button";
import { Plus } from "lucide-react";

export default function ArticlesPage() {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Articles</h1>
        <Button size="icon" className="size-7">
          <Plus />
        </Button>
      </div>
    </div>
  );
}
