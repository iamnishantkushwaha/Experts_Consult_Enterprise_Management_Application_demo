'use client';

import React, { useState } from 'react';
import { AlertOctagon, X, AlertTriangle, ShieldCheck } from 'lucide-react';

interface SensitiveActionDialogProps {
  actionName: string;
  summary: string;
  userLimit?: string;
  isExceeded?: boolean;
  nextApprover?: string;
  onConfirm: (reason: string) => void;
  onRouteApproval?: () => void;
  onCancel: () => void;
}

export function SensitiveActionDialog({
  actionName,
  summary,
  userLimit,
  isExceeded = false,
  nextApprover,
  onConfirm,
  onRouteApproval,
  onCancel
}: SensitiveActionDialogProps) {
  const [reason, setReason] = useState('');
  const [confirmedAuthority, setConfirmedAuthority] = useState(false);

  const isValid = reason.trim().length >= 10 && confirmedAuthority;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-50/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-600 flex items-center justify-center border border-rose-500/30">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">{actionName}</h2>
              <p className="text-xs text-slate-600">Sensitive Action Confirmation (§13.4)</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs text-slate-700">
            <div className="font-semibold text-slate-800">Action Summary</div>
            <p className="leading-relaxed">{summary}</p>
            {userLimit && (
              <div className="pt-2 border-t border-slate-200 text-slate-600">
                <strong>Delegated Authority Limit:</strong> {userLimit}
              </div>
            )}
          </div>

          {/* Exceeded Banner */}
          {isExceeded ? (
            <div className="bg-rose-50/40 border border-rose-200/80 rounded-xl p-4 space-y-3">
              <div className="flex items-start gap-3 text-rose-200 text-xs">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-rose-700 text-sm block mb-1">
                    Exceeds your delegated authority
                  </strong>
                  This action exceeds your approval threshold ({userLimit}). Route this request to{' '}
                  <strong className="text-slate-900">{nextApprover || 'Next Approver'}</strong> for review.
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={onRouteApproval}
                  className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-xl transition-colors shadow-lg shadow-rose-600/20"
                >
                  Route for Approval →
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  <span>
                    Reason & Justification <span className="text-rose-600">*</span>
                  </span>
                  <span className="text-slate-600 text-[11px]">
                    {reason.length} / min 10 chars
                  </span>
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Provide detailed business justification for this action (min 10 characters)..."
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 placeholder:text-slate-600"
                />
              </div>

              <label className="flex items-start gap-3 p-3 bg-slate-50/60 border border-slate-200 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmedAuthority}
                  onChange={(e) => setConfirmedAuthority(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 bg-white text-[#2563EB] focus:ring-0"
                />
                <span className="text-xs text-slate-700 leading-snug">
                  I confirm this action is within my delegated authority and complies with Experts Consult regulatory policies.
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isExceeded && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50/60 border-t border-slate-200">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={!isValid}
              onClick={() => onConfirm(reason)}
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors shadow-lg shadow-rose-600/20"
            >
              <ShieldCheck className="w-4 h-4" />
              Confirm Action
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
