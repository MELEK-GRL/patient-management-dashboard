import type { CSSProperties } from 'react';
import { type ElementType, type ReactNode } from 'react';
import clsx from 'clsx';

import { fonts } from '../../../styles/typography';

interface TProps {
  children: ReactNode;
  font?: keyof typeof fonts;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

const T = ({
  children,
  font = 'small',
  as: Component = 'p',
  className,
  style,
}: TProps) => {
  return (
    <Component className={clsx(fonts[font], className)} style={style}>
      {children}
    </Component>
  );
};

export default T;
