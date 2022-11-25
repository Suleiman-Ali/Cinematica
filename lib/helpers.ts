import api, { endpoint, endPointWithQuery } from './api';
import { Picture } from './types';

// prettier-ignore
function sortBy(method: string, array: Picture[]) {
  if (method === 'Sort By') return array;
  const arr = [...array];
  if (method === 'Title/AS') return arr.sort((a, b) => (a.original_name || a.title).localeCompare(b.original_name || b.title));
  if (method === 'Title/DS') return arr.sort((a, b) => (a.original_name || a.title).localeCompare(b.original_name || b.title)).reverse();
  if (method === 'Rate/AS') return arr.sort((a, b) => +a.vote_average - +b.vote_average);
  if (method === 'Rate/DS') return arr.sort((a, b) => +b.vote_average - +a.vote_average);
  return array;
}

// prettier-ignore
function filterBy(method: string, array: Picture[]) {
    if (method === "All Genres") return array;
    if (method === "Action") return array.filter((pic) => pic.genre_ids.includes(28));
    if (method === "Comedy") return array.filter((pic) => pic.genre_ids.includes(35));
    if (method === "Thriller") return array.filter((pic) => pic.genre_ids.includes(53));
    if (method === "Drama") return array.filter((pic) => pic.genre_ids.includes(18));
    if (method === "Horror") return array.filter((pic) => pic.genre_ids.includes(27));
    return array;
}

export function filterSort(filter: string, sort: string, array: Picture[]) {
  const filtered = filterBy(filter, array);
  const sorted = sortBy(sort, filtered);
  return sorted;
}

export async function loadMorePictures(
  category: string,
  type: string,
  index: number
) {
  const url = endpoint(`/${category}/${type}`, index);
  const newPictures = (await api.get(url)).data.results;
  return newPictures;
}

export async function loadSearchPictures(
  category: string,
  term: string,
  index: number
) {
  const url = endPointWithQuery(`/search/${category}/`, term, index);
  const newSearchPictures = (await api.get(url)).data.results;
  return newSearchPictures;
}
