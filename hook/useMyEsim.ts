import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { useGetPersonalEsimsQuery } from "@/store/modules/destination/destinationApi";

export const useMyEsim = () => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [activeToggle, setActiveToggle] = useState<"myPlans" | "buyAnother">(
    "myPlans"
  );

  const {
    data: esimsData,
    isLoading,
    error,
  } = useGetPersonalEsimsQuery(undefined, {
    skip: !isAuthenticated,
  });

  // Redirect to homepage if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleToggleChange = (option: string) => {
    if (option === "My Plans") {
      setActiveToggle("myPlans");
    } else if (option === "Buy Another") {
      setActiveToggle("buyAnother");
      router.push("/destinations");
    }
  };

  const esims = esimsData?.data || [];

  return {
    isAuthenticated,
    activeToggle,
    esims,
    isLoading,
    error,
    handleToggleChange,
  };
};
