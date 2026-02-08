"use client";

import React, { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { useGetCountriesQuery } from "@/store/modules/destination/destinationApi";
import Image from "next/image";
import { useCurrency } from "@/hook/useCurrency";

interface SearchInputProps {
  placeholder?: string;
  buttonText?: string;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  value?: string;
  isFetching?: boolean;
  onChange?: (value: string) => void;
  onSearch?: () => void;
  onSelect?: (item: any) => void;
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
  onSelect,
  isFetching,
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { currencyCode } = useCurrency();

  const currentValue = value !== undefined ? value : internalValue;

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: countriesData, isLoading } = useGetCountriesQuery(
    {
      page: 1,
      limit: 999,
      search: currentValue,
      currency_code: currencyCode,
    },
    {
      skip: !isFocused && !showDropdown,
    }
  );

  const filteredCountries = useMemo(() => {
    return countriesData?.data || [];
  }, [countriesData?.data]);

  const updateDropdownPosition = useCallback(() => {
    if (containerRef.current && showDropdown) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [showDropdown]);

  useEffect(() => {
    if (showDropdown) {
      updateDropdownPosition();

      const handleScroll = () => {
        updateDropdownPosition();
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > window.innerHeight) {
            setShowDropdown(false);
          }
        }
      };
      const handleResize = () => updateDropdownPosition();

      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("scroll", handleScroll, true);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [showDropdown, updateDropdownPosition]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!showDropdown && isFocused && inputRef.current && !isSelecting) {
      inputRef.current.focus();
    }
    setIsSelecting(false);
  }, [showDropdown, isFocused, isSelecting]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (onChange) {
        onChange(newValue);
      } else {
        setInternalValue(newValue);
      }
      setShowDropdown(true);
    },
    [onChange]
  );

  const handleFocus = () => {
    setIsFocused(true);
    setShowDropdown(true);
  };

const handleItemClick = (item: any) => {
  setIsSelecting(true);
  const itemName = item.name;

  if (onChange) {
    onChange(itemName);
  } else {
    setInternalValue(itemName);
  }

  setSelectedItem(item);

  setShowDropdown(false);
  setIsFocused(false);

  if (inputRef.current) {
    inputRef.current.blur();
  }

  if (onSelect) {
    onSelect(item);
  }

  setTimeout(() => {
    if (onSearch) {
      onSearch();
    }
  }, 100);
};

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setShowDropdown(false);
      setIsFocused(false);
      
      onSearch?.();
    },
    [onSearch]
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setShowDropdown(false);
        setIsFocused(false);
        
        // Trigger search
        onSearch?.();
      }
    },
    [onSearch]
  );

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      if (!isSelecting) {
        setIsFocused(false);
        setShowDropdown(false);
      }
    }, 100);
  };

  const dropdownContent =
    showDropdown && mounted ? (
      <AnimatePresence>
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`,
            zIndex: 9999,
          }}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
        >
          <div
            className="max-h-[300px] overflow-y-auto"
            onWheel={(e) => e.stopPropagation()}
          >
            {isLoading ? (
              <div className="p-4 text-center text-gray-500 test-sm">
                Loading destinations...
              </div>
            ) : filteredCountries.length > 0 ? (
              <ul>
                {filteredCountries.map((country: any) => (
                  <motion.li
                    key={country._id}
                    onClick={() => handleItemClick(country)}
                    whileHover={{ backgroundColor: "#f9fafb" }}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                  >
                    <Image
                      src={country.flag}
                      alt={country.name}
                      width={24}
                      height={16}
                      className="w-6 h-4 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {country.name}
                      </p>
                      {country.region && (
                        <p className="text-xs text-gray-500">
                          {country.region.name}
                        </p>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-sm text-gray-500">
                No destinations found
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    ) : null;

  return (
    <>
      <div ref={containerRef} className="relative w-full">
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
              ref={inputRef}
              type="text"
              placeholder={placeholder || "Text here"}
              value={currentValue}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
              className={`flex-1 pl-3 sm:pl-4 md:pl-6 text-sm text-gray-700 placeholder-gray-400 focus:outline-none min-w-0 ${inputClassName}`}
            />

            <motion.button
              type="submit"
              className={`bg-[#00CD8E] text-white text-xs sm:text-sm lg:text-base font-medium px-4 md:px-5 py-[7px] h-max rounded-full m-1.5 sm:m-2 cursor-pointer flex-shrink-0 disabled:opacity-50 ${buttonClassName}`}
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
              disabled={isFetching}
            >
              {buttonText || "Search"}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>

      {/* Portal for dropdown */}
      {mounted &&
        typeof document !== "undefined" &&
        dropdownContent &&
        createPortal(dropdownContent, document.body)}
    </>
  );
}

export default SearchInput;