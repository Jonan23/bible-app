import { request, requestPaginated } from './client';
import type { BackendBlogPost } from '$lib/types/backend';

export interface BlogListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  categoryId?: string;
  featured?: boolean;
}

export const blogApi = {
  list: (params?: BlogListParams) => {
    const qp = new URLSearchParams();
    if (params?.page) qp.set('page', String(params.page));
    if (params?.limit) qp.set('limit', String(params.limit));
    if (params?.search) qp.set('search', params.search);
    if (params?.status) qp.set('status', params.status);
    if (params?.categoryId) qp.set('categoryId', params.categoryId);
    if (params?.featured !== undefined) qp.set('featured', String(params.featured));
    const qs = qp.toString();
    return requestPaginated<BackendBlogPost>(`/blog-posts${qs ? `?${qs}` : ''}`);
  },

  getBySlug: (slug: string) => request<BackendBlogPost>(`/blog-posts/${slug}`),

  search: (q: string, page = 1, limit = 10) =>
    requestPaginated<BackendBlogPost>(`/blog-posts/search?q=${encodeURIComponent(q)}&page=${page}&limit=${limit}`),
};
