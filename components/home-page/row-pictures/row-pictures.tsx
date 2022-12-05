import PictureItem from '../../distributed/picture-item/picture-item';
import Link from 'next/link';
import Eye from '../../../public/icons/Eye.svg';
import styles from './row-pictures.module.scss';
import { Picture } from '../../../lib/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { hasPosterAndBack, unique } from '../../../lib/helpers';
import 'swiper/css';

interface RowPicturesPropTypes {
  rowHeading: string;
  pictures: Picture[];
  link: string;
  pictureLink: string;
  Icon: any;
}

export default function RowPictures({
  pictures,
  rowHeading,
  link,
  pictureLink,
  Icon,
}: RowPicturesPropTypes) {
  if (pictures.length === 0) return null;
  const uniquePictures = unique(pictures);
  return (
    <div className={styles.rowPictures}>
      <div className={styles.rowPictures__box}>
        <p className={styles.rowPictures__heading}>
          {rowHeading} <Icon />
        </p>
        <Link href={link} className={styles.rowPictures__link}>
          See <Eye /> More
        </Link>
      </div>
      <Swiper
        slidesPerView="auto"
        className={`mySwiper ${styles.rowPictures__rowBox}`}
        tag="div"
      >
        {uniquePictures.map(
          (picture) =>
            hasPosterAndBack(picture) && (
              <SwiperSlide
                key={picture.id}
                className={styles.rowPictures__rowItem}
              >
                <PictureItem picture={picture} link={pictureLink} />
              </SwiperSlide>
            )
        )}
      </Swiper>
    </div>
  );
}
