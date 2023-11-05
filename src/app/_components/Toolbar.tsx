"use client";
import { useState, useEffect } from "react";
import { Button } from "~/@/components/ui/button";
import { Input } from "~/@/components/ui/input";
import { api } from "~/trpc/react";
import GenreGrid from "./GenreGrid";

const Toolbar = () => {
  const [inputValue, setInputValue] = useState("");

  const genreQuery = api.post.genre.useQuery();
  const searchQuery = api.post.search.useQuery({ genre: inputValue });

  const defaultOrder = genreQuery.data ? genreQuery.data : null;
  const genreData = searchQuery.data ? searchQuery.data : null;

  const [search, setSearch] = useState(null);

  useEffect(() => {
    if (!search && defaultOrder) {
      setSearch(defaultOrder);
    }
  }, [search, defaultOrder]);

  const handleSearch = () => {
    if (inputValue !== "") {
      setSearch(genreData);
    } else {
      setSearch(defaultOrder);
    }
  };

  return (
    <>
      <div className="container flex items-center justify-between">
        <div className="flex flex-1 items-center">
          <Input
            placeholder="Search a genre..."
            className="h-16 w-full"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button className="h-16 w-full" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>
      <GenreGrid search={search} />
    </>
  );
};

export default Toolbar;
