export {
  HOME, TRIPS_LIST, TRIP_DETAIL, BLOG, VIDEOS, ABOUT,
  NOTIFICATIONS, SETTINGS, PRAYER, HERO_BANNER, SCRIPTURE_CARD,
  APP_HEADER, SEARCH_BAR, BOTTOM_TABS, SCREEN_TITLES,
  TRIP_CATEGORIES, ERROR_MESSAGES, ALERT_MESSAGES,
  NOTIFICATION_TEXT, LOGIN,
} from './content';

export const APP_NAME = 'Bible Teaching';
export const APP_VERSION = '1.0.0';

export const FONT_SIZES = ['small', 'medium', 'large'] as const;
export type FontSize = (typeof FONT_SIZES)[number];

export const BIBLE_VERSIONS = ['ESV', 'NIV', 'KJV'] as const;
export type BibleVersion = (typeof BIBLE_VERSIONS)[number];

export const CATEGORIES = {
  blog: ['All', 'Devotional', 'Bible Study', 'Prayer', 'Faith', 'Church Life', 'Mission'],
  videos: ['All', 'Sermon', 'Worship', 'Bible Study', 'Event'],
  events: ['All', 'trip', 'event', 'conference'],
} as const;

export const EVENT_TYPE_LABELS: Record<string, string> = {
  trip: 'Mission Trip', event: 'Event', conference: 'Conference',
};

// Category color palette — each category maps to specific Tailwind color classes
// Using static strings so Tailwind JIT can find them
export const CATEGORY_STYLES: Record<string, { badge: string; text: string; accent: string }> = {
  Devotional:   { badge: 'bg-navy-500/10 dark:bg-navy-400/20 text-navy-500 dark:text-navy-400',       text: 'text-navy-500 dark:text-navy-400',       accent: 'bg-navy-500' },
  'Bible Study':{ badge: 'bg-navy-400/10 dark:bg-navy-400/20 text-navy-400 dark:text-navy-300',       text: 'text-navy-400 dark:text-navy-300',       accent: 'bg-navy-400' },
  Prayer:       { badge: 'bg-warm-700/10 dark:bg-warm-600/20 text-warm-700 dark:text-warm-400',       text: 'text-warm-700 dark:text-warm-400',       accent: 'bg-warm-700' },
  Faith:        { badge: 'bg-cream-500/10 dark:bg-cream-400/20 text-cream-600 dark:text-cream-300',   text: 'text-cream-600 dark:text-cream-300',     accent: 'bg-cream-500' },
  'Church Life':{ badge: 'bg-navy-300/10 dark:bg-navy-300/20 text-navy-600 dark:text-navy-200',       text: 'text-navy-600 dark:text-navy-200',       accent: 'bg-navy-300' },
  Mission:      { badge: 'bg-navy-700/10 dark:bg-navy-600/20 text-navy-700 dark:text-navy-300',       text: 'text-navy-700 dark:text-navy-300',       accent: 'bg-navy-700' },
  Sermon:       { badge: 'bg-navy-600/10 dark:bg-navy-500/20 text-navy-600 dark:text-navy-300',       text: 'text-navy-600 dark:text-navy-300',       accent: 'bg-navy-600' },
  Worship:      { badge: 'bg-warm-600/10 dark:bg-warm-500/20 text-warm-600 dark:text-warm-300',       text: 'text-warm-600 dark:text-warm-300',       accent: 'bg-warm-600' },
  Event:        { badge: 'bg-navy-400/10 dark:bg-navy-400/20 text-navy-400 dark:text-navy-300',       text: 'text-navy-400 dark:text-navy-300',       accent: 'bg-navy-400' },
  Announcement: { badge: 'bg-cream-600/10 dark:bg-cream-500/20 text-cream-700 dark:text-cream-300',   text: 'text-cream-700 dark:text-cream-300',     accent: 'bg-cream-600' },
  Outreach:     { badge: 'bg-navy-200/20 dark:bg-navy-300/20 text-navy-600 dark:text-navy-200',       text: 'text-navy-600 dark:text-navy-200',       accent: 'bg-navy-200' },
  Media:        { badge: 'bg-navy-800/10 dark:bg-navy-700/20 text-navy-800 dark:text-navy-300',       text: 'text-navy-800 dark:text-navy-300',       accent: 'bg-navy-800' },
  Opportunities:{ badge: 'bg-warm-500/10 dark:bg-warm-400/20 text-warm-600 dark:text-warm-300',       text: 'text-warm-600 dark:text-warm-300',       accent: 'bg-warm-500' },
  trip:         { badge: 'bg-navy-500/10 dark:bg-navy-400/20 text-navy-500 dark:text-navy-400',       text: 'text-navy-500 dark:text-navy-400',       accent: 'bg-navy-500' },
  conference:   { badge: 'bg-navy-400/10 dark:bg-navy-400/20 text-navy-400 dark:text-navy-300',       text: 'text-navy-400 dark:text-navy-300',       accent: 'bg-navy-400' },
  Teaching:     { badge: 'bg-navy-300/10 dark:bg-navy-300/20 text-navy-600 dark:text-navy-200',       text: 'text-navy-600 dark:text-navy-200',       accent: 'bg-navy-300' },
  Grace:        { badge: 'bg-warm-600/10 dark:bg-warm-500/20 text-warm-600 dark:text-warm-300',       text: 'text-warm-600 dark:text-warm-300',       accent: 'bg-warm-600' },
  Family:       { badge: 'bg-cream-500/10 dark:bg-cream-400/20 text-cream-600 dark:text-cream-300',   text: 'text-cream-600 dark:text-cream-300',     accent: 'bg-cream-500' },
  'Spiritual Growth': { badge: 'bg-navy-700/10 dark:bg-navy-600/20 text-navy-700 dark:text-navy-300', text: 'text-navy-700 dark:text-navy-300',       accent: 'bg-navy-700' },
  General:      { badge: 'bg-navy-500/10 dark:bg-navy-400/20 text-navy-500 dark:text-navy-400',       text: 'text-navy-500 dark:text-navy-400',       accent: 'bg-navy-500' },
};

export function getCategoryStyle(category: string) {
  return CATEGORY_STYLES[category] ?? CATEGORY_STYLES.General;
}
