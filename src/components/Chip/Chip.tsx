import type { ComponentPropsWithRef } from 'react';
import styles from './Chip.module.css';

export type ChipColor =
  | 'neutral'
  | 'accent'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'blue'
  | 'purple'
  | 'cyan';

export interface ChipProps extends ComponentPropsWithRef<'span'> {
  color?: ChipColor;
  size?: 'sm' | 'md';
  mono?: boolean;
}

export function Chip({
  color = 'neutral',
  size = 'md',
  mono = false,
  className = '',
  children,
  ...rest
}: ChipProps) {
  const classes = [styles.chip, styles[color], styles[size], mono ? styles.mono : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}
