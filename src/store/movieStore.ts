import { create } from 'zustand';
import { Movie, Showtime } from '@/types/movie';
import { Booking } from '@/types/booking';

interface MovieState {
  movies: Movie[];
  showtimes: Showtime[];
  bookings: Booking[];
  selectedCategory: string;
  searchQuery: string;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  addMovie: (movie: Omit<Movie, 'id' | 'slug'>) => void;
  updateMovie: (id: string, updated: Partial<Movie>) => void;
  deleteMovie: (id: string) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'bookingDate'>) => Booking;
  cancelBooking: (bookingId: string) => void;
  getMovieById: (id: string) => Movie | undefined;
  getShowtimesByMovieId: (movieId: string) => Showtime[];
}

const INITIAL_MOVIES: Movie[] = [
  {
    id: 'm-1',
    title: 'THE BATMAN',
    slug: 'the-batman',
    description: 'When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city\'s hidden corruption and question his family\'s involvement.',
    posterUrl: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80',
    trailerUrl: 'https://www.youtube.com/embed/mqqft2x_Aa4',
    rating: 8.8,
    voteCount: 3420,
    durationMinutes: 176,
    releaseDate: '2026-03-04',
    genres: ['Action', 'Crime', 'Drama', 'Mystery'],
    director: 'Matt Reeves',
    cast: ['Robert Pattinson', 'Zoë Kravitz', 'Paul Dano', 'Jeffrey Wright', 'Colin Farrell'],
    status: 'FEATURED',
    price: 14.5,
  },
  {
    id: 'm-2',
    title: 'AVATAR: THE WAY OF WATER',
    slug: 'avatar-the-way-of-water',
    description: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their home.',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    trailerUrl: 'https://www.youtube.com/embed/d9MyW72ELq0',
    rating: 8.5,
    voteCount: 4210,
    durationMinutes: 192,
    releaseDate: '2026-04-12',
    genres: ['Action', 'Adventure', 'Fantasy', 'Sci-Fi'],
    director: 'James Cameron',
    cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver', 'Stephen Lang'],
    status: 'NOW_SHOWING',
    price: 16.0,
  },
  {
    id: 'm-3',
    title: 'OPPENHEIMER',
    slug: 'oppenheimer',
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
    posterUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=1600&q=80',
    trailerUrl: 'https://www.youtube.com/embed/uYPbbksJxIg',
    rating: 8.9,
    voteCount: 5120,
    durationMinutes: 180,
    releaseDate: '2026-05-20',
    genres: ['Biography', 'Drama', 'History'],
    director: 'Christopher Nolan',
    cast: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon', 'Robert Downey Jr.'],
    status: 'NOW_SHOWING',
    price: 15.0,
  },
  {
    id: 'm-4',
    title: 'DUNE: PART TWO',
    slug: 'dune-part-two',
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    posterUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1600&q=80',
    trailerUrl: 'https://www.youtube.com/embed/Way9Dexny3w',
    rating: 8.7,
    voteCount: 2980,
    durationMinutes: 166,
    releaseDate: '2026-06-15',
    genres: ['Action', 'Adventure', 'Drama', 'Sci-Fi'],
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Javier Bardem'],
    status: 'NOW_SHOWING',
    price: 15.5,
  },
  {
    id: 'm-5',
    title: 'INTERSTELLAR',
    slug: 'interstellar',
    description: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
    posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E',
    rating: 9.0,
    voteCount: 6890,
    durationMinutes: 169,
    releaseDate: '2026-07-01',
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    status: 'COMING_SOON',
    price: 13.5,
  },
  {
    id: 'm-6',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE',
    slug: 'spider-man-across-the-spider-verse',
    description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    posterUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1600&q=80',
    trailerUrl: 'https://www.youtube.com/embed/cqGjhVJWtEg',
    rating: 8.6,
    voteCount: 3100,
    durationMinutes: 140,
    releaseDate: '2026-08-10',
    genres: ['Animation', 'Action', 'Adventure', 'Family'],
    director: 'Joaquim Dos Santos, Kemp Powers',
    cast: ['Shameik Moore', 'Hailee Steinfeld', 'Oscar Isaac'],
    status: 'COMING_SOON',
    price: 12.5,
  },
];

const INITIAL_SHOWTIMES: Showtime[] = [
  {
    id: 'st-1',
    movieId: 'm-1',
    cinemaId: 'c-1',
    cinemaName: 'Cinematique Grand Hall',
    hallName: 'IMAX Theater 1',
    date: '2026-08-21',
    time: '14:30',
    format: 'IMAX',
    price: 15.0,
    vipPrice: 22.0,
    occupiedSeats: ['B3', 'B4', 'C5', 'C6', 'D4', 'D5', 'F7'],
  },
  {
    id: 'st-2',
    movieId: 'm-1',
    cinemaId: 'c-1',
    cinemaName: 'Cinematique Grand Hall',
    hallName: 'Dolby Atmos 2',
    date: '2026-08-21',
    time: '18:00',
    format: '2D',
    price: 13.0,
    vipPrice: 19.0,
    occupiedSeats: ['A1', 'A2', 'E4', 'E5'],
  },
  {
    id: 'st-3',
    movieId: 'm-1',
    cinemaId: 'c-2',
    cinemaName: 'Cinematique Downtown',
    hallName: 'Screen 3',
    date: '2026-08-21',
    time: '21:15',
    format: '4DX',
    price: 18.0,
    vipPrice: 26.0,
    occupiedSeats: ['C3', 'C4', 'D3'],
  },
  {
    id: 'st-4',
    movieId: 'm-2',
    cinemaId: 'c-1',
    cinemaName: 'Cinematique Grand Hall',
    hallName: 'IMAX 3D Laser',
    date: '2026-08-21',
    time: '15:00',
    format: '3D',
    price: 17.0,
    vipPrice: 24.0,
    occupiedSeats: ['B1', 'B2', 'D6', 'D7'],
  },
  {
    id: 'st-5',
    movieId: 'm-3',
    cinemaId: 'c-1',
    cinemaName: 'Cinematique Grand Hall',
    hallName: '70mm Theater',
    date: '2026-08-21',
    time: '19:30',
    format: 'IMAX',
    price: 16.0,
    vipPrice: 23.0,
    occupiedSeats: ['A4', 'B5', 'C5'],
  },
];

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-98421',
    userId: 'u-1',
    userName: 'John Doe',
    userEmail: 'john.doe@example.com',
    movieId: 'm-1',
    movieTitle: 'THE BATMAN',
    moviePoster: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80',
    showtimeId: 'st-1',
    cinemaName: 'Cinematique Grand Hall',
    hallName: 'IMAX Theater 1',
    showDate: '2026-08-21',
    showTime: '14:30',
    seats: ['D4', 'D5'],
    totalAmount: 44.0,
    paymentMethod: 'CREDIT_CARD',
    status: 'CONFIRMED',
    bookingDate: '2026-08-20T10:15:00Z',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BK-98421-CINEMATIQUE',
  },
  {
    id: 'BK-84210',
    userId: 'u-1',
    userName: 'John Doe',
    userEmail: 'john.doe@example.com',
    movieId: 'm-3',
    movieTitle: 'OPPENHEIMER',
    moviePoster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80',
    showtimeId: 'st-5',
    cinemaName: 'Cinematique Grand Hall',
    hallName: '70mm Theater',
    showDate: '2026-08-15',
    showTime: '19:30',
    seats: ['C5'],
    totalAmount: 23.0,
    paymentMethod: 'PAYPAL',
    status: 'CONFIRMED',
    bookingDate: '2026-08-14T08:30:00Z',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BK-84210-CINEMATIQUE',
  },
];

export const useMovieStore = create<MovieState>((set, get) => ({
  movies: INITIAL_MOVIES,
  showtimes: INITIAL_SHOWTIMES,
  bookings: INITIAL_BOOKINGS,
  selectedCategory: 'ALL',
  searchQuery: '',

  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  addMovie: (movieData) => {
    const id = `m-${Date.now()}`;
    const slug = movieData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newMovie: Movie = { ...movieData, id, slug };
    set((state) => ({ movies: [newMovie, ...state.movies] }));
  },

  updateMovie: (id, updated) => {
    set((state) => ({
      movies: state.movies.map((m) => (m.id === id ? { ...m, ...updated } : m)),
    }));
  },

  deleteMovie: (id) => {
    set((state) => ({
      movies: state.movies.filter((m) => m.id !== id),
    }));
  },

  addBooking: (bookingData) => {
    const id = `BK-${Math.floor(10000 + Math.random() * 90000)}`;
    const bookingDate = new Date().toISOString();
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${id}-CINEMATIQUE`;
    const newBooking: Booking = {
      ...bookingData,
      id,
      bookingDate,
      qrCodeUrl,
    };

    // Update occupied seats in showtime
    set((state) => ({
      bookings: [newBooking, ...state.bookings],
      showtimes: state.showtimes.map((st) =>
        st.id === bookingData.showtimeId
          ? { ...st, occupiedSeats: [...st.occupiedSeats, ...bookingData.seats] }
          : st
      ),
    }));

    return newBooking;
  },

  cancelBooking: (bookingId) => {
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === bookingId ? { ...b, status: 'CANCELLED' } : b
      ),
    }));
  },

  getMovieById: (id) => get().movies.find((m) => m.id === id || m.slug === id),

  getShowtimesByMovieId: (movieId) =>
    get().showtimes.filter((st) => st.movieId === movieId),
}));
