import { Select as BaseSelect } from '@base-ui/react/select';
import { Check, ChevronDown } from 'lucide-react';
import {
  Children,
  type ComponentPropsWithRef,
  isValidElement,
  type ReactNode,
  useMemo,
} from 'react';
import styles from './Select.module.css';

export type SelectSize = 'sm' | 'md' | 'lg';

interface ExtractedSelectItem {
  value: unknown;
  label: ReactNode;
}

function collectSelectItems(
  nodes: ReactNode,
  acc: ExtractedSelectItem[] = [],
): ExtractedSelectItem[] {
  Children.forEach(nodes, (child) => {
    if (!isValidElement(child)) return;
    const props = child.props as Record<string, unknown>;

    if (child.type === Item && 'value' in props) {
      acc.push({
        value: props.value,
        label: (props.label as ReactNode) ?? (props.children as ReactNode),
      });
      return;
    }

    if (props.children) {
      collectSelectItems(props.children as ReactNode, acc);
    }
  });
  return acc;
}

export interface SelectRootProps<Value extends string = string> {
  value?: Value;
  defaultValue?: Value;
  onValueChange?: (value: Value) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  items?: Record<string, ReactNode> | ReadonlyArray<{ value: Value; label: ReactNode }>;
  children: ReactNode;
}

function Root<Value extends string = string>({
  value,
  defaultValue,
  onValueChange,
  open,
  defaultOpen,
  onOpenChange,
  disabled = false,
  required = false,
  name,
  id,
  items,
  children,
}: SelectRootProps<Value>) {
  const resolvedItems = useMemo(() => {
    if (items) return items;
    const extracted = collectSelectItems(children);
    return extracted.length > 0 ? extracted : undefined;
  }, [items, children]);

  return (
    <BaseSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={(val) => {
        if (val !== null) {
          onValueChange?.(val as Value);
        }
      }}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(nextOpen) => onOpenChange?.(nextOpen)}
      disabled={disabled}
      required={required}
      name={name}
      id={id}
      items={resolvedItems}
    >
      {children}
    </BaseSelect.Root>
  );
}

export interface SelectTriggerProps
  extends Omit<ComponentPropsWithRef<'button'>, 'children' | 'value'> {
  size?: SelectSize;
  placeholder?: ReactNode;
  invalid?: boolean;
  startSlot?: ReactNode;
  children?: ReactNode | ((value: unknown) => ReactNode);
}

function Trigger({
  size = 'md',
  placeholder = 'Select an option...',
  invalid = false,
  startSlot,
  className = '',
  children,
  ...rest
}: SelectTriggerProps) {
  const classes = [styles.trigger, styles[size], invalid ? styles.invalid : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <BaseSelect.Trigger className={classes} {...rest}>
      <span className={styles.triggerLeft}>
        {startSlot ? <span className={styles.startSlot}>{startSlot}</span> : null}
        <BaseSelect.Value placeholder={placeholder} className={styles.value}>
          {children}
        </BaseSelect.Value>
      </span>
      <BaseSelect.Icon className={styles.icon}>
        <ChevronDown size={15} />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
}

export interface SelectContentProps {
  side?: 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  alignItemWithTrigger?: boolean;
  className?: string;
  children: ReactNode;
}

function Content({
  side = 'bottom',
  align = 'start',
  sideOffset = 6,
  alignItemWithTrigger = false,
  className = '',
  children,
}: SelectContentProps) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className={styles.positioner}
      >
        <BaseSelect.Popup className={[styles.popup, className].filter(Boolean).join(' ')}>
          <BaseSelect.List className={styles.list}>{children}</BaseSelect.List>
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

export interface SelectItemProps<Value extends string = string> {
  value: Value;
  label?: string;
  description?: ReactNode;
  startSlot?: ReactNode;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

function Item<Value extends string = string>({
  value,
  label,
  description,
  startSlot,
  disabled = false,
  className = '',
  children,
}: SelectItemProps<Value>) {
  return (
    <BaseSelect.Item
      value={value}
      label={label}
      disabled={disabled}
      className={[styles.item, className].filter(Boolean).join(' ')}
    >
      <span className={styles.itemLeft}>
        {startSlot ? <span className={styles.startSlot}>{startSlot}</span> : null}
        <span className={styles.itemBody}>
          <BaseSelect.ItemText className={styles.itemText}>{children}</BaseSelect.ItemText>
          {description ? <span className={styles.itemDescription}>{description}</span> : null}
        </span>
      </span>
      <BaseSelect.ItemIndicator className={styles.indicator}>
        <Check size={14} strokeWidth={2.5} />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  );
}

function Group({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <BaseSelect.Group className={[styles.group, className].filter(Boolean).join(' ')}>
      {children}
    </BaseSelect.Group>
  );
}

function GroupLabel({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <BaseSelect.GroupLabel className={[styles.groupLabel, className].filter(Boolean).join(' ')}>
      {children}
    </BaseSelect.GroupLabel>
  );
}

function Separator({ className = '' }: { className?: string }) {
  return (
    <BaseSelect.Separator className={[styles.separator, className].filter(Boolean).join(' ')} />
  );
}

export const Select = {
  Root,
  Trigger,
  Content,
  Item,
  Group,
  GroupLabel,
  Separator,
};
