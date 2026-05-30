import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type RefObject,
} from 'react';
import clsx from 'clsx';
import { HiOutlineCheck, HiOutlineChevronDown } from 'react-icons/hi';

import T from '../../atoms/Text/T';
import { colors } from '../../../styles/colors';

export type DropdownOption = {
  value: string;
  label: string;
};

interface DropdownProps {
  label?: string;
  required?: boolean;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  weight?: 'normal' | 'semibold';
}

const focusStyle =
  'flex w-full items-center justify-between gap-2 rounded-lg border py-2.5 pl-4 pr-3.5 text-left text-sm outline-none transition-[border-color,box-shadow] focus:ring-2';

const Dropdown = ({
  label,
  required,
  value,
  options,
  onChange,
  placeholder,
  className,
  weight = 'semibold',
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const listOptions = placeholder
    ? options.filter((option) => option.value !== '')
    : options;

  const selectedOption = listOptions.find(
    (option) => option.value === value,
  );

  const displayLabel =
    selectedOption?.label ??
    (placeholder && !value ? placeholder : '');

  const textColor =
    weight === 'normal'
      ? colors.dropdownTextPlaceholder
      : value && selectedOption
        ? colors.dropdownTextValue
        : colors.dropdownTextPlaceholder;

  const closeDropdown = useCallback(() => setIsOpen(false), []);
  useDismissOnOutsideAndEscape(containerRef, isOpen, closeDropdown);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={clsx('relative w-full min-w-40', className)}
    >
      {label ? (
        <div className="flex items-center gap-1">
          <T
            as="span"
            font="small"
            className="text-sm font-bold tracking-wide"
            style={{ color: colors.formLabel }}
          >
            {label}
          </T>
          {required ? (
            <span
              className="text-sm font-bold"
              style={{ color: colors.formRequired }}
              aria-hidden
            >
              *
            </span>
          ) : null}
        </div>
      ) : null}

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => setIsOpen((open) => !open)}
        className={focusStyle}
        style={{
          borderColor: colors.fieldBorder,
          backgroundColor: colors.fieldBackground,
          color: colors.fieldText,
        }}
      >
        <T
          as="span"
          font="small"
          className={clsx(
            'min-w-0 flex-1 truncate',
            weight === 'normal' ? 'font-normal' : 'font-semibold',
          )}
          style={{ color: textColor }}
        >
          {displayLabel}
        </T>

        <HiOutlineChevronDown
          className={clsx(
            'h-4 w-4 shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
          style={{ color: colors.dropdownChevron }}
          aria-hidden
        />
      </button>

      {isOpen ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={label}
          className="absolute left-0 right-0 z-70 mt-1.5 max-h-48 overflow-y-auto overscroll-contain rounded-xl border py-1 shadow-lg"
          style={{
            borderColor: colors.fieldBorder,
            backgroundColor: colors.fieldBackground,
          }}
        >
          {listOptions.map((option) => {
            const isSelected = option.value === value;

            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.value)}
                  className="flex w-full items-center gap-2 px-3.5 py-2 text-left outline-none"
                  style={{
                    backgroundColor: isSelected
                      ? colors.dropdownOptionSelectedBg
                      : undefined,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor =
                        colors.dropdownOptionHoverBg;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = '';
                    }
                  }}
                >
                  <span
                    className="flex h-4 w-4 shrink-0 items-center justify-center"
                    style={{
                      color: isSelected
                        ? colors.dropdownCheckIcon
                        : 'transparent',
                    }}
                    aria-hidden
                  >
                    <HiOutlineCheck className="h-4 w-4" />
                  </span>

                  <T
                    as="span"
                    font={isSelected ? 'semiBold' : 'small'}
                    className="min-w-0 flex-1 truncate"
                    style={{
                      color: isSelected
                        ? colors.dropdownOptionTextSelected
                        : colors.dropdownOptionText,
                    }}
                  >
                    {option.label}
                  </T>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

function useDismissOnOutsideAndEscape(
  containerRef: RefObject<HTMLElement | null>,
  isActive: boolean,
  onDismiss: () => void,
) {
  useEffect(() => {
    if (!isActive) return;

    const onPointerDown = (event: PointerEvent) => {
      const container = containerRef.current;
      if (container && !container.contains(event.target as Node)) {
        onDismiss();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onDismiss();
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [containerRef, isActive, onDismiss]);
}

export default Dropdown;
