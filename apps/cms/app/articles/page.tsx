import { AddArticleSheet } from "@/components/articles/add-article-sheet";

export default function ArticlesPage() {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Articles</h1>
        <AddArticleSheet />
      </div>
    </div>
  );
}
