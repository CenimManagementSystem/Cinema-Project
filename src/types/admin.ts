export interface DashboardStats {
  totalRevenue: number;
  revenueGrowth: number; // percentage
  totalBookings: number;
  bookingsGrowth: number;
  activeMovies: number;
  totalUsers: number;
  usersGrowth: number;
}

export interface SalesDataPoint {
  month: string;
  sales: number;
  bookings: number;
}
