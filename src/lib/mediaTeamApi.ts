import { TeamMember, MediaItem } from '@/types';
import { backendRequest } from '@/lib/backendApi';
import { getAuthToken } from '@/lib/auth';

type Paginated<T> = {
  items: T[];
  pagination: {
    count: number;
    page: number;
    pageSize: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
};

function withToken(): string {
  const token = getAuthToken();
  if (!token) throw new Error('Please login first.');
  return token;
}

export async function fetchMedia(category: string = 'all', pageSize: number = 200): Promise<MediaItem[]> {
  const params = new URLSearchParams({
    category,
    page: '1',
    pageSize: String(pageSize),
  });
  const response = await backendRequest<Paginated<MediaItem>>(`/media/?${params.toString()}`, { method: 'GET' });
  return response.data.items || [];
}

export async function createMedia(payload: Omit<MediaItem, 'id'>): Promise<MediaItem> {
  const response = await backendRequest<MediaItem>(
    '/media/',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    withToken()
  );
  return response.data;
}

export async function deleteMedia(mediaId: string): Promise<void> {
  await backendRequest(`/media/${mediaId}/`, { method: 'DELETE' }, withToken());
}

export async function fetchTeamMembers(team: string = 'all', pageSize: number = 200): Promise<TeamMember[]> {
  const params = new URLSearchParams({
    team,
    page: '1',
    pageSize: String(pageSize),
  });
  const response = await backendRequest<Paginated<TeamMember>>(`/team/?${params.toString()}`, { method: 'GET' });
  return response.data.items || [];
}

export async function createTeamMember(payload: Omit<TeamMember, 'id'>): Promise<TeamMember> {
  const response = await backendRequest<TeamMember>(
    '/team/',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    withToken()
  );
  return response.data;
}

export async function updateTeamMember(memberId: string, payload: Partial<TeamMember>): Promise<TeamMember> {
  const response = await backendRequest<TeamMember>(
    `/team/${memberId}/`,
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    },
    withToken()
  );
  return response.data;
}

export async function deleteTeamMember(memberId: string): Promise<void> {
  await backendRequest(`/team/${memberId}/`, { method: 'DELETE' }, withToken());
}
