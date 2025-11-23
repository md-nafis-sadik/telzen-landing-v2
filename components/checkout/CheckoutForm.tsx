import { images, appStrings } from "@/service";
import Image from "next/image";
import Button from "../shared/Button";
import Input from "../shared/Input";

function CheckoutForm() {
  return (
    <div className="w-full flex flex-col justify-center bg-white rounded-3xl px-6 py-8">
      <div>
        {/* Form */}
        <form className="space-y-4">
          <Input
            type="email"
            id="email"
            label={appStrings.yourEmail}
            placeholder={appStrings.enterYourEmail}
            required
          />
          <Input
            type="number"
            id="card-number"
            label={appStrings.cardNumber}
            placeholder="0000 0000 0000 0000"
            required
          />
          <div className="grid gridcols-1 lg:grid-cols-2 gap-6">
            <Input
              type="text"
              id="expiry"
              label={appStrings.expirationDate}
              placeholder="MM/YY"
              required
            />
            <Input
              type="text"
              id="cvc"
              label={appStrings.cvc}
              placeholder="000"
              required
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              className="mt-2"
            >
              {appStrings.continue}
            </Button>
          </div>

          <button
            type="button"
            // onClick={handleGoogleLogin}
            className="w-full border border-natural-500 text-text-50 py-3.5 rounded-full font-semibold bg-black hover:bg-black transition-colors flex items-center justify-center gap-[10px] tracking-tight text-sm md:text-base"
          >
            <div className="relative w-5 md:w-6 h-5 md:h-6">
              <Image
                src={images?.googleLogo}
                alt="google"
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
          <Button
            variant="link"
            className="underline ml-1 text-sm md:text-base"
          >
            Terms of Use & Privacy Policy
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
