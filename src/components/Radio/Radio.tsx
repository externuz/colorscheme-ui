import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { ControlColor } from '../_shared/ChoiceCard';
import styles from './Radio.module.css';

export interface RadioGroupProps<Value extends string = string>
  extends Omit<ComponentPropsWithRef<'div'>, 'onChange' | 'defaultValue'> {
  value?: Value;
  defaultValue?: Value;
  onValueChange?: (value: Value) => void;
  disabled?: boolean;
  name?: string;
  orientation?: 'vertical' | 'horizontal';
  children: ReactNode;
}

export function RadioGroup<Value extends string = string>({
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  name,
  orientation = 'vertical',
  className = '',
  children,
  ...rest
}: RadioGroupProps<Value>) {
  const classes = [styles.group, styles[orientation], className].filter(Boolean).join(' ');

  return (
    <BaseRadioGroup
      value={value}
      defaultValue={defaultValue}
      onValueChange={(val) => onValueChange?.(val as Value)}
      disabled={disabled}
      name={name}
      className={classes}
      {...rest}
    >
      {children}
    </BaseRadioGroup>
  );
}

export interface RadioProps<Value extends string = string> {
  value: Value;
  disabled?: boolean;
  color?: ControlColor;
  children?: ReactNode;
  className?: string;
  'aria-label'?: string;
}

export function Radio<Value extends string = string>({
  value,
  disabled = false,
  color = 'accent',
  children,
  className = '',
  'aria-label': ariaLabel,
}: RadioProps<Value>) {
  const control = (
    <BaseRadio.Root
      value={value}
      disabled={disabled}
      aria-label={ariaLabel}
      className={[styles.circle, styles[color]].filter(Boolean).join(' ')}
    >
      <BaseRadio.Indicator className={styles.dot} />
    </BaseRadio.Root>
  );

  if (!children) {
    return (
      <span className={[styles.standalone, className].filter(Boolean).join(' ')}>{control}</span>
    );
  }

  return (
    <label
      className={[styles.labelWrap, disabled ? styles.disabled : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      {control}
      <span className={styles.labelText}>{children}</span>
    </label>
  );
}
