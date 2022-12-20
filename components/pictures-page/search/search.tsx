import ISearch from '../../../public/icons/Search.svg';
import Ban from '../../../public/icons/Ban.svg';
import styles from './search.module.scss';
import { FormEvent, useRef } from 'react';

interface SearchPropTypes {
  submitHandler: (text: string) => void;
  clearHandler: () => void;
  isSearchPictures: boolean;
  isPictures: boolean;
  term: string;
}

export default function Search({
  submitHandler,
  clearHandler,
  isSearchPictures,
  isPictures,
  term,
}: SearchPropTypes) {
  const textInput = useRef<HTMLInputElement>(null);
  const placeholder = term || 'Search term..';

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(textInput && textInput.current)) return;
    const text = textInput.current.value;
    submitHandler(text);
    textInput.current.value = '';
  };

  return (
    <form onSubmit={onSubmit} className={styles.searchForm}>
      <input
        type="text"
        ref={textInput}
        className={styles.searchForm__input}
        placeholder={placeholder}
      />
      <button type="submit" className={styles.searchForm__btn} title="Search">
        <ISearch />
      </button>
      {(isSearchPictures || !isPictures) && (
        <button
          title="Clear"
          type="button"
          onClick={clearHandler}
          className={styles.searchForm__clear}
        >
          <Ban />
        </button>
      )}
    </form>
  );
}
