import Image from 'next/image';
import styles from './back-image.module.scss';

interface BackImagePropTypes {
  src: string;
  alt: string;
}

export default function BackImage({ src, alt }: BackImagePropTypes) {
  return (
    <div className={styles.backImage}>
      <Image
        className={styles.backImage__img}
        src={src}
        alt={alt}
        width={1500}
        height={1000}
      />
    </div>
  );
}
