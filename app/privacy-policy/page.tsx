import BlurText from "@/components/animation/BlurText";
import { appStrings } from "@/service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Your Data Protection | Telzen",
  description:
    "Read Telzen's privacy policy to understand how we protect and handle your personal data when using our eSIM services.",
  keywords:
    "privacy policy, data protection, user privacy, Telzen privacy, GDPR compliance, data security",
  openGraph: {
    title: "Privacy Policy - Your Data Protection | Telzen",
    description:
      "Read Telzen's privacy policy to understand how we protect and handle your personal data when using our eSIM services.",
    url: "/privacy-policy",
  },
};

function PrivacyPolicy() {
  const { sections } = appStrings.privacyPolicyContent;

  const processEmailLinks = (htmlString: string) => {
    return htmlString.replace(
      /<b>Email:<\/b>\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi,
      '<b>Email:</b> <a href="mailto:$1" class="text-primary-600 hover:text-primary-700 underline">$1</a>'
    );
  };

  const renderContent = (content: any, index: number) => {
    if (content.type === "paragraph") {
      return (
        <p key={index} className={content.className || "mt-2"}>
          {content.text}
        </p>
      );
    }

    if (content.type === "ul") {
      return (
        <ul key={index} className="list-disc list-inside space-y-1 mt-2">
          {content.items.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    }

    return null;
  };

  return (
    <main className="font-inter bg-white">
      <section className="py-10 md:py-16 lg:py-20 bg-white">
        <div className="containerX">
          <div className="overflow-y-clip pb-2">
            <h2 className="title text-primary-700 mb-6 md:mb-10 lg:mb-20 text-center">
              <BlurText
                text={appStrings.privacyPolicyTitle}
                translateY={[50, 0]}
                className="md:tracking-[-2px]"
              />
            </h2>
          </div>
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 text-sm md:text-base lg:text-lg leading-[160%] text-[#888]">
            <p
              dangerouslySetInnerHTML={{
                __html: processEmailLinks(appStrings.effectiveDate),
              }}
            />

            {/* Sections */}
            {sections.map((section: any, sectionIndex: number) => (
              <div key={sectionIndex}>
                <h3 className="font-bold">
                  {section.number}. {section.title}
                </h3>

                {/* Section Paragraphs */}
                {section.paragraphs?.map(
                  (paragraph: string, pIndex: number) => (
                    <p key={pIndex} className={pIndex > 0 ? "mt-2" : ""}>
                      {paragraph}
                    </p>
                  )
                )}

                {/* Section List */}
                {section.list && (
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    {section.list.items.map(
                      (item: string, itemIndex: number) => (
                        <li key={itemIndex}>{item}</li>
                      )
                    )}
                  </ul>
                )}

                {/* Additional Content (mixed paragraphs and lists) */}
                {section.additionalContent?.map(
                  (content: any, contentIndex: number) =>
                    renderContent(content, contentIndex)
                )}

                {/* Subsections */}
                {section.subsections?.map(
                  (subsection: any, subIndex: number) => (
                    <div key={subIndex} className="mt-4">
                      <p className="font-bold ">{subsection.title}</p>

                      {subsection.paragraphs?.map(
                        (paragraph: string, pIndex: number) => (
                          <p key={pIndex} className="mt-2">
                            {paragraph}
                          </p>
                        )
                      )}

                      {subsection.list && (
                        <ul className="list-disc list-inside space-y-1 mt-2">
                          {subsection.list.items.map(
                            (item: string, itemIndex: number) => (
                              <li key={itemIndex}>{item}</li>
                            )
                          )}
                        </ul>
                      )}

                      {subsection.additionalContent?.map(
                        (content: any, contentIndex: number) =>
                          renderContent(content, contentIndex)
                      )}
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default PrivacyPolicy;
