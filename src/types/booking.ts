export interface Seat {
  id: string; // e.g. "A1", "C5"
  row: string; // "A"
  number: number; // 1
  type: 'STANDARD' | 'VIP' | 'COUPLE';
  price: number;
  status: 'AVAILABLE' | 'SELECTED' | 'OCCUPIED';
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  movieId: string;
  movieTitle: string;
  moviePoster: string;
  showtimeId: string;
  cinemaName: string;
  hallName: string;
  showDate: string;
  showTime: string;
  seats: string[];
  totalAmount: number;
  paymentMethod: 'CREDIT_CARD' | 'QR_CODE' | 'PAYPAL' | 'CASH';
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  bookingDate: string;
  qrCodeUrl?: string;
}
