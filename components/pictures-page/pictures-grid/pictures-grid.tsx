import PictureItem from '../../distributed/picture-item/picture-item';
import styles from './pictures-grid.module.scss';
import { Picture } from '../../../lib/types';
import { hasPosterAndBack } from '../../../lib/helpers';

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
      {pictures.map(
        (picture) =>
          hasPosterAndBack(picture) && (
            <PictureItem key={picture.id} picture={picture} link={link} />
          )
      )}
    </div>
  );
}
