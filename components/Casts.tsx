import Image from 'next/image';
import { prefixImgOriginal } from '../lib/api';
import { Cast } from '../lib/types';
import styles from './Casts.module.scss';

interface CastsPropTypes {
  casts: Cast[];
}

export default function Casts({ casts }: CastsPropTypes) {
  return (
    <div className={styles.casts}>
      {casts.map(({ id, character, original_name, profile_path }) => (
        <div className={styles.casts__cast} key={id}>
          <Image
            src={prefixImgOriginal(profile_path)}
            className={styles.casts__castImage}
            alt={original_name}
            width={200}
            height={200}
          />
          <p className={styles.casts__castName}>{original_name}</p>
        </div>
      ))}
    </div>
  );
}
