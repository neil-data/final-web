'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminRole } from '@/types';

interface AdminAuthContextType {
  currentRole: AdminRole;
  setCurrentRole: (role: AdminRole) => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<AdminRole>('leader');

  useEffect(() => {
    const savedRole = localStorage.getItem('adminRole') as AdminRole | null;
    if (savedRole) {
      setCurrentRole(savedRole);
    }
  }, []);

  const handleSetRole = (role: AdminRole) => {
    setCurrentRole(role);
    localStorage.setItem('adminRole', role);
  };

  return (
    <AdminAuthContext.Provider value={{ currentRole, setCurrentRole: handleSetRole }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
