import type { BackendBlogPost, BackendVideo, BackendEvent, BackendTeamMember, BackendMinistryNews } from '$lib/types/backend';
import type { BlogPost, Video, MinistryEvent, Pastor, TeamMember, MinistryNews } from '$lib/types';

export function toBlogPostCard(post: BackendBlogPost): BlogPost {
  return {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt ?? '',
    content: post.content,
    author: {
      id: post.author.id,
      name: post.author.name ?? 'Unknown',
      role: '',
      avatar: post.author.profileImage ?? '',
    },
    date: post.createdAt,
    imageUrl: post.featuredImage ?? '',
    category: post.category?.name ?? 'General',
    tags: post.tags.map((t) => t.name),
    readingTime: post.readTime ? `${post.readTime} min read` : '1 min read',
    featured: post.featured,
  };
}

function formatViewCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return String(count);
}

function formatDuration(seconds: number | null): string {
  if (!seconds) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function toVideoCard(video: BackendVideo): Video {
  const youtubeId = video.youtubeUrl.split('v=')[1]?.split('&')[0] || video.youtubeUrl.split('/').pop() || '';
  return {
    id: video.id,
    title: video.title,
    speaker: video.speaker?.name ?? 'Unknown',
    description: video.description ?? '',
    thumbnailUrl: video.thumbnail ?? '',
    youtubeId,
    duration: formatDuration(video.duration),
    category: video.category?.name ?? 'General',
    views: formatViewCount(video.viewCount),
    date: video.createdAt,
    featured: video.featured,
  };
}

export function toEventCard(event: BackendEvent): MinistryEvent {
  return {
    id: event.id,
    title: event.title,
    type: (event.type as 'trip' | 'event' | 'conference') ?? 'event',
    description: event.description ?? '',
    longDescription: event.longDescription ?? '',
    imageUrl: event.bannerImage ?? '',
    startDate: event.startDate,
    endDate: event.endDate ?? event.startDate,
    location: event.location ?? '',
    registrationUrl: event.registrationLink ?? undefined,
    price: event.price ?? undefined,
    capacity: event.capacity ?? undefined,
    registered: event._count?.registrations ?? 0,
    schedule: event.schedule ?? [],
    gallery: event.gallery ?? [],
    featured: event.status === 'UPCOMING',
  };
}

export function toMinistryNewsCard(news: BackendMinistryNews): MinistryNews {
  return {
    id: news.id,
    title: news.title,
    excerpt: news.excerpt ?? '',
    date: news.date,
    imageUrl: news.imageUrl ?? '',
    category: news.category ?? 'General',
  };
}

export function toPastor(member: BackendTeamMember): Pastor {
  return {
    id: member.id,
    name: member.name,
    role: member.role,
    bio: member.bio ?? '',
    avatar: member.avatar ?? '',
    imageUrl: member.imageUrl ?? undefined,
  };
}

export function toTeamMember(member: BackendTeamMember): TeamMember {
  return {
    id: member.id,
    name: member.name,
    role: member.role,
    avatar: member.avatar ?? '',
    bio: member.bio ?? undefined,
  };
}
