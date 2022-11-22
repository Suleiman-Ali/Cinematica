import {
  FaGlobe,
  FaCalendar,
  FaStar,
  FaHashtag,
  FaAsterisk,
} from 'react-icons/fa';
import styles from './PictureDetails.module.scss';

interface TvDetailsPropTypes {
  lang: string;
  date: string;
  seasons: number;
  episodes: number;
  rate: string;
}

export default function TvDetails({
  lang,
  date,
  rate,
  episodes,
  seasons,
}: TvDetailsPropTypes) {
  return (
    <div className={styles.pictureDetails}>
      <p className={styles.pictureDetails__info}>
        <FaGlobe />
        {lang.toUpperCase()}
      </p>
      <p className={styles.pictureDetails__info}>
        <FaCalendar />
        {date.replaceAll('-', '/')}
      </p>
      <p className={styles.pictureDetails__info}>
        <FaHashtag />S{seasons}
      </p>
      <p className={styles.pictureDetails__info}>
        <FaAsterisk />E{episodes}
      </p>
      <p className={styles.pictureDetails__info}>
        <FaStar />
        {(+rate).toFixed(1)}/10
      </p>
    </div>
  );
}
