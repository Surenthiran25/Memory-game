import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails, MovieDetails } from '../services/api';
import { Film, Star, Clock, Calendar, Award, Globe, Users, Video, ArrowLeft } from 'lucide-react';

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(id!);
        if (data.Response === 'False') {
          setError(data.Error || 'Movie not found');
        } else {
          setMovie(data);
        }
      } catch (err) {
        setError('Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-600">
        {error || 'Movie not found'}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Search
      </Link>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 relative">
            {movie.Poster && movie.Poster !== 'N/A' ? (
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full min-h-[400px] bg-gray-200 flex items-center justify-center">
                <Film size={64} className="text-gray-400" />
              </div>
            )}
            {movie.Rated && (
              <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full">
                {movie.Rated}
              </div>
            )}
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
            <p className="text-gray-600 mb-4">{movie.Released}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500" />
                <span>{movie.imdbRating} / 10</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock />
                <span>{movie.Runtime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe />
                <span>{movie.Language}</span>
              </div>
              <div className="flex items-center gap-2">
                <Video />
                <span className="capitalize">{movie.Type}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Plot</h2>
                <p className="text-gray-700 leading-relaxed">{movie.Plot}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Genre</h2>
                <div className="flex flex-wrap gap-2">
                  {movie.Genre.split(', ').map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {movie.Awards !== 'N/A' && (
                <div className="flex items-start gap-2 bg-yellow-50 p-4 rounded-lg">
                  <Award className="text-yellow-600 flex-shrink-0 mt-1" />
                  <p className="text-yellow-800">{movie.Awards}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Cast</h2>
                  <div className="flex items-start gap-2">
                    <Users className="flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{movie.Actors}</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">Director</h2>
                  <p className="text-gray-700">{movie.Director}</p>
                </div>
              </div>

              {movie.Ratings && movie.Ratings.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Ratings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {movie.Ratings.map((rating) => (
                      <div key={rating.Source} className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">{rating.Source}</p>
                        <p className="text-lg font-semibold">{rating.Value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;