import Link from 'next/link';
import Image from 'next/image';
import styles from './logo.module.scss';

export default function Logo() {
  return (
    <Link href="/" className={styles.logo} prefetch={false}>
      Next
      <span>
        <Image src="/images/popcorn.svg" alt="" width={18} height={18} />
      </span>
      Entertainment
    </Link>
  );
}
