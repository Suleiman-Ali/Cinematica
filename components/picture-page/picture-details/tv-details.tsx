import PictureInfo from './picture-info/picture-info';
import Globe from '../../../public/icons/Globe.svg';
import Calendar from '../../../public/icons/Calendar.svg';
import Star from '../../../public/icons/Star.svg';
import Hashtag from '../../../public/icons/Hashtag.svg';
import Asterisk from '../../../public/icons/Asterisk.svg';
import styles from './picture-details.module.scss';

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
  const language = lang.toUpperCase();
  const dateFormatted = date.replaceAll('-', '/');
  const seasonsCount = `S${seasons}`;
  const episodesCount = `E${episodes}`;
  const score = `${(+rate).toFixed(1)}/10`;
  return (
    <div className={styles.pictureDetails}>
      <PictureInfo Icon={Globe} text={language} />
      <PictureInfo Icon={Calendar} text={dateFormatted} />
      <PictureInfo Icon={Hashtag} text={seasonsCount} />
      <PictureInfo Icon={Asterisk} text={episodesCount} />
      <PictureInfo Icon={Star} text={score} />
    </div>
  );
}
