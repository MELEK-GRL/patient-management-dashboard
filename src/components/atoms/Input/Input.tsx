import clsx from 'clsx';

import T from '../Text/T';
import { colors } from '../../../styles/colors';
import { formatIdControl } from '../../../utils/formatDate';

export type InputProps = {
  label?: string;
  explanation?: string;
  required?: boolean;
  className?: string;
  id?: string;
  type?: string;
  value?: string | number;
  placeholder?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

const Input = ({
  label,
  explanation,
  required,
  className,
  id,
  type = 'text',
  value,
  placeholder,
  min,
  max,
  disabled,
  onChange,
}: InputProps) => {
  const inputId = formatIdControl(label, id);

  return (
    <div className={clsx('flex w-full flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={inputId} className="flex items-center gap-1">
          <T
            as="span"
            font="small"
            className="text-sm font-bold tracking-wide"
            style={{ color: colors.formLabel }}
          >
            {label}
          </T>
          {required && (
            <span
              className="text-sm font-bold"
              style={{ color: colors.formRequired }}
            >
              *
            </span>
          )}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        value={value}
        placeholder={placeholder}
        min={min}
        max={max}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#CBD5E1] disabled:cursor-not-allowed placeholder:text-slate-400"
        style={{
          borderColor: colors.fieldBorder,
          backgroundColor: disabled
            ? colors.fieldDisabledBackground
            : colors.fieldBackground,
          color: disabled ? colors.fieldDisabledText : colors.fieldText,
          fontWeight: 400,
        }}
      />

      {explanation && (
        <T font="xsmall" style={{ color: colors.formHint }}>
          {explanation}
        </T>
      )}
    </div>
  );
};

export default Input;
