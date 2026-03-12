"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion } from "framer-motion";
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
            scrub: 1.5,
            invalidateOnRefresh: true,
            start: "top 15%", // Animation starts when the section top reaches 15% of the viewport
            end: () => `+=${totalWidth + 800}`,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-black text-white overflow-hidden">
      <div className="py-12 md:py-20 flex flex-col justify-center">
        <div className="px-6 md:px-20 mb-8 md:mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-orange-500" />
            <span className="text-orange-500 text-xs font-bold tracking-[0.3em] uppercase">Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase leading-none">
            Trusted by <br />
            <span className="text-blue-600">industry leaders</span>
          </h2>
        </div>

        <div className="relative">
          <div 
            ref={horizontalRef} 
            className="flex gap-8 px-6 md:px-20 w-max"
          >
            {testimonials.map((t, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="w-[85vw] md:w-[500px] shrink-0 bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 flex flex-col justify-between group hover:bg-white/10 transition-colors duration-500"
              >
                <div>
                  <Quote className="w-10 h-10 text-orange-500 mb-8 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <p className="text-xl md:text-2xl font-medium leading-relaxed mb-10">
                    {t.quote}
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 relative grayscale brightness-200 opacity-50 group-hover:opacity-100 transition-all">
                    <Image
                      src={t.company}
                      alt={t.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{t.name}</h4>
                    <p className="text-gray-500 uppercase tracking-widest text-[10px] mt-1">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Spacer for end of scroll */}
            <div className="w-[15vw] shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
