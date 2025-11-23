import ContactAddress from "@/components/contact/ContactAddress";
import ContactForm from "@/components/contact/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get Support | Telzen eSIM",
  description: "Get in touch with Telzen's support team. We're here to help with your eSIM questions, technical support, and travel connectivity needs.",
  keywords: "contact Telzen, eSIM support, customer service, technical help, travel assistance, global connectivity support",
  openGraph: {
    title: "Contact Us - Get Support | Telzen eSIM",
    description: "Get in touch with Telzen's support team. We're here to help with your eSIM questions, technical support, and travel connectivity needs.",
    url: "/contact",
  },
};

function Contact() {
  return (
    <main className="font-inter bg-white">
      <ContactForm />
      <ContactAddress />
    </main>
  );
}

export default Contact;
