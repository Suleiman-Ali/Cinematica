import Link from 'next/link';
import { Picture } from '../lib/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import PictureItem from './PictureItem';
import { FaFilm } from 'react-icons/fa';
import styles from './RowPictures.module.scss';

interface RowPicturesPropTypes {
  rowHeading: string;
  pictures: Picture[];
  link: string;
  pictureLink: string;
}

export default function RowPictures({
  pictures,
  rowHeading,
  link,
  pictureLink,
}: RowPicturesPropTypes) {
  return (
    <div className={styles.rowPictures}>
      <div className={styles.rowPictures__box}>
        <p className={styles.rowPictures__heading}>{rowHeading}</p>
        <Link href={link} className={styles.rowPictures__link}>
          <FaFilm />
        </Link>
      </div>

      <Swiper
        slidesPerView={'auto'}
        className={`mySwiper ${styles.rowPictures__rowBox}`}
        tag="div"
      >
        {pictures.map((picture) => (
          <SwiperSlide key={picture.id} className={styles.rowPictures__rowItem}>
            <PictureItem picture={picture} link={pictureLink} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
