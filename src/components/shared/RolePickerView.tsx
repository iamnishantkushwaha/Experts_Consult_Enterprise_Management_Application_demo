'use client';

import React from 'react';
import { Shield } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { ROLE_CONFIGS } from '@/lib/mock-data';
import { RoleId } from '@/lib/types';

interface RolePickerViewProps {
  onNavigate: (view: string, data?: Record<string, unknown>) => void;
}

export function RolePickerView({ onNavigate }: RolePickerViewProps) {
  const switchRole = useAppStore((s) => s.switchRole);

  const handleRoleSelect = (roleId: string) => {
    switchRole(roleId as RoleId);
    onNavigate('dashboard'); // Shell will redirect to the appropriate dashboard
  };

  return (
    <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#0E9F8E]/20 text-[#0E9F8E] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Select Your Role</h1>
          <p className="text-slate-400">Choose a persona to explore the Experts Consult platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ROLE_CONFIGS.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className="flex flex-col p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-[#0E9F8E]/50 hover:bg-slate-800 transition-all text-left group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 group-hover:bg-[#0E9F8E] text-[#0E9F8E] group-hover:text-white flex items-center justify-center text-xl font-bold transition-colors">
                  {role.avatarInitials}
                </div>
                <div>
                  <h3 className="font-bold text-white">{role.personName}</h3>
                  <div className="text-xs text-slate-400">{role.name}</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed flex-1">
                Experience the platform with {role.name.toLowerCase()} permissions and typical workflows.
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
