# React + TypeScript + Vite Project Structure

This project follows a scalable folder structure suitable for small, medium, and large React applications without using a `features` folder. The structure separates responsibilities such as UI components, pages, API services, state management, utilities, and layouts.

---

# Project Structure

```text
src/
├── app/
├── assets/
├── components/
├── context/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── store/
├── types/
├── utils/
├── App.tsx
├── main.tsx
├── index.css
└── vite-env.d.ts
```

---

# Folder Explanation

## app/

Contains the application configuration.

```text
app/
├── auth.ts
├── providers.tsx
└── store.ts
```

### Purpose

- Configure authentication
- Register React Providers
- Configure Redux/Zustand store
- Application initialization

Example:

```tsx
<AuthProvider>
    <ThemeProvider>
        <App />
    </ThemeProvider>
</AuthProvider>
```

---

# assets/

Stores static files.

```text
assets/
├── images/
├── icons/
├── fonts/
└── styles/
```

### images/

Store logos, banners, movie posters, avatars, etc.

Example

```text
logo.png
banner.jpg
avatar.png
```

---

### icons/

SVG icons or custom icons.

```text
play.svg
ticket.svg
movie.svg
```

---

### fonts/

Custom fonts.

```text
Poppins.ttf
Inter.ttf
```

---

### styles/

Global styles.

```text
variables.css
global.css
theme.css
```

---

# components/

Reusable UI components.

```text
components/
├── common/
├── forms/
└── ui/
```

---

## common/

Application-wide reusable components.

```text
common/
├── Header/
├── Footer/
├── Navbar/
├── Sidebar/
└── Loading/
```

Example

Header is used on every page.

Sidebar is used in Dashboard.

Loading spinner while fetching data.

---

## forms/

Reusable forms.

```text
forms/
├── LoginForm/
├── RegisterForm/
└── BookingForm/
```

Each form contains

```text
LoginForm/
├── LoginForm.tsx
├── LoginForm.css
└── index.ts
```

---

## ui/

Small reusable UI components.

```text
ui/
├── Button/
├── Input/
├── Select/
├── Modal/
├── Table/
├── Card/
├── Badge/
├── Spinner/
└── Pagination/
```

Example

Button

```tsx
<Button variant="primary">
    Save
</Button>
```

Input

```tsx
<Input
    placeholder="Email"
/>
```

Modal

```tsx
<Modal>
    Delete this movie?
</Modal>
```

---

# context/

React Context.

```text
context/
├── AuthContext.tsx
└── ThemeContext.tsx
```

Use when global state is small.

Example

- Theme
- Language
- Authentication

---

# hooks/

Reusable custom hooks.

```text
hooks/
├── useAuth.ts
├── useDebounce.ts
├── useLocalStorage.ts
└── usePagination.ts
```

Example

```tsx
const { user } = useAuth();
```

---

# layouts/

Application layouts.

```text
layouts/
├── MainLayout.tsx
├── DashboardLayout.tsx
└── AuthLayout.tsx
```

Example

Main Layout

```text
Navbar
-------
Content
-------
Footer
```

Dashboard Layout

```text
Sidebar | Content
```

Auth Layout

```text
Login
Register
Forgot Password
```

---

# pages/

Actual pages shown by React Router.

```text
pages/
├── admin/
├── auth/
└── user/
```

---

## admin/

Dashboard pages.

```text
Dashboard/
Movies/
Cinemas/
Rooms/
Bookings/
Users/
Settings/
```

Example URL

```text
/admin/dashboard
/admin/movies
/admin/users
```

---

## auth/

Authentication pages.

```text
Login/
Register/
ForgotPassword/
```

Example URL

```text
/login
/register
```

---

## user/

Public pages.

```text
Home/
Movies/
MovieDetail/
Booking/
Profile/
History/
```

Example URL

```text
/
/movies
/profile
```

---

# routes/

React Router configuration.

```text
routes/
├── AppRoutes.tsx
├── PrivateRoute.tsx
├── AdminRoute.tsx
└── index.ts
```

### AppRoutes

All application routes.

### PrivateRoute

Only logged-in users.

### AdminRoute

Only admin users.

---

# services/

API communication.

```text
services/
├── apiClient.ts
├── auth.service.ts
├── user.service.ts
├── movie.service.ts
├── cinema.service.ts
├── room.service.ts
├── booking.service.ts
└── payment.service.ts
```

Example

```tsx
movie.service.ts
```

```ts
export const getMovies = () =>
    apiClient.get("/movies");
```

Never place UI code here.

Only API calls.

---

# store/

State management.

```text
store/
├── authStore.ts
├── bookingStore.ts
├── movieStore.ts
└── userStore.ts
```

Can use

- Redux Toolkit
- Zustand

Example

```ts
const user = useUserStore();
```

---

# types/

TypeScript interfaces.

```text
types/
├── auth.ts
├── booking.ts
├── movie.ts
├── user.ts
└── api.ts
```

Example

```ts
export interface User {
    id: number;
    name: string;
    email: string;
}
```

---

# utils/

Helper functions.

```text
utils/
├── formatDate.ts
├── formatCurrency.ts
├── helpers.ts
├── validators.ts
└── storage.ts
```

Example

```ts
formatCurrency(100);
```

Output

```text
$100.00
```

Example

```ts
formatDate(new Date());
```

Output

```text
21 Jul 2026
```

---

# Root Files

## main.tsx

Application entry point.

```tsx
ReactDOM.createRoot(...)
```

---

## App.tsx

Root application component.

Contains

- Router
- Layout
- Providers

---

## index.css

Global CSS.

---

## vite-env.d.ts

Vite TypeScript definitions.

---

# Recommended Workflow

```text
Page
    ↓
Component
    ↓
Hook
    ↓
Service
    ↓
API
```

Example

```text
MoviesPage
      ↓
MovieCard
      ↓
useMovies()
      ↓
movie.service.ts
      ↓
GET /movies
```

---

# Best Practices

✅ Keep components small and reusable.

✅ Put API calls inside `services`.

✅ Put helper functions inside `utils`.

✅ Put TypeScript interfaces inside `types`.

✅ Put reusable UI inside `components/ui`.

✅ Put page-specific code inside `pages`.

✅ Keep layouts separate from pages.

✅ Use hooks for reusable logic.

✅ Avoid duplicate code.

---

# Folder Responsibility Summary

| Folder | Responsibility |
|---------|----------------|
| app | Application configuration |
| assets | Images, fonts, icons, styles |
| components | Reusable UI |
| context | React Context |
| hooks | Custom Hooks |
| layouts | Page layouts |
| pages | Screen/Page components |
| routes | React Router |
| services | API communication |
| store | Global state |
| types | TypeScript interfaces |
| utils | Helper functions |

---


This architecture keeps the project clean, scalable, and easy to maintain as the application grows.