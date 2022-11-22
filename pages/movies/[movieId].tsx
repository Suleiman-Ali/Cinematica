import api, { endpoint, prefixImgOriginal, prefixVideo } from '../../lib/api';
import { Cast, Genre, Picture, Video } from '../../lib/types';
import Genres from '../../components/Genres';
import Casts from '../../components/Casts';
import MovieDetails from '../../components/MovieDetails';
import BackImage from '../../components/BackImage';
import FrontImage from '../../components/FrontImage';
import Title from '../../components/Title';
import Overview from '../../components/Overview';
import Trailer from '../../components/Trailer';
import SimilarPictures from '../../components/SimilarPictures';
import Footer from '../../components/Footer';
import styles from '../PicturePage.module.scss';

interface getServerSidePropsPropTypes {
  params: { movieId: string };
}
export async function getServerSideProps({
  params: { movieId },
}: getServerSidePropsPropTypes) {
  const allData = await Promise.all([
    api.get(endpoint('/genre/movie/list')),
    api.get(endpoint(`/movie/${movieId}`)),
    api.get(endpoint(`/movie/${movieId}/credits`)),
    api.get(endpoint(`/movie/${movieId}/videos`)),
    api.get(endpoint(`/movie/${movieId}/similar`)),
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

interface MoviePagePropTypes {
  allGenres: Genre[];
  details: Picture;
  cast: Cast[];
  trailer: Video;
  similar: Picture[];
}

export default function MoviePage({
  allGenres,
  details,
  cast,
  trailer,
  similar,
}: MoviePagePropTypes) {
  const {
    title,
    genres,
    release_date,
    original_language,
    runtime,
    overview,
    backdrop_path,
    poster_path,
    vote_average,
  } = details;
  const backImage = prefixImgOriginal(backdrop_path);
  const posterImage = prefixImgOriginal(poster_path);
  const movieGenres = allGenres.filter((g1) =>
    genres.find((g2) => g1.id === g2.id)
  );
  const movieCast = cast.slice(0, 6);

  return (
    <div className={styles.picturePage}>
      <BackImage src={backImage} alt={title} />

      <div className={styles.picturePage__outerBox}>
        <FrontImage src={posterImage} alt={title} />

        <div className={styles.picturePage__innerBox}>
          <Title text={title} />

          <div className={styles.picturePage__details}>
            <Genres genres={movieGenres} />
            <MovieDetails
              lang={original_language}
              date={release_date}
              runtime={runtime}
              rate={vote_average}
            />
            <Overview text={overview} />
          </div>

          <Casts casts={movieCast} />
        </div>
      </div>

      {trailer && <Trailer video={trailer} />}
      {similar && <SimilarPictures pictures={similar} pictureLink="/movies" />}
    </div>
  );
}
