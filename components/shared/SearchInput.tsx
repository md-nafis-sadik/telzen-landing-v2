function SearchInput({
  placeholder,
  buttonText,
  className,
  inputClassName,
  buttonClassName,
}: {
  placeholder?: string;
  buttonText?: string;
  inputClassName?: string;
  className?: string;
  buttonClassName?: string;
}) {
  return (
    <div
      className={`flex items-center border border-[#8C8C8C] rounded-full overflow-hidden h-13 bg-white ${className}`}
    >
      <input
        type="text"
        placeholder={placeholder || "Text here"}
        className={`flex-1 pl-6 text-sm text-gray-700 placeholder-gray-400 focus:outline-none ${inputClassName}`}
      />

      <button
        className={`bg-[#00CD8E] text-white text-sm lg:text-base font-medium px-5 py-[7px] h-max rounded-full m-2 ${buttonClassName}`}
      >
        {buttonText || "Search"}
      </button>
    </div>
  );
}

export default SearchInput;
