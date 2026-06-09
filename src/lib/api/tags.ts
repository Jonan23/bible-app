import { request } from './client';
import type { BackendTag } from '$lib/types/backend';

export const tagsApi = {
  list: () => request<BackendTag[]>('/tags'),
};
