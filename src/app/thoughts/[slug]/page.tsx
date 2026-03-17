import type { Metadata } from "next";

import { getAllThoughts } from "@/lib/thoughts";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const thoughts = await getAllThoughts();
  return thoughts.map((thought) => ({ slug: thought.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = await import(`@/content/thoughts/${slug}.mdx`);

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function ThoughtPage({ params }: Props) {
  const { slug } = await params;
  const { default: Post, metadata } = await import(
    `@/content/thoughts/${slug}.mdx`
  );

  return (
    <article>
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-medium tracking-tighter">
          {metadata.title}
        </h1>
        <time className="text-muted-foreground text-sm">
          {new Date(metadata.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </header>
      <div className="prose prose-neutral dark:prose-invert prose-sm max-w-none">
        <Post />
      </div>
    </article>
  );
}
