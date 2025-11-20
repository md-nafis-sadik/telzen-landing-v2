"use client";

import { CloseIcon, cn, MenuIcon } from "@/service";
import { useSharedStore } from "@/store";

function ClientNavigation({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { showMenu, setShowMenu } = useSharedStore();
  return (
    <div className={cn("flex items-center", className)}>
      <button
        type="button"
        className="sm:hidden"
        onClick={() => setShowMenu(true)}
      >
        <MenuIcon />
      </button>
      <div
        className={cn(
          "fixed top-0 left-0 h-screen w-full bg-white sm:relative sm:top-auto sm:left-auto sm:h-auto z-[999] duration-300 sm:bg-transparent sm:pointer-events-auto sm:opacity-100",
          showMenu
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none delay-300"
        )}
        onClick={() => setShowMenu(false)}
      >
        <div
          className={cn(
            "h-full flex flex-col justify-between w-full max-w-96 sm:max-w-none relative z-50 duration-300  sm:translate-x-0 p-6 pt-14 sm:p-0",
            showMenu ? "translate-x-0 delay-300" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="sm:hidden absolute top-4 right-4"
            onClick={() => setShowMenu(false)}
          >
            <CloseIcon />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

export default ClientNavigation;
