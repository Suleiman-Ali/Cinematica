import Content from '../../../components/picture-page/content/content';
import Head from 'next/head';
import { Cast, Picture, Video } from '../../../lib/types';
import { fetchAllTv, fetchPictureData } from '../../../lib/helpers';

export async function getStaticPaths() {
  const allTv = await fetchAllTv();
  const paths = allTv.map((tv) => ({
    params: { tvId: `${tv.id}` },
  }));
  return { paths, fallback: 'blocking' };
}

interface getStaticPropTypes {
  params: { tvId: string };
}
export async function getStaticProps({ params: { tvId } }: getStaticPropTypes) {
  const props = await fetchPictureData('tv', tvId);
  return { props, revalidate: 1 * 60 * 60 };
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
        <title>Next Entertainment | {original_name}</title>
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
