import { Input } from "@workspace/ui/components/input";
import { Editor } from "@workspace/ui/components/editor/editor";

export function AddArticleForm() {
  return (
    <div className="flex flex-col h-full">
      <Input
        className="bg-transparent border-none dark:bg-transparent p-0 shadow-none focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0 md:text-5xl h-auto tracking-tighter"
        placeholder="Title"
      />
      <div className="h-full">
        <Editor />
      </div>
    </div>
  );
}
