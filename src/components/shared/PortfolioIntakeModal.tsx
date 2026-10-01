'use client';

import React, { useState } from 'react';
import { X, Upload, FileSpreadsheet, ArrowRight } from 'lucide-react';
import { useToast } from '../common/Toast';
import { useAppStore } from '@/lib/store';
import { SensitiveActionDialog } from '../common/SensitiveActionDialog';

export function PortfolioIntakeModal({ onClose }: { onClose: () => void }) {
  const { toast } = useToast();
  const addAuditEvent = useAppStore((s) => s.addAuditEvent);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedClient, setSelectedClient] = useState('CLI-VOLTA');
  const [portfolioName, setPortfolioName] = useState('Volta Q4 NPL Intake');
  const [fileName] = useState('volta_npl_q4_2026_intake.xlsx');
  const [showSensitiveDialog, setShowSensitiveDialog] = useState(false);

  const sampleRows = [
    { accountNo: 'ACC-9901', debtor: 'Kofi Mensah', amount: 'GHS 45,000', status: 'Valid' },
    { accountNo: 'ACC-9902', debtor: 'Abena Osei', amount: 'GHS 12,800', status: 'Valid' },
    { accountNo: 'ACC-9903', debtor: 'Kwame Nkrumah', amount: 'GHS 120,000', status: 'Warning: Missing Tax ID' },
  ];

  const handleConfirmIntake = () => {
    setShowSensitiveDialog(true);
  };

  const handleSensitiveConfirmed = (reason: string) => {
    setShowSensitiveDialog(false);
    toast(`Portfolio "${portfolioName}" intake completed. 450 accounts assigned to workflow.`, 'success');
    addAuditEvent({
      actor: 'Current User',
      actorRole: 'User',
      action: 'PORTFOLIO_INTAKE',
      objectType: 'PORTFOLIO',
      objectId: 'PORT-VOLTA-Q4',
      reason,
      after: `Imported portfolio "${portfolioName}" with 450 accounts`,
      ipDevice: '192.168.1.45',
      sourceChannel: 'Web Application'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Upload className="w-5 h-5 text-[#2563EB]" />
              Portfolio Intake Wizard
            </h2>
            <p className="text-xs text-slate-600">Step {step} of 3 — Upload, Validate &amp; Assign Debt Portfolio</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Select Client Entity</label>
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#2563EB]"
                >
                  <option value="CLI-VOLTA">Volta Bank Plc (GH)</option>
                  <option value="CLI-SAVANNAH">Savannah Telecom (KE)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Portfolio Name</label>
                <input
                  type="text"
                  value={portfolioName}
                  onChange={(e) => setPortfolioName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Upload Data File (.xlsx, .csv)</label>
                <div className="border-2 border-dashed border-slate-300 hover:border-[#2563EB] bg-slate-50 rounded-2xl p-6 text-center cursor-pointer transition-colors">
                  <FileSpreadsheet className="w-10 h-10 text-[#2563EB] mx-auto mb-2" />
                  <div className="text-xs font-bold text-slate-900">{fileName}</div>
                  <div className="text-[11px] text-slate-600 mt-1">450 account rows detected · 2.4 MB</div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-[#2563EB]/10 border border-[#2563EB]/30 rounded-xl text-xs text-[#2563EB]">
                <span className="font-semibold">Automated Schema Validation Complete</span>
                <span className="font-mono font-bold">449 Valid / 1 Warning</span>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-white text-slate-600 font-semibold">
                    <tr>
                      <th className="p-3">Acc #</th>
                      <th className="p-3">Debtor</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Validation Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono">
                    {sampleRows.map((r, i) => (
                      <tr key={i}>
                        <td className="p-3 text-slate-900">{r.accountNo}</td>
                        <td className="p-3">{r.debtor}</td>
                        <td className="p-3 text-slate-900">{r.amount}</td>
                        <td className="p-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                            r.status.startsWith('Valid') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-xs text-slate-700">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="font-bold text-slate-900 text-sm">Intake Summary Confirmation</div>
                <div className="flex justify-between border-b border-slate-200 py-1.5">
                  <span className="text-slate-600">Target Client</span>
                  <span className="font-semibold text-slate-900">Volta Bank Plc</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 py-1.5">
                  <span className="text-slate-600">Portfolio Name</span>
                  <span className="font-semibold text-slate-900">{portfolioName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 py-1.5">
                  <span className="text-slate-600">Total Accounts</span>
                  <span className="font-mono font-bold text-slate-900">450</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-600">Default Allocation Strategy</span>
                  <span className="font-semibold text-[#2563EB]">Round-Robin SLA (Tier 1 Officers)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
          <button
            onClick={() => setStep((s) => (s > 1 ? (s - 1) as 1 | 2 | 3 : 1))}
            disabled={step === 1}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 text-xs font-semibold rounded-xl"
          >
            Back
          </button>
          {step < 3 ? (
            <button
              onClick={() => setStep((s) => (s + 1) as 2 | 3)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-xl"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleConfirmIntake}
              className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-xl shadow-lg shadow-[#2563EB]/20"
            >
              Execute Portfolio Intake
            </button>
          )}
        </div>
      </div>

      {showSensitiveDialog && (
        <SensitiveActionDialog
          actionName="New Debt Portfolio Intake"
          summary={`Creating new portfolio "${portfolioName}" and allocating 450 debtor accounts.`}
          userLimit="Portfolio onboarding authority: Tier 2 Manager approval required for > $500k total volume"
          onConfirm={handleSensitiveConfirmed}
          onCancel={() => setShowSensitiveDialog(false)}
        />
      )}
    </div>
  );
}
