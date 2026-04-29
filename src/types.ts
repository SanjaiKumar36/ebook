export enum UserRole {
  USER = 'user',
  AUTHOR = 'author',
  ADMIN = 'admin'
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role?: UserRole;
  isAuthor?: boolean;
  isAdmin?: boolean;
}

export interface Book {
  id: string;
  title: string;
  authorName: string;
  authorId: string;
  description: string;
  price: number;
  coverUrl: string;
  category: string;
  fileUrl?: string; // Sometimes called pdfUrl in frontend, let's keep consistency with backend
  pdfUrl?: string;  // For backward compatibility in some components
  status?: 'pending' | 'approved' | 'rejected';
  isPublished?: boolean;
  createdAt?: any;
  purchasedAt?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: any;
}

export interface Order {
  id: string;
  userId: string;
  items: string[];
  amount: number;
  status: 'pending' | 'success' | 'failed';
  createdAt: any;
  paymentId?: string;
}
