import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export const endpoint = (endPoint: string, page: number = 1): string =>
  `${endPoint}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`;

export const prefixBackImg = (path: string): string =>
  `https://image.tmdb.org/t/p/original${path}`;

export const prefixPosterImg = (path: string) =>
  `https://image.tmdb.org/t/p/w342${path}`;

export const prefixCastImg = (path: string) =>
  `https://image.tmdb.org/t/p/w200${path}`;

export const prefixVideo = (path: string): string =>
  `https://www.youtube.com/embed/${path}`;

export const endPointWithQuery = (
  ep: string,
  query: string,
  page: number = 1
): string =>
  `${ep}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${query}&page=${page}`;
