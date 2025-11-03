interface IProps {
  className?: string;
  color?: string;
  secondaryColor?: string;
  secondaryMainColor?: string;
  textColor?: string;
  [key: string]: any;
}

interface IRoute {
  home: {
    name: string;
    path: string;
  };
  buyPlans: {
    name: string;
    path: string;
  };
  contactUs: {
    name: string;
    path: string;
  };
}

interface ICountry {
  name: string;
  full_name: string;
  code: string;
  dial_code: string;
  image_url: string;
  language_code?: string;
}

interface IDestination extends ICountry {
  description?: string;
  color?: string;
}

interface IFaqItem {
  id: number;
  question: string;
  answer: string;
}

interface IWorkStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export type { ICountry, IDestination, IFaqItem, IProps, IRoute, IWorkStep };
