import { request, requestPaginated } from './client';
import type { BackendMinistryNews } from '$lib/types/backend';

export interface MinistryNewsListParams {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean;
}

export const ministryNewsApi = {
  list: (params?: MinistryNewsListParams) => {
    const qp = new URLSearchParams();
    if (params?.page) qp.set('page', String(params.page));
    if (params?.limit) qp.set('limit', String(params.limit));
    if (params?.category) qp.set('category', params.category);
    if (params?.featured !== undefined) qp.set('featured', String(params.featured));
    const qs = qp.toString();
    return requestPaginated<BackendMinistryNews>(`/ministry-news${qs ? `?${qs}` : ''}`);
  },

  getById: (id: string) => request<BackendMinistryNews>(`/ministry-news/${id}`),
};
