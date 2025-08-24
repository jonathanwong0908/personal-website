import { Input } from "@workspace/ui/components/input";
import { Editor } from "@workspace/ui/components/editor/editor";
import z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Button } from "@workspace/ui/components/button";

const schema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

type ArticleFormData = z.infer<typeof schema>;

interface AddArticleFormProps {
  onClose: () => void;
}

export function AddArticleForm({ onClose }: AddArticleFormProps) {
  const form = useForm<ArticleFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (data: ArticleFormData) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-full"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-transparent border-none dark:bg-transparent p-0 shadow-none focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0 md:text-5xl h-auto tracking-tighter"
                  placeholder="Title"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="h-full">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="h-full">
                <FormLabel className="sr-only">Content</FormLabel>
                <FormControl className="h-full">
                  <Controller
                    name="content"
                    control={form.control}
                    render={({ field: { onChange, value } }) => (
                      <Editor
                        editorSerializedState={
                          value ? JSON.parse(value) : undefined
                        }
                        onSerializedChange={(serializedState) => {
                          onChange(JSON.stringify(serializedState));
                        }}
                      />
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* <Button type="submit">Save</Button> */}
      </form>
    </Form>
  );
}
