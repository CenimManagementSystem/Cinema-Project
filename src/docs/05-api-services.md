# API Services & Communication Guide

This document outlines how API communication is organized and implemented across the application.

---

## 1. Core API Client (`src/services/apiClient.ts`)

The project uses a single configured **Axios** instance for all network requests.

```ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Request Interceptor: Automatically attach JWT Bearer Token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 2. API Service Structure

All API calls must be wrapped inside dedicated service modules under `src/services/`.

```text
src/services/
├── apiClient.ts          # Core axios instance & interceptors
├── auth.service.ts       # Authentication endpoints (login, register, me)
├── movie.service.ts      # Movie catalog & details
├── booking.service.ts    # Showtimes, seat reservations, booking creation
└── user.service.ts       # User management endpoints (admin)
```

---

## 3. Service Implementation Example

```ts
import { apiClient } from './apiClient';
import { Movie } from '@/types/movie';

export const movieService = {
  // Fetch all movies
  getAllMovies: async (): Promise<Movie[]> => {
    const response = await apiClient.get<Movie[]>('/movies');
    return response.data;
  },

  // Fetch movie by ID or slug
  getMovieById: async (id: string): Promise<Movie> => {
    const response = await apiClient.get<Movie>(`/movies/${id}`);
    return response.data;
  },

  // Create movie (Admin)
  createMovie: async (movie: Omit<Movie, 'id' | 'slug'>): Promise<Movie> => {
    const response = await apiClient.post<Movie>('/movies', movie);
    return response.data;
  },

  // Delete movie (Admin)
  deleteMovie: async (id: string): Promise<void> => {
    await apiClient.delete(`/movies/${id}`);
  },
};
```

---

## 4. Integration with Zustand Stores

Zustand stores consume API services and manage local cached state:

```ts
import { create } from 'zustand';
import { movieService } from '@/services/movie.service';

export const useMovieStore = create<MovieState>((set) => ({
  movies: [],
  loading: false,
  error: null,

  fetchMovies: async () => {
    set({ loading: true, error: null });
    try {
      const data = await movieService.getAllMovies();
      set({ movies: data, loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },
}));
```

---

## 5. API Rules & Conventions

- ❌ **Never** call `axios` directly inside components or hooks.
- ❌ **Never** write raw URLs in components.
- ✅ Always type response bodies using interfaces from `src/types/`.
- ✅ Handle network errors gracefully and present user-friendly alerts.
- ✅ Store auth tokens in `localStorage` / cookie, handled automatically by the `apiClient` interceptor.