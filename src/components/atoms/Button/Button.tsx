import type { CSSProperties } from 'react';
import { type ReactNode } from 'react';
import clsx from 'clsx';

import { colors } from '../../../styles/colors';
import { fonts } from '../../../styles/typography';

export type ButtonVariant = 'primary' | 'secondary' | 'cancel' | 'danger';

interface ButtonProps {
  children: ReactNode;
  backgroundColor?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const BUTTON_LAYOUT = 'rounded-md px-4 py-2';

const buttonStyles: Record<ButtonVariant, CSSProperties> = {
  primary: {
    backgroundColor: colors.buttonPrimary,
    color: colors.buttonText,
  },
  secondary: {
    backgroundColor: colors.buttonSecondary,
    color: colors.buttonText,
  },
  cancel: {
    backgroundColor: colors.buttonGray,
    color: colors.buttonText,
  },
  danger: {
    backgroundColor: colors.buttonDanger,
    color: colors.buttonText,
  },
};

const Button = ({
  children,
  backgroundColor = 'primary',
  onClick,
  disabled,
  className,
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={buttonStyles[backgroundColor]}
      className={clsx(
        BUTTON_LAYOUT,
        fonts.semiBold,
        disabled && 'cursor-not-allowed opacity-60',
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
