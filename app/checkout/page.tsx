import CheckoutCard from "@/components/checkout/CheckoutCard";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutLoginForm from "@/components/checkout/CheckoutLoginForm";
import CheckoutSuccessful from "@/components/checkout/CheckoutSuccessful";
import AllDestinations from "@/components/destinations/AllDestinations";
import HeaderPrev from "@/components/shared/HeaderPrev";

function CheckOut() {
  return (
    <main className="font-inter bg-white">
      <section
        className="py-10 md:py-16 lg:py-20 bg-[#fafafa] flex"
        id="destinations"
      >
        <div className="w-full h-full">
          <div className="containerX">
            {/* <div className="flex flex-col justify-center items-center h-full py-20">
            <CheckoutSuccessful/>
            </div> */}
            <HeaderPrev text="Check out" />
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 mt-10">
              {/* <CheckoutLoginForm /> */}
              <CheckoutForm/>
              <CheckoutCard />
              
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CheckOut;
