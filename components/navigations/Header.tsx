import { appStrings, images, routes } from "@/service";
import Image from "next/image";
import Link from "next/link";
import ClientNavigation from "./ClientNavigation";
import SelectLanguage from "./SelectLanguage";

function Header() {
  return (
    <header className="font-inter py-4">
      <div className="containerX">
        <nav className="flex items-center justify-between gap-4">
          <Link href={routes.home.path}>
            <Image
              src={images.logo}
              alt="logo"
              width={150}
              height={50}
              className="w-7xl"
            />
          </Link>
          <ClientNavigation>
            <ul className="flex flex-col sm:flex-row sm:items-center gap-6">
              <li>
                <Link
                  className="text-base text-text-700 hover:text-primary-800"
                  href={routes.buyPlans.path}
                >
                  {routes.buyPlans.name}
                </Link>
              </li>
              <li>
                <Link
                  className="text-base text-text-700 hover:text-primary-800"
                  href={routes.contactUs.path}
                >
                  {routes.contactUs.name}
                </Link>
              </li>
              <li>
                <SelectLanguage />
              </li>
              <li className="hidden sm:block">
                <button
                  type="button"
                  className="btn w-full px-4 py-3 sm:py-2 rounded-full text-base font-semibold text-white bg-primary-700 leading-[20px]"
                >
                  {appStrings.download}
                </button>
              </li>
            </ul>
            <button
              type="button"
              className="sm:hidden btn w-full px-4 py-3 sm:py-2 rounded-full text-base font-semibold text-white bg-primary-700 leading-[20px]"
            >
              {appStrings.download}
            </button>
          </ClientNavigation>
        </nav>
      </div>
    </header>
  );
}

export default Header;
