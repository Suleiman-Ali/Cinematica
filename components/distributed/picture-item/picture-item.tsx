import Link from 'next/link';
import Image from 'next/image';
import styles from './picture-item.module.scss';
import { Picture } from '../../../lib/types';
import { prefixPosterImg } from '../../../lib/api';

interface PictureItemPropTypes {
  picture: Picture;
  link: string;
  replace?: boolean;
}

export default function PictureItem({
  picture,
  link,
  replace = false,
}: PictureItemPropTypes) {
  const { id, poster_path } = picture;
  const imageSrc = prefixPosterImg(poster_path);
  const fullLink = `/pictures/${link}/${id}`;
  const alt = `Image number ${id}`;
  return (
    <Link href={fullLink} className={styles.pictureItem} replace={replace}>
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
