import Content from '../../../components/picture-page/content/content';
import Head from 'next/head';
import { Cast, Picture, Video } from '../../../lib/types';
import { fetchPictureData } from '../../../lib/helpers';

interface getServerSidePropsPropTypes {
  params: { movieId: string };
}
export async function getServerSideProps({
  params: { movieId },
}: getServerSidePropsPropTypes) {
  const props = await fetchPictureData('movie', movieId);
  if (!props) return { redirect: { destination: '/404' } };
  return { props };
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
