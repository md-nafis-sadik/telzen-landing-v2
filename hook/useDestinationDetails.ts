import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetPackagesQuery } from "@/store/modules/destination/destinationApi";
import {
  SmileGreenSvg,
  BoltrGreenSvg,
  MobileWithStarsSvg,
  HashTagsGreenSvg,
  PublicGreenSvg,
  StarGreenSvg,
  FireGreenSvg,
  GameControllerGreenSvg,
  GroupGreenSvg,
  Icon1GreenSvg,
} from "@/service";

export const useDestinationDetails = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const countryId = searchParams.get("country_id");
  const regionId = searchParams.get("region_id");
  const countryName = searchParams.get("country_name") || "Country";
  const regionName = searchParams.get("region_name");

  const [packageIcons] = useState([
    SmileGreenSvg,
    BoltrGreenSvg,
    HashTagsGreenSvg,
    PublicGreenSvg,
    StarGreenSvg,
    FireGreenSvg,
    GameControllerGreenSvg,
    GroupGreenSvg,
    Icon1GreenSvg,
  ]);

  // Determine if this is a regional or country package
  const isRegional = !!regionId;

  const {
    data: packagesData,
    isLoading,
    error,
  } = useGetPackagesQuery({
    country_id: countryId || undefined,
    region_id: regionId || undefined,
    page: 1,
    limit: 999999,
  });

  // Get display name and image from API response
  const displayName =
    packagesData?.data?.country?.name ||
    packagesData?.data?.region?.name ||
    (isRegional ? regionName : countryName);

  const displayImage =
    packagesData?.data?.country?.image ||
    packagesData?.data?.region?.image ||
    null;

  const handlePackageClick = (packageId: string) => {
    const params = new URLSearchParams({ package_id: packageId });

    if (countryId) {
      params.append("country_id", countryId);
    }

    if (regionId) {
      params.append("region_id", regionId);
    }

    router.push(`/checkout?${params.toString()}`);
  };

  const handleBackClick = () => {
    router.back();
  };

  // Helper function to format data size
  const formatDataSize = (sizeInMB: number) => {
    if (sizeInMB >= 1024) {
      return `${(sizeInMB / 1024).toFixed(0)} GB`;
    }
    return `${sizeInMB} MB`;
  };

  // Helper function to get random icon
  const getRandomIcon = (index: number) => {
    const IconComponent = packageIcons[index % packageIcons.length];
    return IconComponent;
  };

  return {
    displayName,
    displayImage,
    isRegional,
    packagesData,
    isLoading,
    error,
    handlePackageClick,
    handleBackClick,
    formatDataSize,
    getRandomIcon,
  };
};
