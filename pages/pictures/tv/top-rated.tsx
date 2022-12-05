import Content from '../../../components/pictures-page/content/content';
import Head from 'next/head';
import { Picture } from '../../../lib/types';
import { loadPictures } from '../../../lib/helpers';

export async function getStaticProps() {
  const tvTopRated = await loadPictures('tv', 'top_rated', 1);
  return { props: { tvTopRated }, revalidate: 60 * 30 };
}

interface TopRatedTvPagePropTypes {
  tvTopRated: Picture[];
}

export default function TopRatedTvPage({
  tvTopRated,
}: TopRatedTvPagePropTypes) {
  return (
    <>
      <Head>
        <title>Next Entertainment | Top Rated Tv</title>
        <meta
          name="description"
          content="View details of your favorite top-rated tv shows."
        />
      </Head>
      <Content
        displayPictures={tvTopRated}
        link="tv"
        type="tv"
        category="top_rated"
      />
    </>
  );
}
