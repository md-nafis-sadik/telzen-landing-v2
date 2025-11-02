"use client";
import { ICountry } from "@/service";
import { countries } from "@/service/assets/data";
import Image from "next/image";
import { useState } from "react";
import { Dropdown, DropdownItem } from "../shared/dropdown";

function SelectLanguage() {
  const [selectedItem, setSelectedItem] = useState<ICountry>(countries[0]);

  return (
    <Dropdown
      side="bottom"
      align="end"
      contentClassName="w-40"
      trigger={
        <button className="flex items-center gap-2 border-none outline-none bg-transparent cursor-pointer min-w-11">
          <Image
            src={selectedItem?.image_url}
            width={20}
            height={20}
            className="size-4"
            alt={selectedItem?.name}
          />
          <span className="text-base text-text-700">
            {selectedItem?.language_code}
          </span>
        </button>
      }
    >
      {countries?.map((country, index) => (
        <DropdownItem onClick={() => setSelectedItem(country)} key={index}>
          <div className="flex items-center gap-3">
            <Image
              src={country?.image_url}
              width={20}
              height={20}
              className="size-4"
              alt={country?.name}
            />
            <span className="text-base text-text-700">{country?.name}</span>
          </div>
        </DropdownItem>
      ))}
    </Dropdown>
  );
}

export default SelectLanguage;
