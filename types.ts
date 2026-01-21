export interface Workflow {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: 'USD' | 'EUR';
  author: Author;
  tags: string[];
  downloads: number;
  rating: number;
  image: string;
  nodes: NodeIcon[];
  content: string; // Markdown content
  createdAt: string;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
}

export interface NodeIcon {
  name: string;
  iconUrl: string; // Simplified for this demo
}

// Payload CMS Response Shape
export interface PaginatedDocs<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export enum PaymentProvider {
  STRIPE = 'stripe',
  PAYPAL = 'paypal',
  CREEM = 'creem'
}

export interface CartItem {
  workflowId: string;
  title: string;
  price: number;
}
