'use client';

import React from 'react';
import { X, Clock, ShieldCheck } from 'lucide-react';
import { useAppStore } from '@/lib/store';

interface HistoryDrawerProps {
  recordId: string;
  recordType?: string;
  onClose: () => void;
}

export function HistoryDrawer({ recordId, recordType = 'Record', onClose }: HistoryDrawerProps) {
  const auditEvents = useAppStore((s) => s.auditEvents);

  const filteredEvents = auditEvents.filter(
    (ev) => ev.objectId === recordId || ev.objectId.includes(recordId)
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0E9F8E]/20 text-[#0E9F8E] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Audit history</h2>
              <p className="text-xs text-slate-400">
                Immutable audit trail for {recordType} <span className="font-mono text-emerald-400">{recordId}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <ShieldCheck className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No recorded audit events for this item yet.</p>
              <p className="text-xs mt-1 text-slate-600">All material changes leave an immutable record.</p>
            </div>
          ) : (
            filteredEvents.map((ev) => (
              <div
                key={ev.id}
                className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{ev.actor}</span>
                  <span className="text-slate-400 font-mono">
                    {new Date(ev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0E9F8E]/20 text-[#0E9F8E] border border-[#0E9F8E]/30 uppercase tracking-wide">
                    {ev.action}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{ev.actorRole}</span>
                </div>
                {ev.reason && (
                  <div className="text-xs text-amber-300 bg-amber-950/30 border border-amber-900/50 p-2 rounded-lg">
                    <strong>Reason code:</strong> {ev.reason}
                  </div>
                )}
                {ev.after && (
                  <div className="text-xs text-slate-300 bg-slate-900/90 p-2 rounded-lg font-mono break-all">
                    {ev.after}
                  </div>
                )}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-900">
                  <span>Channel: {ev.sourceChannel}</span>
                  <span className="font-mono">{ev.ipDevice}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex justify-between items-center text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4" /> Audit log immutable (§22.1)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
