'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { updateUserPoints } from '@/lib/eventsApi';
import { fetchLeaderboard } from '@/lib/module5Api';
import { LeaderboardEntry } from '@/types';
import { getBadgeColor } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Plus, Minus, Trophy } from 'lucide-react';

export default function AdminLeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [notice, setNotice] = useState('');

  const refresh = async () => {
    try {
      const data = await fetchLeaderboard();
      setEntries(data);
      setNotice('');
    } catch (err) {
      setNotice(err instanceof Error ? err.message : 'Unable to load leaderboard.');
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const adjustPoints = async (userId: string, delta: number) => {
    try {
      await updateUserPoints(userId, delta);
      await refresh();
    } catch (err) {
      setNotice(err instanceof Error ? err.message : 'Unable to update points.');
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-white">Leaderboard Management</h1>
        <p className="text-white/40 text-sm font-mono mt-1">View rankings and adjust community points</p>
      </div>

      {notice && <p className="text-xs font-mono text-g-yellow mb-4">{notice}</p>}

      <GlassCard animate={false}>
        <div className="overflow-x-auto">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th className="text-left">Rank</th>
                <th className="text-left">Member</th>
                <th className="text-left hidden md:table-cell">Badge</th>
                <th className="text-left hidden sm:table-cell">Events</th>
                <th className="text-right">Points</th>
                <th className="text-right">Adjust</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => (
                <motion.tr key={entry.userId} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}>
                  <td>
                    <div className="flex items-center gap-1">
                      {entry.rank <= 3 && <Trophy size={12} className={entry.rank === 1 ? 'text-g-yellow' : entry.rank === 2 ? 'text-[#9aa0a6]' : 'text-g-red'} />}
                      <span className="font-mono text-xs text-white/40">#{entry.rank}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                        <Image src={entry.avatar} alt={entry.name} fill className="object-cover" />
                      </div>
                      <span className="text-sm text-white font-medium">{entry.name}</span>
                    </div>
                  </td>
                  <td className="hidden md:table-cell">
                    <Badge variant={getBadgeColor(entry.badge)} className="capitalize text-[10px]">
                      {entry.badge.replace('-', ' ')}
                    </Badge>
                  </td>
                  <td className="hidden sm:table-cell">
                    <span className="text-white/60 text-sm">{entry.eventsAttended}</span>
                  </td>
                  <td className="text-right">
                    <span className="text-g-blue font-bold font-mono">{entry.points.toLocaleString()}</span>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => adjustPoints(entry.userId, -50)}
                        className="w-6 h-6 rounded border border-white/10 flex items-center justify-center text-white/40 hover:text-g-red hover:border-g-red/30 transition-colors"
                      ><Minus size={10} /></button>
                      <span className="text-[10px] text-white/20 font-mono w-8 text-center">±50</span>
                      <button
                        onClick={() => adjustPoints(entry.userId, 50)}
                        className="w-6 h-6 rounded border border-white/10 flex items-center justify-center text-white/40 hover:text-g-green hover:border-g-green/30 transition-colors"
                      ><Plus size={10} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
