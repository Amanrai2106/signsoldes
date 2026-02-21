export const services = [
  {
    id: 1,
    title: "Wayfinding Design",
    description: "Clear, accessible systems that guide people through spaces with confidence and ease.",
    details: [
      "Directional & Wayfinding Systems",
      "Lobby & Reception Branding",
      "ADA Compliant Signage",
      "Room Identification",
      "Digital Signage Integration",
      "Campus & Healthcare Wayfinding"
    ],
    subCategories: [
      { id: "lobby", title: "Lobby & Reception", image: "/imgs/img-1.png" },
      { id: "wayfinding", title: "Wayfinding Systems", image: "/imgs/img-2.png" },
      { id: "ada", title: "ADA Compliant", image: "/imgs/img-3.png" },
    ],
    relatedProjectIds: ["office", "commercial", "educational"]
  },
  {
    id: 2,
    title: "Experiential Design",
    description: "Immersive brand experiences across retail, events and workplaces that engage and inspire.",
    details: [
      "Retail Displays & POP",
      "Exhibits & Events",
      "Office & Culture Branding",
      "Digital/Interactive Touchpoints",
      "Environmental Graphics",
      "Customer Journey Mapping"
    ],
    subCategories: [
      { id: "retail-displays", title: "Retail Displays", image: "/imgs/img-2.png" },
      { id: "exhibits", title: "Exhibits & Events", image: "/imgs/img-3.png" },
      { id: "office-branding", title: "Office Branding", image: "/imgs/img-1.png" },
    ],
    relatedProjectIds: ["commercial", "retail", "office"]
  },
  {
    id: 3,
    title: "Art Installations",
    description: "Public art, murals and sculptural installations that elevate spaces and spark emotion.",
    details: [
      "Public Art & Sculptures",
      "Murals & Supergraphics",
      "Site-Specific Installations",
      "Light & Interactive Art",
      "Fabrication & Engineering",
      "Permits & Installation"
    ],
    subCategories: [
      { id: "monument", title: "Monuments & Pylons", image: "/dev/p-1.jpeg" },
      { id: "murals", title: "Murals & Supergraphics", image: "/imgs/img-1.png" },
      { id: "sculptures", title: "Sculptural Installations", image: "/imgs/img-4.jpeg" },
    ],
    relatedProjectIds: ["retail", "commercial", "educational"]
  }
];
