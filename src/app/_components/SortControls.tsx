"use client";
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/@/components/ui/select";
import { ArrowDownIcon, ArrowUpIcon, FilterIcon } from "lucide-react";
import { sortOptions } from "./constants/sortOptions";

interface SortControlsProps {
  sort: string;
  order: string;
  onSortChange: (value: string) => void;
  onOrderChange: (value: string) => void;
}

export const SortControls = ({
  sort,
  order,
  onSortChange,
  onOrderChange,
}: SortControlsProps) => {
  const selectedSortOption = sortOptions.find(
    (option) => option.value === sort,
  );

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium">
        <FilterIcon className="h-4 w-4" />
        Sort & Order
      </label>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {/* Sort By */}
        <Select value={sort} onValueChange={onSortChange}>
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
        <Select value={order} onValueChange={onOrderChange}>
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
  );
};
