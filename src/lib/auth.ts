import { AdminRole } from '@/types';
import { backendRequest } from '@/lib/backendApi';

const AUTH_TOKEN_KEY = 'gdgoc-auth-token';
const STUDENT_SESSION_KEY = 'gdgoc-student-session';
const ADMIN_SESSION_KEY = 'gdgoc-admin-session';
const ADMIN_ROLE_KEY = 'adminRole';

const ADMIN_ROLES: AdminRole[] = ['leader', 'tech', 'marketing', 'documentation', 'operations', 'outreach'];

export type StudentSession = {
  name: string;
  email: string;
  iarNo?: string;
  department?: string;
  year?: string;
  avatar?: string;
};

export type AdminSession = {
  email: string;
  role: AdminRole;
  name?: string;
};

type StudentLoginData = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'student';
    banned: boolean;
    iarNo?: string;
    department?: string;
    year?: string;
  };
};

type AdminLoginData = {
  token: string;
  user: {
    email: string;
    role: AdminRole;
  };
};

type MeData = {
  session: {
    email: string;
    role: string;
    userId?: string;
  };
  user?: {
    name?: string;
    email?: string;
    role?: string;
    banned?: boolean;
  };
};

function canUseStorage(): boolean {
  return typeof window !== 'undefined';
}

export function isAdminRole(value: string): value is AdminRole {
  return ADMIN_ROLES.includes(value as AdminRole);
}

export function getAuthToken(): string | null {
  if (!canUseStorage()) return null;
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

export function hasAuthToken(): boolean {
  return Boolean(getAuthToken());
}

export function clearAuthState(): void {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.localStorage.removeItem(STUDENT_SESSION_KEY);
  window.localStorage.removeItem(ADMIN_SESSION_KEY);
  window.localStorage.removeItem(ADMIN_ROLE_KEY);
}

export async function loginStudent(input: { email: string; name?: string; session?: Partial<StudentSession> }): Promise<StudentSession> {
  const payload = await backendRequest<StudentLoginData>('/auth/student/login/', {
    method: 'POST',
    body: JSON.stringify({
      email: input.email,
      name: input.name || '',
    }),
  });

  const token = payload.data.token;
  const user = payload.data.user;

  if (canUseStorage()) {
    const session: StudentSession = {
      name: user.name,
      email: user.email,
      iarNo: input.session?.iarNo ?? user.iarNo ?? '',
      department: input.session?.department ?? user.department ?? '',
      year: input.session?.year ?? user.year ?? '',
      avatar: input.session?.avatar ?? '',
    };

    window.localStorage.setItem(AUTH_TOKEN_KEY, token);
    window.localStorage.setItem(STUDENT_SESSION_KEY, JSON.stringify(session));
    window.localStorage.removeItem(ADMIN_SESSION_KEY);
    window.localStorage.removeItem(ADMIN_ROLE_KEY);
    return session;
  }

  return {
    name: user.name,
    email: user.email,
    iarNo: input.session?.iarNo ?? user.iarNo ?? '',
    department: input.session?.department ?? user.department ?? '',
    year: input.session?.year ?? user.year ?? '',
    avatar: input.session?.avatar ?? '',
  };
}

export async function loginAdmin(input: { email: string; password: string; role: AdminRole }): Promise<AdminSession> {
  const payload = await backendRequest<AdminLoginData>('/auth/admin/login/', {
    method: 'POST',
    body: JSON.stringify({
      email: input.email,
      password: input.password,
      role: input.role,
    }),
  });

  const token = payload.data.token;
  const user = payload.data.user;
  const session: AdminSession = {
    email: user.email,
    role: user.role,
    name: user.email.split('@')[0],
  };

  if (canUseStorage()) {
    window.localStorage.setItem(AUTH_TOKEN_KEY, token);
    window.localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    window.localStorage.setItem(ADMIN_ROLE_KEY, session.role);
    window.localStorage.removeItem(STUDENT_SESSION_KEY);
  }

  return session;
}

export async function fetchMe(): Promise<MeData> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Not authenticated');
  }
  const payload = await backendRequest<MeData>('/auth/me/', { method: 'GET' }, token);
  return payload.data;
}

export async function logout(): Promise<void> {
  const token = getAuthToken();
  if (!token) {
    clearAuthState();
    return;
  }

  try {
    await backendRequest('/auth/logout/', { method: 'POST' }, token);
  } finally {
    clearAuthState();
  }
}
