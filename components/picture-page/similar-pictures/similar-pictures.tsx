import PictureItem from '../../distributed/picture-item/picture-item';
import styles from './similar-pictures.module.scss';
import { Picture } from '../../../lib/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { hasPosterAndBack } from '../../../lib/helpers';

interface SimilarPicturesPropTypes {
  pictures: Picture[];
  pictureLink: string;
}

export default function SimilarPictures({
  pictures,
  pictureLink,
}: SimilarPicturesPropTypes) {
  return (
    <div className={styles.similarPictures}>
      <p className={styles.similarPictures__title}>Similar Pictures</p>
      <Swiper
        slidesPerView="auto"
        className={`mySwiper ${styles.similarPictures__items}`}
        tag="div"
      >
        {pictures.map(
          (picture) =>
            hasPosterAndBack(picture) && (
              <SwiperSlide
                key={picture.id}
                className={styles.similarPictures__item}
              >
                <PictureItem
                  picture={picture}
                  link={pictureLink}
                  replace={true}
                />
              </SwiperSlide>
            )
        )}
      </Swiper>
    </div>
  );
}
