import type { ReactNode } from 'react';
import styles from './ChoiceCard.module.css';

export type ControlColor =
  | 'accent'
  | 'yellow'
  | 'orange'
  | 'blue'
  | 'green'
  | 'purple'
  | 'cyan'
  | 'neutral';

export interface ChoiceCardContentProps {
  /** Primary card heading */
  title?: ReactNode;
  /** Secondary helper description */
  description?: ReactNode;
  /** Optional leading icon or visual swatch */
  icon?: ReactNode;
  /** Optional inline badge/chip next to title */
  addon?: ReactNode;
  /** Optional custom content inside the card body */
  children?: ReactNode;
}

export function getChoiceCardClassName({
  color = 'accent',
  checked = false,
  disabled = false,
  className = '',
}: {
  color?: ControlColor;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
}): string {
  return [
    styles.card,
    styles[`color-${color}`],
    checked ? styles.cardChecked : '',
    disabled ? styles.cardDisabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export function ChoiceCardBody({
  title,
  description,
  icon,
  addon,
  children,
  control,
}: ChoiceCardContentProps & { control?: ReactNode }) {
  return (
    <>
      <div className={styles.left}>
        {icon ? <span className={styles.iconSlot}>{icon}</span> : null}
        <div className={styles.content}>
          {title || addon ? (
            <div className={styles.titleRow}>
              {title ? <span className={styles.title}>{title}</span> : null}
              {addon}
            </div>
          ) : null}
          {description ? <span className={styles.description}>{description}</span> : null}
          {children}
        </div>
      </div>
      {control ? <span className={styles.controlSlot}>{control}</span> : null}
    </>
  );
}
