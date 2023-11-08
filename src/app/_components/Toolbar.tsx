"use client";
import { useState, useEffect } from "react";
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
  const defaultQuery = api.post.genre.useQuery();
  const [data, setData] = useState(defaultQuery.data);
  const [genre, setGenre] = useState("");
  const genreQuery = api.post.search.useQuery({
    genre: data?.search,
  });
  useEffect(() => {
    if (data && data.search !== "") {
      setGenre(genreQuery.data);
    } else {
      setGenre(defaultQuery.data);
    }
  }, [data, genreQuery, defaultQuery]);

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    if (data && data.search !== "") {
      setData(data);
    } else {
      setGenre(defaultQuery.data);
    }
    if (genre && genre.isLoading) {
      console.log("Loading...");
    }
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
                  <Input placeholder="Search a genre..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Search</Button>
        </form>
      </Form>
      <GenreGrid search={genre} />
    </>
  );
};

export default Toolbar;
