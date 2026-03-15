import { AdminRole } from '@/types';

export type DashboardModule =
  | 'overview'
  | 'events'
  | 'users'
  | 'leaderboard'
  | 'media'
  | 'announcements'
  | 'analytics'
  | 'settings';

const ALL_MODULES: DashboardModule[] = [
  'overview', 'events', 'users', 'leaderboard', 'media', 'announcements', 'analytics', 'settings',
];

const ROLE_PERMISSIONS: Record<AdminRole, DashboardModule[]> = {
  leader: ALL_MODULES, // Leaders have full access to everything
  tech: ALL_MODULES, // Tech team: all modules (events, users, analytics, etc.)
  marketing: ['overview', 'announcements', 'media', 'events', 'analytics'], // Marketing: media, analytics, events, announcements
  documentation: ['overview', 'media', 'announcements'], // Documentation: media and announcements
  operations: ['overview', 'events', 'users', 'leaderboard', 'analytics'], // Operations: events, users, leaderboard
  outreach: ['overview', 'announcements', 'analytics', 'events'], // Outreach: announcements, analytics, events
};

const ROLE_DESCRIPTIONS: Record<AdminRole, string> = {
  leader: 'Full access to all administrative modules',
  tech: 'Full access to all technical and administrative modules',
  marketing: 'Access to media, announcements, events, and analytics',
  documentation: 'Access to media and announcements',
  operations: 'Access to events, users, leaderboard, and analytics',
  outreach: 'Access to announcements, analytics, and events',
};

export function getModulesForRole(role: AdminRole): DashboardModule[] {
  return ROLE_PERMISSIONS[role] ?? ['overview'];
}

export function canAccess(role: AdminRole, module: DashboardModule): boolean {
  return ROLE_PERMISSIONS[role]?.includes(module) ?? false;
}

export function getRoleDescription(role: AdminRole): string {
  return ROLE_DESCRIPTIONS[role] ?? 'Limited access';
}

export const AVAILABLE_ROLES: AdminRole[] = [
  'leader',
  'tech',
  'marketing',
  'documentation',
  'operations',
  'outreach',
];
