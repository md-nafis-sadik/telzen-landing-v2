import { cn } from "@/service";

function Button({
  buttonText = "Click Me",
  className = "",
  onClick,
  ...props
}: {
  buttonText?: string;
  className?: string;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const defaultButtonClass = "px-4 py-2 bg-primary-700 text-white rounded-full cursor-pointer hover:bg-primary-800 transition";
  return (
    <button 
      className={cn(defaultButtonClass, className)} 
      onClick={onClick}
      {...props}
    >
      {buttonText}
    </button>
  );
}

export default Button;
