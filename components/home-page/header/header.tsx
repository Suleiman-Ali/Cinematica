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
  const name = title || original_name;
  const linkName = name.toLowerCase().replaceAll(':', '').replaceAll(' ', '-');
  const fullLink = `/pictures/${type}/${id}/${linkName}`;
  return (
    <div className={styles.header}>
      <Image
        className={styles.header__backgroundImage}
        src={backImageSrc}
        alt={alt}
        fill
        priority
      />
      <div className={styles.header__detailsBox}>
        <div className={styles.header__detailsInnerBox}>
          <h1 className={styles.header__title}>{name}</h1>
          <p className={styles.header__overview}>{overview}</p>
        </div>
        <Link href={fullLink} prefetch={false}>
          <Image
            className={styles.header__poster}
            src={frontImageSrc}
            alt={alt}
            width={400}
            height={400}
            priority
          />
        </Link>
      </div>
    </div>
  );
}
