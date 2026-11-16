import { type ComponentPropsWithRef, useCallback, useEffect, useRef, useState } from 'react';
import styles from './ScrollShadow.module.css';

export interface ScrollShadowProps extends ComponentPropsWithRef<'div'> {
  hideScrollBar?: boolean;
}

export function ScrollShadow({
  hideScrollBar = false,
  className = '',
  children,
  onScroll,
  ...rest
}: ScrollShadowProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [edges, setEdges] = useState<{ top: boolean; bottom: boolean }>({
    top: false,
    bottom: false,
  });

  const updateEdges = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const hasTop = el.scrollTop > 4;
    const hasBottom = el.scrollHeight - el.scrollTop - el.clientHeight > 4;

    setEdges((prev) => {
      if (prev.top === hasTop && prev.bottom === hasBottom) return prev;
      return { top: hasTop, bottom: hasBottom };
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    updateEdges();
    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(updateEdges);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateEdges]);

  const classes = [
    styles.container,
    hideScrollBar ? styles.hideScrollBar : '',
    edges.top && edges.bottom ? styles.maskBoth : '',
    edges.top && !edges.bottom ? styles.maskTop : '',
    !edges.top && edges.bottom ? styles.maskBottom : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={containerRef}
      className={classes}
      onScroll={(e) => {
        updateEdges();
        onScroll?.(e);
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
