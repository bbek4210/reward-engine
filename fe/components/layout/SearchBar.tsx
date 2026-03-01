"use client";

import Input from "../ui/Input";
import IconButton from "../ui/IconButton";

export interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  onFilter?: () => void;
  onSort?: () => void;
}

/**
 * SearchBar Component
 *
 * Design Specs:
 * - Large rounded search input spanning width
 * - Search icon on left inside input
 * - Two circular icon buttons on right (filter + sort)
 * - Background: White
 *
 * Layout:
 * [Search Input ----------------] [Filter Icon] [Sort Icon]
 *
 * Tailwind Classes:
 * Container: flex items-center gap-3 w-full
 * Input: flex-1 bg-white rounded-xl border border-[#ECE7E4] px-4 py-3 pl-12
 */
export default function SearchBar({
  value = "",
  onChange,
  placeholder = "Search missions, constituencies, categories…",
  onFilter,
  onSort,
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-3 w-full">
      {/* Search Input */}
      <div className="flex-1">
        <Input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          }
          iconPosition="left"
          fullWidth
        />
      </div>

      {/* Filter Button */}
      <IconButton
        variant="default"
        size="lg"
        onClick={onFilter}
        aria-label="Filter"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
      </IconButton>

      {/* Sort Button */}
      <IconButton
        variant="default"
        size="lg"
        onClick={onSort}
        aria-label="Sort"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
          />
        </svg>
      </IconButton>
    </div>
  );
}
