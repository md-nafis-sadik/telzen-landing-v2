import { cn } from "@/service";
import { motion } from "motion/react";
import { forwardRef } from "react";

export type ButtonVariant =
  | "primary" // bg-primary-700 text-white
  | "secondary" // border text-black
  | "link" // text-primary-700 inline
  | "google"; // border with Google styling

export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  children?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  animate?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      loadingText,
      fullWidth = false,
      children,
      leftIcon,
      rightIcon,
      animate = false,
      className = "",
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles =
      "rounded-full font-medium transition-all inline-flex items-center justify-center gap-2";

    // Variant styles
    const variantStyles = {
      primary:
        "bg-primary-700 text-white hover:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
      secondary:
        "border border-natural-500 text-black hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-semibold",
      link: "text-primary-700 hover:text-primary-800 transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer p-0 bg-transparent border-0",
      google:
        "border border-natural-500 text-black hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-semibold",
    };

    // Size styles
    const sizeStyles = {
      sm: "px-3 py-1.5 text-xs md:text-sm h-9",
      md: "px-4 py-2 text-sm md:text-base h-11 md:h-13",
      lg: "px-6 py-3 text-base md:text-lg h-12 md:h-14",
    };

    // Width styles
    const widthStyles = fullWidth ? "w-full" : "";

    // Combine all styles
    const buttonClasses = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      widthStyles,
      className
    );

    const content = (
      <>
        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        {isLoading ? loadingText || children : children}
        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </>
    );

    if (animate) {
      const { 
        onDragStart, 
        onDragEnd, 
        onDrag,
        onAnimationStart,
        onAnimationEnd,
        onAnimationIteration,
        ...restProps 
      } = props;
      return (
        <motion.button
          ref={ref}
          whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
          whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
          className={buttonClasses}
          disabled={disabled || isLoading}
          type={type}
          {...restProps}
        >
          {content}
        </motion.button>
      );
    }

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        type={type}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

