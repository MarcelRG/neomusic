"use client";
import { Button } from "~/@/components/ui/button";
import { Input } from "~/@/components/ui/input";
import { SearchIcon, X, Loader2 } from "lucide-react";

interface SearchBarProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  isSearching: boolean;
  isLoading: boolean;
  onClear: () => void;
}

export const SearchBar = ({
  searchInput,
  setSearchInput,
  isSearching,
  isLoading,
  onClear,
}: SearchBarProps) => {
  return (
    <div className="group relative">
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground transition-colors group-focus-within:text-primary" />
      <Input
        placeholder="Search music genres (ex. rock, indie, classical)"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="h-12 border-2 pl-10 pr-10 text-base transition-all duration-200 hover:border-primary/50 focus:border-primary"
      />
      {searchInput && (isSearching || isLoading) && (
        <Loader2 className="absolute right-3 top-3 h-6 w-6 animate-spin text-muted-foreground" />
      )}
      {searchInput && !isSearching && !isLoading && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 transform p-0 transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
