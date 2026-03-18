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

export interface ContactQuery {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  repliedAt?: string | null;
  adminReply?: string | null;
  repliedBy?: string | null;
  status: 'open' | 'replied';
}

function withToken(): string {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Please login first.');
  }
  return token;
}

export async function fetchQueries(filters?: { email?: string; pageSize?: number }): Promise<ContactQuery[]> {
  const params = new URLSearchParams({
    page: '1',
    pageSize: String(filters?.pageSize || 200),
  });

  if (filters?.email) {
    params.set('email', filters.email);
  }

  const response = await backendRequest<Paginated<ContactQuery>>(`/queries/?${params.toString()}`, { method: 'GET' }, withToken());
  return response.data.items || [];
}

export async function createQuery(payload: { name: string; email: string; subject: string; message: string }): Promise<ContactQuery> {
  const response = await backendRequest<ContactQuery>(
    '/queries/',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    withToken()
  );
  return response.data;
}

export async function replyToQuery(queryId: string, reply: string): Promise<ContactQuery> {
  const response = await backendRequest<ContactQuery>(
    `/queries/${queryId}/reply/`,
    {
      method: 'PATCH',
      body: JSON.stringify({ reply }),
    },
    withToken()
  );
  return response.data;
}
