'use client';
import { useEffect, useMemo, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { fetchAnalyticsSummary } from '@/lib/module5Api';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const growthData = [
  { month: 'Sep', members: 180 }, { month: 'Oct', members: 245 },
  { month: 'Nov', members: 310 }, { month: 'Dec', members: 370 },
  { month: 'Jan', members: 420 }, { month: 'Feb', members: 465 },
  { month: 'Mar', members: 500 },
];

const participationData = [
  { event: 'HackIAR', participants: 218 },
  { event: 'Cloud SJ', participants: 89 },
  { event: 'Android BC', participants: 54 },
  { event: 'AI Summit', participants: 400 },
  { event: 'Flutter FW', participants: 312 },
  { event: 'OSS Day', participants: 43 },
];

const TOOLTIP_STYLE = { background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#fff', fontSize: '12px' };

export default function AdminAnalyticsPage() {
  const [summary, setSummary] = useState({
    totalUsers: 0,
    totalEvents: 0,
    totalRegistrations: 0,
    openQueries: 0,
    eventsByCategory: {} as Record<string, number>,
  });

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const data = await fetchAnalyticsSummary();
        if (active) setSummary(data);
      } catch {
        if (!active) return;
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const categoryData = useMemo(() => {
    const entries = Object.entries(summary.eventsByCategory || {});
    const total = entries.reduce((sum, [, value]) => sum + Number(value), 0) || 1;
    const palette = ['#EA4335', '#4285F4', '#FBBC05', '#34A853', '#9b59b6', '#22d3ee'];

    return entries.map(([name, value], index) => ({
      name,
      value: Math.round((Number(value) / total) * 100),
      color: palette[index % palette.length],
    }));
  }, [summary.eventsByCategory]);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-white">Analytics</h1>
        <p className="text-white/40 text-sm font-mono mt-1">Community growth and event participation insights</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Users', value: summary.totalUsers },
          { label: 'Events', value: summary.totalEvents },
          { label: 'Registrations', value: summary.totalRegistrations },
          { label: 'Open Queries', value: summary.openQueries },
        ].map(item => (
          <GlassCard key={item.label} animate={false} className="text-center p-4">
            <div className="text-xl text-g-blue font-bold">{item.value}</div>
            <div className="text-[10px] uppercase font-mono text-white/35 mt-1">{item.label}</div>
          </GlassCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Growth */}
        <div className="lg:col-span-2">
          <GlassCard animate={false}>
            <h2 className="section-number mb-4">Member Growth (Sep–Mar)</h2>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4285F4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4285F4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Area type="monotone" dataKey="members" stroke="#4285F4" strokeWidth={2} fill="url(#gradBlue)" name="Members" />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        {/* Category Pie */}
        <GlassCard animate={false}>
          <h2 className="section-number mb-4">Events by Category</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-1.5 mt-2">
            {categoryData.map(({ name, color, value }) => (
              <div key={name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} /><span className="text-white/50">{name}</span></div>
                <span className="text-white/70 font-mono">{value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Participation */}
      <GlassCard animate={false}>
        <h2 className="section-number mb-4">Event Participation</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={participationData}>
            <XAxis dataKey="event" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Bar dataKey="participants" radius={[4, 4, 0, 0]} name="Participants">
              {participationData.map((_, i) => (
                <Cell key={i} fill={['#4285F4', '#34A853', '#FBBC05', '#EA4335', '#4285F4', '#34A853'][i % 6]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  );
}
