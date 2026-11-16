import type { ComponentPropsWithRef } from 'react';
import {
  ChoiceCardBody,
  type ChoiceCardContentProps,
  type ControlColor,
  getChoiceCardClassName,
} from '../_shared/ChoiceCard';
import { Radio } from '../Radio/Radio';

export interface RadioCardProps<Value extends string = string>
  extends Omit<ComponentPropsWithRef<'label'>, 'onChange' | 'title'>,
    ChoiceCardContentProps {
  value: Value;
  disabled?: boolean;
  color?: ControlColor;
}

export function RadioCard<Value extends string = string>({
  value,
  disabled = false,
  color = 'accent',
  title,
  description,
  icon,
  addon,
  children,
  className = '',
  ...rest
}: RadioCardProps<Value>) {
  const cardClasses = getChoiceCardClassName({
    color,
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
        control={<Radio value={value} disabled={disabled} color={color} />}
      >
        {children}
      </ChoiceCardBody>
    </label>
  );
}
