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
  contactUs: {
    name: appStrings.contactUs,
    path: "/contact-us",
  },
};
