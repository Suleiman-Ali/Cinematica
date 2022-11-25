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
  const tvPopular = (await api.get(endpoint('/tv/popular'))).data.results;
  return { props: { tvPopular }, revalidate: 60 * 60 * 1 };
}

interface PopularTvPagePropTypes {
  tvPopular: Picture[];
}

export default function PopularTvPage({ tvPopular }: PopularTvPagePropTypes) {
  const [tvPopularState, setTvPopularState] = useState<Picture[]>(tvPopular);
  const [nextIndexPage, setNextIndexPage] = useState<number>(2);
  const [sort, setSort] = useState<string>('Sort By');
  const [genre, setGenre] = useState<string>('All Genres');
  const [searchTvs, setSearchTvs] = useState<Picture[]>([]);
  const [searchIndex, setSearchIndex] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const loadMoreHandler = async () => {
    const newTvs = await loadMorePictures('tv', 'popular', nextIndexPage);
    setTvPopularState([...tvPopularState, ...newTvs]);
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
    const newSearchTvs = await loadSearchPictures('tv', text, searchIndex);
    setSearchTvs(newSearchTvs);
    setSearchIndex((index) => index + 1);
  };

  const searchLoadMoreHandler = async () => {
    const newSearchTvs = await loadSearchPictures(
      'tv',
      searchTerm,
      searchIndex
    );
    setSearchTvs([...searchTvs, ...newSearchTvs]);
    setSearchIndex((index) => index + 1);
  };

  const searchClearHandler = () => {
    setSearchTvs([]);
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
          isSearchPictures={searchTvs.length > 0}
        />
        <Filter
          sortChangeHandler={sortChangeHandler}
          genreChangeHandler={genreChangeHandler}
          filterClearHandler={filterClearHandler}
          sort={sort}
          genre={genre}
        />
      </div>

      {searchTvs.length > 0 && (
        <>
          (
          <PicturesGrid
            pictures={filterSort(genre, sort, searchTvs)}
            link="/tv"
          />
          )
          <LoadButton
            onClick={searchLoadMoreHandler}
            cls={styles.picturesPage__btn}
          />
        </>
      )}

      {searchTvs.length <= 0 && (
        <>
          (
          <PicturesGrid
            pictures={filterSort(genre, sort, tvPopularState)}
            link="/tv"
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
