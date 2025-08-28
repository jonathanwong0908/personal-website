import { getTranslations } from "next-intl/server";
import { Separator } from "@workspace/ui/components/separator";

export default async function Page() {
  const t = await getTranslations("HomePage");

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <h1 className="font-serif text-3xl font-bold tracking-tight">
          Jonathan
        </h1>
        <p className="text-foreground/50 text-lg leading-5 tracking-tight">
          Software Engineer, Skill Gatherer, Volleyball Player
        </p>
      </div>
      <Separator className="bg-border/10" />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="font-serif text-xl font-bold tracking-tight">
            Experience
          </h2>
          <p className="text-foreground/50 text-sm font-medium leading-5 tracking-tight">
            From finance wannabe to keyboard smasher
          </p>
        </div>
        <div className="w-full tracking-tight">
          <h4 className="">
            Software Engineer{" "}
            <span className="text-foreground/50 text-sm">{"'2024"}</span>
          </h4>
          <h4 className="">
            Frontend Programmer{" "}
            <span className="text-foreground/50 text-sm">{"'2023"}</span>
          </h4>
          <h4 className="">
            Marketing Executive{" "}
            <span className="text-foreground/50 text-sm">{"'2022"}</span>
          </h4>
          <h4 className="">
            Finance Intern{" "}
            <span className="text-foreground/50 text-sm">{"'2020"}</span>
          </h4>
        </div>
      </div>
      <Separator className="bg-border/10" />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="font-serif text-xl font-bold tracking-tight">
            Tech Stack
          </h2>
          <p className="text-foreground/50 text-sm font-medium leading-5 tracking-tight">
            Just things I like to use to ship fast
          </p>
        </div>
        <div>
          <div className="flex w-full items-center justify-between tracking-tight">
            <h4 className="">Next.js</h4>
          </div>
          <div className="flex w-full items-center justify-between tracking-tight">
            <h4 className="">Shadcn UI</h4>
          </div>
          <div className="flex w-full items-center justify-between tracking-tight">
            <h4 className="">Convex</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
