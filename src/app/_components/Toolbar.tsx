"use client";
import { api } from "~/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import { SortControls } from "./SortControls";
import { SearchResults } from "./SearchResults";
import { useDebounce } from "./hooks/useDebounce";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";

const FormSchema = z.object({
  search: z.string(),
  sort: z.string(),
  order: z.string(),
});

const Toolbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: "",
      sort: "popularity",
      order: "asc",
    },
  });

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") ?? "";
  const sort = searchParams.get("sort") ?? "popularity";
  const order = searchParams.get("order") ?? "asc";
  const router = useRouter();

  // Debounced search value
  const debouncedSearch = useDebounce(searchInput, 300);

  // Update form when URL params change
  useEffect(() => {
    form.setValue("search", search);
    form.setValue("sort", sort);
    form.setValue("order", order);
    setSearchInput(search);
  }, [search, sort, order, form]);

  // Handle debounced search
  useEffect(() => {
    if (debouncedSearch !== search) {
      setIsSearching(true);
      const params = new URLSearchParams();
      if (debouncedSearch) params.set("search", debouncedSearch);
      if (sort !== "popularity") params.set("sort", sort);
      if (order !== "asc") params.set("order", order);

      router.push(`?${params.toString()}`);
    }
  }, [debouncedSearch, search, sort, order, router]);

  // Use keyboard shortcuts hook
  useKeyboardShortcuts({
    searchInput,
    sort,
    order,
    setSearchInput,
    form,
    router,
  });

  const query = api.post.search.useQuery({
    genre: search,
    page: page,
    sort: sort,
    order: order,
  });

  const searchCount = api.post.searchCount.useQuery({
    genre: search,
  });

  // Stop loading indicator when query completes
  useEffect(() => {
    if (!query.isLoading) {
      setIsSearching(false);
    }
  }, [query.isLoading]);

  const totalPages = Math.ceil((searchCount.data ?? 0) / 50);

  const prevPath =
    page > 1
      ? {
          pathname: "/",
          query: {
            ...(search && { search }),
            ...(sort !== "popularity" && { sort }),
            ...(order !== "asc" && { order }),
            page: page - 1,
          },
        }
      : {};

  const nextPath =
    page < totalPages
      ? {
          pathname: "/",
          query: {
            ...(search && { search }),
            ...(sort !== "popularity" && { sort }),
            ...(order !== "asc" && { order }),
            page: page + 1,
          },
        }
      : {};

  const handleSortChange = (newSort: string) => {
    form.setValue("sort", newSort);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    params.set("sort", newSort);
    if (order !== "asc") params.set("order", order);
    router.push(`?${params.toString()}`);
  };

  const handleOrderChange = (newOrder: string) => {
    form.setValue("order", newOrder);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (sort !== "popularity") params.set("sort", sort);
    params.set("order", newOrder);
    router.push(`?${params.toString()}`);
  };

  const clearSearch = () => {
    setSearchInput("");
    form.setValue("search", "");
    const params = new URLSearchParams();
    if (sort !== "popularity") params.set("sort", sort);
    if (order !== "asc") params.set("order", order);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full space-y-6">
      {/* Search and Filters */}
      <div className="container mx-auto max-w-7xl">
        <div className="space-y-4">
          {/* Search Bar */}
          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            isSearching={isSearching}
            isLoading={query.isLoading}
            onClear={clearSearch}
          />

          {/* Filters */}
          <div className="space-y-4">
            <SortControls
              sort={sort}
              order={order}
              onSortChange={handleSortChange}
              onOrderChange={handleOrderChange}
            />
          </div>

          {/* Filter Section - Always Visible */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {searchCount.isLoading || searchCount.data === undefined
                ? null
                : `${searchCount.data} results`}
            </div>
          </div>

          {/* Results */}
          <SearchResults
            isLoading={query.isLoading}
            data={query.data}
            page={page}
            searchCount={searchCount.data}
            prevPath={prevPath}
            nextPath={nextPath}
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
