"use client";

import React, { useState, useCallback } from "react";
import { motion } from "motion/react";

interface SearchInputProps {
  placeholder?: string;
  buttonText?: string;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: () => void;
}

function SearchInput({
  placeholder,
  buttonText,
  className,
  inputClassName,
  buttonClassName,
  value,
  onChange,
  onSearch,
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState("");

  const currentValue = value !== undefined ? value : internalValue;

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  }, [onChange]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.();
  }, [onSearch]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch?.();
    }
  }, [onSearch]);

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`flex items-center border border-[#8C8C8C] rounded-full overflow-hidden min-h-[44px] sm:h-13 bg-white ${className}`}
        whileFocus={{
          borderColor: "#00CD8E",
          boxShadow: "0 0 0 2px rgba(0, 205, 142, 0.1)",
        }}
        transition={{ duration: 0.2 }}
      >
        <input
          type="text"
          placeholder={placeholder || "Text here"}
          value={currentValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className={`flex-1 pl-3 sm:pl-4 md:pl-6 text-sm text-gray-700 placeholder-gray-400 focus:outline-none min-w-0 ${inputClassName}`}
        />

        <motion.button
          type="submit"
          className={`bg-[#00CD8E] text-white text-xs sm:text-sm lg:text-base font-medium px-3 sm:px-4 md:px-5 py-[7px] h-max rounded-full m-1.5 sm:m-2 cursor-pointer flex-shrink-0 ${buttonClassName}`}
          whileHover={{
            scale: 1.05,
            backgroundColor: "#00B87A",
          }}
          whileTap={{
            scale: 0.95,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17,
          }}
        >
          {buttonText || "Search"}
        </motion.button>
      </motion.div>
    </motion.form>
  );
}

export default SearchInput;
