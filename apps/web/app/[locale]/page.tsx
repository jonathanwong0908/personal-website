import { Pump } from "basehub/react-pump";
import { RichText } from "basehub/react-rich-text";
import { getTranslations } from "next-intl/server";

import { Separator } from "@workspace/ui/components/separator";

export default async function Page() {
  const t = await getTranslations("HomePage");

  return (
    <Pump
      queries={[
        { __typename: true },
        {
          homePage: {
            header: { json: { content: true } },
            experience: { json: { content: true } },
            techStack: { json: { content: true } },
          },
        },
      ]}
    >
      {async ([data, homePage]) => {
        "use server";
        return (
          <div className="flex flex-col gap-12">
            <div>
              <RichText
                components={{
                  h1: (props) => (
                    <h1
                      className="text-foreground pb-6 font-serif text-3xl font-bold tracking-tight"
                      {...props}
                    />
                  ),
                  h2: (props) => (
                    <h2
                      className="text-foreground/80 text-lg leading-5 tracking-tight"
                      {...props}
                    />
                  ),
                }}
              >
                {homePage.homePage.header?.json.content}
              </RichText>
            </div>
            <Separator className="bg-border/20" />
            <div>
              <RichText
                components={{
                  h3: (props) => (
                    <h3
                      className="pb-6 font-serif text-xl font-bold tracking-tight"
                      {...props}
                    />
                  ),
                  u: (props) => (
                    <span className="text-foreground/50 text-sm" {...props} />
                  ),
                }}
              >
                {homePage.homePage.experience?.json.content}
              </RichText>
            </div>
            <Separator className="bg-border/20" />
            <div>
              <RichText
                components={{
                  h3: (props) => (
                    <h3
                      className="pb-3 font-serif text-xl font-bold tracking-tight"
                      {...props}
                    />
                  ),
                  h4: (props) => (
                    <h4
                      className="text-foreground/70 pb-6 tracking-tight"
                      {...props}
                    />
                  ),
                }}
              >
                {homePage.homePage.techStack?.json.content}
              </RichText>
            </div>
          </div>
        );
      }}
    </Pump>
  );
}
