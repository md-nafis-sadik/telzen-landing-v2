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
