import { images } from "@/service";
import Image from "next/image";

function OfficeImage() {
  return (
    <div>
      <Image
        src={images.cultureMain}
        alt="about netro"
        width={1176}
        height={600}
        className="object-contain mx-auto"
      />
    </div>
  );
}

export default OfficeImage;
