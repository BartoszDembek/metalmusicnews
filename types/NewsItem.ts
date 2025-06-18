export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  source: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  newsCount: number;
}
