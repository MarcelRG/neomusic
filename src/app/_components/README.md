# Components Structure

This directory contains the refactored Toolbar component and its sub-components for better organization and maintainability.

## Components

### Main Components

- **`Toolbar.tsx`** - Main container component that orchestrates search functionality
- **`SearchBar.tsx`** - Search input component with loading states and clear functionality
- **`SortControls.tsx`** - Sorting and ordering controls component
- **`SearchResults.tsx`** - Results display component with loading, success, and empty states

### Hooks

- **`hooks/useDebounce.ts`** - Custom hook for debouncing search input
- **`hooks/useKeyboardShortcuts.ts`** - Custom hook for keyboard shortcuts (Ctrl+K, Esc, Ctrl+F)

### Constants

- **`constants/sortOptions.ts`** - Configuration for sort options with icons and descriptions

### Exports

- **`index.ts`** - Centralized exports for all components, hooks, and constants

## Usage

```tsx
import { Toolbar } from "./components";

// Or import individual components
import { SearchBar, SortControls, SearchResults } from "./components";
```

## Benefits of This Structure

1. **Separation of Concerns** - Each component has a single responsibility
2. **Reusability** - Components can be reused in other parts of the application
3. **Maintainability** - Easier to test and modify individual components
4. **Type Safety** - Proper TypeScript interfaces for all components
5. **Performance** - Smaller components can be optimized individually
6. **Developer Experience** - Cleaner imports and better code organization
