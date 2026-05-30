import clsx from 'clsx';
import { HiOutlineCalendar } from 'react-icons/hi';

import T from '../Text/T';
import { colors } from '../../../styles/colors';
import { formatIdControl } from '../../../utils/formatDate';

export type DatePickerProps = {
  label?: string;
  explanation?: string;
  required?: boolean;
  className?: string;
  id?: string;
  value?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

const DATE_WEBKIT =
  '[&::-webkit-datetime-edit]:font-normal [&::-webkit-datetime-edit-fields-wrapper]:font-normal [&::-webkit-datetime-edit-month-field]:font-normal [&::-webkit-datetime-edit-day-field]:font-normal [&::-webkit-datetime-edit-year-field]:font-normal [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-10 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0';

const DatePicker = ({
  label,
  explanation,
  required,
  className,
  id,
  value = '',
  min,
  max,
  disabled,
  onChange,
}: DatePickerProps) => {
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

      <div className="relative">
        <input
          id={inputId}
          type="date"
          value={value}
          min={min}
          max={max}
          disabled={disabled}
          onChange={(event) => onChange?.(event.target.value)}
          className={clsx(
            'w-full rounded-lg border px-4 py-2.5 pr-10 text-sm font-normal outline-none focus:ring-2 disabled:cursor-not-allowed',
            DATE_WEBKIT,
          )}
          style={{
            borderColor: colors.fieldBorder,
            backgroundColor: disabled
              ? colors.fieldDisabledBackground
              : colors.fieldBackground,
            color: disabled ? colors.fieldDisabledText : colors.fieldText,
          }}
        />

        <HiOutlineCalendar
          className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2"
          style={{ color: colors.fieldIcon }}
          aria-hidden
        />
      </div>

      {explanation && (
        <T font="xsmall" style={{ color: colors.formHint }}>
          {explanation}
        </T>
      )}
    </div>
  );
};

export default DatePicker;
