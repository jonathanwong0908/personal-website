import fs from "fs";
import path from "path";

export type ThoughtMeta = {
  title: string;
  date: string;
  description: string;
  slug: string;
};

export async function getAllThoughts(): Promise<ThoughtMeta[]> {
  const dir = path.join(process.cwd(), "src/content/thoughts");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const thoughts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { metadata } = await import(`@/content/thoughts/${slug}.mdx`);
      return { ...metadata, slug } as ThoughtMeta;
    }),
  );

  return thoughts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
