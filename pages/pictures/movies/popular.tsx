import Content from '../../../components/pictures-page/content/content';
import Head from 'next/head';
import { Picture } from '../../../lib/types';
import { loadPictures } from '../../../lib/helpers';

export async function getStaticProps() {
  const moviesPopular = await loadPictures('movie', 'popular', 1);
  return { props: { moviesPopular }, revalidate: 60 * 30 };
}

interface PopularMoviesPagePropTypes {
  moviesPopular: Picture[];
}

export default function PopularMoviesPage({
  moviesPopular,
}: PopularMoviesPagePropTypes) {
  return (
    <>
      <Head>
        <title>Next Entertainment | Popular Movies</title>
        <meta
          name="description"
          content="View details of your favorite popular movies."
        />
      </Head>
      <Content
        displayPictures={moviesPopular}
        link="movies"
        type="movie"
        category="popular"
      />
    </>
  );
}
