import styles from './Trailer.module.scss';
import { prefixVideo } from '../lib/api';
import { Video } from '../lib/types';

interface TrailerPropTypes {
  video: Video;
}

export default function Trailer({ video }: TrailerPropTypes) {
  const { key } = video;
  return (
    <div className={styles.trailer}>
      <iframe
        className={styles.trailer__video}
        src={prefixVideo(key)}
        title={key}
      />
    </div>
  );
}
