import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../services/api';
import { Film } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-105">
        <div className="relative aspect-[2/3]">
          {movie.Poster && movie.Poster !== 'N/A' ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Film size={48} className="text-gray-400" />
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg truncate">{movie.Title}</h3>
          <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
            <span>{movie.Year}</span>
            <span className="capitalize">{movie.Type}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;