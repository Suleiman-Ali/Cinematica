import { FaBan } from 'react-icons/fa';
import styles from './Filter.module.scss';

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
      <select
        className={styles.filter__select}
        name="sort"
        onChange={(e) => sortChangeHandler(e.target.value)}
        value={sort}
      >
        <option className={styles.filter__option} value="Sort By">
          Sort By
        </option>
        <option className={styles.filter__option} value="Title/AS">
          Title/AS
        </option>
        <option className={styles.filter__option} value="Title/DS">
          Title/DS
        </option>
        <option className={styles.filter__option} value="Rate/AS">
          Rate/AS
        </option>
        <option className={styles.filter__option} value="Rate/DS">
          Rate/DS
        </option>
      </select>
      <select
        className={styles.filter__select}
        name="genre"
        onChange={(e) => genreChangeHandler(e.target.value)}
        value={genre}
      >
        <option className={styles.filter__option} value="All Genres">
          All Genres
        </option>
        <option className={styles.filter__option} value="Action">
          Action
        </option>
        <option className={styles.filter__option} value="Comedy">
          Comedy
        </option>
        <option className={styles.filter__option} value="Drama">
          Drama
        </option>
        <option className={styles.filter__option} value="Thriller">
          Thriller
        </option>
        <option className={styles.filter__option} value="Horror">
          Horror
        </option>
      </select>
      {(sort !== 'Sort By' || genre !== 'All Genres') && (
        <button onClick={filterClearHandler} className={styles.filter__clear}>
          <FaBan />
        </button>
      )}
    </div>
  );
}
