import Content from '../../../components/pictures-page/content/content';
import Head from 'next/head';
import { Picture } from '../../../lib/types';
import { loadPictures } from '../../../lib/helpers';

export async function getStaticProps() {
  const tvPopular = await loadPictures('tv', 'popular', 1);
  return { props: { tvPopular }, revalidate: 60 * 30 };
}

interface PopularTvPagePropTypes {
  tvPopular: Picture[];
}

export default function PopularTvPage({ tvPopular }: PopularTvPagePropTypes) {
  return (
    <>
      <Head>
        <title>Cinematica | Popular Tv</title>
        <meta
          name="description"
          content="View details of your favorite popular tv shows."
        />
      </Head>
      <Content
        displayPictures={tvPopular}
        link="tv"
        type="tv"
        category="popular"
      />
    </>
  );
}
