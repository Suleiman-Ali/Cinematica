import Filter from '../filter/filter';
import LoadButton from '../load-btn';
import PicturesGrid from '../pictures-grid/pictures-grid';
import Search from '../search/search';
import styles from './content.module.scss';
import { useState } from 'react';
import { Picture, PicturesType } from '../../../lib/types';
import {
  loadPictures,
  loadSearchPictures,
  filterSort,
  getDisplayablePictures,
} from '../../../lib/helpers';

interface ContentPropTypes {
  displayPictures: Picture[];
  link: 'movies' | 'tv';
  type: 'movie' | 'tv';
  category: 'popular' | 'top_rated';
}

export default function Content({
  displayPictures,
  link,
  type,
  category,
}: ContentPropTypes) {
  const [picturesState, setPicturesState] = useState<PicturesType>({
    pictures: displayPictures,
    index: 2,
    term: '',
    sort: 'Sort By',
    genre: 'Filter By',
    isCanLoadMore: true,
  });

  const sortChangeHandler = (sort: string) =>
    setPicturesState({ ...picturesState, sort });

  const genreChangeHandler = (genre: string) =>
    setPicturesState({ ...picturesState, genre });

  const filterClearHandler = () =>
    setPicturesState({
      ...picturesState,
      sort: 'Sort By',
      genre: 'Filter By',
    });

  const clearAllHandler = () =>
    setPicturesState({
      pictures: displayPictures,
      index: 2,
      term: '',
      sort: 'Sort By',
      genre: 'Filter By',
      isCanLoadMore: true,
    });

  const searchHandler = async (term: string) => {
    const newSearchPictures = await loadSearchPictures(type, term, 1);
    const pictures = getDisplayablePictures(newSearchPictures);
    const isCanLoadMore = newSearchPictures.length < 20 ? false : true;
    setPicturesState({
      sort: 'Sort By',
      genre: 'Filter By',
      index: 2,
      pictures,
      isCanLoadMore,
      term,
    });
  };

  const loadMoreHandler = async () => {
    const { index, term } = picturesState;
    let newPictures: any;

    const hasTerm = term.length > 0;
    if (hasTerm) newPictures = await loadSearchPictures(type, term, index);
    else newPictures = await loadPictures(type, category, index);

    const isCanLoadMore = newPictures.length < 20 ? false : true;
    setPicturesState((picturesState) => ({
      ...picturesState,
      isCanLoadMore,
      pictures: [...picturesState.pictures, ...newPictures],
      index: picturesState.index + 1,
    }));
  };

  const { pictures, term, genre, sort, isCanLoadMore } = picturesState;
  const filteredPictures = filterSort(genre, sort, pictures);
  const isSearchPictures = pictures.length > 0 && term.length > 0;
  const isPictures = filteredPictures.length > 0;

  return (
    <div className={styles.picturesPage}>
      <div className={styles.picturesPage__box}>
        <Search
          submitHandler={searchHandler}
          clearHandler={clearAllHandler}
          isSearchPictures={isSearchPictures}
          isPictures={isPictures}
          term={term}
        />
        <Filter
          sortChangeHandler={sortChangeHandler}
          genreChangeHandler={genreChangeHandler}
          filterClearHandler={filterClearHandler}
          sort={sort}
          genre={genre}
        />
      </div>
      {!isPictures && (
        <div className={styles.picturesPage__error}>No Pictures Found 😕</div>
      )}
      {isPictures && (
        <>
          <PicturesGrid pictures={filteredPictures} link={link} />
          {isCanLoadMore && (
            <LoadButton
              onClick={loadMoreHandler}
              cls={styles.picturesPage__btn}
            />
          )}
        </>
      )}
    </div>
  );
}
