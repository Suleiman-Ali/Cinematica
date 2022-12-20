import Content from '../../../components/picture-page/content/content';
import Head from 'next/head';
import { Cast, Picture, Video } from '../../../lib/types';
import { fetchPictureData } from '../../../lib/helpers';

interface getServerSidePropsPropTypes {
  params: { slug: [string, string] };
}
export async function getServerSideProps({
  params: {
    slug: [id, name],
  },
}: getServerSidePropsPropTypes) {
  const props = await fetchPictureData('tv', id);
  if (!props) return { redirect: { destination: '/404' } };
  return { props };
}

interface TvPagePropTypes {
  details: Picture;
  cast: Cast[];
  trailer: Video;
  similar: Picture[];
}
export default function TvPage({
  details,
  cast,
  trailer,
  similar,
}: TvPagePropTypes) {
  const { original_name, overview } = details;
  return (
    <>
      <Head>
        <title>Cinematica | {original_name}</title>
        <meta name="description" content={overview} />
      </Head>
      <Content
        details={details}
        cast={cast}
        trailer={trailer}
        similar={similar}
        link="tv"
      />
    </>
  );
}
