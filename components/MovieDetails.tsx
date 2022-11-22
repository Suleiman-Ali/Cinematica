import { FaGlobe, FaCalendar, FaClock, FaStar } from 'react-icons/fa';
import styles from './PictureDetails.module.scss';

interface MovieDetailsPropTypes {
  lang: string;
  date: string;
  runtime: number;
  rate: string;
}

export default function MovieDetails({
  lang,
  date,
  runtime,
  rate,
}: MovieDetailsPropTypes) {
  const hour = (runtime / 60).toFixed(0).padStart(2, '0');
  const min = (+('0.' + (runtime / 60 + '').split('.')[1]) * 60)
    .toFixed(0)
    .padStart(2, '0');
  const duration = `${hour}:${min}`;

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
        <FaClock className={styles.pictureDetails__infoIcon} />
        <p className={styles.pictureDetails__infoText}>{duration}</p>
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
