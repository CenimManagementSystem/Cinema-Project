import React, { useState } from 'react';
import { Search, DollarSign } from 'lucide-react';
import { useMovieStore } from '@/store/movieStore';
import { Badge } from '@/components/ui/Badge/Badge';
import { formatCurrency, formatDate } from '@/utils/formatDate';

export const BookingsPage: React.FC = () => {
  const { bookings, cancelBooking } = useMovieStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.userName.toLowerCase().includes(search.toLowerCase()) ||
      b.movieTitle.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'ALL' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalSales = bookings.reduce(
    (sum, b) => (b.status === 'CONFIRMED' ? sum + b.totalAmount : sum),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            Bookings & Order Records
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Monitor real-time ticket sales, seat reservations, and cancellation logs
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 text-xs font-bold text-emerald-400">
            <DollarSign className="w-4 h-4" />
            <span>Active Sales: {formatCurrency(totalSales)}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-[#141417] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ID, customer name, movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1c1c20] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#E50914]"
          />
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'CONFIRMED', 'CANCELLED'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                statusFilter === status
                  ? 'bg-[#E50914] text-white'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="rounded-2xl bg-[#141417] border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-[#18181c] text-gray-400 uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Booking Ref</th>
                <th className="py-3.5 px-4 font-semibold">Customer</th>
                <th className="py-3.5 px-4 font-semibold">Movie & Hall</th>
                <th className="py-3.5 px-4 font-semibold">Date & Time</th>
                <th className="py-3.5 px-4 font-semibold">Seats</th>
                <th className="py-3.5 px-4 font-semibold">Total Amount</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-white">
                    {b.id}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{b.userName}</div>
                    <div className="text-[10px] text-gray-500">{b.userEmail}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-white">{b.movieTitle}</div>
                    <div className="text-[10px] text-gray-400">{b.cinemaName} • {b.hallName}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-400">
                    <div>{formatDate(b.showDate)}</div>
                    <div className="text-[10px] text-gray-500">{b.showTime}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[11px] font-bold">
                      {b.seats.join(', ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-emerald-400">
                    {formatCurrency(b.totalAmount)}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        b.status === 'CONFIRMED'
                          ? 'success'
                          : b.status === 'CANCELLED'
                          ? 'destructive'
                          : 'warning'
                      }
                      size="sm"
                    >
                      {b.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {b.status === 'CONFIRMED' && (
                      <button
                        onClick={() => cancelBooking(b.id)}
                        className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
