'use client';

import React, { useState } from 'react';
import { X, Scale, ArrowRight, Building2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Account } from '@/lib/types';
import { formatMoney } from '@/lib/mock-data';
import { useToast } from '../common/Toast';

interface SettlementWizardModalProps {
  account: Account;
  onClose: () => void;
}

export function SettlementWizardModal({ account, onClose }: SettlementWizardModalProps) {
  const { toast } = useToast();
  const proposeSettlement = useAppStore((s) => s.proposeSettlement);
  const clients = useAppStore((s) => s.clients);

  const [discountPct, setDiscountPct] = useState(30);
  const [_settlementType, _setSettlementType] = useState<'Lump sum' | 'Structured'>('Lump sum');
  const [_termsText, _setTermsText] = useState('Payment of settlement amount within 14 days');
  const [_step, _setStep] = useState(1);

  const outstandingMinor = account.balanceMinor;
  const settlementMinor = Math.round(outstandingMinor * (1 - discountPct / 100));
  const _discountMinor = outstandingMinor - settlementMinor;

  const client = clients.find((c) => c.name === account.clientName);
  const needsClientApproval = !!(client?.approvalOverlay && discountPct > 25);

  // Authority limits calculation
  const isOfficerLimit = discountPct <= 10;
  const isManagerLimit = discountPct <= 25;
  const isCooLimit = discountPct <= 40;

  let nextApprover = 'Recovery Manager';
  if (discountPct > 40) nextApprover = 'Executive (CEO / MD)';
  else if (discountPct > 25) nextApprover = 'COO / Operations';
  else if (discountPct > 10) nextApprover = 'Recovery Manager';
  else nextApprover = 'Recovery Officer (Auto-approved)';

  const handleSubmit = () => {
    const res = proposeSettlement({
      accountId: account.id,
      discountPct,
      type: settlementType,
      terms: termsText,
      conditions: ['Full & final release upon receipt', 'Default voids discount'],
      requestedBy: 'Ama Darko',
      userRole: 'Recovery Officer'
    });

    toast(`Settlement proposal ${res.settlementId} submitted — routed to ${res.routedTo}`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0E9F8E]/20 text-[#0E9F8E] flex items-center justify-center border border-[#0E9F8E]/30">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Propose Settlement</h2>
              <p className="text-xs text-slate-400">
                {account.debtorName} ({account.id})
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

        {/* Form Body */}
        <div className="p-6 space-y-6">
          {/* Discount Slider */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-300">Discount Percentage</span>
              <span className="text-xl font-extrabold text-[#0E9F8E] font-mono">{discountPct}%</span>
            </div>

            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={discountPct}
              onChange={(e) => setDiscountPct(parseInt(e.target.value))}
              className="w-full accent-[#0E9F8E] bg-slate-800 h-2 rounded-lg cursor-pointer"
            />

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  Original Balance
                </span>
                <span className="text-sm font-bold text-white font-mono">
                  {formatMoney(outstandingMinor, account.currency)}
                </span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-[#0E9F8E] uppercase font-semibold block">
                  Proposed Settlement
                </span>
                <span className="text-sm font-bold text-[#0E9F8E] font-mono">
                  {formatMoney(settlementMinor, account.currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Authority Chain Simulation Panel (G6 Matrix) */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Authority Routing Check (§7.5, §23.2)
            </span>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Recovery Officer (Up to 10%)</span>
                {isOfficerLimit ? (
                  <span className="text-emerald-400 font-semibold">✓ Within Limit</span>
                ) : (
                  <span className="text-rose-400 font-semibold">✗ Exceeds 10% limit</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Recovery Manager (Up to 25%)</span>
                {isManagerLimit ? (
                  <span className="text-emerald-400 font-semibold">✓ Within Limit</span>
                ) : (
                  <span className="text-rose-400 font-semibold">✗ Exceeds 25% limit</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">COO / Operations (Up to 40%)</span>
                {isCooLimit ? (
                  <span className="text-emerald-400 font-semibold">✓ Within Limit (COO)</span>
                ) : (
                  <span className="text-rose-400 font-semibold">Requires CEO Sign-off</span>
                )}
              </div>

              {needsClientApproval && (
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-amber-300 bg-amber-950/30 p-2 rounded-xl">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Building2 className="w-4 h-4" /> Client Approval Overlay ({account.clientName})
                  </span>
                  <span className="font-bold">Client Sign-off Required (&gt;25%)</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/60 border-t border-slate-800">
          <span className="text-xs text-slate-400">
            Will route to: <strong className="text-white">{nextApprover}</strong>
          </span>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#0E9F8E] hover:bg-[#0c8879] text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-[#0E9F8E]/20"
            >
              Submit Settlement Proposal
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
