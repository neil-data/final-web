import { Event } from '@/types';
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

export interface StudentUser {
  id: string;
  name: string;
  email: string;
  role: 'student';
  points: number;
  banned: boolean;
  iarNo: string;
  department: string;
  year: string;
  phone: string;
  bio: string;
  github: string;
  linkedin: string;
  createdAt: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  name: string;
  email: string;
  iarNo: string;
  department: string;
  year: string;
  teamId?: string;
  teamName?: string;
  isLeader?: boolean;
  customFieldValues?: Record<string, string>;
  registeredAt: string;
}

export interface EventRegistrationWithUser extends EventRegistration {
  user: StudentUser;
}

function withToken(): string {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Please login first.');
  }
  return token;
}

export async function fetchEvents(pageSize: number = 100): Promise<Event[]> {
  const response = await backendRequest<Paginated<Event>>(`/events/?page=1&pageSize=${pageSize}`, {
    method: 'GET',
  });
  return response.data.items || [];
}

export async function createEvent(payload: Partial<Event>): Promise<Event> {
  const response = await backendRequest<Event>(
    '/events/',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    withToken()
  );
  return response.data;
}

export async function deleteEvent(eventId: string): Promise<void> {
  await backendRequest(`/events/${eventId}/`, { method: 'DELETE' }, withToken());
}

export async function fetchUsers(pageSize: number = 200): Promise<StudentUser[]> {
  const response = await backendRequest<Paginated<StudentUser>>(`/users/?page=1&pageSize=${pageSize}`, { method: 'GET' }, withToken());
  return response.data.items || [];
}

export async function updateUserPoints(userId: string, delta: number): Promise<StudentUser> {
  const response = await backendRequest<StudentUser>(
    `/users/${userId}/points/`,
    {
      method: 'PATCH',
      body: JSON.stringify({ delta }),
    },
    withToken()
  );
  return response.data;
}

export async function updateUserBannedStatus(userId: string, banned: boolean): Promise<StudentUser> {
  const response = await backendRequest<StudentUser>(
    `/users/${userId}/status/`,
    {
      method: 'PATCH',
      body: JSON.stringify({ banned }),
    },
    withToken()
  );
  return response.data;
}

export async function fetchRegistrations(filters?: { eventId?: string; email?: string; pageSize?: number }): Promise<EventRegistration[]> {
  const params = new URLSearchParams({
    page: '1',
    pageSize: String(filters?.pageSize || 300),
  });
  if (filters?.eventId) params.set('eventId', filters.eventId);
  if (filters?.email) params.set('email', filters.email);

  const response = await backendRequest<Paginated<EventRegistration>>(`/registrations/?${params.toString()}`, { method: 'GET' }, withToken());
  return response.data.items || [];
}

export async function createRegistration(payload: Omit<EventRegistration, 'id' | 'registeredAt'>): Promise<EventRegistration> {
  const response = await backendRequest<EventRegistration>(
    '/registrations/',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    withToken()
  );
  return response.data;
}

export async function updateRegistration(registrationId: string, payload: Partial<EventRegistration>): Promise<EventRegistration> {
  const response = await backendRequest<EventRegistration>(
    `/registrations/${registrationId}/`,
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    },
    withToken()
  );
  return response.data;
}

export async function deleteRegistration(registrationId: string): Promise<void> {
  await backendRequest(`/registrations/${registrationId}/`, { method: 'DELETE' }, withToken());
}
