import { envConfig } from "@/service";

export const fetchWithDelay = async (endpoint: string, delay = 100) => {
  // headers();

  const withDelay = (promise: unknown, ms: number | undefined) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(promise);
      }, ms);
    });
  };

  const response = await withDelay(
    fetch(`${envConfig.baseUrl}${endpoint}`, {
      // cache: "force-cache",
      next: { revalidate: 300 }, // cache: "force-cache" → standard browser fetch API hint that says: try to use cached data if available. next: { revalidate: 300 } → Next.js-specific option that says: revalidate this request every 300 seconds (5 minutes) — this activates ISR (Incremental Static Regeneration).
    }).then((res) => res.json()),
    delay
  );

  return response;
};

export const handleCopy = (
  text = "",
  setter: (value: any) => void = () => {}
) => {
  navigator.clipboard.writeText(text).then(
    () => {
      setter("copied");
      setTimeout(() => setter(null), 1000);
    },
    (err) => {}
  );
};

export const timestampDisplay = (timestamp: number) => {
    const date = new Date(timestamp * 1000);

    // Use fixed, manual month mapping (not locale-based)
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
  };