import BlurText from "@/components/animation/BlurText";
import { appStrings } from "@/service";

function PrivacyPolicy() {
  return (
    <main className="font-inter bg-white">
      <section className="py-10 md:py-16 lg:py-20 bg-white">
        <div className="containerX">
          <h2 className="title text-primary-700 mb-6 md:mb-10 lg:mb-20 overflow-hidden text-center">
            <BlurText
              text={appStrings.privacyPolicy}
              translateY={[50, 0]}
              className="md:tracking-[-2px]"
            />
          </h2>
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 text-sm md:text-base lg:text-lg leading-[160%] text-[#888]">
            <p>Last Updated: 20th April 2025</p>
            <p>
              Telzen (&ldquo;Telzen,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is a digital eSIM service operated by Kloud Apps LLC. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our website, mobile application, eSIM products, and related services (&ldquo;Services&rdquo;).
            </p>
            <p>By using Telzen, you agree to the practices described in this Privacy Policy.</p>

            <div>
              <ol className="list-decimal list-inside font-bold">
                <li>Information We Collect</li>
              </ol>
              <p className="font-bold mt-2">1.1 Personal Information You Provide</p>
              <p>We may collect personal information when you:</p>
              <ul className="list-disc list-inside">
                <li>Create an account</li>
                <li>Purchase an eSIM or data plan</li>
                <li>Contact customer support</li>
                <li>Redeem or earn Telzen Points</li>
                <li>Use features such as VPN or Gift eSIM</li>
              </ul>
              <p className="mt-2">This information may include:</p>
              <ul className="list-disc list-inside">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Payment details (processed via third-party gateways)</li>
                <li>Country and device information</li>
                <li>Profile or account preferences</li>
              </ul>
              <p className="mt-2">We do not store full payment card details.</p>

              <p className="font-bold mt-4">1.2 Automatically Collected Information</p>
              <p>When you use our Services, we may automatically collect:</p>
              <ul className="list-disc list-inside">
                <li>Device type and operating system</li>
                <li>IP address</li>
                <li>Approximate location (for service availability, fraud prevention, and regulatory purposes)</li>
                <li>App usage behavior and analytics</li>
                <li>Log data related to eSIM activation or network usage</li>
              </ul>

              <p className="font-bold mt-4">1.3 Network & Connectivity Information</p>
              <p>To operate eSIM services, we may receive:</p>
              <ul className="list-disc list-inside">
                <li>eSIM installation status</li>
                <li>Network identifiers (e.g., ICCID, IMEI)</li>
                <li>Connectivity performance metrics</li>
                <li>Data usage required for plan accuracy</li>
              </ul>
              <p className="mt-2">We do not monitor the content of your communications or browsing activity.</p>

              <p className="font-bold mt-4">1.4 VPN Usage Information</p>
              <p>If you use Telzen&rsquo;s VPN:</p>
              <ul className="list-disc list-inside">
                <li>We may collect basic VPN connection metadata (e.g., session time, bandwidth usage).</li>
                <li>We do not log browsing history, DNS queries, or traffic content.</li>
              </ul>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={2}>
                <li>How We Use Your Information</li>
              </ol>
              <p>We use your information to:</p>
              <ul className="list-disc list-inside">
                <li>Provide and activate eSIM services</li>
                <li>Manage your account</li>
                <li>Process payments and transactions</li>
                <li>Improve app performance and user experience</li>
                <li>Offer customer support</li>
                <li>Send service updates, promotions, or notifications</li>
                <li>Detect fraud and maintain service security</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p className="mt-2">We do not sell your personal data.</p>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={3}>
                <li>Telzen Points and Rewards Data</li>
              </ol>
              <p>When you earn or redeem Telzen Points, we collect:</p>
              <ul className="list-disc list-inside">
                <li>Transaction history</li>
                <li>Referral information</li>
                <li>Engagement data with loyalty campaigns</li>
              </ul>
              <p className="mt-2">This information is used to track rewards and prevent misuse.</p>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={4}>
                <li>Sharing & Disclosure of Information</li>
              </ol>
              <p>We may share your information with:</p>

              <p className="font-bold mt-4">4.1 Service Providers</p>
              <p>Trusted third parties who assist with:</p>
              <ul className="list-disc list-inside">
                <li>Payment processing</li>
                <li>eSIM provisioning and telecom partners</li>
                <li>Cloud hosting and storage</li>
                <li>Analytics and crash reporting</li>
                <li>Customer support tools</li>
              </ul>
              <p className="mt-2">All partners are required to protect your data.</p>

              <p className="font-bold mt-4">4.2 Telecom & Network Operators</p>
              <p>To activate eSIMs and provide connectivity, we must share certain technical details with local carriers.</p>

              <p className="font-bold mt-4">4.3 Legal Compliance</p>
              <p>We may disclose information:</p>
              <ul className="list-disc list-inside">
                <li>When required by law</li>
                <li>To respond to government authorities</li>
                <li>To protect Telzen, our users, or enforce Terms & Conditions</li>
              </ul>

              <p className="font-bold mt-4">4.4 Business Transfers</p>
              <p>If Kloud Apps LLC merges, sells assets, or undergoes acquisition, user information may be transferred as part of the transaction.</p>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={5}>
                <li>Cookies & Tracking Technologies</li>
              </ol>
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside">
                <li>Remember user preferences</li>
                <li>Improve website functionality</li>
                <li>Analyze usage patterns</li>
                <li>Deliver personalized content or promotions</li>
              </ul>
              <p className="mt-2">You may disable cookies through browser settings, but some features may not function properly.</p>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={6}>
                <li>Data Retention</li>
              </ol>
              <p>We retain personal information only as long as necessary for:</p>
              <ul className="list-disc list-inside">
                <li>Service delivery</li>
                <li>Legal compliance</li>
                <li>Fraud prevention</li>
                <li>Accounting and business purposes</li>
              </ul>
              <p className="mt-2">Users may request deletion of their account (see Section 10).</p>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={7}>
                <li>Security</li>
              </ol>
              <p>We employ industry-standard security measures to protect your data, including:</p>
              <ul className="list-disc list-inside">
                <li>Encryption</li>
                <li>Secure servers</li>
                <li>Access controls</li>
                <li>Regular audits</li>
              </ul>
              <p className="mt-2">However, no transmission method is 100% secure. Users share information at their own risk.</p>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={8}>
                <li>International Data Transfers</li>
              </ol>
              <p>
                Your data may be processed outside your home country, including in jurisdictions with different data protection laws. By using our Services, you consent to such transfers.
              </p>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={9}>
                <li>Children&rsquo;s Privacy</li>
              </ol>
              <p>
                Our Services are not intended for individuals under 13 years (or minimum legal age in your region). We do not knowingly collect data from children.
              </p>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={10}>
                <li>Your Rights & Choices</li>
              </ol>
              <p>Depending on your region, you may have rights such as:</p>
              <ul className="list-disc list-inside">
                <li>Access to your data</li>
                <li>Correction or updates</li>
                <li>Deletion requests</li>
                <li>Opt-out of marketing communications</li>
                <li>Restrict certain processing activities</li>
                <li>Data portability</li>
              </ul>
              <p className="mt-2">To exercise these rights, contact us at hello@telzen.net</p>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={11}>
                <li>Third-Party Links</li>
              </ol>
              <p>
                Our Services may contain links to third-party websites. We are not responsible for their privacy practices or content.
              </p>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={12}>
                <li>Updates to This Privacy Policy</li>
              </ol>
              <p>
                We may update this Privacy Policy periodically. Revised versions will be posted with a new &ldquo;Last Updated&rdquo; date. Continued use of our Services means you accept the updated policy.
              </p>
            </div>

            <div>
              <ol className="list-decimal list-inside font-bold" start={13}>
                <li>Contact Us</li>
              </ol>
              <p>For questions, concerns, or privacy-related requests:</p>
              <p>Telzen &mdash; Kloud Apps LLC</p>
              <p>Email: hello@telzen.com</p>
              <p>Address: 254 Chapman Rd, Suite 101-B, Newark, DE 19702</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PrivacyPolicy;