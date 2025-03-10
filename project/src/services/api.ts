import axios from 'axios';

const API_KEY = '8a00c4a'; // OMDB API key
const BASE_URL = 'https://www.omdbapi.com/';

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export interface MovieDetails extends Movie {
  Plot: string;
  Genre: string;
  Director: string;
  Actors: string;
  imdbRating: string;
  Runtime: string;
  Awards: string;
  Language: string;
  Country: string;
  Rated: string;
  Released: string;
  Writer: string;
  Ratings: Array<{ Source: string; Value: string }>;
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export const searchMovies = async (query: string, type: string, page: number = 1) => {
  if (!query.trim()) {
    return {
      Response: 'False',
      Error: 'Please enter a search term'
    };
  }

  try {
    const response = await axios.get<SearchResponse>(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: query.trim(),
        type: type || undefined,
        page,
      },
    });

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error || 'No results found');
    }

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch movies');
  }
};

export const getMovieDetails = async (imdbID: string) => {
  if (!imdbID) {
    throw new Error('Movie ID is required');
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: imdbID,
        plot: 'full',
      },
    });

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error || 'Movie not found');
    }

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch movie details');
  }
};