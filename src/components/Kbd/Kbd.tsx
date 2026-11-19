import type { ComponentPropsWithRef } from 'react';
import styles from './Kbd.module.css';

export type KbdSize = 'sm' | 'md' | 'lg';
export type KbdVariant = 'raised' | 'flat';

export interface KbdProps extends ComponentPropsWithRef<'kbd'> {
  size?: KbdSize;
  variant?: KbdVariant;
}

export function Kbd({
  size = 'md',
  variant = 'raised',
  className = '',
  children,
  ...rest
}: KbdProps) {
  const classes = [styles.kbd, styles[variant], styles[size], className].filter(Boolean).join(' ');

  return (
    <kbd className={classes} {...rest}>
      {children}
    </kbd>
  );
}
