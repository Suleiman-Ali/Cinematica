import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export const endpoint = (endPoint: string, page: number = 1): string =>
  `${endPoint}?api_key=${process.env.apiKey}&page=${page}`;
