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
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/@/components/ui/select";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

const FormSchema = z.object({
  search: z.string(),
  sort: z.string(),
  order: z.string(),
});
const Toolbar = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: "",
      sort: "popularity",
    },
  });
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") ?? "";
  const sort = searchParams.get("sort") ?? "popularity";
  const order = searchParams.get("order") ?? "asc";
  const router = useRouter();
  const query = api.post.search.useQuery({
    genre: search,
    page: page,
    sort: sort,
    order: order,
  });
  const searchCount = api.post.searchCount.useQuery({
    genre: search,
  });

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
    router.push(`?search=${data.search}&sort=${data.sort}&order=${data.order}`);
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
          <FormField
            control={form.control}
            name="sort"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sort by</SelectLabel>
                      <SelectItem value="popularity">popularity</SelectItem>
                      <SelectItem value="name">alphabet</SelectItem>
                      <SelectItem value="background">background</SelectItem>
                      <SelectItem value="x">synthetic</SelectItem>
                      <SelectItem value="y">atmospheric</SelectItem>
                      <SelectItem value="tempo">tempo</SelectItem>
                      <SelectItem value="duration">duration</SelectItem>
                      <SelectItem value="added">added</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="asc">
                        <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                      </SelectItem>
                      <SelectItem value="desc">
                        <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
              <h1>{searchCount.data} results found</h1>
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
