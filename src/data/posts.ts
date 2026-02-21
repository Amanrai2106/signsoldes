export interface Post {
  id: string;
  title: string;
  description: string;
  image: string;
  categoryId: string; // matches project id (e.g., 'residential') or service id (e.g., '1')
  subCategoryId: string; // matches subcategory id (e.g., 'apartments')
  type: 'project' | 'service';
}

export const posts: Post[] = [
  // Residential Posts
  {
    id: "res-apt-1",
    title: "Skyline Heights Wayfinding",
    description: "Complete wayfinding solution for a 40-story luxury apartment complex.",
    image: "/imgs/img-1.png",
    categoryId: "residential",
    subCategoryId: "apartments",
    type: "project"
  },
  {
    id: "res-apt-2",
    title: "The Lofts Branding",
    description: "Modern signage for urban loft apartments.",
    image: "/imgs/img-2.png",
    categoryId: "residential",
    subCategoryId: "apartments",
    type: "project"
  },
  {
    id: "res-villa-1",
    title: "Palm Springs Villas",
    description: "Elegant house numbering and street signage for a private villa community.",
    image: "/imgs/img-3.png",
    categoryId: "residential",
    subCategoryId: "villas",
    type: "project"
  },
  
  // Commercial Posts
  {
    id: "com-mall-1",
    title: "Grand Plaza Mall",
    description: "Digital directory and shop signage for a major shopping center.",
    image: "/imgs/img-4.jpeg",
    categoryId: "commercial",
    subCategoryId: "malls",
    type: "project"
  },
  {
    id: "com-hotel-1",
    title: "Oceanview Resort",
    description: "Atmospheric signage for a beachfront resort.",
    image: "/dev/p-1.jpeg",
    categoryId: "commercial",
    subCategoryId: "hotels",
    type: "project"
  },

  // Service Posts (using '1', '2', '3' as categoryId to match service IDs)
  {
    id: "srv-indoor-1",
    title: "Tech Corp Lobby",
    description: "Futuristic lobby signage with integrated digital displays.",
    image: "/imgs/img-1.png",
    categoryId: "1",
    subCategoryId: "lobby",
    type: "service"
  },
  {
    id: "srv-indoor-2",
    title: "Hospital Wayfinding",
    description: "Clear and accessible wayfinding system for a large medical center.",
    image: "/imgs/img-2.png",
    categoryId: "1",
    subCategoryId: "wayfinding",
    type: "service"
  },
  {
    id: "srv-outdoor-1",
    title: "City Center Pylon",
    description: "50ft illuminated pylon sign for city center.",
    image: "/imgs/img-4.jpeg",
    categoryId: "3",
    subCategoryId: "monument",
    type: "service"
  }
];
