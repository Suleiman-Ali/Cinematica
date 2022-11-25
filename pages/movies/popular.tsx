import { useState } from 'react';
import LoadButton from '../../components/LoadButton';
import PicturesGrid from '../../components/PicturesGrid';
import api, { endpoint, endPointWithQuery } from '../../lib/api';
import { Picture } from '../../lib/types';
import styles from '../PicturesPage.module.scss';
import Filter from '../../components/Filter';
import {
  filterSort,
  loadMorePictures,
  loadSearchPictures,
} from '../../lib/helpers';
import Search from '../../components/Search';

export async function getStaticProps() {
  const moviesPopular = (await api.get(endpoint('/movie/popular'))).data
    .results;
  return { props: { moviesPopular }, revalidate: 60 * 60 * 1 };
}

interface PopularMoviesPagePropTypes {
  moviesPopular: Picture[];
}

export default function PopularMoviesPage({
  moviesPopular,
}: PopularMoviesPagePropTypes) {
  const [moviesPopularState, setMoviesPopularState] =
    useState<Picture[]>(moviesPopular);
  const [nextIndexPage, setNextIndexPage] = useState<number>(2);
  const [sort, setSort] = useState<string>('Sort By');
  const [genre, setGenre] = useState<string>('All Genres');
  const [searchMovies, setSearchMovies] = useState<Picture[]>([]);
  const [searchIndex, setSearchIndex] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const loadMoreHandler = async () => {
    const newMovies = await loadMorePictures('movie', 'popular', nextIndexPage);
    setMoviesPopularState([...moviesPopularState, ...newMovies]);
    setNextIndexPage((index) => index + 1);
  };

  const sortChangeHandler = (sort: string) => setSort(sort);
  const genreChangeHandler = (genre: string) => setGenre(genre);
  const filterClearHandler = () => {
    setSort('Sort By');
    setGenre('All Genres');
  };

  const searchHandler = async (text: string) => {
    setSearchTerm(text);
    filterClearHandler();
    const newSearchMovies = await loadSearchPictures(
      'movie',
      text,
      searchIndex
    );
    setSearchMovies(newSearchMovies);
    setSearchIndex((index) => index + 1);
  };

  const searchLoadMoreHandler = async () => {
    const newSearchMovies = await loadSearchPictures(
      'movie',
      searchTerm,
      searchIndex
    );
    setSearchMovies([...searchMovies, ...newSearchMovies]);
    setSearchIndex((index) => index + 1);
  };

  const searchClearHandler = () => {
    setSearchMovies([]);
    setSearchIndex(1);
    setSearchTerm('');
    filterClearHandler();
  };

  return (
    <div className={styles.picturesPage}>
      <div className={styles.picturesPage__box}>
        <Search
          submitHandler={searchHandler}
          clearHandler={searchClearHandler}
          isSearchPictures={searchMovies.length > 0}
        />
        <Filter
          sortChangeHandler={sortChangeHandler}
          genreChangeHandler={genreChangeHandler}
          filterClearHandler={filterClearHandler}
          sort={sort}
          genre={genre}
        />
      </div>

      {searchMovies.length > 0 && (
        <>
          (
          <PicturesGrid
            pictures={filterSort(genre, sort, searchMovies)}
            link="/movies"
          />
          )
          <LoadButton
            onClick={searchLoadMoreHandler}
            cls={styles.picturesPage__btn}
          />
        </>
      )}

      {searchMovies.length <= 0 && (
        <>
          (
          <PicturesGrid
            pictures={filterSort(genre, sort, moviesPopularState)}
            link="/movies"
          />
          <LoadButton
            onClick={loadMoreHandler}
            cls={styles.picturesPage__btn}
          />
          )
        </>
      )}
    </div>
  );
}
