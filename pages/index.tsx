import Header from '../components/home-page/header/header';
import RowPictures from '../components/home-page/row-pictures/row-pictures';
import styles from './index.module.scss';
import { Picture } from '../lib/types';
import { fetchAllPictures, hasPosterAndBack } from '../lib/helpers';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';

export async function getStaticProps() {
  const props = await fetchAllPictures();
  return { props, revalidate: 60 * 30 };
}

interface HomePagePropTypes {
  moviesPopular: Picture[];
  moviesTopRated: Picture[];
  tvPopular: Picture[];
  tvTopRated: Picture[];
}

export default function HomePage({
  moviesPopular,
  moviesTopRated,
  tvPopular,
  tvTopRated,
}: HomePagePropTypes) {
  const popularMovie = moviesPopular[0];
  const popularTv = tvPopular[0];
  const isAtLeastOnePicture = popularMovie || popularTv || null;
  const isPopularMovie = popularMovie && hasPosterAndBack(popularMovie);
  const isPopularTv = popularTv && hasPosterAndBack(popularTv);
  const gapTop = !isAtLeastOnePicture ? 'gap-top' : '';
  return (
    <div className={styles.home}>
      {isAtLeastOnePicture && (
        <Swiper
          grabCursor
          effect="fade"
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          slidesPerView="auto"
          modules={[Autoplay, EffectFade]}
          className="mySwiper"
          tag="div"
        >
          {popularMovie && (
            <SwiperSlide tag="div">
              <Header picture={popularMovie} type="movies" />
            </SwiperSlide>
          )}
          {popularTv && (
            <SwiperSlide tag="div">
              <Header picture={popularTv} type="tv" />
            </SwiperSlide>
          )}
        </Swiper>
      )}
      <div className={`${styles.home__rows} ${gapTop}`}>
        <RowPictures
          rowHeading="Popular Movies"
          link="/pictures/movies/popular"
          pictureLink="movies"
          pictures={moviesPopular}
        />
        <RowPictures
          rowHeading="Top Movies"
          link="/pictures/movies/top-rated"
          pictureLink="movies"
          pictures={moviesTopRated}
        />
        <RowPictures
          rowHeading="Popular TV"
          link="/pictures/tv/popular"
          pictureLink="tv"
          pictures={tvPopular}
        />
        <RowPictures
          rowHeading="Top TV"
          link="/pictures/tv/top-rated"
          pictureLink="tv"
          pictures={tvTopRated}
        />
      </div>
    </div>
  );
}
