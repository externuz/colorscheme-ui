import { Field as BaseField } from '@base-ui/react/field';
import type { ComponentPropsWithRef } from 'react';
import styles from './Textarea.module.css';

export interface TextareaProps extends ComponentPropsWithRef<'textarea'> {
  size?: 'sm' | 'md' | 'lg';
  invalid?: boolean;
  mono?: boolean;
  autoResize?: boolean;
}

type TextareaInputEvent = Parameters<NonNullable<ComponentPropsWithRef<'textarea'>['onInput']>>[0];

export function Textarea({
  size = 'md',
  invalid = false,
  mono = false,
  autoResize = false,
  rows = 3,
  className = '',
  onInput,
  ...rest
}: TextareaProps) {
  const classes = [
    styles.textarea,
    styles[size],
    invalid ? styles.invalid : '',
    mono ? styles.mono : '',
    autoResize ? styles.autoResize : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleInput = (event: TextareaInputEvent) => {
    if (autoResize) {
      const target = event.currentTarget;
      target.style.height = 'auto';
      target.style.height = `${target.scrollHeight}px`;
    }
    onInput?.(event);
  };

  return (
    <BaseField.Control
      render={<textarea rows={rows} className={classes} onInput={handleInput} {...rest} />}
    />
  );
}
