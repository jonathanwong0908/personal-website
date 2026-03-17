import Link from "next/link";

import { getAllThoughts } from "@/lib/thoughts";

export async function LatestThoughts() {
  const allThoughts = await getAllThoughts();
  const latestThoughts = allThoughts.slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-medium tracking-tight">Latest thoughts</h2>
      {latestThoughts.length === 0 ? (
        <p className="text-muted-foreground text-sm">No thoughts yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {latestThoughts.map((thought) => (
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
              <p className="text-muted-foreground line-clamp-1 text-sm">
                {thought.description}
              </p>
            </Link>
          ))}
          {allThoughts.length > 5 && (
            <Link
              href="/thoughts"
              className="text-muted-foreground hover:text-foreground text-sm underline underline-offset-4"
            >
              View all thoughts
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
