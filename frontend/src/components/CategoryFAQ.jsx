import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqContent = {
  events: [
    {
      question: "How do I find services for an event?",
      answer:
        "Open an event to see the vendor services listed for that occasion. Use the search and service filters to narrow down the options.",
    },
    {
      question: "Can I browse a particular wedding service?",
      answer:
        "Yes. Open Wedding, then choose a service such as Venues, Decorators or Photographers. Its page includes the available subcategories from the category sheet.",
    },
    {
      question: "Where do the event and service names come from?",
      answer:
        "The event and event-wise vendor names shown in this directory follow the HarEvent category sheet.",
    },
    {
      question: "What happens when I select a service?",
      answer:
        "You will see that service's category details and its related subcategories, with a link to start an enquiry.",
    },
  ],
  vendors: [
    {
      question: "How are vendor categories organized?",
      answer:
        "Browse the service types first, or switch to Specialities to explore the detailed category names from the HarEvent sheet.",
    },
    {
      question: "Can I search for a specific service?",
      answer:
        "Use the directory search to find a service type or an individual speciality by name.",
    },
    {
      question: "How do I explore a subcategory?",
      answer:
        "Open a service type and choose one of its listed specialities to see its dedicated details page.",
    },
    {
      question: "How can I ask about a category?",
      answer:
        "Use the enquiry button on a service or speciality page to begin an enquiry for that category.",
    },
  ],
};

export default function CategoryFAQ({ mode = "events" }) {
  const [openQuestion, setOpenQuestion] = useState(0);
  const questions = faqContent[mode] ?? faqContent.events;

  return (
    <section className="mx-auto max-w-[1120px] px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12">
      <div className="grid gap-8 border-y border-[#e8dfd3] py-9 md:grid-cols-[0.8fr_1.2fr] md:gap-14 md:py-12">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4145A]">
            A little more clarity
          </p>
          <h2 className="mt-2 font-poppins text-[27px] font-bold leading-tight text-[#243B5A] sm:text-[34px]">
            Frequently asked questions
          </h2>
          <p className="mt-3 max-w-sm text-[13px] leading-6 text-[#756871]">
            Quick answers to help you browse HarEvent categories with confidence.
          </p>
        </div>

        <div className="divide-y divide-[#e8dfd3]">
          {questions.map(({ question, answer }, index) => {
            const isOpen = openQuestion === index;
            return (
              <div key={question} className="py-4 first:pt-0 last:pb-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpenQuestion((current) => (current === index ? -1 : index))
                  }
                  className="flex w-full items-center justify-between gap-5 text-left font-poppins text-[14px] font-semibold text-[#243B5A] transition hover:text-[#D4145A]"
                >
                  {question}
                  <ChevronDown
                    size={17}
                    className={`shrink-0 transition-transform ${
                      isOpen ? "rotate-180 text-[#D4145A]" : "text-[#8b7b82]"
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-3 max-w-2xl pr-6 text-[12px] leading-6 text-[#756871]">
                    {answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
