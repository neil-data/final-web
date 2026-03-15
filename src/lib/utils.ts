import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
  });
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    'upcoming': 'text-g-blue border-g-blue/30 bg-g-blue/10',
    'live': 'text-g-green border-g-green/30 bg-g-green/10',
    'completed': 'text-white/40 border-white/10 bg-white/5',
    'registration-open': 'text-g-yellow border-g-yellow/30 bg-g-yellow/10',
  };
  return map[status] || 'text-white/40 border-white/10 bg-white/5';
}

export function getCategoryColor(category: string): string {
  const map: Record<string, string> = {
    'hackathon': 'text-g-red border-g-red/30 bg-g-red/10',
    'workshop': 'text-g-blue border-g-blue/30 bg-g-blue/10',
    'talk': 'text-g-yellow border-g-yellow/30 bg-g-yellow/10',
    'bootcamp': 'text-g-green border-g-green/30 bg-g-green/10',
    'community': 'text-purple-400 border-purple-400/30 bg-purple-400/10',
    'webinar': 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10',
  };
  return map[category] || 'text-white/40 border-white/10 bg-white/5';
}

export function getBadgeColor(badge: string): string {
  const map: Record<string, string> = {
    'gold': 'text-g-yellow border-g-yellow/30 bg-g-yellow/10',
    'silver': 'text-[#9aa0a6] border-[#9aa0a6]/30 bg-[#9aa0a6]/10',
    'bronze': 'text-g-red border-g-red/30 bg-g-red/10',
    'rising-star': 'text-g-green border-g-green/30 bg-g-green/10',
    'contributor': 'text-g-blue border-g-blue/30 bg-g-blue/10',
  };
  return map[badge] || 'text-white/40 border-white/10';
}
