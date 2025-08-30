import { Link } from "@/i18n/navigation";

import { Heading } from "@workspace/ui/components/heading";
import { Separator } from "@workspace/ui/components/separator";
import { Text } from "@workspace/ui/components/text";

export default function LifePage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <Heading>Life</Heading>
        <p className="text-foreground/50 text-lg leading-5 tracking-tight">
          Just me yapping.
        </p>
      </div>
      <Separator className="bg-border/20" />
      <div className="flex flex-col gap-6">
        <Link href="/life/books" className="group flex">
          <Text
            className="border-b transition-all group-hover:border-b-2"
            size="lg"
            weight="medium"
          >
            Books I liked
          </Text>
        </Link>
      </div>
    </div>
  );
}
