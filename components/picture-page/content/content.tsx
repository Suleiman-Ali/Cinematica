import BackImage from '../back-image/back-image';
import Casts from '../casts/casts';
import FrontImage from '../front-image/front-image';
import Genres from '../genres/genres';
import Overview from '../overview/overview';
import MovieDetails from '../picture-details/movie-details';
import TvDetails from '../picture-details/tv-details';
import SimilarPictures from '../similar-pictures/similar-pictures';
import Title from '../title/title';
import Trailer from '../trailer/trailer';
import styles from './content.module.scss';
import { prefixBackImg, prefixPosterImg } from '../../../lib/api';
import { Picture, Cast, Video } from '../../../lib/types';

interface ContentPropTypes {
  details: Picture;
  cast: Cast[];
  trailer: Video;
  similar: Picture[];
  link: 'movies' | 'tv';
}

export default function Content({
  details,
  cast,
  trailer,
  similar,
  link,
}: ContentPropTypes) {
  const {
    title,
    release_date,
    runtime,
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
  const backImage = prefixBackImg(backdrop_path);
  const posterImage = prefixPosterImg(poster_path);
  const casts = cast.slice(0, 6);
  const name = title || original_name;
  const isTv = link === 'tv';
  const isMovie = link === 'movies';
  const isGenres = genres.length > 0;
  const isCasts = casts.length > 0;
  const isSimilar = similar.length > 0;
  const isTrailer = trailer.key ? true : false;

  return (
    <div className={styles.picturePage}>
      <BackImage src={backImage} alt={name} />
      <div className={styles.picturePage__outerBox}>
        <FrontImage src={posterImage} alt={name} />
        <div className={styles.picturePage__innerBox}>
          <Title text={name} />
          <div className={styles.picturePage__details}>
            {isGenres && <Genres genres={genres} />}
            {isMovie && (
              <MovieDetails
                lang={original_language}
                date={release_date}
                runtime={runtime}
                rate={vote_average}
              />
            )}
            {isTv && (
              <TvDetails
                lang={original_language}
                date={first_air_date}
                rate={vote_average}
                seasons={number_of_seasons}
                episodes={number_of_episodes}
              />
            )}
            <Overview text={overview} />
          </div>
          {isCasts && <Casts casts={casts} />}
        </div>
      </div>
      {isTrailer && <Trailer video={trailer} />}
      {isSimilar && <SimilarPictures pictures={similar} pictureLink={link} />}
    </div>
  );
}
