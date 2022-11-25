import Link from 'next/link';
import Image from 'next/image';
import { Picture } from '../lib/types';
import { prefixImgOriginal } from '../lib/api';
import styles from './PictureItem.module.scss';

interface PictureItemPropTypes {
  picture: Picture;
  link: string;
}

export default function PictureItem({ picture, link }: PictureItemPropTypes) {
  const { id, poster_path, title, vote_average, original_name } = picture;
  const imageSrc = prefixImgOriginal(poster_path);
  const fullLink = `${link}/${id}`;
  const alt = `Image number ${id}`;

  return (
    <Link href={fullLink} className={styles.pictureItem}>
      <Image
        src={imageSrc}
        alt={alt}
        width={300}
        height={300}
        className={styles.pictureItem__img}
      />
    </Link>
  );
}
