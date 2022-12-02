import styles from './picture-info.module.scss';

interface PictureInfoPropTypes {
  Icon: any;
  text: string;
}

export default function PictureInfo({ Icon, text }: PictureInfoPropTypes) {
  return (
    <div className={styles.pictureInfo}>
      <Icon />
      <p className={styles.pictureInfo__text}>{text}</p>
    </div>
  );
}
