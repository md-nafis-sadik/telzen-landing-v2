import { images } from "@/service";
import Image from "next/image";

function ContactAddress() {
  return (
    <section className="py-10 md:py-16 lg:py-20 bg-black">
      <div className="containerX">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-6 md:gap-8 lg:gap-12 mt-10 lg:mt-20">
          <div className="w-max flex justify-center items-center">
            <Image
              src={images.officeImage}
              alt="office image"
              width={620}
              height={400}
              className="duration-200"
              priority
            />
          </div>

          <div className="w-full max-w-[300px] flex flex-col justify-between text-center lg:text-left">
            <div>
              <div className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-barlow font-black uppercase leading-[110%] text-white">
                Delaware
              </div>
              <div className="mt-1 text-xs md:text-sm text-text-200 uppercase tracking-wide">
                Head Office
              </div>
              <div className="mt-2 text-sm md:text-base text-text-100 font-semibold tracking-wider">
                254 Chapman Rd, Suite 101-B,
                <br />
                Newark, DE 19702
              </div>
            </div>
            <div>
              <div className="mt-1 text-xs md:text-sm text-text-200 uppercase tracking-wide">
                Email
              </div>
              <div className="mt-2 text-sm md:text-base text-text-100 font-semibold tracking-wider">
                hello@telzen.net
              </div>
              <div className="mt-1 text-xs md:text-sm text-text-200 uppercase tracking-wide">
                Phone
              </div>
              <div className="mt-2 text-sm md:text-base text-text-100 font-semibold tracking-wider">
                +1 515 5064196
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactAddress;
