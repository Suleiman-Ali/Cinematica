import Select from './select/select';
import Option from './option/option';
import Ban from '../../../public/icons/Ban.svg';
import styles from './filter.module.scss';

interface FilterPropTypes {
  sortChangeHandler: (sort: string) => void;
  genreChangeHandler: (genre: string) => void;
  filterClearHandler: () => void;
  sort: string;
  genre: string;
}

export default function Filter({
  filterClearHandler,
  genreChangeHandler,
  sortChangeHandler,
  sort,
  genre,
}: FilterPropTypes) {
  return (
    <div className={styles.filter}>
      <Select name="sort" value={sort} onChange={sortChangeHandler}>
        <Option text="Sort By" value="Sort By" />
        <Option text="Title/AS" value="Title/AS" />
        <Option text="Title/DS" value="Title/DS" />
        <Option text="Rate/AS" value="Rate/AS" />
        <Option text="Rate/DS" value="Rate/DS" />
      </Select>
      <Select name="genre" value={genre} onChange={genreChangeHandler}>
        <Option text="All Genres" value="All Genres" />
        <Option text="Action" value="Action" />
        <Option text="Comedy" value="Comedy" />
        <Option text="Drama" value="Drama" />
        <Option text="Thriller" value="Thriller" />
        <Option text="Horror" value="Horror" />
      </Select>
      {(sort !== 'Sort By' || genre !== 'All Genres') && (
        <button
          onClick={filterClearHandler}
          className={styles.filter__clear}
          title="Clear"
        >
          <Ban />
        </button>
      )}
    </div>
  );
}
