import { appStrings, images, routes } from "@/service";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="py-6 md:py-8">
      <div className="containerX">
        <div className="flex flex-col md:flex-row items-center gap-4 md:justify-between text-center md:text-left">
          <div className="w-full max-w-[620px]">
            <Link
              href={routes.home.path}
              className="block w-32 md:w-44 mx-auto md:mx-0"
            >
              <Image
                src={images.logo}
                alt="logo"
                width={150}
                height={50}
                className="w-full"
              />
            </Link>
            <p className="text-base md:text-lg text-text-700 mt-2">
              {appStrings.copyRightDesc}
            </p>
          </div>
          <div>
            <a
              href="#"
              className="block text-xl md:text-2xl font-black font-barlow text-black leading-[88%]"
            >
              {appStrings.netroSystemsLimited}
            </a>
            <a
              href="#"
              className="block text-xl md:text-2xl font-black font-barlow text-black leading-[88%] mt-2"
            >
              {appStrings.kloudAppLLC}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
