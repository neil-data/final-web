import { backendRequest } from '@/lib/backendApi';
import { getAuthToken } from '@/lib/auth';
import { Announcement, LeaderboardEntry } from '@/types';

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

export type PlatformSettings = {
  maintenanceMode: boolean;
  pointsPerEvent: number;
  pointsForSpeaking: number;
  pointsForOrganizing: number;
  pointsForHackathonWin: number;
};

export type StudentProfile = {
  id: string;
  name: string;
  email: string;
  iarNo: string;
  department: string;
  year: string;
  phone: string;
  bio: string;
  github: string;
  linkedin: string;
  points: number;
  banned: boolean;
};

export type AnalyticsSummary = {
  totalUsers: number;
  totalEvents: number;
  totalRegistrations: number;
  openQueries: number;
  eventsByCategory: Record<string, number>;
};

function withToken(): string {
  const token = getAuthToken();
  if (!token) throw new Error('Please login first.');
  return token;
}

export async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  const response = await backendRequest<LeaderboardEntry[]>('/leaderboard/', { method: 'GET' });
  return response.data || [];
}

export async function fetchAnnouncements(pageSize: number = 100): Promise<Announcement[]> {
  const response = await backendRequest<Paginated<Announcement>>(`/announcements/?page=1&pageSize=${pageSize}`, { method: 'GET' });
  return response.data.items || [];
}

export async function createAnnouncement(payload: Omit<Announcement, 'id' | 'author' | 'createdAt'>): Promise<Announcement> {
  const response = await backendRequest<Announcement>(
    '/announcements/',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    withToken()
  );
  return response.data;
}

export async function deleteAnnouncement(announcementId: string): Promise<void> {
  await backendRequest(`/announcements/${announcementId}/`, { method: 'DELETE' }, withToken());
}

export async function fetchAnalyticsSummary(): Promise<AnalyticsSummary> {
  const response = await backendRequest<AnalyticsSummary>('/analytics/summary/', { method: 'GET' }, withToken());
  return response.data;
}

export async function fetchPlatformSettings(): Promise<PlatformSettings> {
  const response = await backendRequest<PlatformSettings>('/settings/', { method: 'GET' }, withToken());
  return response.data;
}

export async function updatePlatformSettings(payload: Partial<PlatformSettings>): Promise<PlatformSettings> {
  const response = await backendRequest<PlatformSettings>(
    '/settings/',
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    },
    withToken()
  );
  return response.data;
}

export async function fetchUserById(userId: string): Promise<StudentProfile> {
  const response = await backendRequest<StudentProfile>(`/users/${userId}/`, { method: 'GET' }, withToken());
  return response.data;
}

export async function updateUserById(userId: string, payload: Partial<StudentProfile>): Promise<StudentProfile> {
  const response = await backendRequest<StudentProfile>(
    `/users/${userId}/`,
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    },
    withToken()
  );
  return response.data;
}

export async function createStudentUser(payload: {
  name: string;
  email: string;
  iarNo?: string;
  department?: string;
  year?: string;
  phone?: string;
}): Promise<StudentProfile> {
  const response = await backendRequest<StudentProfile>(
    '/users/',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    withToken()
  );
  return response.data;
}

export async function deleteUserById(userId: string): Promise<void> {
  await backendRequest(`/users/${userId}/`, { method: 'DELETE' }, withToken());
}
