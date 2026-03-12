"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    company: "/company/indiabulls.png",
    quote:
      "I needed a creative agency at the top of design thinking and leading-edge in technical capabilities. Signsol was a perfect match, they treat clients with respect while bringing their best thinking and work to meet business needs.",
    name: "Sophia Martinez",
    role: "Global Brand Director, Indiabulls",
  },
  {
    company: "/company/adani.png",
    quote:
      "We needed a partner who understood both innovation and execution. The team translated complex challenges into clear solutions, blending creativity with precision. They built experiences that resonate deeply.",
    name: "James Carter",
    role: "VP of Customer Experience, Adani",
  },
  {
    company: "/company/Godrej_Logo.svg.png",
    quote:
      "They’re genuine collaborators. Every project felt like a partnership where vision and detail came together seamlessly. Their ability to balance strategic thinking with bold creativity set a new benchmark.",
    name: "Mandlina Covachiu",
    role: "Global Brand Manager, Godrej",
  },
];

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const horizontal = horizontalRef.current;
      if (!horizontal) return;

      const totalWidth = horizontal.scrollWidth - window.innerWidth;

      if (totalWidth > 0) {
        gsap.to(horizontal, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            start: "center center", // Start pinning when container center hits window center
            end: () => `+=${totalWidth + 1000}`, // Add some extra scroll length
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-black text-white overflow-hidden">
      <div className="min-h-screen flex flex-col justify-center py-20">
        <div className="px-6 md:px-20 mb-20">
          <div className="flex items-center gap-3 text-orange-500 font-mono text-sm tracking-widest uppercase mb-6">
            <span className="w-12 h-px bg-orange-500"></span>
            <span>Testimonials</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">
            TRUSTED BY <br />
            <span className="text-gray-600 italic font-serif">INDUSTRY LEADERS</span>
          </h2>
        </div>

        <div className="relative">
          <div 
            ref={horizontalRef} 
            className="flex gap-10 px-6 md:px-20 w-max"
          >
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                className="w-[85vw] md:w-[600px] shrink-0 bg-white/5 backdrop-blur-sm border border-white/10 p-10 md:p-16 flex flex-col justify-between group hover:bg-white/10 transition-colors duration-500"
              >
                <div>
                  <Quote className="w-12 h-12 text-orange-500 mb-10 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-12">
                    {t.quote}
                  </p>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 relative grayscale brightness-200 opacity-50 group-hover:opacity-100 transition-all">
                    <Image
                      src={t.company}
                      alt={t.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{t.name}</h4>
                    <p className="text-gray-500 uppercase tracking-widest text-xs mt-1">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
            {/* Spacer for end of scroll */}
            <div className="w-[20vw] shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
