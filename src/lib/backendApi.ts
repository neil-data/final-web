type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

export class BackendApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'BackendApiError';
    this.status = status;
  }
}

const FALLBACK_BASE = 'http://127.0.0.1:8000/api/v1';

function getBackendBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_BACKEND_URL?.trim();
  const base = configured && configured.length > 0 ? configured : FALLBACK_BASE;
  return base.replace(/\/+$/, '');
}

export async function backendRequest<T>(
  path: string,
  init?: RequestInit,
  token?: string
): Promise<ApiEnvelope<T>> {
  const headers = new Headers(init?.headers || {});
  headers.set('Content-Type', 'application/json');

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${getBackendBaseUrl()}${path}`, {
    ...init,
    headers,
  });

  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;
  if (!response.ok || !payload?.success) {
    const message = payload?.message || `Request failed with status ${response.status}`;
    throw new BackendApiError(message, response.status);
  }

  return payload;
}
