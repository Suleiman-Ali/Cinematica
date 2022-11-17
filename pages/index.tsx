import api, { endpoint } from '../lib/api';
import { Picture } from '../lib/types';

// prettier-ignore
export async function getStaticProps() {
  const moviesPopular = (await api.get(endpoint('/movie/popular'))).data.results;
  const moviesTopRated = (await api.get(endpoint('/movie/top_rated'))).data.results;
  const  tvPopular  = (await api.get(endpoint('/tv/popular'))).data.results;
  const  tvTopRated  = (await api.get(endpoint('/tv/top_rated'))).data.results;
  return { props: { moviesPopular, moviesTopRated, tvPopular, tvTopRated } };
}

interface HomePagePropTypes {
  moviesPopular: Picture[];
  moviesTopRated: Picture[];
  tvPopular: Picture[];
  tvTopRated: Picture[];
}

export default function HomePage({
  moviesPopular,
  moviesTopRated,
  tvPopular,
  tvTopRated,
}: HomePagePropTypes) {
  return <div>HomePage</div>;
}
