import React, { forwardRef, SelectHTMLAttributes } from "react";
import { cn } from "@/service/helpers/class.utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  options?: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      containerClassName,
      labelClassName,
      errorClassName,
      className,
      id,
      options = [],
      placeholder,
      children,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, "-")}`;

    // Base select styles
    const baseStyles =
      "w-full px-4 py-3 border rounded-lg focus:ring-0 outline-none transition-all appearance-none bg-white cursor-pointer";

    // Border styles based on error state
    const borderStyles = error
      ? "border-red-500 focus:border-red-500"
      : "border-gray-300 focus:border-primary-700";

    // Combine all styles
    const selectClasses = cn(baseStyles, borderStyles, className);

    return (
      <div className={cn("w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              "block text-left text-xs md:text-sm font-medium text-text-700 mb-2",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={selectClasses}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.length > 0
              ? options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))
              : children}
          </select>
          {/* Dropdown arrow icon */}
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {error && (
          <p
            className={cn(
              "mt-1 text-xs text-red-500",
              errorClassName
            )}
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-xs text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
