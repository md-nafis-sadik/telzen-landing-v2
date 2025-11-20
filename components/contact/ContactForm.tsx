import { appStrings, images } from "@/service";
import Image from "next/image";
import BlurText from "../animation/BlurText";

function ContactForm() {
  return (
    <section className="pt-10 md:pt-16 lg:pt-20 pb-10 md:pb-20 lg:pb-28 min-h-screen bg-white">
      <div className="containerX text-center">
        <h2 className="title text-primary-700 mb-6 md:mb-8 lg:mb-10 overflow-hidden">
          <BlurText
            text={appStrings.contactUs}
            translateY={[50, 0]}
            className="md:tracking-[-2px]"
          />
        </h2>
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 mt-10 lg:mt-20">
          <div className="w-full flex justify-center items-center">
            <Image
              src={images.contactUs}
              alt="app store"
              width={432}
              height={432}
              className="duration-200"
              priority
            />
          </div>

          <div className="w-full flex flex-col justify-center bg-natural-50 rounded-3xl px-6 py-8">
            <div>
              {/* Form */}
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-left text-xs md:text-sm font-medium text-text-700 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="email"
                    id="email"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-natural-400 bg-white rounded-lg focus:ring-0 focus:border-primary-700 outline-none transition-all placeholder:text-xs md:placeholder:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="query"
                    className="block text-left text-xs md:text-sm font-medium text-text-700 mb-2"
                  >
                    Query/Business Opportunities
                  </label>
                  <textarea
                    id="query"
                    rows={6}
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    placeholder="Start typing here"
                    className="w-full px-4 py-3 border border-natural-400 bg-white rounded-lg focus:ring-0 focus:border-primary-700 outline-none transition-all placeholder:text-xs md:placeholder:text-sm"
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    // disabled={loading}
                    className="w-full px-4 py-2 mt-2 h-13 bg-primary-700 text-white rounded-full cursor-pointer hover:bg-primary-800 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm md:text-base"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
