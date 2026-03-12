"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const Cursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth movement
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const manageMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const manageMouseDown = () => setIsClicking(true);
    const manageMouseUp = () => setIsClicking(false);

    const manageMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.group')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    // Simulate loading for demo or track real loading if possible
    // For now, let's keep it based on clicks or other triggers
    const handleLoading = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1500);
    };

    window.addEventListener("mousemove", manageMouseMove);
    window.addEventListener("mousedown", manageMouseDown);
    window.addEventListener("mouseup", manageMouseUp);
    window.addEventListener("mouseover", manageMouseOver);
    window.addEventListener("click", handleLoading); // Simulate loading on click for demo

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      window.removeEventListener("mousedown", manageMouseDown);
      window.removeEventListener("mouseup", manageMouseUp);
      window.removeEventListener("mouseover", manageMouseOver);
      window.removeEventListener("click", handleLoading);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="hidden lg:block fixed top-0 left-0 pointer-events-none z-[10002]">
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovered ? 1.5 : 1,
        }}
        transition={{
          scale: { type: "spring", damping: 15, stiffness: 300 }
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Outer Ring on Hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.circle
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.2, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                cx="24"
                cy="24"
                r="20"
                fill="#7C3AED"
              />
            )}
          </AnimatePresence>

          {/* Custom Arrow Shape - Purple */}
          <path
            d="M14 14L34 14M14 14L14 34M14 14L34 34"
            stroke="#7C3AED"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors duration-300"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default Cursor;
