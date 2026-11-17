import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import styles from './Avatar.module.css';

export type AvatarColor =
  | 'auto'
  | 'neutral'
  | 'accent'
  | 'blue'
  | 'purple'
  | 'cyan'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'red';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'rounded';
export type AvatarLoading = 'eager' | 'lazy';

const AUTO_PALETTE: Exclude<AvatarColor, 'auto' | 'neutral' | 'accent' | 'red'>[] = [
  'blue',
  'purple',
  'cyan',
  'green',
  'yellow',
  'orange',
];

function resolvePaletteColor(seed: string): Exclude<AvatarColor, 'auto'> {
  if (!seed) return 'neutral';
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AUTO_PALETTE[Math.abs(hash) % AUTO_PALETTE.length];
}

export function getAvatarInitials(name?: string | null): string {
  if (!name) return '?';
  const cleaned = name.replace(/^@+/, '').trim();
  if (!cleaned) return '?';

  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return parts[0][0].toUpperCase();
}

export interface AvatarProps extends Omit<ComponentPropsWithRef<'span'>, 'color'> {
  src?: string | null;
  alt?: string;
  name?: string | null;
  colorKey?: string | null;
  fallback?: ReactNode;
  color?: AvatarColor;
  size?: AvatarSize;
  shape?: AvatarShape;
  loading?: AvatarLoading;
}

export function Avatar({
  src,
  alt,
  name,
  colorKey,
  fallback,
  color = 'auto',
  size = 'md',
  shape = 'circle',
  loading,
  className = '',
  ...rest
}: AvatarProps) {
  const seed = colorKey || name || alt || '';
  const resolvedColor = color === 'auto' ? resolvePaletteColor(seed) : color;
  const resolvedFallback = fallback ?? getAvatarInitials(name || alt);

  const rootClasses = [styles.root, styles[size], styles[shape], styles[resolvedColor], className]
    .filter(Boolean)
    .join(' ');

  return (
    <BaseAvatar.Root className={rootClasses} data-palette={resolvedColor} {...rest}>
      <BaseAvatar.Fallback className={styles.fallback}>{resolvedFallback}</BaseAvatar.Fallback>
      {src ? (
        <BaseAvatar.Image
          keepMounted={loading !== undefined}
          src={src}
          alt={alt ?? name ?? ''}
          loading={loading}
          className={styles.image}
        />
      ) : null}
    </BaseAvatar.Root>
  );
}
