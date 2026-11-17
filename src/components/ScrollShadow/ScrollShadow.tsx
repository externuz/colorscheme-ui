import type { ComponentPropsWithRef } from 'react';
import styles from './ScrollShadow.module.css';

export interface ScrollShadowProps extends ComponentPropsWithRef<'div'> {
  hideScrollBar?: boolean;
}

export function ScrollShadow({
  hideScrollBar = false,
  className = '',
  children,
  ...rest
}: ScrollShadowProps) {
  const classes = [styles.container, hideScrollBar ? styles.hideScrollBar : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
