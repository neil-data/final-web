"use client";

import { useEffect, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';

const MAINTENANCE_KEY = 'gdgoc-maintenance-mode';

export default function AdminSettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  useEffect(() => {
    const current = window.localStorage.getItem(MAINTENANCE_KEY) === 'on';
    setMaintenanceMode(current);
  }, []);

  const updateMaintenanceMode = (enabled: boolean) => {
    setMaintenanceMode(enabled);
    window.localStorage.setItem(MAINTENANCE_KEY, enabled ? 'on' : 'off');
    window.dispatchEvent(new Event('maintenance-mode-changed'));
  };

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-white">Settings</h1>
        <p className="text-white/40 text-sm font-mono mt-1">Platform and chapter configuration</p>
      </div>

      <div className="space-y-6">
        {/* General */}
        <GlassCard animate={false}>
          <h2 className="section-number mb-5">General Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Chapter Name</label>
              <input defaultValue="GDGOC IAR" className="form-input" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Chapter Email</label>
              <input defaultValue="gdgoc@iar.ac.in" className="form-input" type="email" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Institution</label>
              <input defaultValue="Institute of Advanced Research, Gandhinagar" className="form-input" />
            </div>
          </div>
        </GlassCard>

        {/* Leaderboard */}
        <GlassCard animate={false}>
          <h2 className="section-number mb-5">Leaderboard Configuration</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Pts per Event Attended</label>
                <input type="number" defaultValue={50} className="form-input" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Pts for Speaking</label>
                <input type="number" defaultValue={200} className="form-input" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Pts for Organizing</label>
                <input type="number" defaultValue={150} className="form-input" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Pts for Hackathon Win</label>
                <input type="number" defaultValue={500} className="form-input" />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Social */}
        <GlassCard animate={false}>
          <h2 className="section-number mb-5">Social Links</h2>
          <div className="space-y-3">
            {['GitHub', 'LinkedIn', 'Instagram', 'Twitter', 'YouTube'].map(platform => (
              <div key={platform}>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-1">{platform}</label>
                <input className="form-input" placeholder={`https://${platform.toLowerCase()}.com/gdgoc-iar`} />
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Maintenance */}
        <GlassCard animate={false}>
          <h2 className="section-number mb-5">Maintenance Mode</h2>
          <p className="text-white/45 text-sm mb-5">
            Turn this on to temporarily show a maintenance page to public and student routes.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => updateMaintenanceMode(true)}
              className={`btn-skew text-xs font-mono uppercase tracking-widest px-6 py-2.5 transition-all ${
                maintenanceMode
                  ? 'bg-g-red border border-g-red text-white'
                  : 'bg-transparent border border-white/15 text-white/60 hover:border-white/30'
              }`}
            >
              <span>ON</span>
            </button>
            <button
              type="button"
              onClick={() => updateMaintenanceMode(false)}
              className={`btn-skew text-xs font-mono uppercase tracking-widest px-6 py-2.5 transition-all ${
                !maintenanceMode
                  ? 'bg-g-green border border-g-green text-white'
                  : 'bg-transparent border border-white/15 text-white/60 hover:border-white/30'
              }`}
            >
              <span>OFF</span>
            </button>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest mt-4 text-white/35">
            Current Status: {maintenanceMode ? 'ON' : 'OFF'}
          </p>
        </GlassCard>

        <div className="flex gap-3">
          <button className="btn-skew bg-g-blue border border-g-blue text-white text-xs font-mono uppercase tracking-widest px-6 py-2.5 hover:bg-g-blue/80 transition-all">
            <span>Save All Settings</span>
          </button>
          <button className="btn-skew bg-transparent border border-white/15 text-white/60 text-xs font-mono uppercase tracking-widest px-6 py-2.5 hover:border-white/30 transition-all">
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
}
