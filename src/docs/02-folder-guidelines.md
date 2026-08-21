# Folder Guidelines & Responsibilities

This document defines the purpose, rules, and best practices for each directory in `src/`.

---

## Folder Responsibility Overview

| Directory | Purpose | Business Logic? | API Calls? |
| :--- | :--- | :---: | :---: |
| `src/app/` | App bootstrap & configuration | ❌ No | ❌ No |
| `src/assets/` | Static images, icons, logos | ❌ No | ❌ No |
| `src/components/common/` | Shared app-wide components (Navbar, Footer, Sidebar) | ⚠️ Minimal UI State | ❌ No |
| `src/components/forms/` | Reusable form components with validation | ⚠️ Form State Only | ❌ No |
| `src/components/ui/` | Atomic, presentational UI primitives (Button, Modal, Card, Input) | ❌ No | ❌ No |
| `src/context/` | React Context providers (Theme, Auth fallback) | ⚠️ State Only | ❌ No |
| `src/docs/` | Architectural & coding documentation | ❌ No | ❌ No |
| `src/hooks/` | Reusable custom React hooks (`useHashScroll`, `useDebounce`) | ✅ Hook Logic | ⚠️ Via Store/Service |
| `src/layouts/` | Structural page layouts (`Mainlayout`, `DashboardLayout`, `AuthLayout`) | ⚠️ Layout State | ❌ No |
| `src/lib/` | Library utilities & helpers (`cn` class merger) | ❌ No | ❌ No |
| `src/pages/` | Page-level routed views (`public-site/`, `admin/`, `auth/`) | ✅ Yes | ⚠️ Via Stores/Services |
| `src/routes/` | React Router definitions & route guards (`AppRoutes`, `ProtectedRoute`) | ⚠️ Auth Check | ❌ No |
| `src/services/` | HTTP client & external API services (`apiClient.ts`) | ❌ No | ✅ Yes |
| `src/store/` | Zustand state management stores (`movieStore`, `authStore`, `userStore`) | ✅ Yes | ✅ Yes |
| `src/types/` | TypeScript interfaces, types, enums | ❌ No | ❌ No |
| `src/utils/` | Pure helper & formatting functions (`formatDate`, `formatCurrency`) | ❌ No | ❌ No |

---

## Detailed Directory Guidelines

### 1. `components/ui/`
- **Purpose**: Pure, reusable, presentational UI building blocks.
- **Rules**:
  - ✅ Must accept `props` and emit events via callbacks.
  - ✅ Must be framework-agnostic where possible.
  - ❌ Do NOT import Zustand stores directly inside `ui/` components.
  - ❌ Do NOT make direct API calls.
- **Current Items**: `Badge/`, `Card/` (MovieCard), `Input/`, `Modal/`, `Spinner/`, `button.tsx`, `card.tsx`.

### 2. `components/common/`
- **Purpose**: High-level shared layout components used across pages.
- **Current Items**: `Navbar/`, `Footer/`, `Sidebar/`.
- **Rules**:
  - ✅ May read global auth state (e.g., current user avatar, logout).
  - ❌ Do NOT place page-specific content here.

### 3. `components/forms/`
- **Purpose**: Self-contained forms handling input validation and submission events.
- **Current Items**: `LoginForm/`, `RegisterForm/`, `MovieForm/`.

### 4. `pages/`
Organized into three main sub-domains:
- `public-site/`: Customer-facing screens.
  - `Home/` (`HomePage.tsx`): Hero banner, featured movies, cinema technology showcase.
  - `Movies/` (`MoviesPage.tsx`, `MovieDetailPage.tsx`): Catalog discovery and individual movie showtimes.
  - `Booking/` (`BookingPage.tsx`): Interactive cinema seat selection & booking confirmation.
  - `History/` (`HistoryPage.tsx`): User booking history and QR tickets.
- `admin/`: Management screens.
  - `DashboardPage.tsx`, `Movies/`, `Bookings/`, `Users/`.
- `auth/`: Authentication screens.
  - `Login/`, `Register/`.

### 5. `store/`
- **Purpose**: Global application state using **Zustand**.
- **Current Stores**:
  - `movieStore.ts`: Movies list, category filters, search query, showtimes, seat reservations.
  - `authStore.ts`: Authenticated user, role (`ADMIN` vs `USER`), login/logout, role toggle.
  - `userStore.ts`: User management state for administration.

### 6. `routes/`
- **Purpose**: Application navigation and access control.
- **`AppRoutes.tsx`**: Route declarations mapping paths to page components within layouts.
- **`ProtectedRoute.tsx`**: Route guard for protected / role-restricted pages.

### 7. `hooks/`
- **Purpose**: Encapsulate reusable stateful logic.
- **`useHashScroll.ts`**: Automatically scrolls to hash targets (e.g., `#cinemas`) when navigating.
- **`useDebounce.ts`**: Debounces fast-changing values (e.g., search queries).
- **`useAuth.ts`**: Auth helper hook.

### 8. `utils/` & `lib/`
- **`utils/formatDate.ts`**: Date, time, and movie duration formatting.
- **`utils/formatCurrency.ts`**: Monetary value formatting ($ USD).
- **`lib/utils.ts`**: `cn()` utility combining `clsx` and `tailwind-merge` for safe Tailwind class composition.