import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import styles from './Alert.module.css';

export type AlertVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps extends Omit<ComponentPropsWithRef<'div'>, 'title'> {
  variant?: AlertVariant;
  title?: ReactNode;
  icon?: ReactNode;
  hideIcon?: boolean;
  action?: ReactNode;
}

function getDefaultIcon(variant: AlertVariant): ReactNode {
  switch (variant) {
    case 'success':
      return <CircleCheck size={16} />;
    case 'warning':
      return <TriangleAlert size={16} />;
    case 'danger':
      return <CircleAlert size={16} />;
    default:
      return <Info size={16} />;
  }
}

export function Alert({
  variant = 'neutral',
  title,
  icon,
  hideIcon = false,
  action,
  role,
  className = '',
  children,
  ...rest
}: AlertProps) {
  const resolvedRole = role ?? (variant === 'danger' || variant === 'warning' ? 'alert' : 'status');
  const resolvedIcon = icon !== undefined ? icon : getDefaultIcon(variant);
  const classes = [styles.alert, styles[variant], className].filter(Boolean).join(' ');

  return (
    <div role={resolvedRole} className={classes} {...rest}>
      {!hideIcon && resolvedIcon ? (
        <span className={styles.icon} aria-hidden="true">
          {resolvedIcon}
        </span>
      ) : null}
      <div className={styles.body}>
        {title ? <div className={styles.title}>{title}</div> : null}
        {children ? <div className={styles.description}>{children}</div> : null}
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}
