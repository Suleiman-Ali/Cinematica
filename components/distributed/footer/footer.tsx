import Link from 'next/link';
import Image from 'next/image';
import styles from './footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link href="/">
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={250}
          height={25}
          className={styles.footer__logo}
        />
      </Link>
    </footer>
  );
}
