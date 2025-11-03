import { ICountry, IDestination, IWorkStep } from "../config";
import { appStrings } from "./appStrings";
import { images } from "./images";

export const countries: ICountry[] = [
  {
    name: "USA",
    full_name: "United States of America",
    code: "US",
    dial_code: "+1",
    language_code: "EN",
    image_url: images.usa,
  },
  {
    name: "Japan",
    full_name: "Japan",
    code: "JP",
    dial_code: "+81",
    language_code: "JA",
    image_url: images.japan,
  },
  {
    name: "UK",
    full_name: "United Kingdom",
    code: "GB",
    dial_code: "+44",
    language_code: "EN",
    image_url: images.uk,
  },
  {
    name: "Germany",
    full_name: "Germany",
    code: "DE",
    dial_code: "+49",
    language_code: "DE",
    image_url: images.germany,
  },
  {
    name: "Turkey",
    full_name: "Turkey",
    code: "TR",
    dial_code: "+90",
    language_code: "TR",
    image_url: images.turkey,
  },
];

export const destinations: IDestination[] = [
  {
    name: "USA",
    full_name: "United States of America",
    code: "US",
    dial_code: "+1",
    language_code: "EN",
    image_url: images.usa,
    description: "Start from $2.99",
    color: "#00C896",
  },
  {
    name: "Japan",
    full_name: "Japan",
    code: "JP",
    dial_code: "+81",
    language_code: "JA",
    image_url: images.japan,
    description: "Start from $3.12",
    color: "#006752",
  },
  {
    name: "UK",
    full_name: "United Kingdom",
    code: "GB",
    dial_code: "+44",
    language_code: "EN",
    image_url: images.uk,
    description: "Start from $2.89",
    color: "#FFB94A",
  },
  {
    name: "Germany",
    full_name: "Germany",
    code: "DE",
    dial_code: "+49",
    language_code: "DE",
    image_url: images.germany,
    description: "Start from $3.18",
    color: "#00C896",
  },
  {
    name: "Turkey",
    full_name: "Turkey",
    code: "TR",
    dial_code: "+90",
    language_code: "TR",
    image_url: images.turkey,
    description: "Start from $2.99",
    color: "#FFB94A",
  },
  {
    name: "UK",
    full_name: "United Kingdom",
    code: "GB",
    dial_code: "+44",
    language_code: "EN",
    image_url: images.uk,
    description: "Start from $2.89",
    color: "#FFB94A",
  },
  {
    name: "Germany",
    full_name: "Germany",
    code: "DE",
    dial_code: "+49",
    language_code: "DE",
    image_url: images.germany,
    description: "Start from $3.18",
    color: "#00C896",
  },
  {
    name: "Turkey",
    full_name: "Turkey",
    code: "TR",
    dial_code: "+90",
    language_code: "TR",
    image_url: images.turkey,
    description: "Start from $2.99",
    color: "#FFB94A",
  },
];

export const faqData = [
  {
    id: 1,
    question: "What is Telzen?",
    answer:
      "Telzen is a next-generation telecom app powered by eSIM technology. It lets you connect instantly without needing a physical SIM card — offering seamless mobile data and global connectivity from your phone.",
  },
  {
    id: 2,
    question: "How does Telzen work?",
    answer:
      "Telzen uses eSIM technology to digitally activate mobile networks. You can browse available plans, choose your preferred carrier, and connect instantly — all within the app.",
  },
  {
    id: 3,
    question: "What is an eSIM?",
    answer:
      "An eSIM (embedded SIM) is a digital SIM that allows you to activate a mobile plan without inserting a physical SIM card. It’s secure, flexible, and built into most modern smartphones.",
  },
  {
    id: 4,
    question: "Which devices support Telzen?",
    answer:
      "Telzen works on all eSIM-compatible devices, including most recent iPhone, Samsung Galaxy, Google Pixel, and other flagship Android models.",
  },
  {
    id: 5,
    question: "Can I keep my existing number?",
    answer:
      "Yes. Depending on your region and carrier, you can easily port your current mobile number to Telzen without changing it.",
  },
];

export const workSteps: IWorkStep[] = [
  {
    id: 1,
    title: appStrings.selectDestination,
    description: appStrings.easilyChooseFromOverDesc,
    icon: images.destination,
  },
  {
    id: 2,
    title: appStrings.pickPlan,
    description: appStrings.chooseTheDataPackageDesc,
    icon: images.plan,
  },
  {
    id: 3,
    title: appStrings.installESim,
    description: appStrings.activateYourESimDesc,
    icon: images.esim,
  },
  {
    id: 4,
    title: appStrings.stayConnected,
    description: appStrings.enjoyUninterruptedDataDesc,
    icon: images.connected,
  },
];
