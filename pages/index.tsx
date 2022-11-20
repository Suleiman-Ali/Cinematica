import Footer from '../components/Footer';
import Header from '../components/Header';
import RowPictures from '../components/RowPictures';
import api, { endpoint } from '../lib/api';
import { Picture } from '../lib/types';
import styles from './index.module.scss';

// prettier-ignore
export async function getStaticProps() {
  const moviesPopular = (await api.get(endpoint('/movie/popular'))).data.results;
  const moviesTopRated = (await api.get(endpoint('/movie/top_rated'))).data.results;
  const  tvPopular  = (await api.get(endpoint('/tv/popular'))).data.results;
  const  tvTopRated  = (await api.get(endpoint('/tv/top_rated'))).data.results;
  return { props: { moviesPopular, moviesTopRated, tvPopular, tvTopRated } };
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

      <Footer />
    </div>
  );
}
