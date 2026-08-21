import React from 'react';
import { Search, Compass, Sparkles } from 'lucide-react';
import { useMovieStore } from '@/store/movieStore';
import { MovieCard } from '@/components/ui/Card/MovieCard';

export const MoviesPage: React.FC = () => {
  const { movies, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useMovieStore();

  const categories = [
    { id: 'ALL', name: 'All Movies' },
    { id: 'NOW_SHOWING', name: 'Now Showing' },
    { id: 'COMING_SOON', name: 'Coming Soon' },
    { id: 'FEATURED', name: 'Featured' },
  ];

  const filteredMovies = movies.filter((movie) => {
    const matchesCategory =
      selectedCategory === 'ALL' || movie.status === selectedCategory;
    const matchesSearch =
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-20">
      {/* Page Header */}
      <section className="relative bg-gradient-to-b from-[#1a0a0b] via-[#0f0f10] to-[#0f0f10] pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E50914] tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Browse Our Collection
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              MOVIES
            </h1>
            <p className="text-sm text-gray-400 max-w-xl">
              Select a movie to check showtimes and reserve your seats in seconds.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title or genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#18181b] border border-white/10 text-white text-xs rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#E50914] transition-colors placeholder:text-gray-500"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all ${
                    active
                      ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/30'
                      : 'bg-[#18181b] text-gray-400 hover:text-white hover:bg-white/5 border border-white/5'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Movies Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white/5 border border-white/10 rounded-2xl p-8 space-y-3">
            <Compass className="w-10 h-10 text-gray-500 mx-auto animate-pulse" />
            <h3 className="text-base font-bold text-white">No Movies Found</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              We couldn't find any movie matching "{searchQuery}". Try changing your search query or filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
              }}
              className="px-4 py-2 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-white/20"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
