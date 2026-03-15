import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { mockLeaderboard } from '@/data/leaderboard';
import { getBadgeColor } from '@/lib/utils';
import { Trophy, Star } from 'lucide-react';

const currentUserRank = 17;
const currentUser = mockLeaderboard.find(e => e.rank === currentUserRank)!;

export default function StudentLeaderboardPage() {
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
            <span className="font-heading text-4xl font-bold text-g-yellow">#{currentUser.rank}</span>
            <div>
              <div className="text-sm text-white font-medium">{currentUser.name}</div>
              <div className="flex items-center gap-1 text-xs text-g-yellow font-mono"><Star size={10} />{currentUser.points.toLocaleString()} points</div>
            </div>
          </div>
        </div>
        <Badge variant={getBadgeColor(currentUser.badge)} className="hidden sm:inline-flex capitalize">
          {currentUser.badge.replace('-', ' ')}
        </Badge>
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
            {mockLeaderboard.map((entry) => {
              const isMe = entry.rank === currentUserRank;
              return (
                <tr key={entry.userId} className={isMe ? 'bg-g-yellow/5' : ''}>
                  <td>
                    <span className={`font-mono text-xs ${isMe ? 'text-g-yellow font-bold' : 'text-white/40'}`}>#{entry.rank}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                        <Image src={entry.avatar} alt={entry.name} fill className="object-cover" />
                      </div>
                      <div>
                        <span className={`text-sm font-medium ${isMe ? 'text-g-yellow' : 'text-white'}`}>{entry.name}</span>
                        {isMe && <span className="ml-2 text-[10px] font-mono text-g-yellow/60 uppercase">(You)</span>}
                      </div>
                    </div>
                  </td>
                  <td className="text-right hidden sm:table-cell">
                    <span className={`font-bold font-mono text-sm ${isMe ? 'text-g-yellow' : 'text-g-blue'}`}>
                      {entry.points.toLocaleString()}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
