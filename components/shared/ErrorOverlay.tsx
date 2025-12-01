"use client";

import React from "react";
import { cn, ReloadSvg } from "@/service";

interface ErrorOverlayProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
  overlayClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  buttonClassName?: string;
  showButton?: boolean;
  showIcon?: boolean;
  icon?: React.ReactNode;
  backgroundColor?: string;
}

function ErrorOverlay({
  title = "Failed to Load",
  description = "We couldn't fetch the data. Please try again.",
  buttonText = "Reload Page",
  onButtonClick = () => window.location.reload(),
  className = "",
  overlayClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  buttonClassName = "",
  showButton = true,
  showIcon = true,
  icon,
  backgroundColor = "bg-primary-black/60",
}: ErrorOverlayProps) {
  const defaultIcon = <ReloadSvg />;

  return (
    <div
      className={cn(
        "absolute inset-0 backdrop-blur-sm rounded-3xl z-10 flex flex-col items-center justify-center px-4",
        backgroundColor,
        overlayClassName
      )}
    >
      <div className={cn("text-center max-w-md", className)}>
        <h3
          className={cn(
            "text-xl md:text-2xl font-bold text-primary-700 mb-2",
            titleClassName
          )}
        >
          {title}
        </h3>
        <p className={cn("text-text-200 mb-6", descriptionClassName)}>
          {description}
        </p>
        {showButton && (
          <button
            onClick={onButtonClick}
            className={cn(
              "px-4 md:px-6 py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-full font-semibold transition-colors duration-200 flex items-center gap-2 mx-auto cursor-pointer",
              buttonClassName
            )}
          >
            {showIcon && (icon || defaultIcon)}
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorOverlay;
