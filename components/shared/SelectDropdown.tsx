"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheverondownIconSvg } from "@/service";
import ReactCountryFlag from "react-country-flag";
import Image from "next/image";

export interface SelectOption {
  value: string;
  label: string;
  code?: string; // For country codes or any additional identifier
  image?: string; // For custom images
  flagCode?: string; // For country flag codes
}

interface SelectDropdownProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string, option: SelectOption) => void;
  placeholder?: string;
  label?: string;
  showFlag?: boolean;
  showImage?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
}

function SelectDropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  showFlag = false,
  showImage = false,
  searchable = false,
  disabled = false,
  className = "",
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  // Filter options based on search term
  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option: SelectOption) => {
    onChange(option.value, option);
    setIsOpen(false);
    setSearchTerm("");
  };

  const renderOptionContent = (option: SelectOption, isSelected = false) => (
    <div className={`flex items-center gap-3 cursor-pointer ${isSelected ? "w-full" : ""}`}>
      {/* Flag */}
      {showFlag && option.flagCode && (
        <ReactCountryFlag
          countryCode={option.flagCode}
          svg
          style={{
            width: "24px",
            height: "24px",
            objectFit: "cover",
            borderRadius: "100%",
          }}
        />
      )}
      
      {/* Custom Image */}
      {showImage && option.image && (
        <div className="relative w-5 h-4">
          <Image
            src={option.image}
            alt={option.label}
            width={20}
            height={16}
            className="object-cover rounded-sm"
          />
        </div>
      )}
      
      {/* Label */}
      <span className={`${isSelected ? "truncate" : ""}`}>
        {option.label}
      </span>
    </div>
  );

  return (
    <div className={`relative ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-left text-xs md:text-sm font-medium text-text-700 mb-2">
          {label}
        </label>
      )}

      {/* Selected Value Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:border-primary-700 outline-none transition-all text-left flex items-center justify-between ${
          disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white hover:border-gray-400"
        }`}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {selectedOption ? (
            renderOptionContent(selectedOption, true)
          ) : (
            <span className="text-gray-500 text-sm md:text-base truncate">
              {placeholder}
            </span>
          )}
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 ml-2"
        >
          <CheverondownIconSvg className="w-4 h-4 text-gray-500" />
        </motion.div>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden"
          >
            {/* Search Input */}
            {searchable && (
              <div className="p-2 border-b border-gray-100">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-0 focus:border-primary-700 outline-none"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}

            {/* Options List */}
            <div className="overflow-y-auto max-h-48">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                    onClick={() => handleSelect(option)}
                    className={`w-full px-4 py-3 text-left flex items-center gap-2 transition-colors text-sm md:text-base ${
                      option.value === value
                        ? "bg-primary-50 text-primary-700 font-medium"
                        : "text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {renderOptionContent(option)}
                  </motion.button>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">
                  No options found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SelectDropdown;