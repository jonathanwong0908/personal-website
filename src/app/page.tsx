// import { LatestThoughts } from "@/components/home/latest-thoughts";

import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="bg-background mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-8 px-4 py-8 leading-tight md:py-32">
      <div className="flex w-full flex-col items-start">
        <h1 className="text-lg leading-tight">Jonathan Wong</h1>
        <p className="text-muted-foreground text-lg">
          I cook software, and food.
        </p>
      </div>
      <Separator />
      {/* <LatestThoughts /> */}
      <div className="flex h-full w-full gap-8 divide-x">
        <aside className="flex flex-col gap-1.5 pr-8">
          <p>About</p>
          <p className="text-muted-foreground">Thoughts</p>
        </aside>
        <main>
          <p>Hello</p>
        </main>
      </div>
    </div>
  );
}
