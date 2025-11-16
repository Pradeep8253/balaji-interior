"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const faqs = [
  {
    question: "What services does Balaji Luxury Interior Design offer?",
    answer:
      "We specialize in luxury interiors, modular kitchens, full home interiors, and complete renovation solutions.",
  },
  {
    question: "Can you customize interiors to match my style?",
    answer:
      "Absolutely! Every design is tailored to reflect your personal taste, lifestyle, and space.",
  },
  {
    question: "Do you handle both residential and commercial projects?",
    answer:
      "Yes, our expertise spans across both residential homes and commercial establishments.",
  },
  {
    question: "How long does a typical interior project take?",
    answer:
      "Project timelines vary depending on the scope, but we strive to deliver excellence on time.",
  },
  {
    question: "Do you provide 3D designs before execution?",
    answer:
      "Yes, we provide 3D visualizations so you can see your dream space before it becomes reality.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 md:py-12 ">
      <h2 className="text-2xl md:text-4xl font-semibold md:font-bold  text-gray-900 mb-8 text-center ">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <button
              className="flex justify-between items-center w-full text-left text-lg font-medium text-gray-900 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {activeIndex === index ? (
                <Minus className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5 " />
              )}
            </button>
            {activeIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
