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
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-50/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#2563EB]/20 text-[#2563EB] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Audit history</h2>
              <p className="text-xs text-slate-600">
                Immutable audit trail for {recordType} <span className="font-mono text-emerald-600">{recordId}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
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
                className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 space-y-2 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{ev.actor}</span>
                  <span className="text-slate-600 font-mono">
                    {new Date(ev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#2563EB]/20 text-[#2563EB] border border-[#2563EB]/30 uppercase tracking-wide">
                    {ev.action}
                  </span>
                  <span className="text-xs text-slate-600 font-medium">{ev.actorRole}</span>
                </div>
                {ev.reason && (
                  <div className="text-xs text-amber-700 bg-amber-50/30 border border-amber-900/50 p-2 rounded-lg">
                    <strong>Reason code:</strong> {ev.reason}
                  </div>
                )}
                {ev.after && (
                  <div className="text-xs text-slate-700 bg-white/90 p-2 rounded-lg font-mono break-all">
                    {ev.after}
                  </div>
                )}
                <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-900">
                  <span>Channel: {ev.sourceChannel}</span>
                  <span className="font-mono">{ev.ipDevice}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex justify-between items-center text-xs text-slate-600">
          <span className="flex items-center gap-1.5 text-emerald-600">
            <ShieldCheck className="w-4 h-4" /> Audit log immutable (§22.1)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
