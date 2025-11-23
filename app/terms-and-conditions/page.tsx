import BlurText from "@/components/animation/BlurText";
import { appStrings } from "@/service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions - Service Agreement | Telzen",
  description: "Review Telzen's terms and conditions for using our eSIM services. Understand your rights and obligations when using our platform.",
  keywords: "terms and conditions, service agreement, user agreement, Telzen terms, eSIM terms, legal terms",
  openGraph: {
    title: "Terms and Conditions - Service Agreement | Telzen",
    description: "Review Telzen's terms and conditions for using our eSIM services. Understand your rights and obligations when using our platform.",
    url: "/terms-and-conditions",
  },
};

function TermsAndConditions() {
  const { intro, sections } = appStrings.termsAndConditionsContent;

  const renderContent = (content: any, index: number) => {
    if (content.type === "paragraph") {
      return <p key={index} className={content.className || "mt-2"}>{content.text}</p>;
    }
    
    if (content.type === "ul") {
      return (
        <ul key={index} className="list-disc list-inside">
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
          <h2 className="title text-primary-700 mb-6 md:mb-10 lg:mb-20 overflow-hidden text-center">
            <BlurText
              text={appStrings.termsAndConditionsTitle}
              translateY={[50, 0]}
              className="md:tracking-[-2px]"
            />
          </h2>
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 text-sm md:text-base lg:text-lg leading-[160%] text-[#888]">
            <p>{appStrings.lastUpdated} 20th April 2025</p>
            
            {/* Intro Paragraphs */}
            {intro.map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}

            {/* Sections */}
            {sections.map((section: any, sectionIndex: number) => (
              <div key={sectionIndex}>
                <ol className="list-decimal list-inside font-bold" start={section.number}>
                  <li>{section.title}</li>
                </ol>

                {/* Section Paragraphs */}
                {section.paragraphs?.map((paragraph: string, pIndex: number) => (
                  <p key={pIndex} className={pIndex > 0 ? "mt-2" : ""}>{paragraph}</p>
                ))}

                {/* Section List */}
                {section.list && (
                  <ul className="list-disc list-inside">
                    {section.list.items.map((item: string, itemIndex: number) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                )}

                {/* Additional Content (mixed paragraphs and lists) */}
                {section.additionalContent?.map((content: any, contentIndex: number) =>
                  renderContent(content, contentIndex)
                )}

                {/* Subsections */}
                {section.subsections?.map((subsection: any, subIndex: number) => (
                  <div key={subIndex}>
                    <p className="font-bold mt-4">{subsection.title}</p>
                    
                    {subsection.paragraphs?.map((paragraph: string, pIndex: number) => (
                      <p key={pIndex}>{paragraph}</p>
                    ))}

                    {subsection.list && (
                      <ul className="list-disc list-inside">
                        {subsection.list.items.map((item: string, itemIndex: number) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    )}

                    {subsection.additionalContent?.map((content: any, contentIndex: number) =>
                      renderContent(content, contentIndex)
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default TermsAndConditions;