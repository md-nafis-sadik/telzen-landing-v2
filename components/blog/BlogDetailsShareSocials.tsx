"use client";
import { handleCopy } from "@/lib/apiHandler";
import { envConfig } from "@/service";
import Link from "next/link";
import { useState } from "react";

const BlogDetailsShareSocials = ({ blog }: any) => {
  const baseUrl = envConfig.frontendUrl;
  const [value, setValue] = useState(null);
  const url = `${baseUrl}/blog/${blog?.title}`;

  return (
    <div className=" mt-14">
      <h3 className="font-scoutcond uppercase text-base sm:text-2xl md:text-4xl text-black font-bold">
        Share this
      </h3>

      <div className="flex items-center flex-wrap gap-3 sm:gap-4 mt-6 duration-200">
        {/* facebook  */}
        <Link
          href={`https://www.facebook.com/sharer.php?u=${url}`}
          target="_blank"
          className="w-10 sm:w-[60px] aspect-square bg-black border-2 border-transparent hover:bg-transparent hover:border-black rounded-full flex items-center justify-center duration-300 transition-colors group"
          rel="noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="21"
            viewBox="0 0 12 21"
            fill="none"
            className="w-4 sm:w-6 aspect-square"
          >
            <path
              d="M8.54128 3.36797H11.2385C11.4867 3.36797 11.6881 3.17937 11.6881 2.94698V0.420997C11.6881 0.188606 11.4867 0 11.2385 0H8.54128C5.81527 0 3.59633 2.0772 3.59633 4.63096V7.57794H0.449541C0.201394 7.57794 0 7.76654 0 7.99893V10.5249C0 10.7573 0.201394 10.9459 0.449541 10.9459H3.59633V19.7868C3.59633 20.0192 3.79772 20.2078 4.04587 20.2078H6.74312C6.99127 20.2078 7.19266 20.0192 7.19266 19.7868V10.9459H10.3394C10.5328 10.9459 10.7045 10.8297 10.7665 10.6579L11.6656 8.13197C11.7114 8.00399 11.6881 7.86253 11.6036 7.75223C11.5181 7.64277 11.3833 7.57794 11.2385 7.57794H7.19266V4.63096C7.19266 3.93463 7.79774 3.36797 8.54128 3.36797Z"
              className="fill-white group-hover:fill-black duration-300"
            />
          </svg>
        </Link>
        {/* linkedin  */}
        <Link
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
          target="_blank"
          className="w-10 sm:w-[60px] aspect-square bg-black border-2 border-transparent hover:bg-transparent hover:border-black rounded-full flex items-center justify-center duration-300 transition-colors group"
          rel="noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="w-4 sm:w-6 aspect-square"
          >
            <path
              d="M2.48791 4.94516C3.86194 4.94516 4.97582 3.83815 4.97582 2.47258C4.97582 1.10701 3.86194 0 2.48791 0C1.11387 0 0 1.10701 0 2.47258C0 3.83815 1.11387 4.94516 2.48791 4.94516Z"
              className="fill-white group-hover:fill-black duration-300"
            />
            <path
              d="M4.56117 6.59839H0.414652C0.185764 6.59839 0 6.78301 0 7.01049V19.3734C0 19.6009 0.185764 19.7855 0.414652 19.7855H4.56117C4.79005 19.7855 4.97582 19.6009 4.97582 19.3734V7.01049C4.97582 6.78301 4.79005 6.59839 4.56117 6.59839Z"
              className="fill-white group-hover:fill-black duration-300"
            />
            <path
              d="M16.9181 5.91067C15.1459 5.30736 12.9291 5.83732 11.5998 6.78761C11.5541 6.61041 11.3916 6.47854 11.1984 6.47854H7.05186C6.82297 6.47854 6.63721 6.66316 6.63721 6.89064V19.2535C6.63721 19.481 6.82297 19.6656 7.05186 19.6656H11.1984C11.4273 19.6656 11.613 19.481 11.613 19.2535V10.3687C12.2831 9.7951 13.1464 9.61213 13.853 9.91048C14.538 10.1981 14.9302 10.9003 14.9302 11.8358V19.2535C14.9302 19.481 15.116 19.6656 15.3449 19.6656H19.4914C19.7203 19.6656 19.9061 19.481 19.9061 19.2535V11.0058C19.8588 7.61922 18.2557 6.36562 16.9181 5.91067Z"
              className="fill-white group-hover:fill-black duration-300"
            />
          </svg>
        </Link>
        {/* twitter */}
        <Link
          href={`https://twitter.com/intent/tweet?url=${url}`}
          target="_blank"
          className="w-10 sm:w-[60px] aspect-square bg-black border-2 border-transparent hover:bg-transparent hover:border-black rounded-full flex items-center justify-center duration-300 transition-colors group"
          rel="noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="w-4 sm:w-6 aspect-square"
          >
            <path
              d="M13.6557 10.6432L20.2308 3.00024H18.6727L12.9636 9.6365L8.40377 3.00024H3.14453L10.0399 13.0354L3.14453 21.0502H4.70269L10.7316 14.0421L15.5472 21.0502H20.8064L13.6554 10.6432H13.6557ZM11.5216 13.1239L10.823 12.1246L5.26412 4.1732H7.65736L12.1434 10.5902L12.8421 11.5895L18.6734 19.9306H16.2802L11.5216 13.1242V13.1239Z"
              className="fill-white group-hover:fill-black duration-300"
            />
          </svg>
        </Link>
        <button
          type="button"
          aria-label="copy link"
          className="w-10 sm:w-[60px] aspect-square bg-black border-2 border-transparent hover:bg-transparent hover:border-black text-white hover:text-black text-xs rounded-full flex items-center transition-colors justify-center group duration-300"
          disabled={!!value}
          onClick={() => handleCopy(url, setValue)}
        >
          {value ? (
            "copied"
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="27"
              viewBox="0 0 28 27"
              fill="none"
              className="w-4 sm:w-6 aspect-square"
            >
              <path
                d="M19.5553 7.94458H16.222C15.6109 7.94458 15.1109 8.44458 15.1109 9.05569C15.1109 9.6668 15.6109 10.1668 16.222 10.1668H19.5553C21.3887 10.1668 22.8887 11.6668 22.8887 13.5001C22.8887 15.3335 21.3887 16.8335 19.5553 16.8335H16.222C15.6109 16.8335 15.1109 17.3335 15.1109 17.9446C15.1109 18.5557 15.6109 19.0557 16.222 19.0557H19.5553C22.622 19.0557 25.1109 16.5668 25.1109 13.5001C25.1109 10.4335 22.622 7.94458 19.5553 7.94458ZM9.55534 13.5001C9.55534 14.1112 10.0553 14.6112 10.6665 14.6112H17.3331C17.9442 14.6112 18.4442 14.1112 18.4442 13.5001C18.4442 12.889 17.9442 12.389 17.3331 12.389H10.6665C10.0553 12.389 9.55534 12.889 9.55534 13.5001ZM11.7776 16.8335H8.44423C6.61089 16.8335 5.11089 15.3335 5.11089 13.5001C5.11089 11.6668 6.61089 10.1668 8.44423 10.1668H11.7776C12.3887 10.1668 12.8887 9.6668 12.8887 9.05569C12.8887 8.44458 12.3887 7.94458 11.7776 7.94458H8.44423C5.37756 7.94458 2.88867 10.4335 2.88867 13.5001C2.88867 16.5668 5.37756 19.0557 8.44423 19.0557H11.7776C12.3887 19.0557 12.8887 18.5557 12.8887 17.9446C12.8887 17.3335 12.3887 16.8335 11.7776 16.8335Z"
                className="fill-white group-hover:fill-black duration-300"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default BlogDetailsShareSocials;
