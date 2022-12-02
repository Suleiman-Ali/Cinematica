import Content from '../../../components/picture-page/content/content';
import Head from 'next/head';
import { Cast, Picture, Video } from '../../../lib/types';
import { fetchAllMovies, fetchPictureData } from '../../../lib/helpers';

export async function getStaticPaths() {
  const allMovies = await fetchAllMovies();
  const paths = allMovies.map((movie) => ({
    params: { movieId: `${movie.id}` },
  }));
  return { paths, fallback: 'blocking' };
}

interface getStaticPropsPropTypes {
  params: { movieId: string };
}
export async function getStaticProps({
  params: { movieId },
}: getStaticPropsPropTypes) {
  const props = await fetchPictureData('movie', movieId);
  return { props, revalidate: 1 * 60 * 60 };
}

interface MoviePagePropTypes {
  details: Picture;
  cast: Cast[];
  trailer: Video;
  similar: Picture[];
}
export default function MoviePage({
  details,
  cast,
  trailer,
  similar,
}: MoviePagePropTypes) {
  const { title, overview } = details;

  return (
    <>
      <Head>
        <title>Next Entertainment | {title}</title>
        <meta name="description" content={overview} />
      </Head>
      <Content
        details={details}
        cast={cast}
        trailer={trailer}
        similar={similar}
        link="movies"
      />
    </>
  );
}
