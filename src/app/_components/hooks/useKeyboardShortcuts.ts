"use client";
import { useEffect } from "react";
import { type UseFormReturn } from "react-hook-form";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface KeyboardShortcutsProps {
  searchInput: string;
  sort: string;
  order: string;
  setSearchInput: (value: string) => void;
  form: UseFormReturn<{
    search: string;
    sort: string;
    order: string;
  }>;
  router: AppRouterInstance;
}

export const useKeyboardShortcuts = ({
  searchInput,
  sort,
  order,
  setSearchInput,
  form,
  router,
}: KeyboardShortcutsProps) => {
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
  }, [searchInput, sort, order, form, router, setSearchInput]);
};
