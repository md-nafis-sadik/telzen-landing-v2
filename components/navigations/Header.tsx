"use client";

import { appStrings, images, routes } from "@/service";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import ClientNavigation from "./ClientNavigation";
import SelectLanguage from "./SelectLanguage";
import { AuthButton } from "../auth";
import { useSharedStore } from "@/store";
import { motion } from "motion/react";
import { useAppDispatch } from "@/store/hooks";
import { openBusinessAuthModal } from "@/store/modules/ui/uiSlice";

function Header() {
  const { setShowMenu } = useSharedStore();
  const dispatch = useAppDispatch();

  const handleLinkClick = useCallback(() => {
    setShowMenu(false);
  }, [setShowMenu]);

  const handleBusinessClick = useCallback(() => {
    dispatch(openBusinessAuthModal({ step: "login" }));
  }, [dispatch]);

  return (
    <header className="font-inter py-4 sticky top-0 bg-white/30 z-50 backdrop-blur-md">
      <div className="containerX">
        <nav className="flex items-center justify-between gap-4">
          <Link href={routes.home.path} prefetch={true}>
            <Image
              src={images.logo}
              alt="logo"
              width={150}
              height={50}
              className="w-7xl"
              priority
              sizes="150px"
            />
          </Link>
          <ClientNavigation>
            <ul className="flex flex-col sm:flex-row sm:items-center gap-6">
              <li>
                <Link
                  className="text-base text-text-700 hover:text-primary-800"
                  href="/destinations"
                  prefetch={true}
                  onClick={handleLinkClick}
                >
                  {routes.buyPlans.name}
                </Link>
              </li>
              <li>
                <Link
                  className="text-base text-text-700 hover:text-primary-800"
                  href="/blog"
                  prefetch={true}
                  onClick={handleLinkClick}
                >
                  {routes.blog.name}
                </Link>
              </li>
              <li>
                <Link
                  className="text-base text-text-700 hover:text-primary-800"
                  href="/contact"
                  prefetch={true}
                  onClick={handleLinkClick}
                >
                  {routes.contactUs.name}
                </Link>
              </li>
              {/* <li>
                <SelectLanguage />
              </li> */}
              <li className="flex items-center gap-2 p-[1px]">
                <AuthButton />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBusinessClick}
                  className="px-4 py-2 bg-secondary-200 text-white rounded-full cursor-pointer hover:bg-secondary-500 transition z-[1000] font-semibold"
                >
                  Business
                </motion.button>
              </li>
              {/* <li className="hidden sm:block">
                <button
                  type="button"
                  className="btn w-full px-4 py-3 sm:py-2 rounded-full text-base font-semibold text-white bg-primary-700 leading-[20px]"
                >
                  {appStrings.download}
                </button>
              </li> */}
            </ul>
            {/* <button
              type="button"
              className="sm:hidden btn w-full px-4 py-3 sm:py-2 rounded-full text-base font-semibold text-white bg-primary-700 leading-[20px]"
            >
              {appStrings.download}
            </button> */}
          </ClientNavigation>
        </nav>
      </div>
    </header>
  );
}

export default Header;
