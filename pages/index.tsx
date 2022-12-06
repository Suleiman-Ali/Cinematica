import Header from '../components/home-page/header/header';
import RowPictures from '../components/home-page/row-pictures/row-pictures';
import styles from './index.module.scss';
import { Picture } from '../lib/types';
import { fetchAllPictures, hasPosterAndBack } from '../lib/helpers';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
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
  const firstPopularMovie = moviesPopular[0];
  const firstTopMovie = moviesTopRated[0];
  const firstPopularTv = tvPopular[0];
  const firstTopTv = tvTopRated[0];
  const isAtLeastOnePicture =
    firstPopularMovie || firstTopMovie || firstPopularTv || firstTopTv || null;
  const isFirstPopularMovie =
    firstPopularMovie && hasPosterAndBack(firstPopularMovie);
  const isFirstTopMovie = firstTopMovie && hasPosterAndBack(firstTopMovie);
  const isFirstPopularTv = firstPopularTv && hasPosterAndBack(firstPopularTv);
  const isFirstTopTv = firstTopTv && hasPosterAndBack(firstTopTv);
  const gapTop = !isAtLeastOnePicture ? 'gap-top' : '';

  return (
    <div className={styles.home}>
      {isAtLeastOnePicture && (
        <Swiper
          effect="fade"
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          slidesPerView="auto"
          pagination={{
            clickable: true,
            bulletElement: 'span',
          }}
          modules={[Pagination, Autoplay, EffectFade]}
          className="mySwiper"
          tag="div"
        >
          {isFirstPopularMovie && (
            <SwiperSlide tag="div">
              <Header picture={firstPopularMovie} type="movies" />
            </SwiperSlide>
          )}
          {isFirstTopMovie && (
            <SwiperSlide tag="div">
              <Header picture={firstTopMovie} type="movies" />
            </SwiperSlide>
          )}
          {isFirstPopularTv && (
            <SwiperSlide tag="div">
              <Header picture={firstPopularTv} type="tv" />
            </SwiperSlide>
          )}
          {isFirstTopTv && (
            <SwiperSlide tag="div">
              <Header picture={firstTopTv} type="tv" />
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
