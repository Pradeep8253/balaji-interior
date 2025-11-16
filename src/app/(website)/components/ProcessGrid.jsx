
import React from "react";
import {
  Briefcase,
  PenSquare,
  Layers,
  IndianRupee,
  Settings,
  CheckCircle,
} from "lucide-react";

const processSteps = [
  {
    number: "01",
    icon: <Briefcase size={32} color="#e11d48" />,
    title: "Vision & Consultation",
    description:
      "Our journey begins with a personal consultation to understand your unique vision, lifestyle, and aspirations. We delve into your needs to ensure the final design is a true reflection of you.",
  },
  {
    number: "02",
    icon: <PenSquare size={32} color="#2563eb" />,
    title: "Concept & Design",
    description:
      "We translate your vision into a bespoke concept. This collaborative phase includes space planning, detailed 3D renderings, and creating a cohesive design that balances aesthetics with functionality.",
  },
  {
    number: "03",
    icon: <Layers size={32} color="#059669" />,
    title: "Curated Material Selection",
    description:
      "You are invited to handpick from a curated library of premium materials. We guide you through selecting the finest finishes, textures, and fittings that prioritize durability and elegance.",
  },
  {
    number: "04",
    icon: <IndianRupee size={32} color="#f59e42" />,
    title: "Budget & Transparency",
    description:
      "We believe in complete transparency. A detailed budget is presented, aligning the project's design aspirations with your financial investment to ensure a seamless process without surprises.",
  },
  {
    number: "05",
    icon: <Settings size={32} color="#a21caf" />,
    title: "Master Craftsmanship",
    description:
      "At our core is a commitment to exceptional quality. Our skilled artisans use precision manufacturing techniques to craft each component of your modular kitchen and wardrobes to the highest standards.",
  },
  {
    number: "06",
    icon: <CheckCircle size={32} color="#14b8a6" />,
    title: "Flawless Installation",
    description:
      "Our dedicated installation team ensures every element is assembled with meticulous attention to detail. From hardware to the final polish, we guarantee a flawless handover of your new space.",
  },
];

const ProcessSection = () => {
  return (
    <section className="bg-[#FFFCF2] py-20 px-4 sm:px-6 lg:px-8 border-1">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#8B0000] mb-4 tracking-wide capitalize animate-fade-up">
            Our Process
          </h1>
          <p className="text-[#C67E0A] text-lg max-w-3xl mx-auto mb-2 font-semibold animate-fade-in">
            A Journey to Your Dream Interior
          </p>
          <p className="max-w-2xl mx-auto md:text-xl text-gray-700 text-sm animate-fade-in delay-100">
            From the first sketch to the final touch, we make luxury simple.
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {processSteps.map((step, index) => (
            <div
              key={step.number}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-center justify-center text-center">
                <div className="flex-shrink-0 flex items-center justify-center">
                  {step.icon}
                </div>
                <div className="ml-3">
                  <h3 className="flex items-center text-lg font-bold text-gray-800">
                    <span className="text-xl font-extrabold mr-2 text-[#C67E0A]">
                      {step.number}.
                    </span>
                    {step.title}
                  </h3>
                </div>
              </div>
              <p className="mt-5 text-base text-gray-700 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
