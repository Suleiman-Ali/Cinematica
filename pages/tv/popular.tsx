import api, { endpoint } from '../../lib/api';
import { Picture } from '../../lib/types';

// prettier-ignore
export async function getStaticProps() {
  const  tvPopular  = (await api.get(endpoint('/tv/popular'))).data.results;
  return { props: { tvPopular } };
}

interface PopularTvPagePropTypes {
  tvPopular: Picture[];
}

export default function PopularTvPage({ tvPopular }: PopularTvPagePropTypes) {
  return <div>PopularTvPage</div>;
}
