import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { useGetPersonalEsimsQuery } from "@/store/modules/destination/destinationApi";
import { useSharedStore } from "@/store";

export const useMyEsim = () => {
  const router = useRouter();
  const { isAuthenticated, authInitialized } = useAppSelector((state) => state.auth);
  const { setShowMenu } = useSharedStore();
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

  // Redirect to homepage if not authenticated (only after auth is initialized)
  useEffect(() => {
    if (authInitialized && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, authInitialized, router]);

  const handleToggleChange = (option: string) => {
    if (option === "My Plans") {
      setActiveToggle("myPlans");
    } else if (option === "Buy Another") {
      setActiveToggle("buyAnother");
      setShowMenu(false); // Close mobile menu before navigation
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
