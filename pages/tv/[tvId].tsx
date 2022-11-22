import api, { endpoint, prefixImgOriginal, prefixVideo } from '../../lib/api';
import { Cast, Genre, Picture, Video } from '../../lib/types';
import Genres from '../../components/Genres';
import Casts from '../../components/Casts';
import BackImage from '../../components/BackImage';
import FrontImage from '../../components/FrontImage';
import Title from '../../components/Title';
import Overview from '../../components/Overview';
import Trailer from '../../components/Trailer';
import SimilarPictures from '../../components/SimilarPictures';
import Footer from '../../components/Footer';
import TvDetails from '../../components/TvDetails';
import styles from '../PicturePage.module.scss';

interface getServerSidePropsPropTypes {
  params: { tvId: string };
}
export async function getServerSideProps({
  params: { tvId },
}: getServerSidePropsPropTypes) {
  const allData = await Promise.all([
    api.get(endpoint('/genre/tv/list')),
    api.get(endpoint(`/tv/${tvId}`)),
    api.get(endpoint(`/tv/${tvId}/credits`)),
    api.get(endpoint(`/tv/${tvId}/videos`)),
    api.get(endpoint(`/tv/${tvId}/similar`)),
  ]);
  const allGenres = allData[0].data.genres;
  const details = allData[1].data;
  const cast = allData[2].data.cast;
  const trailer = allData[3].data.results.find(
    (item: any) => item.type === 'Trailer'
  );
  const similar = allData[4].data.results;
  return { props: { allGenres, details, cast, trailer, similar } };
}

interface TvPagePropTypes {
  allGenres: Genre[];
  details: Picture;
  cast: Cast[];
  trailer: Video;
  similar: Picture[];
}

export default function TvPage({
  allGenres,
  details,
  cast,
  trailer,
  similar,
}: TvPagePropTypes) {
  const {
    original_name,
    genres,
    original_language,
    first_air_date,
    number_of_seasons,
    number_of_episodes,
    overview,
    backdrop_path,
    poster_path,
    vote_average,
  } = details;
  const backImage = prefixImgOriginal(backdrop_path);
  const posterImage = prefixImgOriginal(poster_path);
  const tvGenres = allGenres.filter((g1) =>
    genres.find((g2) => g1.id === g2.id)
  );
  const tvCast = cast.slice(0, 6);

  return (
    <div className={styles.picturePage}>
      <BackImage src={backImage} alt={original_name} />

      <div className={styles.picturePage__outerBox}>
        <FrontImage src={posterImage} alt={original_name} />

        <div className={styles.picturePage__innerBox}>
          <Title text={original_name} />

          <div className={styles.picturePage__details}>
            <Genres genres={tvGenres} />
            <TvDetails
              lang={original_language}
              date={first_air_date}
              rate={vote_average}
              seasons={number_of_seasons}
              episodes={number_of_episodes}
            />
            <Overview text={overview} />
          </div>

          <Casts casts={tvCast} />
        </div>
      </div>

      {trailer && <Trailer video={trailer} />}
      {similar && <SimilarPictures pictures={similar} pictureLink="/tv" />}
    </div>
  );
}
