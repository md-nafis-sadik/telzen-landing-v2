import { ICountry, IDestination, ITestimonial, IWorkStep } from "../config";
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
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
    name: "Malaysia",
    full_name: "Malaysia",
    code: "MY",
    dial_code: "+60",
    language_code: "MS",
    image_url: images.malaysia,
    description: "Start from $3.05",
    color: "#006752",
  },
  {
    id: 7,
    name: "South Africa",
    full_name: "South Africa",
    code: "ZA",
    dial_code: "+27",
    language_code: "EN",
    image_url: images.southAfrica,
    description: "Start from $3.25",
    color: "#00C896",
  },
  {
    id: 8,
    name: "Bangladesh",
    full_name: "Bangladesh",
    code: "BD",
    dial_code: "+880",
    language_code: "BN",
    image_url: images.bangladesh,
    description: "Start from $2.75",
    color: "#FFB94A",
  },
  {
    id: 9,
    name: "Spain",
    full_name: "Spain",
    code: "ES",
    dial_code: "+34",
    language_code: "ES",
    image_url: images.spain,
    description: "Start from $3.10",
    color: "#006752",
  },
  {
    id: 10,
    name: "Canada",
    full_name: "Canada",
    code: "CA",
    dial_code: "+1",
    language_code: "EN",
    image_url: images.canada,
    description: "Start from $2.95",
    color: "#00C896",
  },
];

export const faqData = [
  {
    id: 1,
    question: appStrings.whatIsTelzen,
    answer: appStrings.whatIsTelzenDesc,
  },
  {
    id: 2,
    question: appStrings.telzenWork,
    answer: appStrings.telzenWorkDesc,
  },

  {
    id: 3,
    question: appStrings.whatIsESim,
    answer: appStrings.whatIsESimDesc,
  },

  {
    id: 4,
    question: appStrings.supportTelzen,
    answer: appStrings.supportTelzenDesc,
  },

  {
    id: 5,
    question: appStrings.existingNumber,
    answer: appStrings.existingNumberDesc,
  },
];

export const testimonials: ITestimonial[] = [
  {
    id: 1,
    quote:
      "Telzen made buying data so simple! I can now top up my internet anytime, anywhere — and the reward points are a great bonus!",
    user: {
      name: "Sarah M.",
      address: "United Kingdom",
      designation: "",
      image_url: images.sarah,
    },
    rating: 4,
  },
  {
    id: 2,
    quote:
      "I love how smooth and fast the Telzen app works. The reward system really keeps me coming back!",
    user: {
      name: "Adebayo K.",
      address: "Nigeria",
      designation: "",
      image_url: images.adebayo,
    },
    rating: 4,
  },
  {
    id: 3,
    quote:
      "Finally, an app that lets me manage data plans globally! Easy to use and very convenient.",
    user: {
      name: "Rave Lost.",
      address: "Germany",
      designation: "",
      image_url: images.rave,
    },
    rating: 5,
  },
  {
    id: 4,
    quote:
      "Telzen’s interface is clean and user-friendly. I bought my first package in less than a minute — impressive!",
    user: {
      name: "Maria L.",
      address: "Philippines",
      designation: "",
      image_url: images.maria,
    },
    rating: 5,
  },
  {
    id: 5,
    quote:
      "Great experience! The points system actually helps me save money on my next data purchase.",
    user: {
      name: "Ahmed Z.",
      address: "UAE",
      designation: "",
      image_url: images.ahmed,
    },
    rating: 3.5,
  },
  {
    id: 6,
    quote:
      "Reliable and fast. I travel often, and Telzen helps me stay connected no matter which country I’m in.",
    user: {
      name: "Lucas T.",
      address: "Brazil",
      designation: "",
      image_url: images.lucas,
    },
    rating: 4.5,
  },
  {
    id: 7,
    quote:
      "Telzen has changed the way I buy data. It’s transparent, rewarding, and works perfectly!",
    user: {
      name: "Emma D.",
      address: "Canada",
      designation: "",
      image_url: images.emma,
    },
    rating: 5,
  },
  {
    id: 8,
    quote:
      "Highly recommended! Excellent app design, smooth transactions, and great support team.",
    user: {
      name: "Sokha C.",
      address: "Cambodia",
      designation: "",
      image_url: images.sokha,
    },
    rating: 4,
  },
];

export const whyChooseList = [
  {
    id: 1,
    question: appStrings.oneESimAllTrips,
    answer: appStrings.useOneEsimDesc,
  },

  {
    id: 2,
    question: appStrings.trustedByTravelers,
    answer: appStrings.joinGlobalTravelersDesc,
  },

  {
    id: 3,
    question: appStrings.directInAppEsim,
    answer: appStrings.installActivateESimDesc,
  },

  {
    id: 4,
    question: appStrings.supportTransparent,
    answer: appStrings.enjoySupportTransparentDesc,
  },

  {
    id: 5,
    question: appStrings.seamlessConnectivity,
    answer: appStrings.switchPlansDesc,
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

export const aboutViewData = [
  {
    image: images.officeImage2,
    title: "Office Image 1",
    description: "Office Image 1",
  },
  {
    image: images.officeImage4,
    title: "Office Image 2",
    description: "Office Image 2",
  },
  {
    image: images.officeImage5,
    title: "Office Image 3",
    description: "Office Image 3",
  },
  {
    image: images.officeImage2,
    title: "Office Image 4",
    description: "Office Image 4",
  },
  {
    image: images.officeImage4,
    title: "Office Image 5",
    description: "Office Image 5",
  },
  {
    image: images.officeImage5,
    title: "Office Image 6",
    description: "Office Image 6",
  },
];
