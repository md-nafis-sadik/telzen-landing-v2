import MyEsimComponent from "@/components/my-esim/MyEsimComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My eSIM - Manage Your Plans | Telzen",
  description: "Manage your active eSIM plans, download QR codes, and track your data usage with Telzen's user-friendly dashboard.",
  keywords: "my eSIM, eSIM management, eSIM dashboard, download QR code, data usage, Telzen account",
  openGraph: {
    title: "My eSIM - Manage Your Plans | Telzen",
    description: "Manage your active eSIM plans, download QR codes, and track your data usage with Telzen's user-friendly dashboard.",
    url: "/my-esim",
  },
};

function MyEsim() {
  return (
    <main className="font-inter bg-white">
      <MyEsimComponent />
    </main>
  );
}

export default MyEsim;
