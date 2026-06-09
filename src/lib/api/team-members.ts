import { request, requestPaginated } from './client';
import type { BackendTeamMember } from '$lib/types/backend';

export interface TeamMemberListParams {
  page?: number;
  limit?: number;
  type?: 'PASTOR' | 'TEAM_MEMBER';
}

export const teamMembersApi = {
  list: (params?: TeamMemberListParams) => {
    const qp = new URLSearchParams();
    if (params?.page) qp.set('page', String(params.page));
    if (params?.limit) qp.set('limit', String(params.limit));
    if (params?.type) qp.set('type', params.type);
    const qs = qp.toString();
    return requestPaginated<BackendTeamMember>(`/team-members${qs ? `?${qs}` : ''}`);
  },

  getById: (id: string) => request<BackendTeamMember>(`/team-members/${id}`),
};
