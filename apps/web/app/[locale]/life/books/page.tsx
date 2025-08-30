import { Pump } from "basehub/react-pump";

import { Heading } from "@workspace/ui/components/heading";
import { Separator } from "@workspace/ui/components/separator";
import { Text } from "@workspace/ui/components/text";

export default function BooksPage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <Heading>Good Reads</Heading>
        <p className="text-foreground/50 text-lg leading-5 tracking-tight">
          The books that shape how I see the world
        </p>
      </div>
      <Separator className="bg-border/20" />
      <Pump
        queries={[
          {
            __typename: true,
            books: {
              __args: {
                orderBy: "_sys_createdAt__DESC",
              },
              items: {
                _id: true,
                _title: true,
                author: true,
                printLink: true,
                audioBookLink: true,
                eBookLink: true,
              },
            },
          },
        ]}
      >
        {async ([data]) => {
          "use server";
          return (
            <div className="flex flex-col gap-12">
              {data.books.items.map((book) => (
                <div key={book._id} className="flex flex-col gap-3">
                  <Heading as="h3" className="text-base tracking-tight">
                    {book._title}
                  </Heading>
                  <Text className="text-foreground/80">by {book.author}</Text>
                </div>
              ))}
            </div>
          );
        }}
      </Pump>
    </div>
  );
}
