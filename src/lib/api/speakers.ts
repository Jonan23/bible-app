import { request } from './client';
import type { BackendSpeaker } from '$lib/types/backend';

export const speakersApi = {
  list: () => request<BackendSpeaker[]>('/speakers'),
};
