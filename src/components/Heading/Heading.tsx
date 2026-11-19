import type { ComponentPropsWithRef } from 'react';
import type { TypographyAlign, TypographyColor } from '../_shared/typography';
import typographyStyles from '../_shared/typography.module.css';
import styles from './Heading.module.css';

export type HeadingAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type HeadingWeight = 'medium' | 'semibold' | 'bold';

const DEFAULT_SIZE_BY_LEVEL: Record<HeadingAs, HeadingSize> = {
  h1: '2xl',
  h2: 'xl',
  h3: 'lg',
  h4: 'md',
  h5: 'sm',
  h6: 'xs',
};

export interface HeadingProps extends ComponentPropsWithRef<'h1'> {
  as?: HeadingAs;
  size?: HeadingSize;
  weight?: HeadingWeight;
  color?: TypographyColor;
  align?: TypographyAlign;
  mono?: boolean;
  truncate?: boolean;
}

export function Heading({
  as: Tag = 'h2',
  size,
  weight = 'semibold',
  color = 'primary',
  align,
  mono = false,
  truncate = false,
  className = '',
  children,
  ...rest
}: HeadingProps) {
  const resolvedSize = size ?? DEFAULT_SIZE_BY_LEVEL[Tag];
  const classes = [
    styles.heading,
    styles[`size-${resolvedSize}`],
    styles[`weight-${weight}`],
    typographyStyles[`color-${color}`],
    align ? typographyStyles[`align-${align}`] : '',
    mono ? styles.mono : '',
    truncate ? typographyStyles.truncate : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
