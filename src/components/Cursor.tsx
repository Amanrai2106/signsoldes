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
          rotate: isLoading ? 360 : 0,
          scale: isClicking ? 0.8 : isHovered ? 1.4 : 1,
        }}
        transition={{
          rotate: isLoading ? { repeat: Infinity, duration: 1, ease: "linear" } : { duration: 0.3 },
          scale: { type: "spring", damping: 15, stiffness: 300 }
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Arrow Shadow */}
          <path
            d="M12 12L28 20L12 28L16 20L12 12Z"
            fill="#000"
            fillOpacity="0.1"
            style={{ transform: "translate(2px, 2px)" }}
          />
          {/* Main Arrow - Purple for Brand Consistency */}
          <path
            d="M12 12L28 20L12 28L16 20L12 12Z"
            fill={isHovered ? "#7C3AED" : "white"}
            stroke="#7C3AED"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          
          {/* Trailing effect on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.circle
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.2 }}
                exit={{ opacity: 0, scale: 0.5 }}
                cx="20"
                cy="20"
                r="15"
                stroke="#7C3AED"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            )}
          </AnimatePresence>
        </svg>
      </motion.div>
    </div>
  );
};

export default Cursor;
