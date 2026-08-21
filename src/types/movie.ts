export interface Movie {
  id: string;
  title: string;
  slug: string;
  description: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl?: string;
  rating: number; // e.g. 8.8
  voteCount: number;
  durationMinutes: number;
  releaseDate: string;
  genres: string[];
  director: string;
  cast: string[];
  status: 'NOW_SHOWING' | 'COMING_SOON' | 'FEATURED';
  price: number;
}

export interface Showtime {
  id: string;
  movieId: string;
  cinemaId: string;
  cinemaName: string;
  hallName: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "14:30"
  format: '2D' | '3D' | 'IMAX' | '4DX';
  price: number;
  vipPrice: number;
  occupiedSeats: string[]; // e.g. ["A3", "A4", "B1"]
}
