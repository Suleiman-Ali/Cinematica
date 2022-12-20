import api, { endpoint, endPointWithQuery } from './api';
import { Picture } from './types';

export function sortBy(method: string, array: Picture[]) {
  if (method === 'Sort By') return array;
  const arr = [...array];
  if (method === 'Title/AS')
    return arr.sort((a, b) =>
      (a.original_name || a.title).localeCompare(b.original_name || b.title)
    );
  if (method === 'Title/DS')
    return arr
      .sort((a, b) =>
        (a.original_name || a.title).localeCompare(b.original_name || b.title)
      )
      .reverse();
  if (method === 'Rate/AS')
    return arr.sort((a, b) => +a.vote_average - +b.vote_average);
  if (method === 'Rate/DS')
    return arr.sort((a, b) => +b.vote_average - +a.vote_average);
  return array;
}

export function filterBy(method: string, array: Picture[]) {
  if (method === 'Filter By') return array;
  if (method === 'Action')
    return array.filter((pic) => pic.genre_ids.includes(28));
  if (method === 'Comedy')
    return array.filter((pic) => pic.genre_ids.includes(35));
  if (method === 'Thriller')
    return array.filter((pic) => pic.genre_ids.includes(53));
  if (method === 'Drama')
    return array.filter((pic) => pic.genre_ids.includes(18));
  if (method === 'Horror')
    return array.filter((pic) => pic.genre_ids.includes(27));
  return array;
}

export function filterSort(filter: string, sort: string, array: Picture[]) {
  const filtered = filterBy(filter, array);
  const sorted = sortBy(sort, filtered);
  return sorted;
}

export function extractTrailer(array: any[]) {
  return array.find((item) => item.type === 'Trailer');
}

export async function loadPictures(
  category: string,
  type: string,
  index: number
) {
  try {
    const url = endpoint(`/${category}/${type}`, index);
    const newPictures = (await api.get(url)).data.results || [];
    return newPictures;
  } catch (e) {
    return [];
  }
}

export async function loadSearchPictures(
  category: string,
  term: string,
  index: number
) {
  try {
    const url = endPointWithQuery(`/search/${category}/`, term, index);
    const newSearchPictures = (await api.get(url)).data.results || [];
    return newSearchPictures;
  } catch (e) {
    return [];
  }
}

export async function fetchAllPictures() {
  try {
    const allData = await Promise.all([
      api.get(endpoint('/movie/popular')),
      api.get(endpoint('/movie/top_rated')),
      api.get(endpoint('/tv/popular')),
      api.get(endpoint('/tv/top_rated')),
    ]);
    const moviesPopular = allData[0].data.results || [];
    const moviesTopRated = allData[1].data.results || [];
    const tvPopular = allData[2].data.results || [];
    const tvTopRated = allData[3].data.results || [];
    return { moviesPopular, moviesTopRated, tvPopular, tvTopRated };
  } catch (e) {
    return { moviesPopular: [], moviesTopRated: [], tvPopular: [], tvTopRated: [] };
  }
}

export async function fetchPictureData(type: string, id: string) {
  try {
    const allData = await Promise.all([
      api.get(endpoint(`/${type}/${id}`)),
      api.get(endpoint(`/${type}/${id}/credits`)),
      api.get(endpoint(`/${type}/${id}/videos`)),
      api.get(endpoint(`/${type}/${id}/similar`)),
    ]);
    const details = allData[0].data || {};
    const cast = allData[1].data.cast || [];
    const trailers = allData[2].data.results || [];
    const similar = allData[3].data.results || [];
    const trailer = extractTrailer(trailers) || {};
    return { details, cast, trailer, similar };
  } catch (e) {
    return { details: {}, cast: [], trailer: {}, similar: [] };
  }
}

export function hasPosterAndBack({ poster_path, backdrop_path }: Picture) {
  return poster_path && backdrop_path ? true : false;
}

export function getDisplayablePictures(pictures: Picture[]) {
  return pictures.filter((picture) => hasPosterAndBack(picture));
}

export function unique(array: any) {
  const preMap: [number, any][] = array.map((item: any) => [item['id'], item]);
  const uniqueItems = [...new Map(preMap).values()];
  return uniqueItems;
}
