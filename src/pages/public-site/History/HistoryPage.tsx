import React from 'react';
import { Link } from 'react-router-dom';
import {
  Ticket,
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  XCircle,
} from 'lucide-react';
import { useMovieStore } from '@/store/movieStore';
import { Badge } from '@/components/ui/Badge/Badge';
import { formatCurrency, formatDate } from '@/utils/formatDate';

export const HistoryPage: React.FC = () => {
  const { bookings, cancelBooking } = useMovieStore();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            MY BOOKING HISTORY
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Access your active cinema passes, barcodes, and past transactions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="primary" size="md">
            {bookings.length} Total Bookings
          </Badge>
        </div>
      </div>

      {/* Tickets List */}
      {bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map((booking) => {
            const isCancelled = booking.status === 'CANCELLED';

            return (
              <div
                key={booking.id}
                className={`relative overflow-hidden rounded-3xl bg-[#151518] border border-white/10 transition-all ${
                  isCancelled ? 'opacity-50 grayscale' : 'hover:border-white/25 shadow-2xl'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-4">
                  {/* Left Movie Poster */}
                  <div className="md:col-span-1 relative min-h-[160px] md:min-h-full bg-zinc-900 overflow-hidden">
                    <img
                      src={booking.moviePoster}
                      alt={booking.movieTitle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-transparent to-transparent" />
                  </div>

                  {/* Middle Ticket Details */}
                  <div className="md:col-span-2 p-6 space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold tracking-widest text-[#E50914] uppercase">
                          E-TICKET REF: {booking.id}
                        </span>
                        <h3 className="text-xl font-bold text-white uppercase mt-0.5">
                          {booking.movieTitle}
                        </h3>
                      </div>
                      <Badge
                        variant={
                          isCancelled
                            ? 'destructive'
                            : booking.status === 'CONFIRMED'
                            ? 'success'
                            : 'warning'
                        }
                        size="sm"
                      >
                        {booking.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#E50914]" />
                        <span>{formatDate(booking.showDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#E50914]" />
                        <span>{booking.showTime}</span>
                      </div>
                      <div className="flex items-center gap-2 col-span-2">
                        <MapPin className="w-3.5 h-3.5 text-[#E50914]" />
                        <span className="text-white font-medium">
                          {booking.cinemaName} • {booking.hallName}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                      <div>
                        <span className="text-gray-400 block text-[11px]">Reserved Seats</span>
                        <span className="font-black text-white text-sm">
                          {booking.seats.join(', ')}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-400 block text-[11px]">Total Paid</span>
                        <span className="font-black text-emerald-400 text-sm">
                          {formatCurrency(booking.totalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right QR Code Pass section */}
                  <div className="md:col-span-1 p-6 bg-[#1a1a1e] md:border-l border-t md:border-t-0 border-dashed border-white/15 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="p-2.5 bg-white rounded-xl shadow-lg">
                      <img
                        src={booking.qrCodeUrl || 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=CINEMATIQUE'}
                        alt="Ticket QR Code"
                        className="w-20 h-20"
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono tracking-wider">
                      SCAN AT ENTRANCE
                    </span>

                    {!isCancelled && (
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => cancelBooking(booking.id)}
                          className="text-[11px] text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1"
                        >
                          <XCircle className="w-3 h-3" />
                          Cancel Pass
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-[#151518] rounded-3xl border border-white/10 space-y-4">
          <Ticket className="w-12 h-12 text-gray-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Tickets Found</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            You don't have any movie ticket reservations yet. Browse our movies catalog and book your preferred seats!
          </p>
          <Link
            to="/#movies"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E50914] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#E50914]/30"
          >
            Explore Movies Now
          </Link>
        </div>
      )}
    </div>
  );
};
