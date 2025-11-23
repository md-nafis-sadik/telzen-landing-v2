import React, { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "@/service/helpers/class.utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${label?.toLowerCase().replace(/\s+/g, "-")}`;

    // Base textarea styles
    const baseStyles =
      "w-full px-4 py-3 border rounded-lg focus:ring-0 outline-none transition-all placeholder:text-xs md:placeholder:text-sm resize-none";

    // Border styles based on error state
    const borderStyles = error
      ? "border-red-500 focus:border-red-500"
      : "border-gray-300 focus:border-primary-700";

    // Combine all styles
    const textareaClasses = cn(baseStyles, borderStyles, className);

    return (
      <div className={cn("w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "block text-left text-xs md:text-sm font-medium text-text-700 mb-2",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={textareaClasses}
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

Textarea.displayName = "Textarea";

export default Textarea;
