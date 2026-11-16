import type { ComponentPropsWithRef } from 'react';
import {
  ChoiceCardBody,
  type ChoiceCardContentProps,
  type ControlColor,
  getChoiceCardClassName,
} from '../_shared/ChoiceCard';
import { Switch } from '../Switch/Switch';

export interface SwitchCardProps
  extends Omit<ComponentPropsWithRef<'label'>, 'onChange' | 'title'>,
    ChoiceCardContentProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  color?: ControlColor;
  size?: 'sm' | 'md';
  onCheckedChange?: (checked: boolean) => void;
}

export function SwitchCard({
  checked,
  defaultChecked,
  disabled = false,
  color = 'accent',
  size = 'md',
  onCheckedChange,
  title,
  description,
  icon,
  addon,
  children,
  className = '',
  ...rest
}: SwitchCardProps) {
  const cardClasses = getChoiceCardClassName({
    color,
    checked: Boolean(checked),
    disabled,
    className,
  });

  return (
    <label className={cardClasses} {...rest}>
      <ChoiceCardBody
        title={title}
        description={description}
        icon={icon}
        addon={addon}
        control={
          <Switch
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            color={color}
            size={size}
            onCheckedChange={onCheckedChange}
          />
        }
      >
        {children}
      </ChoiceCardBody>
    </label>
  );
}
