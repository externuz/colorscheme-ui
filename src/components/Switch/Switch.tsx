import { Switch as BaseSwitch } from '@base-ui/react/switch';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import styles from './Switch.module.css';

export type SwitchColor = 'accent' | 'yellow' | 'orange' | 'blue' | 'green' | 'neutral';

export interface SwitchControlProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  color?: SwitchColor;
  size?: 'sm' | 'md';
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  'aria-label'?: string;
}

function Control({
  checked,
  defaultChecked,
  disabled = false,
  color = 'accent',
  size = 'md',
  onCheckedChange,
  className = '',
  'aria-label': ariaLabel,
}: SwitchControlProps) {
  const classes = [styles.track, styles[size], styles[color], className].filter(Boolean).join(' ');

  return (
    <BaseSwitch.Root
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onCheckedChange={(val) => onCheckedChange?.(val)}
      aria-label={ariaLabel}
      className={classes}
    >
      <BaseSwitch.Thumb className={styles.thumb} />
    </BaseSwitch.Root>
  );
}

export interface SwitchRowProps extends Omit<ComponentPropsWithRef<'label'>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  color?: SwitchColor;
  onCheckedChange?: (checked: boolean) => void;
  children: ReactNode;
}

function Row({
  checked,
  defaultChecked,
  disabled = false,
  color = 'accent',
  onCheckedChange,
  className = '',
  children,
  ...rest
}: SwitchRowProps) {
  const rowClasses = [
    styles.row,
    checked ? styles[`rowActive-${color}`] : '',
    disabled ? styles.rowDisabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={rowClasses} {...rest}>
      <div className={styles.rowContent}>{children}</div>
      <Control
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        color={color}
        onCheckedChange={onCheckedChange}
      />
    </label>
  );
}

export const Switch = {
  Control,
  Row,
};
