import styles from './select.module.scss';
import { ReactNode } from 'react';

interface SelectPropTypes {
  name: string;
  value: string;
  children: ReactNode[];
  onChange: (text: string) => void;
}

export default function Select({
  name,
  onChange,
  value,
  children,
}: SelectPropTypes) {
  return (
    <select
      className={styles.select}
      name={name}
      onChange={(e) => onChange(e.target.value)}
      value={value}
    >
      {children}
    </select>
  );
}
