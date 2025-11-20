import { images } from "@/service";
import Image from "next/image";

function CheckoutForm() {
  return (
    <div className="w-full flex flex-col justify-center bg-white rounded-3xl px-6 py-8">
      <div>
        {/* Form */}
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-left text-xs md:text-sm font-medium text-text-700 mb-2"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:border-primary-700 outline-none transition-all placeholder:text-xs md:placeholder:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-left text-xs md:text-sm font-medium text-text-700 mb-2"
            >
              Card Number
            </label>
            <input
              type="number"
              id="card-number"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              placeholder="0000 0000 0000 0000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:border-primary-700 outline-none transition-all placeholder:text-xs md:placeholder:text-sm"
              required
            />
          </div>
          <div className="grid gridcols-1 lg:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-left text-xs md:text-sm font-medium text-text-700 mb-2"
              >
                Expiration Date
              </label>
              <input
                type="email"
                id="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                placeholder="MM/YY"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:border-primary-700 outline-none transition-all placeholder:text-xs md:placeholder:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-left text-xs md:text-sm font-medium text-text-700 mb-2"
              >
                CVC
              </label>
              <input
                type="email"
                id="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                placeholder="000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:border-primary-700 outline-none transition-all placeholder:text-xs md:placeholder:text-sm"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              // disabled={loading}
              className="w-full px-4 py-2 mt-2 h-13 bg-primary-700 text-white rounded-full cursor-pointer hover:bg-primary-800 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm md:text-base"
            >
              Continue
            </button>
          </div>

          <button
            type="button"
            // onClick={handleGoogleLogin}
            className="w-full border border-natural-500 text-text-50 py-3.5 rounded-full font-semibold bg-black hover:bg-black transition-colors flex items-center justify-center gap-[10px] tracking-tight text-sm md:text-base"
          >
            <div className="relative w-5 md:w-6 h-5 md:h-6">
              <Image
                src={images?.googleLogo}
                alt="world"
                fill
                className="object-contain"
                priority
              />
            </div>
            GPay
          </button>
        </form>
        <div className="text-sm md:text-base text-text-950 tracking-tight mt-7">
          Your input data is always safe and we never store your any sensitive
          data. You can also check our
          <button
            type="button"
            // onClick={() => dispatch(setAuthModalStep("register"))}
            className="cursor-pointer hover:text-primary-800 transition-colors font-bold underline ml-1"
          >
            Terms of Use & Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
