import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset';
import type { ComponentPropsWithRef } from 'react';
import styles from './Fieldset.module.css';

export type FieldsetPadding = 'none' | 'sm' | 'md' | 'lg';

export interface FieldsetRootProps extends ComponentPropsWithRef<'fieldset'> {
  padding?: FieldsetPadding;
}

function Root({ padding = 'md', className = '', children, ...rest }: FieldsetRootProps) {
  const classes = [styles.root, styles[`pad-${padding}`], className].filter(Boolean).join(' ');
  return (
    <BaseFieldset.Root className={classes} {...rest}>
      {children}
    </BaseFieldset.Root>
  );
}

function Legend({ className = '', children, ...rest }: ComponentPropsWithRef<'div'>) {
  return (
    <BaseFieldset.Legend
      render={<legend />}
      className={[styles.legend, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </BaseFieldset.Legend>
  );
}

export const Fieldset = {
  Root,
  Legend,
};
