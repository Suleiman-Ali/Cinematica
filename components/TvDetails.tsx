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
        <FaGlobe className={styles.pictureDetails__infoIcon} />
        <p className={styles.pictureDetails__infoText}>{lang.toUpperCase()}</p>
      </p>
      <p className={styles.pictureDetails__info}>
        <FaCalendar className={styles.pictureDetails__infoIcon} />
        <p className={styles.pictureDetails__infoText}>
          {date.replaceAll('-', '/')}
        </p>
      </p>
      <p className={styles.pictureDetails__info}>
        <FaHashtag className={styles.pictureDetails__infoIcon} />
        <p className={styles.pictureDetails__infoText}>S{seasons}</p>
      </p>
      <p className={styles.pictureDetails__info}>
        <FaAsterisk className={styles.pictureDetails__infoIcon} />
        <p className={styles.pictureDetails__infoText}>E{episodes}</p>
      </p>
      <p className={styles.pictureDetails__info}>
        <FaStar className={styles.pictureDetails__infoIcon} />
        <p className={styles.pictureDetails__infoText}>
          {(+rate).toFixed(1)}/10
        </p>
      </p>
    </div>
  );
}
