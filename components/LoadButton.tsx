interface LoadButtonPropTypes {
  onClick: () => void;
  cls: string;
}

export default function LoadButton({ onClick, cls }: LoadButtonPropTypes) {
  return (
    <button className={cls} onClick={onClick}>
      Load More
    </button>
  );
}
