'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { mockLeaderboard } from '@/data/leaderboard';
import { Search, UserCog, Trash2 } from 'lucide-react';

const mockUsers = mockLeaderboard.map((e, i) => ({
  ...e,
  email: `${e.name.split(' ')[0].toLowerCase()}@iar.ac.in`,
  role: i < 3 ? 'leader' : i < 7 ? 'tech' : 'student',
  joinedDate: '2024-08-15',
}));

const ROLES = ['student', 'leader', 'tech', 'marketing', 'documentation', 'operations', 'outreach'];

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const filtered = mockUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">User Management</h1>
          <p className="text-white/40 text-sm font-mono mt-1">Manage student accounts and assign roles</p>
        </div>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="form-input pl-9 py-2 text-xs max-w-[220px]"
          />
        </div>
      </div>

      <GlassCard animate={false}>
        <div className="overflow-x-auto">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th className="text-left">User</th>
                <th className="text-left hidden md:table-cell">Email</th>
                <th className="text-left hidden sm:table-cell">Current Role</th>
                <th className="text-left hidden lg:table-cell">Points</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <motion.tr key={user.userId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                        <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="text-sm text-white font-medium">{user.name}</div>
                        <div className="text-[10px] text-white/30 font-mono">#{user.rank}</div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell">
                    <span className="text-white/40 text-xs font-mono">{user.email}</span>
                  </td>
                  <td className="hidden sm:table-cell">
                    <select
                      defaultValue={user.role}
                      className="bg-transparent border border-white/10 text-white/70 text-xs font-mono rounded px-2 py-1 focus:outline-none focus:border-g-blue/40"
                    >
                      {ROLES.map(r => (
                        <option key={r} value={r} className="bg-dark-card capitalize">{r}</option>
                      ))}
                    </select>
                  </td>
                  <td className="hidden lg:table-cell">
                    <span className="text-g-blue font-mono text-sm font-bold">{user.points.toLocaleString()}</span>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-2">
                      <button className="w-7 h-7 rounded border border-white/10 flex items-center justify-center text-white/40 hover:text-g-blue hover:border-g-blue/30 transition-colors"><UserCog size={12} /></button>
                      <button className="w-7 h-7 rounded border border-white/10 flex items-center justify-center text-white/40 hover:text-g-red hover:border-g-red/30 transition-colors"><Trash2 size={12} /></button>
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
