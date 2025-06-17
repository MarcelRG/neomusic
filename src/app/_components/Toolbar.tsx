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
import {
  ArrowDownIcon,
  ArrowUpIcon,
  SearchIcon,
  FilterIcon,
  X,
  Music,
  Clock,
  Calendar,
  TrendingUp,
  Shuffle,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";

// Custom debounce hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Sort options with icons and descriptions
const sortOptions = [
  {
    value: "popularity",
    label: "Popularity",
    icon: TrendingUp,
    description: "Most popular first",
  },
  { value: "name", label: "Alphabetical", icon: Music, description: "A to Z" },
  {
    value: "background",
    label: "Background",
    icon: Music,
    description: "Background score",
  },
  {
    value: "x",
    label: "Synthetic",
    icon: Shuffle,
    description: "Synthetic elements",
  },
  {
    value: "y",
    label: "Atmospheric",
    icon: Music,
    description: "Atmospheric quality",
  },
  {
    value: "tempo",
    label: "Tempo",
    icon: Clock,
    description: "Speed of music",
  },
  {
    value: "duration",
    label: "Duration",
    icon: Clock,
    description: "Track length",
  },
  {
    value: "added",
    label: "Recently Added",
    icon: Calendar,
    description: "Newest additions",
  },
];

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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search on Ctrl/Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        const searchInput = document.querySelector(
          'input[placeholder*="Search genres"]',
        )!;
        (searchInput as HTMLInputElement).focus();
      }

      // Clear search on Escape
      if (e.key === "Escape" && searchInput) {
        const params = new URLSearchParams();
        if (sort !== "popularity") params.set("sort", sort);
        if (order !== "asc") params.set("order", order);
        setSearchInput("");
        form.setValue("search", "");
        router.push(`?${params.toString()}`);
      }

      // Toggle filters on Ctrl/Cmd + F
      if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        e.preventDefault();
        // Focus first filter instead of toggling
        const sortSelect = document.querySelector('[role="combobox"]')!;
        if (sortSelect) {
          (sortSelect as HTMLElement).focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [searchInput, sort, order, form, router]);

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

  const prevPath =
    page > 1
      ? {
          pathname: "/",
          query: { ...(search && { search }), page: page - 1 },
        }
      : {};

  const nextPath =
    (query?.data?.length ?? 0) >= 50
      ? {
          pathname: "/",
          query: { ...(search && { search }), page: page + 1 },
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

  const selectedSortOption = sortOptions.find(
    (option) => option.value === sort,
  );
  return (
    <div className="w-full space-y-6">
      {/* Search and Filters */}
      <div className="container mx-auto max-w-7xl">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="group relative">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              placeholder="Search music genres (ex. rock, indie, classical)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="h-12 border-2 pl-10 pr-10 text-base transition-all duration-200 hover:border-primary/50 focus:border-primary"
            />
            {searchInput && (isSearching || query.isLoading) && (
              <Loader2 className="absolute right-3 top-3 h-6 w-6 animate-spin text-muted-foreground" />
            )}
            {searchInput && !isSearching && !query.isLoading && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 transform p-0 transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Filters */}
          <div className="space-y-4">
            {/* Combined Sort and Order Filter */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <FilterIcon className="h-4 w-4" />
                Sort & Order
              </label>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {/* Sort By */}
                <Select value={sort} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-full transition-all hover:bg-muted/50">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        {selectedSortOption && (
                          <selectedSortOption.icon className="h-4 w-4" />
                        )}
                        {selectedSortOption?.label}
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sort Options</SelectLabel>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <option.icon className="h-4 w-4" />
                            <div>
                              <div>{option.label}</div>
                              <div className="text-xs text-muted-foreground">
                                {option.description}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {/* Order */}
                <Select value={order} onValueChange={handleOrderChange}>
                  <SelectTrigger className="w-full transition-all hover:bg-muted/50">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        {order === "asc" ? (
                          <ArrowUpIcon className="h-4 w-4" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4" />
                        )}
                        {order === "asc" ? "Ascending" : "Descending"}
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="asc">
                        <div className="flex items-center gap-2">
                          <ArrowUpIcon className="h-4 w-4" />
                          Ascending
                        </div>
                      </SelectItem>
                      <SelectItem value="desc">
                        <div className="flex items-center gap-2">
                          <ArrowDownIcon className="h-4 w-4" />
                          Descending
                        </div>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Filter Section - Always Visible */}
          <div className="flex items-center justify-between">
            {
              <div className="text-sm text-muted-foreground">
                {searchCount.data} results
              </div>
            }
          </div>

          {/* Results */}
          {(() => {
            if (query?.isLoading) {
              return <GenreSkeleton />;
            } else if ((query?.data?.length ?? 0) > 0) {
              return (
                <div className="space-y-6">
                  <GenreGrid search={query.data} page={page} />
                  <PaginationControls
                    prevPath={prevPath}
                    nextPath={nextPath}
                    searchCount={searchCount.data ? searchCount.data : 6282}
                    currentPage={page}
                  />
                  <div className="py-20"></div>
                </div>
              );
            } else {
              return (
                <div className="flex flex-col items-center justify-center space-y-4 py-12">
                  <Image
                    src="/images/blackhole.jpg"
                    alt="No results found"
                    width={300}
                    height={300}
                    className="rounded-full opacity-60"
                  />
                  <div className="space-y-2 text-center">
                    <h2 className="text-2xl font-bold">No Results Found</h2>
                    <p className="max-w-md text-muted-foreground">
                      Try adjusting your search terms to find what you&apos;re
                      looking for.
                    </p>
                  </div>
                </div>
              );
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
