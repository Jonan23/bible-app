export interface BackendUser {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  profileImage: string | null;
  roleId: string;
  role: { id: string; name: string; description: string | null };
  status: 'ACTIVE' | 'SUSPENDED' | 'BANNED';
  lastLoginAt: string | null;
  emailVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BackendBlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featuredImage: string | null;
  readTime: number | null;
  categoryId: string | null;
  category: { id: string; name: string; slug: string } | null;
  author: { id: string; name: string | null; email: string; profileImage: string | null };
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  featured: boolean;
  publishedAt: string | null;
  tags: { id: string; name: string; slug: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface BackendVideo {
  id: string;
  title: string;
  description: string | null;
  youtubeUrl: string;
  thumbnail: string | null;
  speakerId: string | null;
  speaker: { id: string; name: string; bio: string | null; image: string | null; slug: string } | null;
  duration: number | null;
  categoryId: string | null;
  category: { id: string; name: string; slug: string } | null;
  featured: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface BackendEvent {
  id: string;
  title: string;
  description: string | null;
  longDescription: string | null;
  slug: string;
  startDate: string;
  endDate: string | null;
  location: string | null;
  bannerImage: string | null;
  registrationLink: string | null;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  type: string | null;
  price: string | null;
  capacity: number | null;
  schedule: { time: string; title: string; description: string }[];
  gallery: string[];
  organizer: { id: string; name: string | null; email: string };
  _count: { registrations: number };
  createdAt: string;
  updatedAt: string;
}

export interface BackendCategory {
  id: string;
  name: string;
  slug: string;
  type: 'BLOG' | 'VIDEO' | 'EVENT';
}

export interface BackendTag {
  id: string;
  name: string;
  slug: string;
}

export interface BackendSpeaker {
  id: string;
  name: string;
  bio: string | null;
  image: string | null;
  slug: string;
}

export interface BackendNotification {
  id: string;
  title: string;
  body: string | null;
  type: string;
  createdAt: string;
  recipients: { id: string; readAt: string | null }[];
}

export interface BackendPrayerRequest {
  id: string;
  name: string;
  email: string | null;
  request: string;
  createdAt: string;
}

export interface BackendTeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  avatar: string | null;
  imageUrl: string | null;
  type: 'PASTOR' | 'TEAM_MEMBER';
  sortOrder: number;
}

export interface BackendMinistryNews {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  imageUrl: string | null;
  category: string | null;
  featured: boolean;
  date: string;
}

export interface BackendAuthResponse {
  user: BackendUser;
  access_token: string;
  refresh_token: string;
}

export interface BackendPaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface BackendResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: { field: string; message: string }[];
  meta?: BackendPaginatedResponse<T>['meta'];
}
