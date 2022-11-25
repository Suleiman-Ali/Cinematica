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
  const tvTopRated = (await api.get(endpoint('/tv/top_rated'))).data.results;
  return { props: { tvTopRated }, revalidate: 60 * 60 * 1 };
}

interface TopRatedTvPagePropTypes {
  tvTopRated: Picture[];
}

export default function TopRatedTvPage({
  tvTopRated,
}: TopRatedTvPagePropTypes) {
  const [tvTopRatedState, setTvTopRatedState] = useState<Picture[]>(tvTopRated);
  const [nextIndexPage, setNextIndexPage] = useState<number>(2);
  const [sort, setSort] = useState<string>('Sort By');
  const [genre, setGenre] = useState<string>('All Genres');
  const [searchTvs, setSearchTvs] = useState<Picture[]>([]);
  const [searchIndex, setSearchIndex] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const loadMoreHandler = async () => {
    const newTvs = await loadMorePictures('tv', 'top_rated', nextIndexPage);
    setTvTopRatedState([...tvTopRatedState, ...newTvs]);
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
            pictures={filterSort(genre, sort, tvTopRatedState)}
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
