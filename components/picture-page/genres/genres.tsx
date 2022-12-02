import styles from './genres.module.scss';
import { Genre } from '../../../lib/types';

interface GenresPropTypes {
  genres: Genre[];
}

export default function Genres({ genres }: GenresPropTypes) {
  return (
    <div className={styles.genres}>
      {genres.slice(0, 4).map(({ name, id }) => (
        <p className={styles.genres__genre} key={id}>
          {name}
        </p>
      ))}
    </div>
  );
}
