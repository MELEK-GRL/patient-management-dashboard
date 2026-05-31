import type { CSSProperties } from 'react';
import { type ReactNode } from 'react';
import clsx from 'clsx';

import ActivityIndicator from '../FeedBack/ActivityIndicator';
import { colors } from '../../../styles/colors';
import { fonts } from '../../../styles/typography';

export type ButtonVariant = 'primary' | 'cancel' | 'danger';

interface ButtonProps {
  children: ReactNode;
  backgroundColor?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const BUTTON_LAYOUT = 'rounded-md px-4 py-2';

const buttonStyles: Record<ButtonVariant, CSSProperties> = {
  primary: {
    backgroundColor: colors.buttonPrimary,
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
  loading = false,
  className,
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
      style={buttonStyles[backgroundColor]}
      className={clsx(
        BUTTON_LAYOUT,
        'inline-flex items-center justify-center',
        fonts.semiBold,
        isDisabled && 'cursor-not-allowed opacity-60',
        className,
      )}
    >
      {loading ? (
        <ActivityIndicator size={18} color={colors.buttonText} />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
