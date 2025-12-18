import { IRoute } from "../config";
import { appStrings } from "./appStrings";

export const routes: IRoute = {
  home: {
    name: "Home",
    path: "/",
  },
  buyPlans: {
    name: appStrings.buyPlans,
    path: "/buy-plans",
  },
  blog: {
    name: appStrings.blog,
    path: "/blog",
  },
  contactUs: {
    name: appStrings.contactUs,
    path: "/contact-us",
  },
  destinations: {
    name: "Destinations",
    path: "/destinations",
  },
  checkout: {
    name: "Checkout",
    path: "/checkout",
  },
};
