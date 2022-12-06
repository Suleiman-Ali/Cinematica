import Image from 'next/image';
import styles from './casts.module.scss';
import { prefixCastImg } from '../../../lib/api';
import { Cast } from '../../../lib/types';
import { unique } from '../../../lib/helpers';

interface CastsPropTypes {
  casts: Cast[];
}

export default function Casts({ casts }: CastsPropTypes) {
  const uniqueCasts = unique(casts);
  return (
    <div className={styles.casts}>
      {uniqueCasts.map(
        ({ id, original_name, profile_path }) =>
          profile_path && (
            <div className={styles.casts__cast} key={id}>
              <Image
                src={prefixCastImg(profile_path)}
                className={styles.casts__castImage}
                alt={original_name}
                width={200}
                height={200}
                priority
              />
              <p className={styles.casts__castName}>{original_name}</p>
            </div>
          )
      )}
    </div>
  );
}
