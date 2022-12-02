import Header from '../components/home-page/header/header';
import RowPictures from '../components/home-page/row-pictures/row-pictures';
import Film from '../public/icons/Film.svg';
import Tv from '../public/icons/TV.svg';
import styles from './index.module.scss';
import { Picture } from '../lib/types';
import { fetchAllPictures, hasPosterAndBack } from '../lib/helpers';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

export async function getStaticProps() {
  const props = await fetchAllPictures();
  return {
    props,
    revalidate: 60 * 60 * 1,
  };
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
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          slidesPerView="auto"
          pagination={{
            clickable: true,
            bulletElement: 'span',
          }}
          modules={[Pagination, Autoplay]}
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
          Icon={Film}
        />
        <RowPictures
          rowHeading="Top Movies"
          link="/pictures/movies/top-rated"
          pictureLink="movies"
          pictures={moviesTopRated}
          Icon={Film}
        />
        <RowPictures
          rowHeading="Popular TV"
          link="/pictures/tv/popular"
          pictureLink="tv"
          pictures={tvPopular}
          Icon={Tv}
        />
        <RowPictures
          rowHeading="Top TV"
          link="/pictures/tv/top-rated"
          pictureLink="tv"
          pictures={tvTopRated}
          Icon={Tv}
        />
      </div>
    </div>
  );
}
