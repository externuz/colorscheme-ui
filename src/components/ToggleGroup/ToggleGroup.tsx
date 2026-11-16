import { Toggle } from '@base-ui/react/toggle';
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import type { ReactNode } from 'react';
import styles from './ToggleGroup.module.css';

export interface ToggleGroupRootProps<Value extends string = string> {
  value: Value;
  onValueChange: (value: Value) => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
}

function Root<Value extends string = string>({
  value,
  onValueChange,
  disabled = false,
  className = '',
  children,
  'aria-label': ariaLabel,
}: ToggleGroupRootProps<Value>) {
  return (
    <BaseToggleGroup
      value={[value]}
      disabled={disabled}
      aria-label={ariaLabel}
      onValueChange={(nextValues) => {
        const picked = nextValues[0];
        if (picked !== undefined) {
          onValueChange(picked);
        }
      }}
      className={[styles.root, className].filter(Boolean).join(' ')}
    >
      {children}
    </BaseToggleGroup>
  );
}

export interface ToggleGroupItemProps<Value extends string = string> {
  value: Value;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
}

function Item<Value extends string = string>({
  value,
  disabled = false,
  className = '',
  children,
  'aria-label': ariaLabel,
}: ToggleGroupItemProps<Value>) {
  return (
    <Toggle
      value={value}
      disabled={disabled}
      aria-label={ariaLabel}
      className={[styles.item, className].filter(Boolean).join(' ')}
    >
      {children}
    </Toggle>
  );
}

export const ToggleGroup = {
  Root,
  Item,
};
