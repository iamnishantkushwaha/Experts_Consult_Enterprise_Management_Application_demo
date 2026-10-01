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
  const [settlementType, setSettlementType] = useState<'Lump sum' | 'Structured'>('Lump sum');
  const [termsText, setTermsText] = useState('Payment of settlement amount within 14 days');
  const [step, setStep] = useState(1);

  const outstandingMinor = account.balanceMinor;
  const settlementMinor = Math.round(outstandingMinor * (1 - discountPct / 100));
  const discountMinor = outstandingMinor - settlementMinor;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-50/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2563EB]/20 text-[#2563EB] flex items-center justify-center border border-[#2563EB]/30">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Propose Settlement</h2>
              <p className="text-xs text-slate-600">
                {account.debtorName} ({account.id})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6">
          {/* Discount Slider */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700">Discount Percentage</span>
              <span className="text-xl font-extrabold text-[#2563EB] font-mono">{discountPct}%</span>
            </div>

            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={discountPct}
              onChange={(e) => setDiscountPct(parseInt(e.target.value))}
              className="w-full accent-[#2563EB] bg-slate-100 h-2 rounded-lg cursor-pointer"
            />

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-600 uppercase font-semibold block">
                  Original Balance
                </span>
                <span className="text-sm font-bold text-slate-900 font-mono">
                  {formatMoney(outstandingMinor, account.currency)}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-[#2563EB] uppercase font-semibold block">
                  Proposed Settlement
                </span>
                <span className="text-sm font-bold text-[#2563EB] font-mono">
                  {formatMoney(settlementMinor, account.currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Authority Chain Simulation Panel (G6 Matrix) */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Authority Routing Check (§7.5, §23.2)
            </span>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Recovery Officer (Up to 10%)</span>
                {isOfficerLimit ? (
                  <span className="text-emerald-600 font-semibold">✓ Within Limit</span>
                ) : (
                  <span className="text-rose-600 font-semibold">✗ Exceeds 10% limit</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600">Recovery Manager (Up to 25%)</span>
                {isManagerLimit ? (
                  <span className="text-emerald-600 font-semibold">✓ Within Limit</span>
                ) : (
                  <span className="text-rose-600 font-semibold">✗ Exceeds 25% limit</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600">COO / Operations (Up to 40%)</span>
                {isCooLimit ? (
                  <span className="text-emerald-600 font-semibold">✓ Within Limit (COO)</span>
                ) : (
                  <span className="text-rose-600 font-semibold">Requires CEO Sign-off</span>
                )}
              </div>

              {needsClientApproval && (
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-amber-700 bg-amber-50/30 p-2 rounded-xl">
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
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50/60 border-t border-slate-200">
          <span className="text-xs text-slate-600">
            Will route to: <strong className="text-slate-900">{nextApprover}</strong>
          </span>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-[#2563EB]/20"
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
