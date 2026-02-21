"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { useEffect, useRef } from "react";

// Define the Service interface locally if not available globally
interface Service {
  id: number;
  title: string;
  description: string;
  media: {
    type: string;
    url: string;
  };
  services: string[][];
}

const services: Service[] = [
  {
    id: 1,
    title: "Wayfinding Design",
    description:
      "Clear, accessible systems that guide people through spaces with confidence.",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/dA0VGEbbw4g",
    },
    services: [
      ["Lobby & Reception", "Directional Signs", "ADA Signs", "Room ID"],
      ["Campus Wayfinding", "Healthcare Wayfinding", "Digital Signage"],
      ["Maps & Directories", "Parking & Transit"],
    ],
  },
  {
    id: 2,
    title: "Experiential Design",
    description:
      "Immersive brand experiences across retail, events and workplaces.",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/9No-FiEInLA",
    },
    services: [
      ["Retail Displays", "POP Systems", "Window Displays"],
      ["Exhibits & Events", "Trade Show Booths"],
      ["Office Branding", "Culture Walls"],
    ],
  },
  {
    id: 3,
    title: "Art Installations",
    description:
      "Public art, murals and sculptural installations that elevate spaces.",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    },
    services: [
      ["Monuments & Pylons", "Sculptural Work"],
      ["Murals & Supergraphics", "Light Installations"],
    ],
  },
];


const Work = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".title span", {
      y: "100%",
      duration: 0.6,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse",
      },
    });
  }, []);

  return (
    <div id="services" ref={containerRef} className="relative z-[400] h-fit p-4 bg-white text-black">
      {/* heading */}
      <h2 className="text-3xl max-w-[950px] overflow-hidden title">
        <span className="block">Our Services</span>
      </h2>

      {/* card-container */}
      <div className="min-h-screen ">
        {services.map((service) => (
          <div key={service.id} className="mb-10">
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p>{service.description}</p>
              {/* Simplified Card rendering as I don't have the Card component code fully */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
