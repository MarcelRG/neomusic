"use client";
import { useState } from "react";
import { Button } from "~/@/components/ui/button";
import { Input } from "~/@/components/ui/input";
import { api } from "~/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import * as z from "zod";
import GenreGrid from "./GenreGrid";
import PaginationControls from "./PaginationControls";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/@/components/ui/form";
import { useRouter } from "next/navigation";

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") ?? "";
  const prevPath = {
    pathname: "/",
    query: {
      ...(search ? { search } : {}),
      page: page > 1 ? page - 1 : 1,
    },
  };
  const nextPath = {
    pathname: "/",
    query: {
      ...(search ? { search } : {}),
      page: page + 1,
    },
  };
  const defaultQuery = api.post.genre.useQuery({
    page: page,
  });
  const searchQuery = api.post.search.useQuery(
    {
      genre: search,
      page: page,
    },
    {
      enabled: search !== "",
    },
  );
  let query = searchQuery;
  query = search === "" ? defaultQuery : searchQuery;
  function handleSubmit(data: z.infer<typeof FormSchema>) {
    router.push(`?search=${data.search}`);
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
      {query?.isLoading ? <h1>Loading</h1> : null}
      <GenreGrid search={query.data} page={page} />
      <PaginationControls prevPath={prevPath} nextPath={nextPath} />
      <div className="py-20"></div>
    </>
  );
};

export default Toolbar;
