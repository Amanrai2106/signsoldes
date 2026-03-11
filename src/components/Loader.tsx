"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Loader = () => {
  const [done, setDone] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShouldShow(true);
  }, []);

  useEffect(() => {
    if (!shouldShow || done) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setDone(true);
        },
      });

      // 1. Setup Cube - Continuous rotation starts immediately
      gsap.set(cubeRef.current, { scale: 1, opacity: 1 });
      
      gsap.to(cubeRef.current, {
        rotationY: "+=360",
        rotationX: "+=180",
        duration: 4,
        repeat: -1,
        ease: "none"
      });

      // 2. Text Reveal (3D perspective)
      const chars = gsap.utils.toArray<HTMLSpanElement>(".loader-char");
      tl.fromTo(
        chars,
        { 
          opacity: 0, 
          z: -100,
          rotationX: -90
        },
        {
          opacity: 1,
          z: 0,
          rotationX: 0,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.04,
        }
      );

      // 3. Immersive Zoom Out
      tl.to({}, { duration: 0.5 }); // Wait

      tl.to([cubeRef.current, ".loader-content"], {
        scale: 2,
        opacity: 0,
        z: 500,
        duration: 1,
        ease: "power4.inOut"
      });

      // 4. Final Transition: Fade out entire loader
      tl.to(
        loaderRef.current,
        {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "-=0.4"
      );
    }, loaderRef);

    return () => ctx.revert();
  }, [shouldShow, done]);

  if (done || !shouldShow) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999] h-[100dvh] w-full overflow-hidden bg-white flex items-center justify-center perspective-[1000px]"
    >
      <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none">
        {/* 3D Cube Container */}
        <div 
          ref={cubeRef}
          className="w-40 h-40 mb-16 preserve-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Cube Faces - Refined Premium Design */}
          {[
            { rotate: 'rotateY(0deg) translateZ(80px)', label: 'WAYFINDING' },
            { rotate: 'rotateY(90deg) translateZ(80px)', label: 'EXPERIENTIAL' },
            { rotate: 'rotateY(180deg) translateZ(80px)', label: 'ART INSTALLATION' },
            { rotate: 'rotateY(270deg) translateZ(80px)', label: 'LOW COST' },
            { rotate: 'rotateX(90deg) translateZ(80px)', label: 'BEST DESIGN' },
            { rotate: 'rotateX(-90deg) translateZ(80px)', label: 'SIGNSOL' }
          ].map((face, i) => (
            <div
              key={i}
              className="absolute inset-0 border-[1.5px] border-orange-500/40 bg-white/90 backdrop-blur-xl flex items-center justify-center text-black font-bold text-[10px] leading-tight text-center px-3 shadow-[0_0_30px_rgba(255,107,0,0.1)] uppercase tracking-[0.1em] overflow-hidden break-words"
              style={{ 
                transform: face.rotate, 
                backfaceVisibility: 'visible',
                boxShadow: 'inset 0 0 15px rgba(255,107,0,0.05)'
              }}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="w-4 h-[1px] bg-orange-500/30 mb-1" />
                {face.label}
                <span className="w-4 h-[1px] bg-orange-500/30 mt-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Site Name with 3D feel */}
        <div className="loader-content flex flex-col items-center gap-4 text-center preserve-3d">
          <div className="overflow-hidden">
            <span className="text-5xl md:text-8xl font-black tracking-[0.1em] text-black flex">
              {"SIGNSOL".split("").map((char, index) => (
                <span
                  key={index}
                  className="loader-char inline-block"
                >
                  {char}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
