import clsx from 'clsx';

import T from '../Text/T';
import { colors } from '../../../styles/colors';
import { formatIdControl } from '../../../utils/formatDate';
import {
  sanitizeInput,
  type InputSanitizeMode,
} from '../../../utils/inputValidation';

export type TextareaProps = {
  label?: string;
  explanation?: string;
  required?: boolean;
  className?: string;
  id?: string;
  rows?: number;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  sanitize?: Extract<InputSanitizeMode, 'text'>;
  onChange?: (value: string) => void;
};

const Textarea = ({
  label,
  explanation,
  required,
  className,
  id,
  rows = 3,
  value,
  placeholder,
  disabled,
  sanitize,
  onChange,
}: TextareaProps) => {
  const textareaId = formatIdControl(label, id);

  return (
    <div className={clsx('flex w-full flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={textareaId} className="flex items-center gap-1">
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

      <textarea
        id={textareaId}
        rows={rows}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => {
          const nextValue = sanitize
            ? sanitizeInput(e.target.value, sanitize)
            : e.target.value;
          onChange?.(nextValue);
        }}
        className="min-h-22 w-full resize-y rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#CBD5E1] disabled:cursor-not-allowed placeholder:text-slate-400"
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

export default Textarea;
