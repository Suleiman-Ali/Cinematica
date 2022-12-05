import styles from './trailer.module.scss';
import { prefixVideo } from '../../../lib/api';
import { Video } from '../../../lib/types';

interface TrailerPropTypes {
  video: Video;
}

export default function Trailer({ video }: TrailerPropTypes) {
  const { key } = video;
  const src = prefixVideo(key);
  return (
    <div className={styles.trailer}>
      <iframe
        className={styles.trailer__video}
        src={src}
        title={key}
        key={key}
      />
    </div>
  );
}
