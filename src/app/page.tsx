// import { LatestThoughts } from "@/components/home/latest-thoughts";

import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="bg-background mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-8 px-4 py-8 leading-tight md:py-32">
      <div className="flex w-full flex-col items-start">
        <h1 className="text-lg leading-tight">Jonathan Wong</h1>
        <p className="text-muted-foreground text-lg">
          Software design and development
        </p>
      </div>
      <Separator />
      {/* <LatestThoughts /> */}
      <div className="flex h-full w-full gap-8 divide-x">
        {/* <aside className="flex flex-col gap-1.5 pr-8">
          <p>About</p>
          <p className="text-muted-foreground">Thoughts</p>
        </aside> */}
        <main className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h3 className="">Bio</h3>
            </div>
            <p className="text-muted-foreground">
              Curious about life in general. Spending most of my time
              continuously exploring technologies, places, people, experiences,
              food, and quite a lot of other things.
            </p>
          </div>
          {/* <div>
            <h3>Thoughts</h3>
          </div>
          <div>
            <h3>Working on</h3>
          </div> */}
        </main>
      </div>
    </div>
  );
}
