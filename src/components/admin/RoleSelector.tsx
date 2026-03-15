'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { AdminRole } from '@/types';
import { AVAILABLE_ROLES, getRoleDescription } from '@/lib/rolePermissions';
import { useAdminAuth } from '@/context/AdminAuthContext';

export default function RoleSelector() {
  const { currentRole, setCurrentRole } = useAdminAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 bg-g-red/10 border border-g-red/20 rounded-lg px-3 py-2 hover:bg-g-red/15 transition-colors"
      >
        <div className="text-left">
          <div className="text-xs text-white font-semibold capitalize">{currentRole} Access</div>
          <div className="text-[10px] text-white/30 font-mono">Switch role</div>
        </div>
        <ChevronDown size={14} className={`text-g-red transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden"
          >
            <div className="p-2 space-y-1 max-h-96 overflow-y-auto">
              {AVAILABLE_ROLES.map(role => (
                <button
                  key={role}
                  onClick={() => {
                    setCurrentRole(role);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded transition-colors text-sm ${
                    currentRole === role
                      ? 'bg-g-red/20 border border-g-red/40 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold capitalize">{role}</div>
                      <div className="text-[11px] text-white/40 mt-0.5">{getRoleDescription(role).substring(0, 40)}...</div>
                    </div>
                    {currentRole === role && <Check size={14} className="text-g-red flex-shrink-0" />}
                  </div>
                </button>
              ))}
            </div>
            <div className="border-t border-white/5 p-2 bg-white/[0.02] text-[10px] text-white/30 font-mono">
              💡 Switch roles to test different access levels
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
