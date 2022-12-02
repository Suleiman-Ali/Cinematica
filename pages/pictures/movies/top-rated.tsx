import Content from '../../../components/pictures-page/content/content';
import Head from 'next/head';
import { Picture } from '../../../lib/types';
import { loadPictures } from '../../../lib/helpers';

export async function getStaticProps() {
  const moviesTopRated = await loadPictures('movie', 'top_rated', 1);
  return { props: { moviesTopRated }, revalidate: 60 * 60 * 1 };
}

interface TopRatedMoviesPagePropTypes {
  moviesTopRated: Picture[];
}

export default function TopRatedMoviesPage({
  moviesTopRated,
}: TopRatedMoviesPagePropTypes) {
  return (
    <>
      <Head>
        <title>Next Entertainment | Top Rated Movies</title>
        <meta
          name="description"
          content="View details of your favorite top-rated movies."
        />
      </Head>
      <Content
        displayPictures={moviesTopRated}
        link="movies"
        type="movie"
        category="top_rated"
      />
    </>
  );
}
