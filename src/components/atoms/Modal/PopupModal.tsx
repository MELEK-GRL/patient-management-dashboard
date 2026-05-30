import clsx from 'clsx';
import type { IconType } from 'react-icons';
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineInformationCircle,
} from 'react-icons/hi';

import Button, { type ButtonVariant } from '../Button/Button';
import T from '../Text/T';

export type PopupModalStatus = 'danger' | 'success' | 'info';

interface PopupModalProps {
  open: boolean;
  onClose?: () => void;
  status?: PopupModalStatus;
  title?: string;
  message?: string;
  leftButtonText?: string;
  rightButtonText?: string;
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
  leftButtonVariant?: ButtonVariant;
  rightButtonVariant?: ButtonVariant;
  buttonDirection?: 'row' | 'column';
}

const statusConfig: Record<
  PopupModalStatus,
  { Icon: IconType; circle: string; icon: string }
> = {
  danger: {
    Icon: HiOutlineExclamationCircle,
    circle: 'bg-red-50 ring-1 ring-red-100',
    icon: 'text-red-600',
  },
  success: {
    Icon: HiOutlineCheckCircle,
    circle: 'bg-emerald-50 ring-1 ring-emerald-100',
    icon: 'text-emerald-600',
  },
  info: {
    Icon: HiOutlineInformationCircle,
    circle: 'bg-sky-50 ring-1 ring-sky-100',
    icon: 'text-sky-600',
  },
};

const PopupModal = ({
  open,
  onClose,
  status = 'info',
  title,
  message,
  leftButtonText,
  rightButtonText,
  onLeftButtonClick,
  onRightButtonClick,
  leftButtonVariant = 'cancel',
  rightButtonVariant = 'danger',
  buttonDirection = 'row',
}: PopupModalProps) => {
  if (!open) {
    return null;
  }

  const handleClose = onClose ?? onLeftButtonClick;
  const hasButtons = Boolean(leftButtonText || rightButtonText);
  const iconStyles = statusConfig[status];
  const StatusIcon = iconStyles.Icon;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
      onClick={handleClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={clsx(
          'relative w-full max-w-md animate-in fade-in rounded-3xl bg-white p-6 shadow-xl',
          'pt-12',
        )}
      >
        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
          <span
            className={clsx(
              'flex h-20 w-20 items-center justify-center rounded-full shadow-sm ring-4 ring-white',
              iconStyles.circle,
            )}
          >
            <StatusIcon
              className={clsx('h-10 w-10', iconStyles.icon)}
              aria-hidden
            />
          </span>
        </div>

        <button
          type="button"
          onClick={handleClose}
          aria-label="Kapat"
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100"
        >
          ✕
        </button>

        {title ? (
          <h2 className="mb-5 pr-10 text-lg font-semibold text-slate-900">
            {title}
          </h2>
        ) : null}

        {message ? (
          <T
            className={clsx(
              'block text-center text-slate-600',
              !title && 'mt-1',
            )}
          >
            {message}
          </T>
        ) : null}

        {hasButtons ? (
          <div
            className={clsx(
              buttonDirection === 'column'
                ? 'flex flex-col items-center gap-3'
                : 'flex justify-center gap-3',
              message ? 'mt-6' : 'mt-8',
            )}
          >
            {leftButtonText ? (
              <Button
                backgroundColor={leftButtonVariant}
                className="min-w-28 px-8"
                onClick={onLeftButtonClick ?? handleClose}
              >
                {leftButtonText}
              </Button>
            ) : null}

            {rightButtonText ? (
              <Button
                backgroundColor={rightButtonVariant}
                className="min-w-28 px-8"
                onClick={onRightButtonClick}
              >
                {rightButtonText}
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PopupModal;
