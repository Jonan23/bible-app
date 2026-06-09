import { request, requestPaginated } from './client';
import type { BackendVideo } from '$lib/types/backend';

export interface VideoListParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  speakerId?: string;
  featured?: boolean;
}

export const videosApi = {
  list: (params?: VideoListParams) => {
    const qp = new URLSearchParams();
    if (params?.page) qp.set('page', String(params.page));
    if (params?.limit) qp.set('limit', String(params.limit));
    if (params?.categoryId) qp.set('categoryId', params.categoryId);
    if (params?.speakerId) qp.set('speakerId', params.speakerId);
    if (params?.featured !== undefined) qp.set('featured', String(params.featured));
    const qs = qp.toString();
    return requestPaginated<BackendVideo>(`/videos${qs ? `?${qs}` : ''}`);
  },

  getById: (id: string) => request<BackendVideo>(`/videos/${id}`),
};
