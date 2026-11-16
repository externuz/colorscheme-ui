import type { ComponentPropsWithRef } from 'react';
import {
  ChoiceCardBody,
  type ChoiceCardContentProps,
  type ControlColor,
  getChoiceCardClassName,
} from '../_shared/ChoiceCard';
import { Checkbox } from '../Checkbox/Checkbox';

export interface CheckboxCardProps
  extends Omit<ComponentPropsWithRef<'label'>, 'onChange' | 'title'>,
    ChoiceCardContentProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  color?: ControlColor;
  onCheckedChange?: (checked: boolean) => void;
}

export function CheckboxCard({
  checked,
  defaultChecked,
  disabled = false,
  color = 'accent',
  onCheckedChange,
  title,
  description,
  icon,
  addon,
  children,
  className = '',
  ...rest
}: CheckboxCardProps) {
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
          <Checkbox
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            color={color}
            onCheckedChange={onCheckedChange}
          />
        }
      >
        {children}
      </ChoiceCardBody>
    </label>
  );
}
