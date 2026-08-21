# Project Structure

```text
src/
├── app/
│   ├── auth.ts
│   ├── provider.ts
│   └── store.ts
│
├── assets/
│   └── logo.png
│
├── components/
│   ├── common/
│   │   ├── Footer/
│   │   │   ├── Footer.tsx
│   │   │   └── index.ts
│   │   ├── Navbar/
│   │   │   ├── Navbar.tsx
│   │   │   └── index.ts
│   │   └── Sidebar/
│   │       ├── Sidebar.tsx
│   │       └── index.ts
│   │
│   ├── forms/
│   │   ├── LoginForm/
│   │   │   ├── LoginForm.tsx
│   │   │   └── index.ts
│   │   ├── MovieForm/
│   │   │   ├── MovieForm.tsx
│   │   │   └── index.ts
│   │   └── RegisterForm/
│   │       ├── RegisterForm.tsx
│   │       └── index.ts
│   │
│   └── ui/
│       ├── Badge/
│       │   ├── Badge.tsx
│       │   └── index.ts
│       ├── Card/
│       │   ├── MovieCard.tsx
│       │   └── index.ts
│       ├── Input/
│       │   ├── Input.tsx
│       │   └── index.ts
│       ├── Modal/
│       │   ├── Modal.tsx
│       │   └── index.ts
│       ├── Spinner/
│       │   ├── Spinner.tsx
│       │   └── index.ts
│       ├── button.tsx
│       └── card.tsx
│
├── context/
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
│
├── docs/
│   ├── 01-project-structure.md
│   ├── 02-folder-guidelines.md
│   ├── 03-coding-conventions.md
│   ├── 04-component-guidelines.md
│   └── 05-api-services.md
│
├── hooks/
│   ├── useAuth.ts
│   ├── useDebounce.ts
│   └── useHashScroll.ts
│
├── layouts/
│   ├── AuthLayout.tsx
│   ├── DashboardLayout.tsx
│   └── Mainlayout.tsx
│
├── lib/
│   └── utils.ts
│
├── pages/
│   ├── admin/
│   │   ├── Bookings/
│   │   │   ├── BookingsPage.tsx
│   │   │   └── index.ts
│   │   ├── Movies/
│   │   │   ├── MoviesPage.tsx
│   │   │   └── index.ts
│   │   ├── Users/
│   │   │   ├── UsersPage.tsx
│   │   │   └── index.ts
│   │   └── DashboardPage.tsx
│   │
│   ├── auth/
│   │   ├── Login/
│   │   │   ├── LoginPage.tsx
│   │   │   └── index.ts
│   │   ├── Register/
│   │   │   ├── RegisterPage.tsx
│   │   │   └── index.ts
│   │   ├── LoginForm.tsx
│   │   └── index.ts
│   │
│   └── public-site/
│       ├── Booking/
│       │   ├── BookingPage.tsx
│       │   └── index.ts
│       ├── History/
│       │   ├── HistoryPage.tsx
│       │   └── index.ts
│       ├── Home/
│       │   ├── HomePage.tsx
│       │   └── index.ts
│       └── Movies/
│           ├── MoviesPage.tsx
│           ├── MovieDetailPage.tsx
│           └── index.ts
│
├── routes/
│   ├── AppRoutes.tsx
│   └── ProtectedRoute.tsx
│
├── services/
│   └── apiClient.ts
│
├── store/
│   ├── authStore.ts
│   ├── movieStore.ts
│   └── userStore.ts
│
├── types/
│   ├── admin.ts
│   ├── api.d.ts
│   ├── auth.ts
│   ├── booking.ts
│   └── movie.ts
│
├── utils/
│   ├── __tests__/
│   ├── formatCurrency.ts
│   └── formatDate.ts
│
├── App.tsx
├── main.tsx
├── index.css
└── vite-env.d.ts
```

---

# Architecture Flow

```text
User Interaction
       │
       ▼
  React Router (AppRoutes.tsx)
       │
       ▼
     Layout (Mainlayout / DashboardLayout / AuthLayout)
       │
       ▼
     Page Component (e.g., HomePage, MoviesPage, MovieDetailPage)
       │
       ▼
  UI / Common / Form Component (e.g., MovieCard, Navbar, Input)
       │
       ▼
  Custom Hook / Zustand Store (e.g., useHashScroll, useMovieStore, useAuthStore)
       │
       ▼
  API Service (apiClient.ts)
       │
       ▼
  Backend API / Mock Data
```