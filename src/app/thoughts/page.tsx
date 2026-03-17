import type { Metadata } from "next";
import Link from "next/link";

import { getAllThoughts } from "@/lib/thoughts";

export const metadata: Metadata = {
  title: "Thoughts",
  description: "All thoughts and writings",
};

export default async function ThoughtsPage() {
  const thoughts = await getAllThoughts();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-medium tracking-tighter">Thoughts</h1>
      {thoughts.length === 0 ? (
        <p className="text-muted-foreground text-sm">No thoughts yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {thoughts.map((thought) => (
            <Link
              key={thought.slug}
              href={`/thoughts/${thought.slug}`}
              className="group flex flex-col gap-1"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-medium group-hover:underline">
                  {thought.title}
                </span>
                <time className="text-muted-foreground shrink-0 text-xs">
                  {new Date(thought.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
              <p className="text-muted-foreground line-clamp-2 text-sm">
                {thought.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
