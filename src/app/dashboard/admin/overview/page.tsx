'use client';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockEvents } from '@/data/events';
import { mockLeaderboard } from '@/data/leaderboard';
import { mockAnnouncements } from '@/data/media';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Users, Calendar, TrendingUp, Trophy, Activity, Zap } from 'lucide-react';

const analyticsData = [
  { month: 'Sep', members: 180, events: 3, registrations: 240 },
  { month: 'Oct', members: 245, events: 5, registrations: 380 },
  { month: 'Nov', members: 310, events: 4, registrations: 420 },
  { month: 'Dec', members: 370, events: 6, registrations: 510 },
  { month: 'Jan', members: 420, events: 3, registrations: 290 },
  { month: 'Feb', members: 465, events: 5, registrations: 680 },
  { month: 'Mar', members: 500, events: 4, registrations: 350 },
];

const recentActivity = [
  { action: 'New registration', detail: 'Vikram Tiwari → HackIAR 2025', time: '2 min ago', color: 'text-g-green' },
  { action: 'Event published', detail: 'Flutter Forward webinar is now live', time: '1 hr ago', color: 'text-g-blue' },
  { action: 'Points adjusted', detail: '+100 pts added to Kavya Reddy', time: '3 hr ago', color: 'text-g-yellow' },
  { action: 'New member', detail: 'Priya Singh joined the community', time: '5 hr ago', color: 'text-g-green' },
  { action: 'Announcement', detail: 'Cloud Badges campaign posted', time: '1 day ago', color: 'text-g-red' },
];

const TOOLTIP_STYLE = { background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#fff', fontSize: '12px' };

export default function AdminOverviewPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-white">Admin Overview</h1>
        <p className="text-white/40 text-sm font-mono mt-1">Community health at a glance</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: <Users size={18} className="text-g-blue" />, label: 'Total Members', value: '500+', change: '+12%', color: 'text-g-blue' },
          { icon: <Calendar size={18} className="text-g-green" />, label: 'Total Events', value: mockEvents.length.toString(), change: '+3 this month', color: 'text-g-green' },
          { icon: <Zap size={18} className="text-g-yellow" />, label: 'Active Registrations', value: '875', change: 'This month', color: 'text-g-yellow' },
          { icon: <Trophy size={18} className="text-g-red" />, label: 'Leaderboard Pts (Total)', value: '62K+', change: 'All time', color: 'text-g-red' },
        ].map(({ icon, label, value, change, color }, i) => (
          <GlassCard key={i} animate={false} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">{icon}</div>
              <span className="text-[10px] font-mono text-white/30">{change}</span>
            </div>
            <div className={`font-bold text-2xl ${color}`}>{value}</div>
            <div className="text-white/40 text-xs font-mono uppercase tracking-widest">{label}</div>
          </GlassCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <div className="lg:col-span-2">
          <GlassCard animate={false}>
            <h2 className="section-number mb-4">Community Growth</h2>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4285F4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4285F4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Area type="monotone" dataKey="members" stroke="#4285F4" strokeWidth={2} fill="url(#colorMembers)" name="Members" />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        {/* Recent Activity */}
        <GlassCard animate={false}>
          <h2 className="section-number mb-4 flex items-center gap-2"><Activity size={13} /> Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-g-blue" />
                <div>
                  <div className={`text-xs font-mono ${item.color}`}>{item.action}</div>
                  <div className="text-white/60 text-xs">{item.detail}</div>
                  <div className="text-white/25 text-[10px] font-mono">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Registrations bar chart */}
      <div className="mt-6">
        <GlassCard animate={false}>
          <h2 className="section-number mb-4">Event Registrations by Month</h2>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={analyticsData}>
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="registrations" fill="#34A853" radius={[4, 4, 0, 0]} name="Registrations" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
}
