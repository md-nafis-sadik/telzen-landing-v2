function BigToggleSwitch({
  primaryColor,
  firstbuttonText,
  secondbuttonText,
  className,
  secondaryColor,
}: {
  primaryColor?: string;
  firstbuttonText?: string;
  secondbuttonText?: string;
  secondaryColor?: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-natural-200 w-max rounded-full h-[52px] flex items-center font-semibold text-sm md:text-base ${className}`}
    >
      <div
        className={`rounded-full px-6 py-2 h-full flex items-center text-text-50 z-10 ${
          primaryColor || "bg-primary-700"
        }`}
      >
        <span>{firstbuttonText || "Countries"}</span>
      </div>
      <div
        className={`rounded-full px-6 py-2 h-full flex items-center -ml-3 ${
          secondaryColor || "bg-natural-200"
        }`}
      >
        <span>{secondbuttonText || "Regional Packs"}</span>
      </div>
    </div>
  );
}

export default BigToggleSwitch;
