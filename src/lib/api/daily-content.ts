import { request } from './client';
import type { BackendDailyContent } from '$lib/types/backend';

export const dailyContentApi = {
  getToday: () => request<BackendDailyContent>('/daily-content/today'),
};
