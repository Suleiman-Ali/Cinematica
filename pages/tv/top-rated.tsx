import api, { endpoint } from '../../lib/api';
import { Picture } from '../../lib/types';

// prettier-ignore
export async function getStaticProps() {
  const  tvTopRated  = (await api.get(endpoint('/tv/top_rated'))).data.results;
  return { props: { tvTopRated } };
}

interface TopRatedTvPagePropTypes {
  tvTopRated: Picture[];
}

export default function TopRatedTvPage({
  tvTopRated,
}: TopRatedTvPagePropTypes) {
  return <div>TopRatedTvPage</div>;
}
