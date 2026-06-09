import { request } from './client';

export interface UpdateProfileData {
  name?: string;
  phone?: string;
  profileImage?: string | null;
}

export const profileApi = {
  update: (data: UpdateProfileData) => request<{
    id: string;
    email: string;
    name: string | null;
    phone: string | null;
    profileImage: string | null;
    role: string;
    status: string;
  }>('/auth/me', {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
};
