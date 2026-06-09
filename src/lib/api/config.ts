import { request } from './client';

export const configApi = {
  getAll: () => request<Record<string, unknown>>('/config'),
  getByKey: (key: string) => request<{ key: string; value: unknown }>(`/config/${key}`),
};
