import Head from 'next/head';
import Link from 'next/link';
import styles from './404.module.scss';

export default function NotfoundPage() {
  return (
    <div className={styles.notFound}>
      <Head>
        <title>Cinematica | 404</title>
      </Head>
      <h1 className={styles.notFound__title}>Page Not Found 😕</h1>
      <Link
        href="/"
        className={styles.notFound__btn}
        replace={true}
        prefetch={false}
      >
        Go Back Home
      </Link>
    </div>
  );
}
