import api, { endpoint } from '../../lib/api';
import { Picture } from '../../lib/types';

// prettier-ignore
export async function getStaticProps() {
  const moviesTopRated = (await api.get(endpoint('/movie/top_rated'))).data.results;
  return { props: { moviesTopRated } };
}

interface TopRatedMoviesPagePropTypes {
  moviesTopRated: Picture[];
}

export default function TopRatedMoviesPage({
  moviesTopRated,
}: TopRatedMoviesPagePropTypes) {
  return <div>TopRatedMoviesPage</div>;
}
