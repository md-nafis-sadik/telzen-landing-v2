import { cn } from "@/service";
import React, {
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type Side = "top" | "right" | "bottom" | "left";
type Align = "start" | "center" | "end";

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  side?: Side;
  align?: Align;
  sideOffset?: number;
  alignOffset?: number;
  contentClassName?: string;
}

interface DropdownItemProps {
  className?: string;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  side = "bottom",
  align = "start",
  sideOffset = 8,
  alignOffset = 0,
  contentClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const getPositionClasses = (): string => {
    const positions: Record<Side, Record<Align, string>> = {
      bottom: {
        start: `top-full left-0 mt-[${sideOffset}px] ml-[${alignOffset}px]`,
        center: `top-full left-1/2 -translate-x-1/2 mt-[${sideOffset}px]`,
        end: `top-full right-0 mt-[${sideOffset}px] mr-[${alignOffset}px]`,
      },
      top: {
        start: `bottom-full left-0 mb-[${sideOffset}px] ml-[${alignOffset}px]`,
        center: `bottom-full left-1/2 -translate-x-1/2 mb-[${sideOffset}px]`,
        end: `bottom-full right-0 mb-[${sideOffset}px] mr-[${alignOffset}px]`,
      },
      right: {
        start: `left-full top-0 ml-[${sideOffset}px] mt-[${alignOffset}px]`,
        center: `left-full top-1/2 -translate-y-1/2 ml-[${sideOffset}px]`,
        end: `left-full bottom-0 ml-[${sideOffset}px] mb-[${alignOffset}px]`,
      },
      left: {
        start: `right-full top-0 mr-[${sideOffset}px] mt-[${alignOffset}px]`,
        center: `right-full top-1/2 -translate-y-1/2 mr-[${sideOffset}px]`,
        end: `right-full bottom-0 mr-[${sideOffset}px] mb-[${alignOffset}px]`,
      },
    };

    return positions[side][align];
  };

  const getPositionStyles = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = { position: "absolute" };

    if (side === "bottom") {
      baseStyle.top = "100%";
      baseStyle.marginTop = `${sideOffset}px`;
      if (align === "start") {
        baseStyle.left = alignOffset;
      } else if (align === "center") {
        baseStyle.left = "50%";
        baseStyle.transform = "translateX(-50%)";
      } else {
        baseStyle.right = alignOffset;
      }
    } else if (side === "top") {
      baseStyle.bottom = "100%";
      baseStyle.marginBottom = `${sideOffset}px`;
      if (align === "start") {
        baseStyle.left = alignOffset;
      } else if (align === "center") {
        baseStyle.left = "50%";
        baseStyle.transform = "translateX(-50%)";
      } else {
        baseStyle.right = alignOffset;
      }
    } else if (side === "right") {
      baseStyle.left = "100%";
      baseStyle.marginLeft = `${sideOffset}px`;
      if (align === "start") {
        baseStyle.top = alignOffset;
      } else if (align === "center") {
        baseStyle.top = "50%";
        baseStyle.transform = "translateY(-50%)";
      } else {
        baseStyle.bottom = alignOffset;
      }
    } else if (side === "left") {
      baseStyle.right = "100%";
      baseStyle.marginRight = `${sideOffset}px`;
      if (align === "start") {
        baseStyle.top = alignOffset;
      } else if (align === "center") {
        baseStyle.top = "50%";
        baseStyle.transform = "translateY(-50%)";
      } else {
        baseStyle.bottom = alignOffset;
      }
    }

    return baseStyle;
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          className={cn(
            "w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50",
            contentClassName
          )}
          style={getPositionStyles()}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement<DropdownItemProps>(child)) {
              return React.cloneElement(child, {
                onClick: (e: MouseEvent<HTMLDivElement>) => {
                  if (child.props.onClick) {
                    child.props.onClick(e);
                  }
                  setIsOpen(false);
                },
              });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
};

export const DropdownItem: React.FC<DropdownItemProps> = ({
  className,
  children,
  onClick,
}) => {
  return (
    <div
      className={cn(
        "px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
