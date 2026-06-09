import { request } from './client';

export const preferencesApi = {
  getAll: () => request<Record<string, unknown>>('/auth/me/preferences'),

  update: (preferences: Record<string, unknown>) => request<Record<string, unknown>>('/auth/me/preferences', {
    method: 'PUT',
    body: JSON.stringify({ preferences }),
  }),
};
