import Link from 'next/link';
import Image from 'next/image';
import styles from './logo.module.scss';

export default function Logo() {
  return (
    <Link href="/" className={styles.logo} prefetch={false}>
      Cinematica
      <span>
        <Image src="/images/popcorn.svg" alt="" width={25} height={25} />
      </span>
    </Link>
  );
}
