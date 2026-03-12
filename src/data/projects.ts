export const projects = [
  {
    id: "residential",
    title: "Residential",
    description: "Creating a sense of home through thoughtful wayfinding and signage solutions that blend seamlessly with living environments.",
    src: "/img-1.jpeg",
    color: "#FFFBF2", // Light Cream
    subCategories: [
      { id: "apartments", title: "Luxury Apartments", image: "/img-1.jpeg" },
      { id: "townships", title: "Townships", image: "/img-2.jpeg" },
      { id: "villas", title: "Private Villas", image: "/img-3.jpeg" },
    ],
    relatedServiceIds: [1, 2]
  },
  {
    id: "commercial",
    title: "Commercial",
    description: "Enhancing business visibility and navigation with premium signage designed for high-traffic commercial hubs.",
    src: "/img-2.jpeg",
    color: "#FDF8EF", // Slightly Darker Cream
    subCategories: [
      { id: "malls", title: "Shopping Malls", image: "/img-4.jpeg" },
      { id: "complexes", title: "Business Complexes", image: "/img-1.jpeg" },
      { id: "hotels", title: "Hotels & Resorts", image: "/img-2.jpeg" },
    ],
    relatedServiceIds: [1, 2, 3]
  },
  {
    id: "plotting",
    title: "Plotting",
    description: "Large-scale wayfinding for plotting schemes, ensuring clarity and brand presence across vast landscapes.",
    src: "/img-3.jpeg",
    color: "#FFFBF2",
    subCategories: [
      { id: "land-development", title: "Land Development", image: "/img-1.jpeg" },
      { id: "industrial-parks", title: "Industrial Parks", image: "/img-2.jpeg" },
    ],
    relatedServiceIds: [2]
  },
  {
    id: "office",
    title: "Office",
    description: "Corporate signage that embodies professionalism and guides workflow in modern office spaces.",
    src: "/img-4.jpeg",
    color: "#FDF8EF",
    subCategories: [
      { id: "corporate-hq", title: "Corporate HQ", image: "/img-3.jpeg" },
      { id: "coworking", title: "Co-working Spaces", image: "/img-4.jpeg" },
    ],
    relatedServiceIds: [1, 3]
  },
  {
    id: "educational",
    title: "Educational",
    description: "Inspiring and informative campus signage that helps students and faculty navigate learning environments.",
    src: "/img-1.jpeg",
    color: "#FFFBF2",
    subCategories: [
      { id: "universities", title: "Universities", image: "/img-2.jpeg" },
      { id: "schools", title: "K-12 Schools", image: "/img-3.jpeg" },
    ],
    relatedServiceIds: [1, 2]
  },
  {
    id: "retail",
    title: "Retail",
    description: "Captivating retail signage solutions that drive footfall and enhance the shopping experience.",
    src: "/img-4.jpeg",
    color: "#FDF8EF",
    subCategories: [
      { id: "showrooms", title: "Showrooms", image: "/img-1.jpeg" },
      { id: "boutiques", title: "Boutiques", image: "/img-2.jpeg" },
    ],
    relatedServiceIds: [2, 3]
  },
];
