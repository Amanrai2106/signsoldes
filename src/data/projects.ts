export const projects = [
  {
    id: "residential",
    title: "Residential",
    description: "Creating a sense of home through thoughtful wayfinding and signage solutions that blend seamlessly with living environments.",
    src: "/imgs/img-1.png",
    color: "#FFFBF2", // Light Cream
    subCategories: [
      { id: "apartments", title: "Luxury Apartments", image: "/imgs/img-1.png" },
      { id: "townships", title: "Townships", image: "/imgs/img-2.png" },
      { id: "villas", title: "Private Villas", image: "/imgs/img-3.png" },
    ],
    relatedServiceIds: [1, 2]
  },
  {
    id: "commercial",
    title: "Commercial",
    description: "Enhancing business visibility and navigation with premium signage designed for high-traffic commercial hubs.",
    src: "/imgs/img-2.png",
    color: "#FDF8EF", // Slightly Darker Cream
    subCategories: [
      { id: "malls", title: "Shopping Malls", image: "/imgs/img-4.jpeg" },
      { id: "complexes", title: "Business Complexes", image: "/dev/p-1.jpeg" },
      { id: "hotels", title: "Hotels & Resorts", image: "/dev/p-2.jpeg" },
    ],
    relatedServiceIds: [1, 2, 3]
  },
  {
    id: "plotting",
    title: "Plotting",
    description: "Large-scale wayfinding for plotting schemes, ensuring clarity and brand presence across vast landscapes.",
    src: "/imgs/img-3.png",
    color: "#FFFBF2",
    subCategories: [
      { id: "land-development", title: "Land Development", image: "/imgs/img-1.png" },
      { id: "industrial-parks", title: "Industrial Parks", image: "/imgs/img-2.png" },
    ],
    relatedServiceIds: [2]
  },
  {
    id: "office",
    title: "Office",
    description: "Corporate signage that embodies professionalism and guides workflow in modern office spaces.",
    src: "/imgs/img-4.jpeg",
    color: "#FDF8EF",
    subCategories: [
      { id: "corporate-hq", title: "Corporate HQ", image: "/imgs/img-3.png" },
      { id: "coworking", title: "Co-working Spaces", image: "/imgs/img-4.jpeg" },
    ],
    relatedServiceIds: [1, 3]
  },
  {
    id: "educational",
    title: "Educational",
    description: "Inspiring and informative campus signage that helps students and faculty navigate learning environments.",
    src: "/dev/p-1.jpeg",
    color: "#FFFBF2",
    subCategories: [
      { id: "universities", title: "Universities", image: "/dev/p-1.jpeg" },
      { id: "schools", title: "K-12 Schools", image: "/dev/p-2.jpeg" },
    ],
    relatedServiceIds: [1, 2]
  },
  {
    id: "retail",
    title: "Retail",
    description: "Captivating retail signage solutions that drive footfall and enhance the shopping experience.",
    src: "/dev/p-2.jpeg",
    color: "#FDF8EF",
    subCategories: [
      { id: "showrooms", title: "Showrooms", image: "/imgs/img-1.png" },
      { id: "boutiques", title: "Boutiques", image: "/imgs/img-2.png" },
    ],
    relatedServiceIds: [2, 3]
  },
];
