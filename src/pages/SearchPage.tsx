import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { searchMovies, Movie } from '../services/api';
import { Loader2 } from 'lucide-react';

const SearchPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [lastQuery, setLastQuery] = useState('');
  const [lastType, setLastType] = useState('');

  const handleSearch = async (query: string, type: string) => {
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await searchMovies(query, type, 1);
      
      setMovies(data.Search);
      setTotalResults(parseInt(data.totalResults));
      setCurrentPage(1);
      setLastQuery(query);
      setLastType(type);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movies');
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchMovies(lastQuery, lastType, page);
      setMovies(data.Search);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Movie Search</h1>
      <SearchBar onSearch={handleSearch} />
      
      {loading && (
        <div className="flex justify-center mt-8">
          <Loader2 className="animate-spin" size={32} />
        </div>
      )}

      {error && (
        <div className="mt-8 text-center text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalResults / 10)}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {!loading && !error && movies.length === 0 && lastQuery && (
        <div className="mt-8 text-center text-gray-600">
          No movies found for "{lastQuery}"
        </div>
      )}
    </div>
  );
};

export default SearchPage;