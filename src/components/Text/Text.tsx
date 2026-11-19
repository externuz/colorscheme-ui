import { type ComponentPropsWithRef, type CSSProperties, createElement } from 'react';
import type { TypographyAlign, TypographyColor } from '../_shared/typography';
import typographyStyles from '../_shared/typography.module.css';
import styles from './Text.module.css';

export type TextAs = 'span' | 'p' | 'div' | 'label';
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export interface TextOwnProps<T extends TextAs = 'span'> {
  as?: T;
  size?: TextSize;
  weight?: TextWeight;
  color?: TypographyColor;
  align?: TypographyAlign;
  mono?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  tabular?: boolean;
  truncate?: boolean;
  lineClamp?: number;
}

export type TextProps<T extends TextAs = 'span'> = TextOwnProps<T> &
  Omit<ComponentPropsWithRef<T>, keyof TextOwnProps<T>>;

function getDecorationClass(underline: boolean, strikethrough: boolean): string {
  if (underline && strikethrough) {
    return styles.underlineStrikethrough;
  }
  if (underline) {
    return styles.underline;
  }
  if (strikethrough) {
    return styles.strikethrough;
  }
  return '';
}

export function Text<T extends TextAs = 'span'>({
  as,
  size,
  weight,
  color,
  align,
  mono = false,
  italic = false,
  underline = false,
  strikethrough = false,
  tabular = false,
  truncate = false,
  lineClamp,
  className = '',
  style,
  children,
  ...rest
}: TextProps<T>) {
  const hasLineClamp = typeof lineClamp === 'number' && lineClamp > 0;
  const resolvedStyle: CSSProperties | undefined = hasLineClamp
    ? ({ '--_line-clamp': lineClamp, ...style } as CSSProperties)
    : style;

  const classes = [
    styles.text,
    size ? styles[`size-${size}`] : '',
    weight ? styles[`weight-${weight}`] : '',
    color ? typographyStyles[`color-${color}`] : '',
    align ? typographyStyles[`align-${align}`] : '',
    mono ? styles.mono : '',
    italic ? styles.italic : '',
    getDecorationClass(underline, strikethrough),
    tabular ? styles.tabular : '',
    truncate ? typographyStyles.truncate : '',
    hasLineClamp ? styles.lineClamp : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return createElement(
    as ?? 'span',
    { ...rest, className: classes, style: resolvedStyle },
    children,
  );
}
