export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  phone?: string | null;
  profileImage?: string | null;
}

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  duration: string;
  category: string;
  featured: boolean;
  audioUrl?: string;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  date: string;
  imageUrl: string;
  category: string;
  tags: string[];
  readingTime: string;
  featured: boolean;
}

export interface Video {
  id: string;
  title: string;
  speaker: string;
  description: string;
  thumbnailUrl: string;
  youtubeId: string;
  duration: string;
  category: string;
  views: string;
  date: string;
  featured: boolean;
  watchProgress?: number;
}

export interface MinistryEvent {
  id: string;
  title: string;
  type: 'trip' | 'event' | 'conference';
  description: string;
  longDescription: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  location: string;
  locationLat?: number;
  locationLng?: number;
  registrationUrl?: string;
  price?: string;
  capacity?: number;
  registered?: number;
  schedule: ScheduleItem[];
  gallery: string[];
  featured: boolean;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
}

export interface Pastor {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  imageUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

export interface MinistryNews {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  category: string;
}

export interface Scripture {
  text: string;
  reference: string;
  version: string;
}

export interface Quote {
  text: string;
  author: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'sermon' | 'event' | 'news' | 'prayer' | 'general';
  read: boolean;
  date: string;
  imageUrl?: string;
}

export interface QuickAction {
  id: string;
  title: string;
  icon: string;
}
