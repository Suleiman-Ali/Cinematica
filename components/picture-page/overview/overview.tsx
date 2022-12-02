import styles from './overview.module.scss';

interface OverviewPropTypes {
  text: string;
}

export default function Overview({ text }: OverviewPropTypes) {
  return <p className={styles.overview}>{text}</p>;
}
