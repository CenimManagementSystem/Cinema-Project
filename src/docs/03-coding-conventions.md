# Coding Conventions & Best Practices

This document outlines the standard coding conventions for the Cinematique frontend codebase.

---

## 1. Naming Conventions

| Item | Convention | Example |
| :--- | :--- | :--- |
| **Component Files** | PascalCase (`.tsx`) | `MovieCard.tsx`, `HomePage.tsx`, `Mainlayout.tsx` |
| **Hook Files** | camelCase with `use` prefix (`.ts`) | `useHashScroll.ts`, `useDebounce.ts`, `useAuth.ts` |
| **Store Files** | camelCase with `Store` suffix (`.ts`) | `movieStore.ts`, `authStore.ts` |
| **Utility Files** | camelCase (`.ts`) | `formatDate.ts`, `formatCurrency.ts` |
| **Type Files** | camelCase (`.ts`) | `movie.ts`, `booking.ts`, `auth.ts` |
| **Component Names** | PascalCase | `export const MovieCard: React.FC<Props> = ...` |
| **Interfaces / Types** | PascalCase | `interface MovieProps`, `type UserRole` |
| **Constants / Enums** | UPPER_SNAKE_CASE | `INITIAL_MOVIES`, `DEFAULT_PAGE_SIZE` |

---

## 2. Component Structure

Always follow this structure when creating components:

```tsx
import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// 1. Props interface
interface MovieCardProps {
  movie: Movie;
  className?: string;
  onSelect?: (id: string) => void;
}

// 2. Component definition
export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  className,
  onSelect,
}) => {
  // 3. Hooks and State
  const [isHovered, setIsHovered] = useState(false);

  // 4. Handlers
  const handleClick = () => {
    onSelect?.(movie.id);
  };

  // 5. JSX Render
  return (
    <div
      className={cn('rounded-2xl bg-zinc-900 border border-white/10 p-4', className)}
      onClick={handleClick}
    >
      <h3 className="text-white font-bold">{movie.title}</h3>
    </div>
  );
};
```

---

## 3. Path Aliases

Always use the `@/` path alias configured in `vite.config.ts` and `tsconfig.json`:

```tsx
// ✅ Good:
import { useMovieStore } from '@/store/movieStore';
import { MovieCard } from '@/components/ui/Card/MovieCard';
import { formatDuration } from '@/utils/formatDate';

// ❌ Bad:
import { useMovieStore } from '../../../../store/movieStore';
```

---

## 4. State Management with Zustand

- Define stores in `src/store/` using `create<State>()`.
- Keep store actions co-located with state definitions.
- Destructure only required properties in components to avoid unnecessary re-renders:

```tsx
// ✅ Good
const { movies, searchQuery, setSearchQuery } = useMovieStore();

// ❌ Bad
const movieStore = useMovieStore(); // Reads entire store
```

---

## 5. Styling with Tailwind CSS

- Use Tailwind CSS utility classes.
- Use `cn()` from `@/lib/utils` when combining conditional or dynamic class names.
- Follow the project's dark cinematic theme palette:
  - Primary Red: `#E50914` (Cinema Red)
  - Background Dark: `#0f0f10`, `#18181b`, `#161619`
  - Border Accents: `border-white/10`, `border-white/15`
  - Accent Gold/Amber: `text-amber-400`, `fill-amber-400`

---

## 6. Routing & Navigation

- Use React Router v6 components (`Routes`, `Route`, `Link`, `Navigate`).
- Use `useNavigate` for programmatic navigation.
- For in-page anchor navigation on the homepage (like `#cinemas`), ensure the `useHashScroll` hook is active in `Mainlayout`.