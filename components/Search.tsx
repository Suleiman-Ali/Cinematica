import { FormEvent, useRef } from 'react';
import { FaSearch, FaBan } from 'react-icons/fa';
import styles from './Search.module.scss';

interface SearchPropTypes {
  submitHandler: (text: string) => void;
  clearHandler: () => void;
  isSearchPictures: boolean;
}

export default function Search({
  submitHandler,
  clearHandler,
  isSearchPictures,
}: SearchPropTypes) {
  const textInput = useRef<HTMLInputElement>(null);

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
        placeholder="Search query.."
      />
      <button type="submit" className={styles.searchForm__btn}>
        <FaSearch />
      </button>
      {isSearchPictures && (
        <button
          type="button"
          onClick={clearHandler}
          className={styles.searchForm__clear}
        >
          <FaBan />
        </button>
      )}
    </form>
  );
}
