import { Input as BaseInput } from '@base-ui/react/input';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import styles from './Input.module.css';

export interface InputProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  startSlot?: ReactNode;
  endSlot?: ReactNode;
  invalid?: boolean;
  wrapperClassName?: string;
}

export function Input({
  size = 'md',
  startSlot,
  endSlot,
  invalid = false,
  className = '',
  wrapperClassName = '',
  disabled,
  ...rest
}: InputProps) {
  if (!startSlot && !endSlot) {
    const inputClasses = [styles.inputOnly, styles[size], invalid ? styles.invalid : '', className]
      .filter(Boolean)
      .join(' ');
    return <BaseInput disabled={disabled} className={inputClasses} {...rest} />;
  }

  const groupClasses = [
    styles.group,
    styles[size],
    invalid ? styles.invalid : '',
    disabled ? styles.disabled : '',
    wrapperClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={groupClasses}>
      {startSlot ? <span className={styles.slot}>{startSlot}</span> : null}
      <BaseInput
        disabled={disabled}
        className={[styles.innerInput, className].filter(Boolean).join(' ')}
        {...rest}
      />
      {endSlot ? <span className={styles.slot}>{endSlot}</span> : null}
    </div>
  );
}
