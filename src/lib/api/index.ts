import { authApi } from './auth';
import { blogApi } from './blog';
import { dailyContentApi } from './daily-content';
import { videosApi } from './videos';
import { eventsApi } from './events';
import { categoriesApi } from './categories';
import { tagsApi } from './tags';
import { speakersApi } from './speakers';
import { notificationsApi } from './notifications';
import { prayerApi } from './prayer';
import { teamMembersApi } from './team-members';
import { ministryNewsApi } from './ministry-news';
import { configApi } from './config';
import { profileApi } from './profile';
import { preferencesApi } from './preferences';

export const api = {
  auth: authApi,
  blog: blogApi,
  dailyContent: dailyContentApi,
  videos: videosApi,
  events: eventsApi,
  categories: categoriesApi,
  tags: tagsApi,
  speakers: speakersApi,
  notifications: notificationsApi,
  prayer: prayerApi,
  teamMembers: teamMembersApi,
  ministryNews: ministryNewsApi,
  config: configApi,
  profile: profileApi,
  preferences: preferencesApi,
};
