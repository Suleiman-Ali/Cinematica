import Footer from '../components/Footer';
import Header from '../components/Header';
import RowPictures from '../components/RowPictures';
import api, { endpoint } from '../lib/api';
import { Picture } from '../lib/types';
import styles from './index.module.scss';

export async function getStaticProps() {
  const allData = await Promise.all([
    api.get(endpoint('/movie/popular')),
    api.get(endpoint('/movie/top_rated')),
    api.get(endpoint('/tv/popular')),
    api.get(endpoint('/tv/top_rated')),
  ]);
  const moviesPopular = allData[0].data.results;
  const moviesTopRated = allData[1].data.results;
  const tvPopular = allData[2].data.results;
  const tvTopRated = allData[3].data.results;
  return {
    props: { moviesPopular, moviesTopRated, tvPopular, tvTopRated },
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
  return (
    <div className={styles.home}>
      <Header picture={moviesPopular[0]} />

      <div className={styles.home__rows}>
        <RowPictures
          rowHeading="Popular Movies"
          link="/movies/popular"
          pictureLink="/movies"
          pictures={moviesPopular}
        />
        <RowPictures
          rowHeading="Top Movies"
          link="/movies/top-rated"
          pictureLink="/movies"
          pictures={moviesTopRated}
        />
        <RowPictures
          rowHeading="Popular TV"
          link="/tv/popular"
          pictureLink="/tv"
          pictures={tvPopular}
        />
        <RowPictures
          rowHeading="Top TV"
          link="/tv/top-rated"
          pictureLink="/tv"
          pictures={tvTopRated}
        />
      </div>
    </div>
  );
}
