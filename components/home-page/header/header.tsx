import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.scss';
import { prefixBackImg, prefixPosterImg } from '../../../lib/api';
import { Picture } from '../../../lib/types';

interface HeaderPropTypes {
  picture: Picture;
  type: string;
}

export default function Header({ picture, type }: HeaderPropTypes) {
  const { id, backdrop_path, title, overview, poster_path, original_name } =
    picture;
  const backImageSrc = prefixBackImg(backdrop_path);
  const frontImageSrc = prefixPosterImg(poster_path);
  const alt = `${id}`;

  return (
    <div className={styles.header}>
      <div className={styles.header__backgroundBox}>
        <Image
          className={styles.header__backgroundImage}
          src={backImageSrc}
          alt={alt}
          width={1500}
          height={1000}
        />
      </div>
      <div className={styles.header__detailsBox}>
        <div className={styles.header__detailsInnerBox}>
          <h1 className={styles.header__title}>{title || original_name}</h1>
          <p className={styles.header__overview}>{overview}</p>
        </div>
        <Link href={`/pictures/${type}/${id}`}>
          <Image
            className={styles.header__poster}
            src={frontImageSrc}
            alt={alt}
            width={300}
            height={300}
          />
        </Link>
      </div>
    </div>
  );
}
