'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function AvailabilityView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const users = useAppStore((s) => s.users);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Calendar className="w-6 h-6 text-[#0E9F8E]" />
          Staff Availability &amp; Leave Roster
        </h1>
        <p className="text-xs text-slate-400">Shift schedules, leave calendars, out-of-office coverage, and auto-reallocation rules.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl p-6">
        <div className="space-y-3">
          {users.map(u => (
            <div key={u.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-xs">{u.name} <span className="text-slate-400 font-normal">({u.roleTitle})</span></div>
                <div className="text-[11px] text-slate-400 mt-0.5">Team: {u.team} · Country: <span className="text-slate-200">{u.country}</span></div>
              </div>
              <span className={`px-2.5 py-1 rounded text-[10px] font-bold border ${u.status === 'Active' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-amber-950 text-amber-300 border-amber-800'}`}>
                {u.status === 'Active' ? 'Available' : 'On Leave'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
