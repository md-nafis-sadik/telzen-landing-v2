import React, { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/service/helpers/class.utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
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
      type = "text",
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;

    // Base input styles
    const baseStyles =
      "w-full px-4 py-3 border rounded-lg focus:ring-0 outline-none transition-all placeholder:text-xs md:placeholder:text-sm";

    // Border styles based on error state
    const borderStyles = error
      ? "border-red-500 focus:border-red-500"
      : "border-gray-300 focus:border-primary-700";

    // Combine all styles
    const inputClasses = cn(baseStyles, borderStyles, className);

    return (
      <div className={cn("w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-left text-xs md:text-sm font-medium text-text-700 mb-2",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={inputClasses}
          {...props}
        />
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

Input.displayName = "Input";

export default Input;
