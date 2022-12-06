import Image from 'next/image';
import styles from './front-image.module.scss';

interface FrontImagePropTypes {
  src: string;
  alt: string;
}

export default function FrontImage({ src, alt }: FrontImagePropTypes) {
  return (
    <div className={styles.frontImage}>
      <Image
        className={styles.frontImage__img}
        src={src}
        alt={alt}
        width={400}
        height={400}
        priority
      />
    </div>
  );
}
