import {
  useEffect,
  useId,
  useRef,
  useState,
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
  onChange: (selectedValue: string) => void;
  placeholder?: string;
  className?: string;
  fontWeight?: 'normal' | 'semibold';
  mutedText?: boolean;
}

const fieldStyle = {
  borderColor: colors.fieldBorder,
  backgroundColor: colors.fieldBackground,
};

const buttonClass =
  'flex h-11 w-full items-center justify-between gap-2 rounded-lg border px-4 text-left text-sm outline-none transition-colors focus:border-[#CBD5E1]';

const Dropdown = ({
  label,
  required,
  value,
  options,
  onChange,
  placeholder,
  className,
  fontWeight = 'normal',
  mutedText = false,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const visibleOptions = getVisibleOptions(options, placeholder);
  const selectedOption = visibleOptions.find((option) => option.value === value);
  const buttonLabel = getButtonLabel(selectedOption, value, placeholder);
  const buttonTextColor = getButtonTextColor(value, selectedOption, mutedText);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('pointerdown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (newValue: string) => {
    onChange(newValue);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={clsx('relative flex w-full min-w-40 flex-col gap-1.5', className)}
    >
      {label && <DropdownLabel label={label} required={required} />}

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
        className={buttonClass}
        style={{ ...fieldStyle, color: colors.fieldText }}
      >
        <T
          as="span"
          font="small"
          className={clsx(
            'min-w-0 flex-1 truncate',
            fontWeight === 'normal' ? 'font-normal' : 'font-semibold',
          )}
          style={{ color: buttonTextColor }}
        >
          {buttonLabel}
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

      {isOpen && (
        <ul
          id={menuId}
          role="listbox"
          aria-label={label}
          className="absolute left-0 right-0 z-70 mt-0.5 max-h-48 overflow-y-auto overscroll-contain rounded-lg border py-1 shadow-lg"
          style={fieldStyle}
        >
          {visibleOptions.map((option) => (
            <DropdownOptionItem
              key={option.value}
              option={option}
              isSelected={option.value === value}
              onSelect={handleSelect}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

function DropdownLabel({
  label,
  required,
}: {
  label: string;
  required?: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
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
          aria-hidden
        >
          *
        </span>
      )}
    </div>
  );
}

function DropdownOptionItem({
  option,
  isSelected,
  onSelect,
}: {
  option: DropdownOption;
  isSelected: boolean;
  onSelect: (value: string) => void;
}) {
  return (
    <li role="presentation">
      <button
        type="button"
        role="option"
        aria-selected={isSelected}
        onClick={() => onSelect(option.value)}
        className="flex w-full items-center gap-2 px-3.5 py-2 text-left outline-none"
        style={{
          backgroundColor: isSelected
            ? colors.dropdownOptionSelectedBg
            : undefined,
        }}
        onMouseEnter={(event) => {
          if (!isSelected) {
            event.currentTarget.style.backgroundColor =
              colors.dropdownOptionHoverBg;
          }
        }}
        onMouseLeave={(event) => {
          if (!isSelected) {
            event.currentTarget.style.backgroundColor = '';
          }
        }}
      >
        <span
          className="flex h-4 w-4 shrink-0 items-center justify-center"
          style={{
            color: isSelected ? colors.dropdownCheckIcon : 'transparent',
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
}

function getVisibleOptions(
  options: DropdownOption[],
  placeholder?: string,
): DropdownOption[] {
  if (!placeholder) return options;
  return options.filter((option) => option.value !== '');
}

function getButtonLabel(
  selectedOption: DropdownOption | undefined,
  value: string,
  placeholder?: string,
): string {
  if (selectedOption) return selectedOption.label;
  if (placeholder && !value) return placeholder;
  return '';
}

function getButtonTextColor(
  value: string,
  selectedOption: DropdownOption | undefined,
  mutedText = false,
): string {
  if (mutedText || !value || !selectedOption) {
    return colors.dropdownTextPlaceholder;
  }

  return colors.dropdownTextValue;
}

export default Dropdown;
