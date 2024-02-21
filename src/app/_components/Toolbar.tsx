"use client";
import Image from "next/image";
import { Button } from "~/@/components/ui/button";
import { Input } from "~/@/components/ui/input";
import { api } from "~/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import * as z from "zod";
import GenreGrid from "./GenreGrid";
import PaginationControls from "./PaginationControls";

import { Form, FormControl, FormField, FormItem } from "~/@/components/ui/form";
import { useRouter } from "next/navigation";
import GenreSkeleton from "./GenreSkeleton";

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
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") ?? "";
  const router = useRouter();
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
  const searchCount = api.post.searchCount.useQuery(
    {
      genre: search,
    },
    {
      enabled: search !== "",
    },
  );
  let query = searchQuery;
  query = search === "" ? defaultQuery : searchQuery;

  const prevPath =
    page > 1
      ? {
          pathname: "/",
          query: {
            ...(search && { search }),
            page: page - 1,
          },
        }
      : {};

  const nextPath =
    (query?.data?.length ?? 0) >= 100
      ? {
          pathname: "/",
          query: {
            ...(search && { search }),
            page: page + 1,
          },
        }
      : {};
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
      {(() => {
        if (query?.isLoading) {
          return <GenreSkeleton />;
        } else if ((query?.data?.length ?? 0) > 0) {
          return (
            <>
              <GenreGrid search={query.data} page={page} />
              <h1>
                {searchCount.data ? searchCount.data : 6282} results found
              </h1>
              <PaginationControls
                prevPath={prevPath}
                nextPath={nextPath}
                searchCount={searchCount.data ? searchCount.data : 6282}
                currentPage={page}
              />
              <div className="py-20"></div>
            </>
          );
        } else {
          return (
            <>
              <Image
                src="/images/blackhole.jpg"
                alt="Black hole"
                width={500}
                height={500}
                className="rounded-full"
              />
              <h1 className="text-2xl font-bold">No Results Found</h1>
            </>
          );
        }
      })()}
    </>
  );
};

export default Toolbar;
