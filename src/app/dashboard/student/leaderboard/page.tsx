'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { fetchLeaderboard } from '@/lib/module5Api';
import { fetchMe } from '@/lib/auth';
import { LeaderboardEntry } from '@/types';
import { getBadgeColor } from '@/lib/utils';
import { Trophy, Star } from 'lucide-react';

export default function StudentLeaderboardPage() {
  const [userName, setUserName] = useState('');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [myEntry, setMyEntry] = useState<LeaderboardEntry | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const [board, me] = await Promise.all([fetchLeaderboard(), fetchMe()]);
        if (!active) return;
        setEntries(board);
        const mine = board.find(item => item.userId === me.session.userId) || null;
        setMyEntry(mine);
        setUserName(mine?.name || me.user?.name || '');
      } catch {
        if (!active) return;
        setEntries([]);
        setMyEntry(null);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-white">Leaderboard</h1>
        <p className="text-white/40 text-sm font-mono mt-1">Your ranking and community standings</p>
      </div>

      {/* My rank card */}
      <GlassCard animate={false} className="mb-8 flex items-center gap-4" glowColor="yellow">
        <div className="w-12 h-12 rounded-full bg-g-yellow/10 border border-g-yellow/30 flex items-center justify-center flex-shrink-0">
          <Trophy size={20} className="text-g-yellow" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-1">Your Current Rank</div>
          <div className="flex items-center gap-3">
            <span className="font-heading text-4xl font-bold text-g-yellow">{myEntry ? `#${myEntry.rank}` : '—'}</span>
            <div>
              <div className="text-sm text-white font-medium">{userName || 'Student'}</div>
              <div className="flex items-center gap-1 text-xs text-white/40 font-mono"><Star size={10} />{myEntry ? `${myEntry.points.toLocaleString()} pts` : 'Not ranked yet'}</div>
            </div>
          </div>
        </div>
        <Badge variant="blue" className="hidden sm:inline-flex">Member</Badge>
      </GlassCard>

      {/* Full list */}
      <h2 className="section-number mb-4">Community Rankings</h2>
      <div className="glass-card rounded-xl overflow-hidden">
        <table className="data-table w-full">
          <thead>
            <tr>
              <th className="text-left">Rank</th>
              <th className="text-left">Member</th>
              <th className="text-right hidden sm:table-cell">Points</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.userId}>
                <td>
                  <span className="font-mono text-xs text-white/40">#{entry.rank}</span>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                      <Image src={entry.avatar} alt={entry.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="text-sm text-white font-medium">{entry.name}</div>
                      <Badge variant={getBadgeColor(entry.badge)} className="mt-0.5 text-[10px] py-0 capitalize">{entry.badge.replace('-', ' ')}</Badge>
                    </div>
                  </div>
                </td>
                <td className="text-right hidden sm:table-cell">
                  <div className="flex items-center justify-end gap-1 text-g-blue font-mono text-sm">
                    <Star size={10} />{entry.points.toLocaleString()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
