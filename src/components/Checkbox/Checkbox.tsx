import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { Check } from 'lucide-react';
import type { ReactNode } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  children?: ReactNode;
  className?: string;
  'aria-label'?: string;
}

export function Checkbox({
  checked,
  defaultChecked,
  disabled = false,
  onCheckedChange,
  children,
  className = '',
  'aria-label': ariaLabel,
}: CheckboxProps) {
  const control = (
    <BaseCheckbox.Root
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onCheckedChange={(val) => onCheckedChange?.(val)}
      aria-label={ariaLabel}
      className={styles.box}
    >
      <BaseCheckbox.Indicator className={styles.indicator}>
        <Check size={12} strokeWidth={3} />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
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
