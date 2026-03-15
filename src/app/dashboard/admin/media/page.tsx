'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockMedia } from '@/data/media';
import { Upload, Trash2, Camera } from 'lucide-react';

export default function AdminMediaPage() {
  const [items, setItems] = useState(mockMedia);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Media Management</h1>
          <p className="text-white/40 text-sm font-mono mt-1">Upload and manage event photos and videos</p>
        </div>
        <button className="btn-skew bg-g-green border border-g-green text-white text-xs font-mono uppercase tracking-widest px-5 py-2.5 hover:bg-g-green/80 transition-all flex items-center gap-2">
          <span className="flex items-center gap-2"><Upload size={13} /> Upload Media</span>
        </button>
      </div>

      {/* Upload zone */}
      <GlassCard animate={false} className="mb-8 text-center py-12 border-dashed border-white/15 hover:border-g-green/30 transition-colors cursor-pointer">
        <Upload size={32} className="text-white/20 mx-auto mb-3" />
        <div className="text-white/40 text-sm font-mono">Drag & drop files here or click to browse</div>
        <div className="text-white/20 text-xs font-mono mt-1">Supports: JPG, PNG, MP4, MOV (max 50MB)</div>
      </GlassCard>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            className="relative group"
          >
            <div className="relative rounded-xl overflow-hidden border border-white/5 bg-dark-card">
              <Image src={item.thumbnail} alt={item.title} width={300} height={200} className="w-full object-cover h-36 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-dark-bg/0 group-hover:bg-dark-bg/60 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-8 h-8 rounded-lg glass-card flex items-center justify-center text-white/70 hover:text-white"><Camera size={14} /></button>
                <button
                  onClick={() => setItems(prev => prev.filter(m => m.id !== item.id))}
                  className="w-8 h-8 rounded-lg glass-card flex items-center justify-center text-white/70 hover:text-g-red"
                ><Trash2 size={14} /></button>
              </div>
            </div>
            <div className="mt-1.5 px-1">
              <div className="text-xs text-white/60 truncate">{item.title}</div>
              <div className="text-[10px] text-white/25 font-mono">{item.category} · {item.date}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
