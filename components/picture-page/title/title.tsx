import styles from './title.module.scss';

interface TitlePropTypes {
  text: string;
}

export default function Title({ text }: TitlePropTypes) {
  return <h1 className={styles.title}>{text}</h1>;
}
