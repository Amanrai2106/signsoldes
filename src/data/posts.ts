export interface Post {
  id: string;
  title: string;
  description: string;
  image: string;
  categoryId: string; // matches project id (e.g., 'residential') or service id (e.g., '1')
  subCategoryId: string; // matches subcategory id (e.g., 'apartments')
  type: "project" | "service";
}

export const posts: Post[] = [
  // Empty array - only real posts added via admin or database will appear
];
