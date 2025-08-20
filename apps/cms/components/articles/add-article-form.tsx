import { Input } from "@workspace/ui/components/input";

export function AddArticleForm() {
  return (
    <div>
      <Input
        className="bg-transparent border-none dark:bg-transparent p-0 shadow-none focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0 md:text-5xl h-auto tracking-tighter"
        placeholder="Title"
      />
    </div>
  );
}
