import { Field as BaseField } from '@base-ui/react/field';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import styles from './Field.module.css';

export interface FieldRootProps extends ComponentPropsWithRef<'div'> {
  name?: string;
  disabled?: boolean;
  invalid?: boolean;
}

function Root({ className = '', children, ...rest }: FieldRootProps) {
  return (
    <BaseField.Root className={[styles.root, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </BaseField.Root>
  );
}

function Label({ className = '', children, ...rest }: ComponentPropsWithRef<'label'>) {
  return (
    <BaseField.Label className={[styles.label, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </BaseField.Label>
  );
}

function Description({ className = '', children, ...rest }: ComponentPropsWithRef<'p'>) {
  return (
    <BaseField.Description
      className={[styles.description, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </BaseField.Description>
  );
}

function FieldError({ className = '', children }: { className?: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <div role="alert" className={[styles.error, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

export const Field = {
  Root,
  Label,
  Description,
  Error: FieldError,
};
