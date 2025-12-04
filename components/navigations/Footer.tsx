import {
  appStrings,
  EmailFooterIconSvg,
  envConfig,
  FacebookFooterIconSvg,
  images,
  InstagramFooterIconSvg,
  LinkedinFooterIconSvg,
  LocationFooterIconSvg,
  PhoneFooterIconSvg,
  routes,
  socialMediaData,
  YoutubeFooterIconSvg,
} from "@/service";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

function Footer() {
  return (
    <footer className="bg-white ">
      <div className="containerX py-12 md:py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Logo and Address */}
          <div className="md:col-span-2 lg:col-span-1 text-center lg:text-left">
            <Link href={routes.home.path} className="inline-block mb-4" prefetch={true}>
              <Image
                src={images.logo}
                alt="Telzen"
                width={111}
                height={32}
                className="h-10 w-auto"
                loading="lazy"
                sizes="111px"
              />
            </Link>
            <address className="text-[#6F6C90] text-base md:text-lg leading-relaxed not-italic">
              254 Chapman Rd, Suite 101-B,
              <br />
              Newark, DE 19702
            </address>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6 justify-center lg:justify-start">
              <Link
                href={socialMediaData[0].link}
                className="text-natural-500 hover:text-primary-700 transition-colors"
                prefetch={false}
              >
                <FacebookFooterIconSvg />
              </Link>
              <Link
                href={socialMediaData[1].link}
                className="text-natural-500 hover:text-primary-700 transition-colors"
                prefetch={false}
              >
                <InstagramFooterIconSvg />
              </Link>
              <Link
                href={socialMediaData[2].link}
                className="text-natural-500 hover:text-primary-700 transition-colors"
                prefetch={false}
              >
                <LinkedinFooterIconSvg />
              </Link>
              <Link
                href={socialMediaData[3].link}
                className="text-natural-500 hover:text-primary-700 transition-colors"
                prefetch={false}
              >
                <YoutubeFooterIconSvg />
              </Link>
            </div>
          </div>

          {/* Product Column */}
          <div className="lg:col-span-1 text-center lg:text-left">
            <h3 className="text-lg font-semibold text-natural-950 mb-4 lg:mb-8">
              Product
            </h3>
            <ul className="space-y-3 text-natural-500">
              <li>
                <Link
                  href="/destinations"
                  prefetch={true}
                  className="text-natural-500 hover:text-primary-700 transition-colors"
                >
                  {appStrings.destinations}
                </Link>
              </li>
              <li>
                <Link
                  href="/#howItWorks"
                  prefetch={true}
                  className="text-natural-500 hover:text-primary-700 transition-colors"
                >
                  {appStrings.howItWorks}
                </Link>
              </li>
              <li>
                <Link
                  href="/#reviews"
                  prefetch={true}
                  className="text-natural-500 hover:text-primary-700 transition-colors"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  href={envConfig.googleAppUrl || "#"}
                  prefetch={false}
                  className="text-natural-500 hover:text-primary-700 transition-colors"
                >
                  Apple App Store
                </Link>
              </li>
              <li>
                <Link
                  href={envConfig.playAppUrl || "#"}
                  prefetch={false}
                  className="text-natural-500 hover:text-primary-700 transition-colors"
                >
                  Google Play Store
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-1 text-center lg:text-left">
            <h3 className="text-lg font-semibold text-natural-950 mb-4 lg:mb-8">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  prefetch={true}
                  className="text-natural-500 hover:text-primary-700 transition-colors"
                >
                  {appStrings.aboutUs}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  prefetch={true}
                  className="text-natural-500 hover:text-primary-700 transition-colors"
                >
                  {appStrings.contactUs}
                </Link>
              </li>
              <li>
                <Link
                  href="/culture"
                  prefetch={true}
                  className="text-natural-500 hover:text-primary-700 transition-colors"
                >
                  {appStrings.culture}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  prefetch={true}
                  className="text-natural-500 hover:text-primary-700 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="lg:col-span-1 text-center lg:text-left">
            <h3 className="text-lg font-semibold text-natural-950 mb-4 lg:mb-8">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  prefetch={true}
                  className="text-natural-500 hover:text-primary-700 transition-colors"
                >
                  Help center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  prefetch={true}
                  className="text-natural-500 hover:text-primary-700 transition-colors"
                >
                  Report a bug
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  prefetch={true}
                  className="text-natural-500 hover:text-primary-700 transition-colors"
                >
                  Chat support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-1 text-center lg:text-left">
            <h3 className="text-lg font-semibold text-natural-950 mb-4 lg:mb-8">
              Contacts us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 justify-center lg:justify-start">
                <span>
                  <EmailFooterIconSvg />
                </span>
                <Link
                  href="mailto:hello@telzen.net"
                  prefetch={false}
                  className="text-natural-500 hover:text-primary-700 transition-colors"
                >
                  hello@telzen.net
                </Link>
              </li>
              <li className="flex items-center gap-2 justify-center lg:justify-start">
                <span>
                  <PhoneFooterIconSvg />
                </span>
                <Link
                  href="tel:+15155064196"
                  prefetch={false}
                  className="text-natural-500 hover:text-primary-700 transition-colors"
                >
                  +1 515 5064196
                </Link>
              </li>
              <li className="flex items-center gap-2 justify-center lg:justify-start">
                <span>
                  <LocationFooterIconSvg />
                </span>
                <span className="text-natural-500">
                  254 Chapman Rd, Suite 101-B, Newark, DE 19702
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="containerX">
        <div className="flex flex-col lg:flex-row justify-between border-t border-gray-200  py-5 md:py-5 lg:py-6 items-center gap-4 text-[#6F6C90] text-base md:text-lg leading-relaxed not-italic">
          <div className="text-center md:text-left">
            Copyright © {appStrings.kloudAppLLC}
          </div>
          <div className="flex flex-col md:flex-row items-center gap-1 text-center md:text-right">
            All Rights Reserved<span className="hidden md:block">{" | "}</span>
            <Link
              href="/terms-and-conditions"
              prefetch={true}
              className="text-primary-700 underline transition-colors"
            >
              {appStrings.termsAndConditions}
            </Link>
            <span className="hidden md:block">{" | "}</span>
            <Link
              href="/privacy-policy"
              prefetch={true}
              className="text-primary-700 underline transition-colors"
            >
              {appStrings.privacyPolicy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
