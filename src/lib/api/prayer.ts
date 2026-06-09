import { request } from './client';

export const prayerApi = {
  submit: (data: { name: string; email?: string; request: string }) =>
    request<{ id: string }>('/prayer-requests', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
