import clsx from 'clsx';
import { HiOutlineCheck } from 'react-icons/hi';

import T from '../Text/T';
import { colors } from '../../../styles/colors';

export type CheckBoxProps = {
  text?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

const CheckBox = ({
  text,
  checked,
  onChange,
  required,
  disabled,
  className,
}: CheckBoxProps) => (
  <label
    className={clsx(
      'inline-flex cursor-pointer items-center gap-2.5',
      disabled && 'cursor-not-allowed opacity-50',
      className,
    )}
  >
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      aria-label={text}
      onChange={(e) => onChange(e.target.checked)}
      className="sr-only"
    />

    <span
      className={clsx(
        'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
        checked ? 'border-transparent text-white' : 'border-slate-300',
      )}
      style={{
        backgroundColor: checked
          ? colors.checkboxChecked
          : colors.checkboxBackground,
      }}
    >
      {checked && <HiOutlineCheck className="h-3 w-3" strokeWidth={3} />}
    </span>

    {text && (
      <span className="flex items-center gap-1">
        <T as="span" font="small" style={{ color: colors.checkboxLabel }}>
          {text}
        </T>
        {required && (
          <span
            className="text-sm font-bold"
            style={{ color: colors.formRequired }}
          >
            *
          </span>
        )}
      </span>
    )}
  </label>
);

export default CheckBox;
