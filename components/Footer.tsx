import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={250}
          height={25}
          className={styles.footer__logo}
        />
      </Link>
    </footer>
  );
}
