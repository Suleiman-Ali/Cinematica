export type Genre = { id: number; name: string };

export type Picture = {
  genre_ids: number[];
  genres: Genre[];
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  original_name: string;
  original_language: string;
  status: string;
  vote_average: string;
  release_date: string;
  id: number;
  runtime: number;
  number_of_seasons: number;
  number_of_episodes: number;
  first_air_date: string;
};

export type Cast = {
  id: number;
  character: string;
  original_name: string;
  profile_path: string;
};

export type Video = {
  id: string;
  key: string;
  name: string;
  type: string;
};

export type PicturesType = {
  pictures: Picture[];
  index: number;
  term: string;
  sort: string;
  genre: string;
  isCanLoadMore: boolean;
};
