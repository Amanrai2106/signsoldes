"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const brands = [
  { id: 1, name: "Godrej", bg: "/company/Godrej_Logo.svg.png" },
  { id: 2, name: "KECBOM", bg: "/company/KECBOM.png" },
  { id: 3, name: "Abhinandan Lodha", bg: "/company/abhinandan-lodha.png" },
  { id: 4, name: "Adani", bg: "/company/adani.png" },
  { id: 5, name: "Birla", bg: "/company/birla.jpeg" },
  { id: 6, name: "Colt", bg: "/company/colt.png" },
  { id: 7, name: "Dosti", bg: "/company/dosti.png" },
  { id: 8, name: "Gammon", bg: "/company/gammon.png" },
  { id: 9, name: "Indiabulls", bg: "/company/indiabulls.png" },
  { id: 10, name: "Mahindra", bg: "/company/mahindra.png" },
];

const BrandShowcase = () => {
  const [activeBrand, setActiveBrand] = useState(brands[0]);

  // Preload background images
  useEffect(() => {
    brands.forEach((brand) => {
      const img = new window.Image();
      img.src = brand.bg;
    });
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white text-black">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeBrand.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/40 z-[1]" />
          <Image
            src={activeBrand.bg}
            alt={activeBrand.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <div className="mb-12 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-4 text-sm font-medium uppercase tracking-widest text-white/80"
          >
            Trusted by the best in the industry
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold leading-tight md:text-7xl text-white"
          >
            Our Partners <br />
            Building Excellence
          </motion.h2>
        </div>

        {/* Brands Grid */}
        <div className="grid w-full max-w-6xl grid-cols-2 sm:grid-cols-3 md:grid-cols-5 border-t border-l border-white/20">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              onMouseEnter={() => setActiveBrand(brand)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`group relative flex aspect-[16/9] cursor-pointer items-center justify-center border-r border-b border-white/20 bg-white/10 backdrop-blur-md transition-all hover:bg-white/20 ${
                activeBrand.id === brand.id ? "bg-white/30" : ""
              }`}
            >
              <span className="text-xl font-bold tracking-wider text-white/70 group-hover:text-white text-center px-2">
                {brand.name}
              </span>
              
              {/* Active Indicator */}
              {activeBrand.id === brand.id && (
                <motion.div
                  layoutId="active-dot"
                  className="absolute bottom-4 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_white]"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
