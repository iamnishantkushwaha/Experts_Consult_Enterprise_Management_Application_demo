'use client';

import React, { useState } from 'react';
import { Eye, ShieldAlert, X } from 'lucide-react';
import { useToast } from './Toast';
import { useAppStore } from '@/lib/store';

interface RevealModalProps {
  debtorId: string;
  debtorName: string;
  fieldLabel: string;
  onClose: () => void;
}

export function RevealModal({ debtorId, debtorName, fieldLabel, onClose }: RevealModalProps) {
  const { toast } = useToast();
  const revealPII = useAppStore((s) => s.revealPII);

  const [reason, setReason] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const reasons = [
    'Verify identity',
    'Contact attempt',
    'Dispute handling',
    'Legal pack preparation'
  ];

  const handleConfirm = () => {
    if (!reason) return;
    revealPII(debtorId, fieldLabel.toLowerCase(), reason, note);
    toast(`Personal data unmasked (${fieldLabel}) — access logged`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Reveal personal data</h2>
              <p className="text-xs text-slate-400">
                {fieldLabel} for <span className="text-slate-200 font-medium">{debtorName}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <div className="bg-amber-950/30 border border-amber-800/50 rounded-xl p-3 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200/90 leading-relaxed">
              Access to personal identifying information (PII) is monitored per §4.1. Selecting a reason logs an explicit immutable audit record.
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Reason <span className="text-rose-400">*</span>
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0E9F8E]"
            >
              <option value="">Select a reason code...</option>
              {reasons.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Note (optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Additional justification context..."
              rows={3}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0E9F8E] placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-950/60 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={!reason}
            onClick={handleConfirm}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#0E9F8E] hover:bg-[#0c8879] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors shadow-lg shadow-[#0E9F8E]/20"
          >
            Confirm & Log Access
          </button>
        </div>
      </div>
    </div>
  );
}
