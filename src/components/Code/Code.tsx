import type { ComponentPropsWithRef } from 'react';
import styles from './Code.module.css';

export type CodeColor =
  | 'neutral'
  | 'accent'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'blue'
  | 'purple'
  | 'cyan';

export type CodeVariant = 'subtle' | 'ghost';
export type CodeSize = 'xs' | 'sm' | 'md' | 'lg';

export interface CodeProps extends ComponentPropsWithRef<'code'> {
  color?: CodeColor;
  variant?: CodeVariant;
  size?: CodeSize;
  nowrap?: boolean;
}

export function Code({
  color = 'neutral',
  variant = 'subtle',
  size,
  nowrap = false,
  className = '',
  children,
  ...rest
}: CodeProps) {
  const classes = [
    styles.code,
    styles[variant],
    styles[color],
    size ? styles[`size-${size}`] : '',
    nowrap ? styles.nowrap : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <code className={classes} {...rest}>
      {children}
    </code>
  );
}
