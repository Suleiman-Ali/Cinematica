import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export const endpoint = (endPoint: string, page: number = 1): string =>
  `${endPoint}?api_key=${process.env.apiKey}&page=${page}`;

export const prefixImgOriginal = (path: string): string =>
  `https://image.tmdb.org/t/p/original/${path}`;

export const prefixVideo = (path: string): string =>
  `https://www.youtube.com/embed/${path}`;
