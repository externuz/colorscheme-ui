import { Separator as BaseSeparator } from '@base-ui/react/separator';
import type { ComponentPropsWithRef } from 'react';
import styles from './Separator.module.css';

export interface SeparatorProps extends ComponentPropsWithRef<'div'> {
  orientation?: 'horizontal' | 'vertical';
}

export function Separator({ orientation = 'horizontal', className = '', ...rest }: SeparatorProps) {
  const classes = [styles.separator, styles[orientation], className].filter(Boolean).join(' ');
  return <BaseSeparator orientation={orientation} className={classes} {...rest} />;
}
