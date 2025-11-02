import { companyData } from "@/service";
import Image from "next/image";
import { Marquee } from "../shared/marquee";

function Company() {
  return (
    <div className="pt-32 md:py-10 lg:py-24" id={companyData.id}>
      <div className="w-full max-w-[55.25rem] mx-auto">
        <h2 className="text-xl md:text-2xl lg:text-4xs text-black-800 text-center px-5">
          {companyData.title}
        </h2>
        <Marquee>
          <div className="flex items-center justify-center gap-10 mt-5">
            {companyData.companies.map((company, index) => (
              <Image
                src={company}
                alt="company image"
                width={150}
                height={50}
                key={index}
                className="object-contain"
                style={{
                  height: "auto",
                  width: "auto",
                  maxWidth: "150px",
                  maxHeight: "50px",
                }}
              />
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
}

export default Company;
