import { useState } from 'react';
import Filter from '../../components/Filter';
import LoadButton from '../../components/LoadButton';
import PicturesGrid from '../../components/PicturesGrid';
import Search from '../../components/Search';
import api, { endpoint, endPointWithQuery } from '../../lib/api';
import {
  filterSort,
  loadMorePictures,
  loadSearchPictures,
} from '../../lib/helpers';
import { Picture } from '../../lib/types';
import styles from '../PicturesPage.module.scss';

export async function getStaticProps() {
  const moviesTopRated = (await api.get(endpoint('/movie/top_rated'))).data
    .results;
  return { props: { moviesTopRated }, revalidate: 60 * 60 * 1 };
}

interface TopRatedMoviesPagePropTypes {
  moviesTopRated: Picture[];
}

export default function TopRatedMoviesPage({
  moviesTopRated,
}: TopRatedMoviesPagePropTypes) {
  const [topMoviesState, setTopMoviesState] =
    useState<Picture[]>(moviesTopRated);
  const [nextIndexPage, setNextIndexPage] = useState<number>(2);
  const [sort, setSort] = useState<string>('Sort By');
  const [genre, setGenre] = useState<string>('All Genres');
  const [searchMovies, setSearchMovies] = useState<Picture[]>([]);
  const [searchIndex, setSearchIndex] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const loadMoreHandler = async () => {
    const newMovies = await loadMorePictures(
      'movie',
      'top_rated',
      nextIndexPage
    );
    setTopMoviesState([...topMoviesState, ...newMovies]);
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
            pictures={filterSort(genre, sort, topMoviesState)}
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
