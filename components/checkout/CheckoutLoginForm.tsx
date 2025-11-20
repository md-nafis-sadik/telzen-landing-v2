import { images } from "@/service";
import Image from "next/image";

function CheckoutLoginForm() {
  return (
    <div className="w-full flex flex-col justify-center bg-white rounded-3xl px-6 py-8">
      <div>
        {/* Title */}
        <h2 className="text-4xl md:text-[56px] font-extrabold text-text-950 font-barlow text-center">
          LOGIN
        </h2>
        <p className="text-text-700 mb-4 mx-auto tracking-tight text-sm md:text-base text-center">
          Simple login towards unlimited, unmetered internet access for everyone
        </p>

        {/* Form */}
        <form className="space-y-6">
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
            <button
              type="submit"
              // disabled={loading}
              className="w-full px-4 py-2 h-13 bg-primary-700 text-white rounded-full cursor-pointer hover:bg-primary-800 transition disabled:opacity-50 disabled:cursor-not-allowed mb-3 font-medium text-sm md:text-base"
            >
              {/* {loading ? "Logging in..." : "Login"} */}Login
            </button>

            <div className="text-center text-sm md:text-base text-text-950 tracking-tight">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                // onClick={() => dispatch(setAuthModalStep("register"))}
                className="text-primary-700 cursor-pointer hover:text-primary-800 transition-colors font-bold"
              >
                Register Now
              </button>
            </div>
          </div>

          <button
            type="button"
            // onClick={handleGoogleLogin}
            className="w-full border border-natural-500 text-black py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-[10px] tracking-tight text-sm md:text-base"
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
            Login With Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutLoginForm;
