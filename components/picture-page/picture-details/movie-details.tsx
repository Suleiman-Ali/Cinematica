import PictureInfo from './picture-info/picture-info';
import Globe from '../../../public/icons/Globe.svg';
import Calendar from '../../../public/icons/Calendar.svg';
import Clock from '../../../public/icons/Clock.svg';
import Star from '../../../public/icons/Star.svg';
import styles from './picture-details.module.scss';

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
  const language = lang.toUpperCase();
  const dateFormatted = date.replaceAll('-', '/');
  const score = `${(+rate).toFixed(1)}/10`;
  return (
    <div className={styles.pictureDetails}>
      <PictureInfo Icon={Globe} text={language} />
      <PictureInfo Icon={Calendar} text={dateFormatted} />
      <PictureInfo Icon={Clock} text={duration} />
      <PictureInfo Icon={Star} text={score} />
    </div>
  );
}
