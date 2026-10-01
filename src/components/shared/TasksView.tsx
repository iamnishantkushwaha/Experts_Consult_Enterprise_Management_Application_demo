'use client';

import React from 'react';
import { FileCheck } from 'lucide-react';

export function TasksView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const tasks = [
    { id: 'TSK-1', text: 'Call Kofi Mensah — promise follow-up', due: '10:00 AM', priority: 'High', status: 'Pending', account: 'ACC-100231' },
    { id: 'TSK-2', text: 'Send plan reminder to Adwoa Trading', due: '12:00 PM', priority: 'Medium', status: 'Pending', account: 'ACC-100232' },
    { id: 'TSK-3', text: 'Collect proof of debt for ACC-100377', due: '04:00 PM', priority: 'High', status: 'Pending', account: 'ACC-100377' },
    { id: 'TSK-4', text: 'Log skip tracing findings for Esi Owusu', due: '05:30 PM', priority: 'Low', status: 'Completed', account: 'ACC-100378' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <FileCheck className="w-6 h-6 text-[#0E9F8E]" />
          My Scheduled Tasks &amp; Action Items
        </h1>
        <p className="text-xs text-slate-400">Daily outreach agenda, follow-up calls, reminder tasks, and document requests.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl p-6">
        <div className="space-y-3">
          {tasks.map(t => (
            <div key={t.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input type="checkbox" defaultChecked={t.status === 'Completed'} className="accent-[#0E9F8E] w-4 h-4 rounded" />
                <div>
                  <div className={`text-xs font-bold ${t.status === 'Completed' ? 'line-through text-slate-500' : 'text-white'}`}>{t.text}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 font-mono">Due: {t.due} · Priority: <span className="text-amber-400 font-semibold">{t.priority}</span></div>
                </div>
              </div>
              <button onClick={() => onNavigate?.('account_detail', { id: t.account })} className="text-[#0E9F8E] hover:underline text-xs font-semibold">
                Open →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
