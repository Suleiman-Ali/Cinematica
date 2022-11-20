import Image from 'next/image';
import Link from 'next/link';
import { prefixImgOriginal } from '../lib/api';
import { Picture } from '../lib/types';
import styles from './Header.module.scss';

interface HeaderPropTypes {
  picture: Picture;
}

export default function Header({ picture }: HeaderPropTypes) {
  const { id, backdrop_path, title, overview, poster_path } = picture;

  return (
    <div className={styles.header}>
      <div className={styles.header__backgroundBox}>
        <Image
          className={styles.header__backgroundImage}
          src={prefixImgOriginal(backdrop_path)}
          alt={id + ''}
          width={1500}
          height={1000}
        />
      </div>
      <div className={styles.header__detailsBox}>
        <div className={styles.header__detailsInnerBox}>
          <h1 className={styles.header__title}>{title}</h1>
          <p className={styles.header__overview}>{overview}</p>
        </div>
        <Link href={`/movies/${id}`}>
          <Image
            className={styles.header__poster}
            src={prefixImgOriginal(poster_path)}
            alt={id + ''}
            width={600}
            height={600}
          />
        </Link>
      </div>
    </div>
  );
}
