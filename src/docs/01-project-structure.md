src/
├── app/
│   ├── auth.ts
│   ├── providers.tsx
│   └── store.ts
│
├── assets/
│   ├── images/
│   ├── icons/
│   ├── fonts/
│   └── styles/
│
├── components/
│   ├── common/
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Navbar/
│   │   ├── Sidebar/
│   │   └── Loading/
│   │
│   ├── forms/
│   │   ├── LoginForm/
│   │   ├── RegisterForm/
│   │   └── BookingForm/
│   │
│   └── ui/
│       ├── Button/
│       ├── Input/
│       ├── Select/
│       ├── Modal/
│       ├── Table/
│       ├── Card/
│       ├── Badge/
│       ├── Spinner/
│       └── Pagination/
│
├── context/
│
├── hooks/
│   ├── useAuth.ts
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   └── usePagination.ts
│
├── layouts/
│   ├── MainLayout.tsx
│   ├── DashboardLayout.tsx
│   └── AuthLayout.tsx
│
├── pages/
│   ├── admin/
│   │   ├── Dashboard/
│   │   ├── Movies/
│   │   ├── Cinemas/
│   │   ├── Rooms/
│   │   ├── Bookings/
│   │   ├── Users/
│   │   └── Settings/
│   │
│   ├── auth/
│   │   ├── Login/
│   │   ├── Register/
│   │   └── ForgotPassword/
│   │
│   └── public-site/
│       ├── Home/
│       ├── Movies/
│       ├── MovieDetail/
│       ├── Booking/
│       ├── Profile/
│       └── History/
│
├── routes/
│   ├── AppRoutes.tsx
│   ├── PrivateRoute.tsx
│   ├── AdminRoute.tsx
│   └── index.ts
│
├── services/
│   ├── apiClient.ts
│   ├── auth.service.ts
│   ├── user.service.ts
│   ├── movie.service.ts
│   ├── cinema.service.ts
│   ├── room.service.ts
│   ├── booking.service.ts
│   └── payment.service.ts
│
├── store/
│   ├── authStore.ts
│   ├── bookingStore.ts
│   ├── movieStore.ts
│   └── userStore.ts
│
├── types/
│   ├── auth.ts
│   ├── booking.ts
│   ├── movie.ts
│   ├── user.ts
│   └── api.ts
│
├── utils/
│   ├── formatDate.ts
│   ├── formatCurrency.ts
│   ├── helpers.ts
│   ├── validators.ts
│   └── storage.ts
│
├── App.tsx
├── main.tsx
├── index.css
└── vite-env.d.ts


# Architecture Flow

```text
User
   │
   ▼
Page
   │
   ▼
Component
   │
   ▼
Hook
   │
   ▼
Service
   │
   ▼
API
   │
   ▼
Database
```