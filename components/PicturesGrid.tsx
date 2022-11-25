import { Picture } from '../lib/types';
import PictureItem from './PictureItem';
import styles from './PicturesGrid.module.scss';

interface PicturesGridPropTypes {
  pictures: Picture[];
  link: string;
}

export default function PicturesGrid({
  pictures,
  link,
}: PicturesGridPropTypes) {
  return (
    <div className={styles.picturesGrid}>
      {pictures.map((picture) => (
        <PictureItem key={picture.id} picture={picture} link={link} />
      ))}
    </div>
  );
}
