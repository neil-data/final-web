'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { mockEvents } from '@/data/events';
import { getCategoryColor, getStatusColor, formatDateShort } from '@/lib/utils';
import { Plus, Edit2, Trash2, Eye, X, Calendar, MapPin, Users } from 'lucide-react';

export default function AdminEventsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Events Management</h1>
          <p className="text-white/40 text-sm font-mono mt-1">Create, edit, and manage all community events</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-skew bg-g-blue border border-g-blue text-white text-xs font-mono uppercase tracking-widest px-5 py-2.5 hover:bg-g-blue/80 transition-all flex items-center gap-2"
        >
          <span className="flex items-center gap-2"><Plus size={13} /> Create Event</span>
        </button>
      </div>

      {/* Events Table */}
      <GlassCard animate={false}>
        <div className="overflow-x-auto">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th className="text-left">Event</th>
                <th className="text-left hidden md:table-cell">Date</th>
                <th className="text-left hidden lg:table-cell">Category</th>
                <th className="text-left hidden sm:table-cell">Status</th>
                <th className="text-left hidden lg:table-cell">Registered</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockEvents.map((event, i) => (
                <motion.tr
                  key={event.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                        <Image src={event.banner} alt={event.title} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="text-sm text-white font-medium line-clamp-1 max-w-[200px]">{event.title}</div>
                        <div className="text-xs text-white/30 font-mono hidden sm:block">{event.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell">
                    <span className="text-white/60 text-xs font-mono">{formatDateShort(event.date)}</span>
                  </td>
                  <td className="hidden lg:table-cell">
                    <Badge variant={getCategoryColor(event.category)}>{event.category}</Badge>
                  </td>
                  <td className="hidden sm:table-cell">
                    <Badge variant={getStatusColor(event.status)}>{event.status.replace('-', ' ')}</Badge>
                  </td>
                  <td className="hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full w-20">
                        <div
                          className="h-full bg-g-blue rounded-full"
                          style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-white/40 font-mono">{event.registered}/{event.capacity}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-2">
                      <button className="w-7 h-7 rounded border border-white/10 flex items-center justify-center text-white/40 hover:text-g-blue hover:border-g-blue/30 transition-colors"><Eye size={12} /></button>
                      <button className="w-7 h-7 rounded border border-white/10 flex items-center justify-center text-white/40 hover:text-g-yellow hover:border-g-yellow/30 transition-colors"><Edit2 size={12} /></button>
                      <button className="w-7 h-7 rounded border border-white/10 flex items-center justify-center text-white/40 hover:text-g-red hover:border-g-red/30 transition-colors"><Trash2 size={12} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Create Event Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card rounded-2xl p-8 w-full max-w-lg"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-bold text-white text-lg">Create New Event</h2>
                <button onClick={() => setShowCreateModal(false)} className="text-white/40 hover:text-white"><X size={16} /></button>
              </div>
              <form onSubmit={e => e.preventDefault()} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Event Title</label>
                  <input className="form-input" placeholder="e.g., Google Cloud Study Jam" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Date</label>
                    <input type="date" className="form-input" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Category</label>
                    <select className="form-input">
                      <option className="bg-dark-card">hackathon</option>
                      <option className="bg-dark-card">workshop</option>
                      <option className="bg-dark-card">talk</option>
                      <option className="bg-dark-card">bootcamp</option>
                      <option className="bg-dark-card">community</option>
                      <option className="bg-dark-card">webinar</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Location</label>
                  <input className="form-input" placeholder="IAR Auditorium / Virtual" />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Description</label>
                  <textarea className="form-input resize-none" rows={3} placeholder="Event description..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Capacity</label>
                    <input type="number" className="form-input" defaultValue={100} />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Status</label>
                    <select className="form-input">
                      <option className="bg-dark-card">upcoming</option>
                      <option className="bg-dark-card">registration-open</option>
                      <option className="bg-dark-card">live</option>
                      <option className="bg-dark-card">completed</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="btn-skew flex-1 bg-g-blue border border-g-blue text-white text-xs font-mono uppercase tracking-widest py-3 hover:bg-g-blue/80 transition-all text-center">
                    <span>Create Event</span>
                  </button>
                  <button type="button" onClick={() => setShowCreateModal(false)} className="btn-skew flex-1 bg-transparent border border-white/15 text-white/60 text-xs font-mono uppercase tracking-widest py-3 hover:border-white/30 transition-all text-center">
                    <span>Cancel</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
