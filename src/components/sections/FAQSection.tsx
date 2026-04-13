import { useState } from "react";
import { faq } from "../../data/site";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-cream" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Heading */}
          <div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] leading-tight italic"
              style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
            >
              Preguntas frecuentes
            </h2>
          </div>

          {/* Questions */}
          <div className="space-y-0">
            {faq.map((item, i) => (
              <div key={i} className="border-b border-[#1A1A1A]/10">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                  aria-expanded={openIndex === i}
                >
                  <span className="text-base font-medium text-[#1A1A1A] pr-4">
                    {item.question}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      openIndex === i
                        ? "bg-[#F2B8A0] text-white"
                        : "bg-[#FBE5DA] text-[#E8976F]"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${openIndex === i ? "rotate-45" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                {openIndex === i && (
                  <div className="pb-5 pr-12">
                    <p className="text-sm text-[#6B6B6B] leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
