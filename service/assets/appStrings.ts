import TermsAndConditions from "@/app/terms-and-conditions/page";

export const appStrings = {
  // titles
  buyPlans: "Buy Plans",
  contactUs: "Contact Us",
  aboutUs: "About Us",
  culture: "Culture",
  blogs: "Blogs",
  termsAndConditions: "Terms and Conditions",
  privacyPolicy: "Privacy Policy",
  ourMission: "Our Mission",
  ourVision: "Our Vision",
  download: "Download",
  downloadNow: "Download Now!",
  stayOnline: "Stay Online",
  anywhere: "Anywhere",
  findPopularDestination: "Find Popular Destination",
  destinations: "Destinations",
  howItWorks: "How It works",
  selectDestination: "Select Destination",
  pickPlan: "Pick a Plan",
  installESim: "Install eSIM",
  stayConnected: "Stay Connected",
  whyChooseTelzen: "Why choose Telzen?",
  oneESimAllTrips: "One eSIM for All Trips",
  trustedByTravelers: "Trusted by 200,000+ Travelers",
  directInAppEsim: "Direct In-App eSIM Setup",
  supportTransparent: "24/7 Support & Transparent Pricing",
  seamlessConnectivity: "Seamless Connectivity & Easy Management",
  nationwideCoverage: "Nationwide 5G Coverage.",
  referFriend: "Refer a friend, and you'll both get US$5!",
  customerSaidAbout: "Customers Said About Us",
  downloadTelzenApp: "Download Telzen app",
  faq: "Frequently Asked Questions",
  whatIsTelzen: "What is Telzen?",
  telzenWork: "How does Telzen work?",
  whatIsESim: "What is an eSIM?",
  supportTelzen: "Which devices support Telzen?",
  existingNumber: "Can I keep my existing number?",
  netroSystemsLimited: "Netro Systems Limited",
  kloudAppLLC: "Kloud Apps LLC",
  telzen: "Telzen",
  recomended: "Recommended",
  headerButtonText: "Login/SignUp",

  // Auth & Forms
  login: "LOGIN",
  loginTitle: "Login",
  loginDescription: "Simple login towards unlimited, unmetered internet access for everyone",
  register: "REGISTER",
  registerTitle: "Register",
  registerDescription: "Create your account to get started with Telzen eSIM",
  verifyOtp: "VERIFY OTP",
  otpVerificationTitle: "OTP Verification",
  otpDescription: "We've sent a verification code to",
  yourEmail: "Your Email",
  yourName: "Your Name",
  yourEmailOtp: "Your Email (For OTP Verification)",
  country: "Country",
  enterYourEmail: "Enter your email",
  enterYourName: "Enter your name",
  loginBtn: "Login",
  registerBtn: "Register",
  verifyBtn: "Verify and Login",
  loggingIn: "Logging in...",
  registering: "Registering...",
  verifying: "Verifying...",
  loginWithGoogle: "Login With Google",
  dontHaveAccount: "Don't have an account?",
  alreadyHaveAccount: "Already have an account?",
  registerNow: "Register Now",
  loginNow: "Login Now",
  didntReceiveOtp: "Didn't receive an OTP?",
  resendCode: "Resend Code",
  agreeToTerms: "I agree to the",
  termsOfService: "Terms of Service",
  and: "and",
  createAccountSuccess: "SUCCESS!",
  accountCreatedMessage: "Your account has been created.",
  exploreHomepage: "Explore Homepage",
  takingBreak: "TAKING A BREAK?",
  logoutMessage: "Rather than you can stay here, we do not bite!",
  logOut: "Log Out",
  cancel: "Cancel",
  myProfile: "MY PROFILE",
  profileWelcome: "Welcome to Telzen eSIM. Affordable eSIM around the world.",
  save: "Save",
  saving: "Saving...",
  removingEsim: "REMOVING ESIM?",
  removeEsimMessage: "Removing an eSIM will lose access to this connection. Make sure to your decision.",
  remove: "Remove",
  removing: "Removing...",
  esimRemoved: "eSIM Removed",
  esimRemovedMessage: "Your eSIM has been removed.",
  home: "Home",

  // Contact Form
  subject: "Subject",
  subjectOptional: "Subject (Optional)",
  message: "Message",
  enterSubject: "Enter subject",
  startTypingName: "Start typing your name here",
  startTypingEmail: "Start typing your email here",
  startTypingMessage: "Start typing your message here",
  submit: "Submit",
  sending: "Sending...",
  sendMessage: "Send message",
  sendingMessage: "Sending message...",

  // Checkout
  cardNumber: "Card Number",
  expirationDate: "Expiration Date",
  cvc: "CVC",
  continue: "Continue",
  homepage: "Homepage",
  myEsim: "My eSIM",
  applyCoupon: "Apply Coupon",
  enterCouponCode: "Enter Coupon Code",
  applyCouponBtn: "Apply Coupon",
  applying: "Applying...",
  couponApplied: "Coupon Applied!",

  // Destinations
  loadMore: "Load More",
  browseAllDestinations: "Browse All Destinations",
  noPackagesAvailable: "No Packages Available",
  noPackagesMessage: "We don't have any packages for this destination yet. Check out our other popular destinations!",

  // My eSIM
  downloadQr: "Download QR",
  removeEsim: "Remove eSIM",
  buyAnotherPlan: "Buy Another Plan",
  noEsimsFound: "No eSIMs found",
  purchaseFirstEsim: "Purchase your first eSIM to get started!",
  browseDestinations: "Browse Destinations",

  // Legal Pages
  lastUpdated: "Last Updated:",
  privacyPolicyTitle: "Privacy Policy",
  termsAndConditionsTitle: "Terms and Conditions",
  
  // Privacy Policy Content Structure
  privacyPolicyContent: {
    intro: [
      "Telzen (\"Telzen,\" \"we,\" \"us,\" or \"our\") is a digital eSIM service operated by Kloud Apps LLC. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our website, mobile application, eSIM products, and related services (\"Services\").",
      "By using Telzen, you agree to the practices described in this Privacy Policy."
    ],
    sections: [
      {
        type: "section",
        number: 1,
        title: "Information We Collect",
        subsections: [
          {
            type: "subsection",
            title: "1.1 Personal Information You Provide",
            paragraphs: ["We may collect personal information when you:"],
            list: {
              type: "ul",
              items: [
                "Create an account",
                "Purchase an eSIM or data plan",
                "Contact customer support",
                "Redeem or earn Telzen Points",
                "Use features such as VPN or Gift eSIM"
              ]
            },
            additionalContent: [
              { type: "paragraph", text: "This information may include:" },
              {
                type: "ul",
                items: [
                  "Name",
                  "Email address",
                  "Phone number",
                  "Payment details (processed via third-party gateways)",
                  "Country and device information",
                  "Profile or account preferences"
                ]
              },
              { type: "paragraph", text: "We do not store full payment card details." }
            ]
          },
          {
            type: "subsection",
            title: "1.2 Automatically Collected Information",
            paragraphs: ["When you use our Services, we may automatically collect:"],
            list: {
              type: "ul",
              items: [
                "Device type and operating system",
                "IP address",
                "Approximate location (for service availability, fraud prevention, and regulatory purposes)",
                "App usage behavior and analytics",
                "Log data related to eSIM activation or network usage"
              ]
            }
          },
          {
            type: "subsection",
            title: "1.3 Network & Connectivity Information",
            paragraphs: ["To operate eSIM services, we may receive:"],
            list: {
              type: "ul",
              items: [
                "eSIM installation status",
                "Network identifiers (e.g., ICCID, IMEI)",
                "Connectivity performance metrics",
                "Data usage required for plan accuracy"
              ]
            },
            additionalContent: [
              { type: "paragraph", text: "We do not monitor the content of your communications or browsing activity." }
            ]
          },
          {
            type: "subsection",
            title: "1.4 VPN Usage Information",
            paragraphs: ["If you use Telzen's VPN:"],
            list: {
              type: "ul",
              items: [
                "We may collect basic VPN connection metadata (e.g., session time, bandwidth usage).",
                "We do not log browsing history, DNS queries, or traffic content."
              ]
            }
          }
        ]
      },
      {
        type: "section",
        number: 2,
        title: "How We Use Your Information",
        paragraphs: ["We use your information to:"],
        list: {
          type: "ul",
          items: [
            "Provide and activate eSIM services",
            "Manage your account",
            "Process payments and transactions",
            "Improve app performance and user experience",
            "Offer customer support",
            "Send service updates, promotions, or notifications",
            "Detect fraud and maintain service security",
            "Comply with legal obligations"
          ]
        },
        additionalContent: [
          { type: "paragraph", text: "We do not sell your personal data." }
        ]
      },
      {
        type: "section",
        number: 3,
        title: "Telzen Points and Rewards Data",
        paragraphs: ["When you earn or redeem Telzen Points, we collect:"],
        list: {
          type: "ul",
          items: [
            "Transaction history",
            "Referral information",
            "Engagement data with loyalty campaigns"
          ]
        },
        additionalContent: [
          { type: "paragraph", text: "This information is used to track rewards and prevent misuse." }
        ]
      },
      {
        type: "section",
        number: 4,
        title: "Sharing & Disclosure of Information",
        paragraphs: ["We may share your information with:"],
        subsections: [
          {
            type: "subsection",
            title: "4.1 Service Providers",
            paragraphs: ["Trusted third parties who assist with:"],
            list: {
              type: "ul",
              items: [
                "Payment processing",
                "eSIM provisioning and telecom partners",
                "Cloud hosting and storage",
                "Analytics and crash reporting",
                "Customer support tools"
              ]
            },
            additionalContent: [
              { type: "paragraph", text: "All partners are required to protect your data." }
            ]
          },
          {
            type: "subsection",
            title: "4.2 Telecom & Network Operators",
            paragraphs: ["To activate eSIMs and provide connectivity, we must share certain technical details with local carriers."]
          },
          {
            type: "subsection",
            title: "4.3 Legal Compliance",
            paragraphs: ["We may disclose information:"],
            list: {
              type: "ul",
              items: [
                "When required by law",
                "To respond to government authorities",
                "To protect Telzen, our users, or enforce Terms & Conditions"
              ]
            }
          },
          {
            type: "subsection",
            title: "4.4 Business Transfers",
            paragraphs: ["If Kloud Apps LLC merges, sells assets, or undergoes acquisition, user information may be transferred as part of the transaction."]
          }
        ]
      },
      {
        type: "section",
        number: 5,
        title: "Cookies & Tracking Technologies",
        paragraphs: ["We use cookies and similar technologies to:"],
        list: {
          type: "ul",
          items: [
            "Remember user preferences",
            "Improve website functionality",
            "Analyze usage patterns",
            "Deliver personalized content or promotions"
          ]
        },
        additionalContent: [
          { type: "paragraph", text: "You may disable cookies through browser settings, but some features may not function properly." }
        ]
      },
      {
        type: "section",
        number: 6,
        title: "Data Retention",
        paragraphs: ["We retain personal information only as long as necessary for:"],
        list: {
          type: "ul",
          items: [
            "Service delivery",
            "Legal compliance",
            "Fraud prevention",
            "Accounting and business purposes"
          ]
        },
        additionalContent: [
          { type: "paragraph", text: "Users may request deletion of their account (see Section 10)." }
        ]
      },
      {
        type: "section",
        number: 7,
        title: "Security",
        paragraphs: ["We employ industry-standard security measures to protect your data, including:"],
        list: {
          type: "ul",
          items: [
            "Encryption",
            "Secure servers",
            "Access controls",
            "Regular audits"
          ]
        },
        additionalContent: [
          { type: "paragraph", text: "However, no transmission method is 100% secure. Users share information at their own risk." }
        ]
      },
      {
        type: "section",
        number: 8,
        title: "International Data Transfers",
        paragraphs: ["Your data may be processed outside your home country, including in jurisdictions with different data protection laws. By using our Services, you consent to such transfers."]
      },
      {
        type: "section",
        number: 9,
        title: "Children's Privacy",
        paragraphs: ["Our Services are not intended for individuals under 13 years (or minimum legal age in your region). We do not knowingly collect data from children."]
      },
      {
        type: "section",
        number: 10,
        title: "Your Rights & Choices",
        paragraphs: ["Depending on your region, you may have rights such as:"],
        list: {
          type: "ul",
          items: [
            "Access to your data",
            "Correction or updates",
            "Deletion requests",
            "Opt-out of marketing communications",
            "Restrict certain processing activities",
            "Data portability"
          ]
        },
        additionalContent: [
          { type: "paragraph", text: "To exercise these rights, contact us at hello@telzen.net" }
        ]
      },
      {
        type: "section",
        number: 11,
        title: "Third-Party Links",
        paragraphs: ["Our Services may contain links to third-party websites. We are not responsible for their privacy practices or content."]
      },
      {
        type: "section",
        number: 12,
        title: "Updates to This Privacy Policy",
        paragraphs: ["We may update this Privacy Policy periodically. Revised versions will be posted with a new \"Last Updated\" date. Continued use of our Services means you accept the updated policy."]
      },
      {
        type: "section",
        number: 13,
        title: "Contact Us",
        paragraphs: [
          "For questions, concerns, or privacy-related requests:",
          "Telzen — Kloud Apps LLC",
          "Email: hello@telzen.com",
          "Address: 254 Chapman Rd, Suite 101-B, Newark, DE 19702"
        ]
      }
    ]
  },

  // Terms and Conditions Content Structure
  termsAndConditionsContent: {
    intro: [
      "Welcome to Telzen, a digital eSIM service provided by Kloud Apps LLC (\"Telzen,\" \"we,\" \"us,\" or \"our\"). By accessing or using our website, mobile application, eSIM services, or any related products (collectively, the \"Services\"), you agree to these Terms & Conditions (\"Terms\"). If you do not agree, please do not use our Services."
    ],
    sections: [
      {
        type: "section",
        number: 1,
        title: "Eligibility",
        paragraphs: ["By using Telzen, you represent that you are:"],
        list: {
          type: "ul",
          items: [
            "At least 12 years old or of legal age in your jurisdiction.",
            "Fully able and competent to enter into these Terms.",
            "Using the Services for lawful purposes only."
          ]
        }
      },
      {
        type: "section",
        number: 2,
        title: "Use of Services",
        paragraphs: ["Telzen provides digital eSIMs, mobile data packages, and related features including VPN, loyalty points, and customer tools. You agree not to:"],
        list: {
          type: "ul",
          items: [
            "Misuse or attempt to interfere with the network services.",
            "Use the Services for illegal, fraudulent, harmful, or abusive activities.",
            "Resell or redistribute eSIM data packages without authorization.",
            "Attempt to modify or reverse-engineer any part of our system or software."
          ]
        },
        additionalContent: [
          { type: "paragraph", text: "We reserve the right to suspend or terminate accounts that violate these Terms." }
        ]
      },
      {
        type: "section",
        number: 3,
        title: "eSIM Activation & Coverage",
        list: {
          type: "ul",
          items: [
            "Successful activation of an eSIM depends on device compatibility, network availability, and correct installation steps.",
            "Telzen is not responsible for failures due to incompatible devices, mobile network restrictions, local regulations, or user error.",
            "Coverage and speeds vary by country, network partner, and environment."
          ]
        }
      },
      {
        type: "section",
        number: 4,
        title: "Data Packages & Usage",
        list: {
          type: "ul",
          items: [
            "All data packages are prepaid, non-refundable, and expire as stated.",
            "Unused data does not roll over unless explicitly stated.",
            "Data speeds may be affected by network traffic, operator policies, or technical limitations."
          ]
        }
      },
      {
        type: "section",
        number: 5,
        title: "Pricing & Payments",
        list: {
          type: "ul",
          items: [
            "Prices are displayed within the Telzen platform and may vary by region.",
            "Payments are processed through approved third-party gateways.",
            "We are not responsible for foreign exchange fees or bank processing charges."
          ]
        }
      },
      {
        type: "section",
        number: 6,
        title: "Refund Policy",
        paragraphs: ["Refunds may be considered only under the following conditions:"],
        list: {
          type: "ul",
          items: [
            "eSIM cannot be activated due to a verified technical issue on our side.",
            "The data plan has not been used in any capacity."
          ]
        },
        additionalContent: [
          { type: "paragraph", text: "Refunds are not applicable for:" },
          {
            type: "ul",
            items: [
              "User error (e.g., incompatible device, improper installation).",
              "Plans activated and consumed any data.",
              "Changes of travel plans.",
              "Network issues caused by local operators or government restrictions."
            ]
          },
          { type: "paragraph", text: "All refund decisions are at Telzen's sole discretion." }
        ]
      },
      {
        type: "section",
        number: 7,
        title: "Telzen Points & Rewards",
        list: {
          type: "ul",
          items: [
            "Telzen Points (\"Points\") are loyalty rewards with no monetary value.",
            "Points may be earned, redeemed, or forfeited based on promotional rules.",
            "Points cannot be converted to cash and may expire as per policy.",
            "Telzen may modify or discontinue the Points program at any time."
          ]
        }
      },
      {
        type: "section",
        number: 8,
        title: "VPN & Security Features",
        paragraphs: ["Our VPN and security features are provided \"as is\" and are not guaranteed to:"],
        list: {
          type: "ul",
          items: [
            "Prevent all cyber threats",
            "Bypass geographical restrictions",
            "Offer uninterrupted service"
          ]
        },
        additionalContent: [
          { type: "paragraph", text: "Users remain responsible for maintaining secure device practices." }
        ]
      },
      {
        type: "section",
        number: 9,
        title: "Gift eSIMs",
        list: {
          type: "ul",
          items: [
            "Gift eSIMs are transferable only once.",
            "Telzen is not responsible if a gift eSIM is sent to the wrong recipient.",
            "Gifted plans follow the same usage, expiry, and refund terms."
          ]
        }
      },
      {
        type: "section",
        number: 10,
        title: "Account Responsibilities",
        paragraphs: ["You are responsible for:"],
        list: {
          type: "ul",
          items: [
            "Maintaining the confidentiality of your account.",
            "Ensuring accurate personal information.",
            "All activity under your account, authorized or unauthorized."
          ]
        },
        additionalContent: [
          { type: "paragraph", text: "Notify us immediately if you suspect unauthorized access." }
        ]
      },
      {
        type: "section",
        number: 11,
        title: "Intellectual Property",
        paragraphs: ["All content, branding, software, and design elements are owned by Kloud Apps LLC. You may not copy, distribute, or use Telzen's intellectual property without permission."]
      },
      {
        type: "section",
        number: 12,
        title: "Limitation of Liability",
        paragraphs: ["To the maximum extent permitted by law:"],
        list: {
          type: "ul",
          items: [
            "Telzen is not liable for indirect, incidental, or consequential damages.",
            "We do not guarantee uninterrupted service, specific speeds, or coverage.",
            "Our total liability shall not exceed the amount you paid for the applicable service."
          ]
        }
      },
      {
        type: "section",
        number: 13,
        title: "Indemnification",
        paragraphs: ["You agree to indemnify and hold harmless Telzen and Kloud Apps LLC from any claims, damages, losses, or expenses arising from your misuse of the Services or violation of these Terms."]
      },
      {
        type: "section",
        number: 14,
        title: "Changes to Terms",
        paragraphs: ["We may update these Terms at any time. Changes will be posted on our website or app. Continued use of our Services means you accept the updated Terms."]
      },
      {
        type: "section",
        number: 15,
        title: "Governing Law",
        paragraphs: ["These Terms are governed by and interpreted in accordance with the laws of Delaware, United States, without regard to conflict of law principles."]
      },
      {
        type: "section",
        number: 16,
        title: "Contact Information",
        paragraphs: [
          "For questions, support, or legal inquiries, contact us at:",
          "Email: hello@telzen.net",
          "Address: Kloud Apps LLC, 254 Chapman Rd, Suite 101-B, Newark, DE 19702"
        ]
      }
    ]
  },

  //   description
  downloadAppActivateSimDesc: "Download the App & Activate Your eSIM Now.",
  discoverOurMostPopularDesc:
    "Discover our most popular destinations over 200+ countries.",
  easilyChooseFromOverDesc: "Easily choose from over 180 countries.",
  chooseTheDataPackageDesc: "Choose the data package that best suits",
  activateYourESimDesc: "Activate your eSIM",
  enjoyUninterruptedDataDesc: "Enjoy uninterrupted data and VPN",
  useOneEsimDesc:
    "Use one eSIM for 180+ countries — no reinstallation required for each journey.",
  joinGlobalTravelersDesc:
    "Join global travelers trusting Telzen for fast, secure, and affordable connectivity.",
  installActivateESimDesc:
    "Install and activate your eSIM instantly from the Telzen app — no QR codes.",
  enjoySupportTransparentDesc:
    "Enjoy 24/7 support and transparent pricing with no hidden fees or surprises.",
  switchPlansDesc:
    "Switch plans, track usage, and manage networks effortlessly in one app.",
  globalConnectivityDesc:
    "Experience global 5G connectivity, complemented by extended coverage through the community-powered Helium Network.",
  inviteYourFriendDesc:
    "Invite your friends to Telzen and receive US$5 in credits, while they enjoy a US$5 discount.",
  frequentTravelerDesc:
    "As a frequent business traveler, reliable connectivity is a must, and Simly delivers. Setting up the eSlM was quick, and I could stay connected during back-to-back trips in multiple countries.",
  bagpackingTravelerDesc:
    "Simly made my backpacking trip across Europe so much easier. I stayed connected in every country without having to switch SIM cards. The app was super easy to use, and I loved being able to top up anytime on the go!",
  youCanGetDesc: "You can get",
  onGooglePlayDesc: "on Google Play and the App Store or by clicking bellow.",
  whatIsTelzenDesc:
    "Telzen is a next-generation telecom app powered by eSIM technology. It lets you connect instantly without needing a physical SIM card — offering seamless mobile data and global connectivity from your phone.",
  telzenWorkDesc:
    "Telzen uses eSIM technology to digitally activate mobile networks. You can browse available plans, choose your preferred carrier, and connect instantly — all within the app.",
  whatIsESimDesc:
    "An eSIM (embedded SIM) is a digital SIM that allows you to activate a mobile plan without inserting a physical SIM card. It’s secure, flexible, and built into most modern smartphones.",
  supportTelzenDesc:
    "Telzen works on all eSIM-compatible devices, including most recent iPhone, Samsung Galaxy, Google Pixel, and other flagship Android models.",
  existingNumberDesc:
    "Yes. Depending on your region and carrier, you can easily port your current mobile number to Telzen without changing it.",
  copyRightDesc:
    "290737 York House Green Lane West, Garstang, Preston, Lancashire, England, PR3 1NJ",
  pleaseCheckOurPrice: "*Please check our app for latest price list.",
  whySimly: "Here is why Simly is your go-to eSim provider",
  basedOnPublicDemand: "Based on public demand and most visited countries.",
  about1: "Telzen is a next-generation eSIM brand created by Kloud Apps LLC, built to deliver seamless, borderless connectivity for modern travelers and global citizens. Founded with a strong focus on mass adoption and affordability, Telzen ensures that anyone can stay connected anywhere in the world—without the complexity of traditional mobile plans.",
  about2: "Beyond connectivity, Telzen is designed with purpose. Our commitment extends to reducing carbon emissions through digital-first technology, creating an intuitive user experience, and rewarding our customers through Telzen Points. With innovative features such as built-in VPN for secure browsing, Gift eSIM options, and a customer-centric platform, we aim to redefine how people experience mobile data on the go.",
  about3: "Telzen is more than an eSIM—it&’s a smarter, greener, more convenient way to connect.",
  ourMissionDesc: "Our mission is to make global connectivity effortless, affordable, and accessible for everyone. We aim to empower travelers and digital nomads with secure, reliable eSIM solutions while contributing to a more sustainable future through digital innovation. By delivering exceptional user experience, rewarding loyalty, and introducing value-driven features, Telzen strives to simplify communication and enhance the way people explore the world.",
  ourVisionDesc: "Our vision is to become the world’s most trusted and customer-centric eSIM brand—leading the shift toward greener, more flexible mobile connectivity. Telzen aspires to create a global ecosystem where users enjoy seamless digital experiences, innovative features, and meaningful rewards, all while contributing to a reduced environmental footprint and a more connected future.",
  cultureDesc: "At Telzen, our culture is built around trust, ownership, and genuine collaboration. We keep the environment open, respectful, and people-first—where everyone, regardless of role, has a real voice. Teams are encouraged to take full ownership of their work without micromanagement, and leaders act more like mentors than supervisors. We move fast and think big, but we don’t glorify burnout; we value balance, transparency, and honest communication. With flexible work options, diverse perspectives, and a shared commitment to meaningful work—from reducing carbon emissions to reshaping global connectivity—we stay grounded in our mission. Day-to-day, our culture is shaped by simple, human moments: casual lunch hangouts, shoutouts for good work, celebrating wins together, learning from failures, and supporting each other’s growth. It’s a place where ambition stays humble, ideas flow freely, and people genuinely enjoy building something impactful as a team.",
};
