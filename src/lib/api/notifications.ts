import { request, requestPaginated } from './client';
import type { BackendNotification } from '$lib/types/backend';

export const notificationsApi = {
  list: (page = 1, limit = 20) =>
    requestPaginated<BackendNotification>(`/notifications?page=${page}&limit=${limit}`),

  markRead: (id: string) =>
    request<{ message: string }>(`/notifications/read/${id}`, { method: 'PATCH' }),

  markAllRead: () =>
    request<{ message: string }>('/notifications/read-all', { method: 'PATCH' }),

  registerDeviceToken: (token: string, platform = 'FCM') =>
    request<{ message: string }>('/notifications/device-token', {
      method: 'POST',
      body: JSON.stringify({ token, platform }),
    }),
};
