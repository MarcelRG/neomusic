"use client";
import { useState } from "react";
import { Button } from "~/@/components/ui/button";
import { Input } from "~/@/components/ui/input";
import { api } from "~/trpc/react";
import GenreGrid from "./GenreGrid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/@/components/ui/form";

const FormSchema = z.object({
  search: z.string(),
});
const Toolbar = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: "",
    },
  });
  const [genreName, setgenreName] = useState("");
  const defaultQuery = api.post.genre.useQuery();
  const searchQuery = api.post.search.useQuery(
    {
      genre: genreName,
    },
    {
      enabled: genreName !== "",
    },
  );
  let query = defaultQuery;
  query = genreName !== "" ? searchQuery : defaultQuery;
  function handleSubmit(data: z.infer<typeof FormSchema>) {
    setgenreName(data.search);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-row"
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Search a genreName..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Search</Button>
        </form>
      </Form>
      {query?.isLoading ? <h1>Loading</h1> : null}
      <GenreGrid search={query.data} />
    </>
  );
};

export default Toolbar;
