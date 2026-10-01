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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-[#0E9F8E]" />
              Portfolio Intake Wizard
            </h2>
            <p className="text-xs text-slate-400">Step {step} of 3 — Upload, Validate &amp; Assign Debt Portfolio</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Select Client Entity</label>
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:ring-2 focus:ring-[#0E9F8E]"
                >
                  <option value="CLI-VOLTA">Volta Bank Plc (GH)</option>
                  <option value="CLI-SAVANNAH">Savannah Telecom (KE)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Portfolio Name</label>
                <input
                  type="text"
                  value={portfolioName}
                  onChange={(e) => setPortfolioName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:ring-2 focus:ring-[#0E9F8E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Upload Data File (.xlsx, .csv)</label>
                <div className="border-2 border-dashed border-slate-700 hover:border-[#0E9F8E] bg-slate-950 rounded-2xl p-6 text-center cursor-pointer transition-colors">
                  <FileSpreadsheet className="w-10 h-10 text-[#0E9F8E] mx-auto mb-2" />
                  <div className="text-xs font-bold text-white">{fileName}</div>
                  <div className="text-[11px] text-slate-400 mt-1">450 account rows detected · 2.4 MB</div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-[#0E9F8E]/10 border border-[#0E9F8E]/30 rounded-xl text-xs text-[#0E9F8E]">
                <span className="font-semibold">Automated Schema Validation Complete</span>
                <span className="font-mono font-bold">449 Valid / 1 Warning</span>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 font-semibold">
                    <tr>
                      <th className="p-3">Acc #</th>
                      <th className="p-3">Debtor</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Validation Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono">
                    {sampleRows.map((r, i) => (
                      <tr key={i}>
                        <td className="p-3 text-white">{r.accountNo}</td>
                        <td className="p-3">{r.debtor}</td>
                        <td className="p-3 text-white">{r.amount}</td>
                        <td className="p-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                            r.status.startsWith('Valid') ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-amber-950 text-amber-300 border-amber-800'
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
            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="font-bold text-white text-sm">Intake Summary Confirmation</div>
                <div className="flex justify-between border-b border-slate-800 py-1.5">
                  <span className="text-slate-400">Target Client</span>
                  <span className="font-semibold text-white">Volta Bank Plc</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 py-1.5">
                  <span className="text-slate-400">Portfolio Name</span>
                  <span className="font-semibold text-white">{portfolioName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 py-1.5">
                  <span className="text-slate-400">Total Accounts</span>
                  <span className="font-mono font-bold text-white">450</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Default Allocation Strategy</span>
                  <span className="font-semibold text-[#0E9F8E]">Round-Robin SLA (Tier 1 Officers)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-between items-center">
          <button
            onClick={() => setStep((s) => (s > 1 ? (s - 1) as 1 | 2 | 3 : 1))}
            disabled={step === 1}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 text-xs font-semibold rounded-xl"
          >
            Back
          </button>
          {step < 3 ? (
            <button
              onClick={() => setStep((s) => (s + 1) as 2 | 3)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#0E9F8E] hover:bg-[#0c8879] text-white text-xs font-semibold rounded-xl"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleConfirmIntake}
              className="px-4 py-2 bg-[#0E9F8E] hover:bg-[#0c8879] text-white text-xs font-semibold rounded-xl shadow-lg shadow-[#0E9F8E]/20"
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
