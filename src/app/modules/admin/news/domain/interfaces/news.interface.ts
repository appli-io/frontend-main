export interface INews {
  id?: string;
  headline?: string;
  slug?: string;
  abstract?: string;
  body?: string;
  category?: string;
  isRead?: boolean;
  readTime?: number;
  image?: string;
  publishedAt?: number;
  updatedAt?: number;
  createdBy?: string;
}
