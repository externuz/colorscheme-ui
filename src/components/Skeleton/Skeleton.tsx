import type { ComponentPropsWithRef, CSSProperties } from 'react';
import styles from './Skeleton.module.css';

export type SkeletonRadius = 'xs' | 'sm' | 'md' | 'lg' | 'full';

export interface SkeletonProps extends ComponentPropsWithRef<'div'> {
  width?: number | string;
  height?: number | string;
  radius?: SkeletonRadius;
}

export function Skeleton({
  width = '100%',
  height = 16,
  radius = 'sm',
  className = '',
  style,
  ...rest
}: SkeletonProps) {
  const classes = [styles.skeleton, styles[radius], className].filter(Boolean).join(' ');
  const resolvedStyle: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    ...style,
  };

  return <div aria-hidden="true" className={classes} style={resolvedStyle} {...rest} />;
}
