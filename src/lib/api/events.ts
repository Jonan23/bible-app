import { request, requestPaginated } from './client';
import type { BackendEvent } from '$lib/types/backend';

export interface EventListParams {
  page?: number;
  limit?: number;
  status?: string;
  upcoming?: boolean;
}

export const eventsApi = {
  list: (params?: EventListParams) => {
    const qp = new URLSearchParams();
    if (params?.page) qp.set('page', String(params.page));
    if (params?.limit) qp.set('limit', String(params.limit));
    if (params?.status) qp.set('status', params.status);
    if (params?.upcoming !== undefined) qp.set('upcoming', String(params.upcoming));
    const qs = qp.toString();
    return requestPaginated<BackendEvent>(`/events${qs ? `?${qs}` : ''}`);
  },

  getById: (id: string) => request<BackendEvent>(`/events/${id}`),

  register: (eventId: string, data: { name: string; email: string; phone?: string }) =>
    request<{ id: string }>(`/events/${eventId}/register`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
