import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { Mainlayout } from '@/layouts/Mainlayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { AuthLayout } from '@/layouts/AuthLayout';

// Public Pages
import { HomePage } from '@/pages/public-site/Home/HomePage';
import { MoviesPage as PublicMoviesPage } from '@/pages/public-site/Movies/MoviesPage';
import { MovieDetailPage } from '@/pages/public-site/Movies/MovieDetailPage';
import { BookingPage } from '@/pages/public-site/Booking/BookingPage';
import { HistoryPage } from '@/pages/public-site/History/HistoryPage';

// Auth Pages
import { LoginPage } from '@/pages/auth/Login/LoginPage';
import { RegisterPage } from '@/pages/auth/Register/RegisterPage';

// Admin Pages
import { DashboardPage } from '@/pages/admin/DashboardPage';
import { MoviesPage } from '@/pages/admin/Movies/MoviesPage';
import { BookingsPage } from '@/pages/admin/Bookings/BookingsPage';
import { UsersPage } from '@/pages/admin/Users/UsersPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Site Layout & Routes */}
      <Route element={<Mainlayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<PublicMoviesPage />} />
        <Route path="/movies/:id" element={<MovieDetailPage />} />
        <Route path="/booking/:showtimeId" element={<BookingPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Route>

      {/* Authentication Layout & Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Admin Dashboard Layout & Routes */}
      <Route path="/en/admin" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/en/admin/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="movies" element={<MoviesPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="users" element={<UsersPage />} />
      </Route>

      {/* Fallback Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
