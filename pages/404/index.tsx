import Head from 'next/head';
import styles from './404.module.scss';
import Link from 'next/link';

export default function NotfoundPage() {
  return (
    <div className={styles.notFound}>
      <Head>
        <title>Next Entertainment | 404</title>
      </Head>
      <h1 className={styles.notFound__title}>
        Page Not Found or Error Occurred 😕
      </h1>
      <Link href="/" className={styles.notFound__btn} replace={true}>
        Go Back Home
      </Link>
    </div>
  );
}
