import Link from 'next/link';
import Image from 'next/image';
import styles from './picture-item.module.scss';
import { Picture } from '../../../lib/types';
import { prefixPosterImg } from '../../../lib/api';

interface PictureItemPropTypes {
  picture: Picture;
  link: string;
  replace?: boolean;
  index?: number;
}

export default function PictureItem({
  picture,
  link,
  replace = false,
  index,
}: PictureItemPropTypes) {
  const { id, poster_path, title, original_name } = picture;
  const imageSrc = prefixPosterImg(poster_path);
  const name = (title || original_name)
    .toLowerCase()
    .replaceAll(':', '')
    .replaceAll(' ', '-');
  const fullLink = `/pictures/${link}/${id}/${name}`;
  const alt = `Image number ${id}`;
  const isPriority = typeof index === 'number' && index < 12 ? true : false;
  return (
    <Link
      href={fullLink}
      className={styles.pictureItem}
      replace={replace}
      prefetch={false}
    >
      <Image
        src={imageSrc}
        alt={alt}
        width={300}
        height={300}
        className={styles.pictureItem__img}
        priority={isPriority}
      />
    </Link>
  );
}
