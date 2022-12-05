import PictureItem from '../../distributed/picture-item/picture-item';
import styles from './pictures-grid.module.scss';
import { Picture } from '../../../lib/types';
import { hasPosterAndBack, unique } from '../../../lib/helpers';

interface PicturesGridPropTypes {
  pictures: Picture[];
  link: string;
}

export default function PicturesGrid({
  pictures,
  link,
}: PicturesGridPropTypes) {
  const uniquePictures = unique(pictures);
  return (
    <div className={styles.picturesGrid}>
      {uniquePictures.map(
        (picture) =>
          hasPosterAndBack(picture) && (
            <PictureItem key={picture.id} picture={picture} link={link} />
          )
      )}
    </div>
  );
}
