# React Component Guidelines

This guide defines how components are categorized, structured, and implemented across the project.

---

## 1. Component Hierarchy & Categories

```text
src/components/
├── common/     # App-wide structural elements (Navbar, Footer, Sidebar)
├── forms/      # Reusable form components with validation (LoginForm, MovieForm, RegisterForm)
└── ui/         # Atomic presentational UI primitives (Badge, Card, Input, Modal, Spinner, button)
```

### Classification Matrix

| Category | Folder | Role | Examples | State Allowed? |
| :--- | :--- | :--- | :--- | :---: |
| **Atomic UI** | `components/ui/` | Reusable presentational building blocks | `Badge`, `MovieCard`, `Input`, `Modal`, `Spinner` | ⚠️ UI-only (e.g., open/close modal) |
| **Common** | `components/common/` | Global layout navigation & framing | `Navbar`, `Footer`, `Sidebar` | ⚠️ UI/Auth display (e.g., mobile menu toggle) |
| **Forms** | `components/forms/` | Interactive forms with input handling | `LoginForm`, `MovieForm`, `RegisterForm` | ✅ Form fields, error states, submission |
| **Pages** | `pages/` | Routed full-screen views | `HomePage`, `MoviesPage`, `MovieDetailPage`, `BookingPage` | ✅ Business logic, store subscription |

---

## 2. Component Guidelines by Category

### Atomic UI Components (`src/components/ui/`)
- Must be stateless or strictly hold internal presentation state (like dropdown open/closed).
- Accept styling extensions via optional `className?: string` prop.
- Must have an `index.ts` file re-exporting the component.

**Example: `Badge` Component**
```tsx
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'sm',
}) => {
  // Renders styled badge with variant classes
};
```

---

### Common Components (`src/components/common/`)
- **`Navbar`**: Provides desktop & mobile navigation links (`/`, `/movies`, `/cinemas`, `/history`), user auth status dropdown, and quick admin role switch.
- **`Footer`**: Brand information, movie links, cinema technology showcase links, and newsletter subscription form.
- **`Sidebar`**: Admin dashboard navigation menu with active route highlighting.

---

### Form Components (`src/components/forms/`)
- Handle local form state, input validation, and submission callbacks.
- Communicate outcome via props (e.g., `onSuccess?: () => void`, `onError?: (err: Error) => void`).

---

## 3. Best Practices Checklist

- ✅ **Props Typing**: Always define explicit TypeScript interfaces for component props.
- ✅ **Component Exports**: Use named exports (`export const ComponentName: React.FC<Props> = ...`) and re-export from `index.ts`.
- ✅ **Lucide Icons**: Use lightweight, consistent icons from `lucide-react`.
- ✅ **Responsive Design**: Always support mobile, tablet, and desktop breakpoints (`sm:`, `md:`, `lg:`, `xl:`).
- ✅ **Accessibility**: Provide meaningful `alt` text for images and `aria-label` / `title` for icon-only buttons.
