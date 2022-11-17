import api, { endpoint } from '../../lib/api';
import { Picture } from '../../lib/types';

// prettier-ignore
export async function getStaticProps() {
  const moviesPopular = (await api.get(endpoint('/movie/popular'))).data.results;
  return { props: { moviesPopular } };
}

interface PopularMoviesPagePropTypes {
  moviesPopular: Picture[];
}

export default function PopularMoviesPage({
  moviesPopular,
}: PopularMoviesPagePropTypes) {
  return <div>PopularMoviesPagePropTypes</div>;
}
