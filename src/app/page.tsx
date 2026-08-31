// import { LatestThoughts } from "@/components/home/latest-thoughts";

import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="bg-background mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-8 px-4 py-8 md:py-32">
      <div className="flex w-full flex-col items-start">
        <h1 className="leading-tight">Jonathan Wong</h1>
        <p className="text-muted-foreground">Life enjoyer</p>
      </div>
      <Separator />
      {/* <LatestThoughts /> */}
      <div className="flex h-full w-full gap-8 divide-x">
        <main className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h3 className="">Me</h3>
            </div>
            <p className="text-muted-foreground max-w-lg leading-6.5">
              Curious about life in general. Spending most of my time
              continuously exploring technologies, places, people, experiences,
              food, and maybe a little bit too much.{" "}
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
