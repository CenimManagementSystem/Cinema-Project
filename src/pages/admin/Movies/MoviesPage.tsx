import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  Clock,
} from 'lucide-react';
import { useMovieStore } from '@/store/movieStore';
import { Movie } from '@/types/movie';
import { Badge } from '@/components/ui/Badge/Badge';
import { Modal } from '@/components/ui/Modal/Modal';
import { MovieForm } from '@/components/forms/MovieForm/MovieForm';
import { formatCurrency, formatDuration } from '@/utils/formatDate';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' as const } }
};

export const MoviesPage: React.FC = () => {
  const { movies, addMovie, updateMovie, deleteMovie } = useMovieStore();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  const filteredMovies = movies.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.genres.some((g) => g.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus =
      filterStatus === 'ALL' || m.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateNew = () => {
    setEditingMovie(null);
    setModalOpen(true);
  };

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
    setModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove "${title}" from the catalog?`)) {
      deleteMovie(id);
    }
  };

  const handleFormSubmit = (data: Omit<Movie, 'id' | 'slug'>) => {
    if (editingMovie) {
      updateMovie(editingMovie.id, data);
    } else {
      addMovie(data);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            Movie Catalog Management
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage movie metadata, posters, ratings, and theater showtime links
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#ff1f2d] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#E50914]/30"
        >
          <Plus className="w-4 h-4" />
          Add New Movie
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#141417] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search catalog by title or genre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1c1c20] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#E50914]"
          />
        </div>

        {/* Filter by Status */}
        <div className="flex items-center gap-2">
          {['ALL', 'NOW_SHOWING', 'COMING_SOON', 'FEATURED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                filterStatus === status
                  ? 'bg-[#E50914] text-white'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Movies Table */}
      <div className="rounded-2xl bg-[#141417] border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-[#18181c] text-gray-400 uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Movie</th>
                <th className="py-3.5 px-4 font-semibold">Rating</th>
                <th className="py-3.5 px-4 font-semibold">Duration</th>
                <th className="py-3.5 px-4 font-semibold">Base Price</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <motion.tbody 
              key={filterStatus + search}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="divide-y divide-white/5 text-gray-300"
            >
              {filteredMovies.map((movie) => (
                <motion.tr 
                  key={movie.id} 
                  variants={itemVariants}
                  className="hover:bg-white/5 transition-colors"
                >
                  {/* Poster & Title */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-10 h-14 object-cover rounded-lg bg-zinc-800 border border-white/10 shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-white text-sm">{movie.title}</h4>
                        <p className="text-[11px] text-gray-400">{movie.genres.join(', ')}</p>
                        <p className="text-[10px] text-gray-500">Dir: {movie.director}</p>
                      </div>
                    </div>
                  </td>

                  {/* Rating */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 font-bold text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{movie.rating.toFixed(1)}</span>
                    </div>
                  </td>

                  {/* Duration */}
                  <td className="py-3 px-4 text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      <span>{formatDuration(movie.durationMinutes)}</span>
                    </div>
                  </td>

                  {/* Base Price */}
                  <td className="py-3 px-4 font-bold text-white">
                    {formatCurrency(movie.price)}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        movie.status === 'FEATURED'
                          ? 'primary'
                          : movie.status === 'NOW_SHOWING'
                          ? 'warning'
                          : 'secondary'
                      }
                      size="sm"
                    >
                      {movie.status.replace('_', ' ')}
                    </Badge>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(movie)}
                        title="Edit movie"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(movie.id, movie.title)}
                        title="Delete movie"
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add / Edit */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="xl"
        title={editingMovie ? `Edit Movie: ${editingMovie.title}` : 'Add New Movie to Catalog'}
      >
        <MovieForm
          initialMovie={editingMovie}
          onSubmit={handleFormSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
