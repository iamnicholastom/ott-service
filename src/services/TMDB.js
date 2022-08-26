import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const page = 1;

export const tmdbApi = createApi({
  reducerPath: 'tmbdApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => `movie/popular?api_key=${tmdbApiKey}&page=${page}`,
    }),
    getGenres: builder.query({
      query: ({ genreIdorCategoryName, page }) => {
        if (genreIdorCategoryName && typeof genreIdorCategoryName === 'string') {
          return `movie/${genreIdorCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        if (genreIdorCategoryName && typeof genreIdorCategoryName === 'number') {
          return `discover/movie?with_genres=${genreIdorCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        return `genre/movie/list?api_key=${tmdbApiKey}`;
      },
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery } = tmdbApi;
