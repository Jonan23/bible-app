import { request } from './client';
import type { BackendCategory } from '$lib/types/backend';

export const categoriesApi = {
  list: (type?: string) => {
    const qs = type ? `?type=${type}` : '';
    return request<BackendCategory[]>(`/categories${qs}`);
  },
};
