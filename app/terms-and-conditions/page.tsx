import BlurText from "@/components/animation/BlurText";
import { appStrings } from "@/service";

function TermsAndConditions() {
  return (
    <main className="font-inter bg-white">
      <section className="py-10 md:py-16 lg:py-20 bg-white">
        <div className="containerX">
          <h2 className="title text-primary-700 mb-6 md:mb-10 lg:mb-20 overflow-hidden text-center">
            <BlurText
              text={appStrings.termsAndConditions}
              translateY={[50, 0]}
              className="md:tracking-[-2px]"
            />
          </h2>
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 text-sm md:text-base lg:text-lg leading-[160%] text-[#888]">
            <p>Last Updated: 20th April 2025</p>
            <p>
              Welcome to Telzen, a digital eSIM service provided by Kloud Apps
              LLC (&ldquo;Telzen,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or using our
              website, mobile application, eSIM services, or any related
              products (collectively, the &ldquo;Services&rdquo;), you agree to these Terms
              & Conditions (&ldquo;Terms&rdquo;). If you do not agree, please do not use our
              Services.
            </p>

            <div>
              <ol className="list-decimal list-inside font-bold">
                <li>Eligibility</li>
              </ol>
              <p>By using Telzen, you represent that you are:</p>
              <ul className="list-disc list-inside">
                <li>
                  At least 12 years old or of legal age in your jurisdiction.
                </li>
                <li>Fully able and competent to enter into these Terms.</li>
                <li>Using the Services for lawful purposes only.</li>
              </ul>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={2}>
                <li>Use of Services</li>
              </ol>
              <p>
                Telzen provides digital eSIMs, mobile data packages, and related features including VPN, loyalty points, and customer tools. You agree not to:
              </p>
              <ul className="list-disc list-inside">
                <li>Misuse or attempt to interfere with the network services.</li>
                <li>Use the Services for illegal, fraudulent, harmful, or abusive activities.</li>
                <li>Resell or redistribute eSIM data packages without authorization.</li>
                <li>Attempt to modify or reverse-engineer any part of our system or software.</li>
              </ul>
              <p>We reserve the right to suspend or terminate accounts that violate these Terms.</p>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={3}>
                <li>eSIM Activation & Coverage</li>
              </ol>
              <ul className="list-disc list-inside">
                <li>Successful activation of an eSIM depends on device compatibility, network availability, and correct installation steps.</li>
                <li>Telzen is not responsible for failures due to incompatible devices, mobile network restrictions, local regulations, or user error.</li>
                <li>Coverage and speeds vary by country, network partner, and environment.</li>
              </ul>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={4}>
                <li>Data Packages & Usage</li>
              </ol>
              <ul className="list-disc list-inside">
                <li>All data packages are prepaid, non-refundable, and expire as stated.</li>
                <li>Unused data does not roll over unless explicitly stated.</li>
                <li>Data speeds may be affected by network traffic, operator policies, or technical limitations.</li>
              </ul>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={5}>
                <li>Pricing & Payments</li>
              </ol>
              <ul className="list-disc list-inside">
                <li>Prices are displayed within the Telzen platform and may vary by region.</li>
                <li>Payments are processed through approved third-party gateways.</li>
                <li>We are not responsible for foreign exchange fees or bank processing charges.</li>
              </ul>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={6}>
                <li>Refund Policy</li>
              </ol>
              <p>Refunds may be considered only under the following conditions:</p>
              <ul className="list-disc list-inside">
                <li>eSIM cannot be activated due to a verified technical issue on our side.</li>
                <li>The data plan has not been used in any capacity.</li>
              </ul>
              <p>Refunds are not applicable for:</p>
              <ul className="list-disc list-inside">
                <li>User error (e.g., incompatible device, improper installation).</li>
                <li>Plans activated and consumed any data.</li>
                <li>Changes of travel plans.</li>
                <li>Network issues caused by local operators or government restrictions.</li>
              </ul>
              <p>All refund decisions are at Telzen&rsquo;s sole discretion.</p>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={7}>
                <li>Telzen Points & Rewards</li>
              </ol>
              <ul className="list-disc list-inside">
                <li>Telzen Points (&ldquo;Points&rdquo;) are loyalty rewards with no monetary value.</li>
                <li>Points may be earned, redeemed, or forfeited based on promotional rules.</li>
                <li>Points cannot be converted to cash and may expire as per policy.</li>
                <li>Telzen may modify or discontinue the Points program at any time.</li>
              </ul>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={8}>
                <li>VPN & Security Features</li>
              </ol>
              <p>Our VPN and security features are provided &ldquo;as is&rdquo; and are not guaranteed to:</p>
              <ul className="list-disc list-inside">
                <li>Prevent all cyber threats</li>
                <li>Bypass geographical restrictions</li>
                <li>Offer uninterrupted service</li>
              </ul>
              <p>Users remain responsible for maintaining secure device practices.</p>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={9}>
                <li>Gift eSIMs</li>
              </ol>
              <ul className="list-disc list-inside">
                <li>Gift eSIMs are transferable only once.</li>
                <li>Telzen is not responsible if a gift eSIM is sent to the wrong recipient.</li>
                <li>Gifted plans follow the same usage, expiry, and refund terms.</li>
              </ul>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={10}>
                <li>Account Responsibilities</li>
              </ol>
              <p>You are responsible for:</p>
              <ul className="list-disc list-inside">
                <li>Maintaining the confidentiality of your account.</li>
                <li>Ensuring accurate personal information.</li>
                <li>All activity under your account, authorized or unauthorized.</li>
              </ul>
              <p>Notify us immediately if you suspect unauthorized access.</p>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={11}>
                <li>Intellectual Property</li>
              </ol>
              <p>
                All content, branding, software, and design elements are owned by Kloud Apps LLC. You may not copy, distribute, or use Telzen&rsquo;s intellectual property without permission.
              </p>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={12}>
                <li>Limitation of Liability</li>
              </ol>
              <p>To the maximum extent permitted by law:</p>
              <ul className="list-disc list-inside">
                <li>Telzen is not liable for indirect, incidental, or consequential damages.</li>
                <li>We do not guarantee uninterrupted service, specific speeds, or coverage.</li>
                <li>Our total liability shall not exceed the amount you paid for the applicable service.</li>
              </ul>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={13}>
                <li>Indemnification</li>
              </ol>
              <p>
                You agree to indemnify and hold harmless Telzen and Kloud Apps LLC from any claims, damages, losses, or expenses arising from your misuse of the Services or violation of these Terms.
              </p>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={14}>
                <li>Changes to Terms</li>
              </ol>
              <p>
                We may update these Terms at any time. Changes will be posted on our website or app. Continued use of our Services means you accept the updated Terms.
              </p>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={15}>
                <li>Governing Law</li>
              </ol>
              <p>
                These Terms are governed by and interpreted in accordance with the laws of Delaware, United States, without regard to conflict of law principles.
              </p>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={16}>
                <li>Contact Information</li>
              </ol>
              <p>For questions, support, or legal inquiries, contact us at:</p>
              <p>Email: hello@telzen.net</p>
              <p>Address: Kloud Apps LLC, 254 Chapman Rd, Suite 101-B, Newark, DE 19702</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TermsAndConditions;