import { Switch as BaseSwitch } from '@base-ui/react/switch';
import type { ReactNode } from 'react';
import type { ControlColor } from '../_shared/ChoiceCard';
import styles from './Switch.module.css';

export type SwitchColor = ControlColor;

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  color?: SwitchColor;
  size?: 'sm' | 'md';
  onCheckedChange?: (checked: boolean) => void;
  children?: ReactNode;
  className?: string;
  'aria-label'?: string;
}

export function Switch({
  checked,
  defaultChecked,
  disabled = false,
  color = 'accent',
  size = 'md',
  onCheckedChange,
  children,
  className = '',
  'aria-label': ariaLabel,
}: SwitchProps) {
  const trackClasses = [styles.track, styles[size], styles[color], !children ? className : '']
    .filter(Boolean)
    .join(' ');

  const control = (
    <BaseSwitch.Root
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onCheckedChange={(val) => onCheckedChange?.(val)}
      aria-label={ariaLabel}
      className={trackClasses}
    >
      <BaseSwitch.Thumb className={styles.thumb} />
    </BaseSwitch.Root>
  );

  if (!children) {
    return control;
  }

  return (
    <label
      className={[styles.labelWrap, disabled ? styles.labelDisabled : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      {control}
      <span className={styles.labelText}>{children}</span>
    </label>
  );
}
