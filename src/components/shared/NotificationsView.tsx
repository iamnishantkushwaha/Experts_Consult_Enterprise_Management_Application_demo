'use client';

import React from 'react';
import { Bell, Check, CheckCheck } from 'lucide-react';
import { useAppStore } from '@/lib/store';

interface NotificationsViewProps {
  onNavigateRecord?: (page: string, recordId?: string) => void;
}

export function NotificationsView({ onNavigateRecord }: NotificationsViewProps) {
  const notifications = useAppStore((s) => s.notifications);
  const currentRole = useAppStore((s) => s.currentRole);
  const markNotificationRead = useAppStore((s) => s.markNotificationRead);
  const markAllNotificationsRead = useAppStore((s) => s.markAllNotificationsRead);

  const roleNotifs = notifications.filter((n) => n.roleId === currentRole || true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-[#0E9F8E]" />
            Notifications & Alerts
          </h1>
          <p className="text-xs text-slate-400">System alerts, approval requests, and operational notifications.</p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
        >
          <CheckCheck className="w-4 h-4 text-[#0E9F8E]" />
          <span>Mark All as Read</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        {roleNotifs.map((n) => (
          <div
            key={n.id}
            onClick={() => {
              markNotificationRead(n.id);
              if (n.linkPage) onNavigateRecord?.(n.linkPage, n.linkRecordId);
            }}
            className={`p-4 rounded-xl border text-xs cursor-pointer transition-all flex items-start justify-between gap-4 ${
              n.read
                ? 'bg-slate-950/40 border-slate-800/80 text-slate-400'
                : 'bg-slate-950 border-slate-700 text-slate-200 shadow-md'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{n.title}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0E9F8E]/20 text-[#0E9F8E]">
                  {n.type}
                </span>
              </div>
              <p className="text-xs text-slate-400 italic">{n.preview}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[11px] text-slate-500 font-mono">{n.relativeTime}</span>
              {!n.read && <div className="w-2.5 h-2.5 rounded-full bg-[#0E9F8E]"></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
