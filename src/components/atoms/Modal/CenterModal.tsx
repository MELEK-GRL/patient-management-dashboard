import type { ReactNode } from 'react';
import clsx from 'clsx';

import T from '../Text/T';

interface CenterModalProps {
  open: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
  size?: 'md' | 'lg';
}

const modalSizes = {
  md: 'max-w-lg',
  lg: 'max-w-3xl',
} as const;

const CenterModal = ({
  open,
  title,
  children,
  onClose,
  size = 'md',
}: CenterModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
      "
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={clsx(
          'flex max-h-[90dvh] w-full flex-col overflow-hidden',
          'rounded-2xl bg-white shadow-xl sm:rounded-3xl',
          modalSizes[size],
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            gap-3
            border-b
            border-slate-100
            px-4
            py-3.5
            sm:px-6
            sm:py-4
          "
        >
          {title ? (
            <div id="modal-title" className="min-w-0 flex-1">
              <T
                font="medium"
                className="text-lg text-slate-900 sm:text-xl"
              >
                {title}
              </T>
            </div>
          ) : (
            <span className="flex-1" />
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              text-slate-500
              transition
              hover:text-slate-700
            "
          >
            ✕
          </button>
        </div>

        <div
          className="
            scrollbar-hide
            flex-1
            overflow-y-auto
            overscroll-contain
            px-4
            py-4
            sm:px-6
            sm:py-5
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default CenterModal;
