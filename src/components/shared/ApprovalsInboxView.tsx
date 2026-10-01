'use client';

import React, { useState } from 'react';
import { CheckSquare } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Approval } from '@/lib/types';
import { formatMoney } from '@/lib/mock-data';
import { useToast } from '../common/Toast';
import { SensitiveActionDialog } from '../common/SensitiveActionDialog';

export function ApprovalsInboxView() {
  const { toast } = useToast();

  const approvals = useAppStore((s) => s.approvals);
  const currentRole = useAppStore((s) => s.currentRole);
  const approveApprovalItem = useAppStore((s) => s.approveApprovalItem);
  const rejectApprovalItem = useAppStore((s) => s.rejectApprovalItem);
  const escalateApprovalItem = useAppStore((s) => s.escalateApprovalItem);

  const [activeTab, setActiveTab] = useState<'pending' | 'submitted' | 'decided'>('pending');
  const [selectedApproval, setSelectedApproval] = useState<Approval | null>(null);
  const [showSensitiveModal, setShowSensitiveModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  // User role name lookup
  const roleName = currentRole === 'executive' ? 'Executive (CEO / MD)' : currentRole === 'cfo' ? 'CFO / Finance' : currentRole === 'coo' ? 'COO / Operations' : 'Recovery Manager';

  // Filter items
  const filteredApprovals = approvals.filter((a) => {
    if (activeTab === 'pending') {
      return a.decision === 'Pending' && (a.approverRole.toLowerCase().includes(currentRole) || currentRole === 'executive' || currentRole === 'coo' || currentRole === 'cfo' || currentRole === 'recovery_manager');
    } else if (activeTab === 'decided') {
      return a.decision !== 'Pending';
    }
    return true;
  });

  const handleApproveClick = (app: Approval) => {
    // Authority limit check
    // If settlement SET-0412 at 30% discount and role is Manager (limit 25%), Approve is disabled!
    if (currentRole === 'recovery_manager' && app.thresholdLabel.includes('30%')) {
      toast('Above your limit (25%) — COO / Operations must approve', 'error');
      return;
    }
    setSelectedApproval(app);
    setShowSensitiveModal(true);
  };

  const handleConfirmApprove = (reason: string) => {
    if (!selectedApproval) return;
    approveApprovalItem(selectedApproval.id, roleName, 'Current User', reason);
    toast(`Approved ${selectedApproval.objectTitle}`, 'success');
    setShowSensitiveModal(false);
    setSelectedApproval(null);
  };

  const handleEscalateClick = (app: Approval) => {
    escalateApprovalItem(app.id, roleName, 'Current User');
    toast(`Escalated ${app.objectId} to next authority level`, 'info');
    setSelectedApproval(null);
  };

  const handleRejectSubmit = () => {
    if (!selectedApproval || !rejectReason) return;
    rejectApprovalItem(selectedApproval.id, roleName, 'Current User', rejectReason);
    toast(`Rejected ${selectedApproval.objectTitle}`, 'warning');
    setShowRejectModal(false);
    setSelectedApproval(null);
    setRejectReason('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-[#0E9F8E]" />
            Approvals Inbox
          </h1>
          <p className="text-xs text-slate-400">
            Review financial, settlement, write-off, and operational approval requests per delegated matrix (§G6).
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'pending' ? 'bg-[#0E9F8E] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Pending for Me ({approvals.filter((a) => a.decision === 'Pending').length})
          </button>
          <button
            onClick={() => setActiveTab('decided')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'decided' ? 'bg-[#0E9F8E] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Decided History
          </button>
        </div>
      </div>

      {/* Approvals Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Object Ref</th>
                <th className="p-3.5">Requested By</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Threshold / Authority Limit</th>
                <th className="p-3.5">Submitted</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredApprovals.map((app) => {
                const isBlockedForManager = currentRole === 'recovery_manager' && app.thresholdLabel.includes('30%');

                return (
                  <tr key={app.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-3.5">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#0E9F8E]/20 text-[#0E9F8E] border border-[#0E9F8E]/30">
                        {app.objectType}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-white font-mono">{app.objectId}</td>
                    <td className="p-3.5">{app.requestedBy}</td>
                    <td className="p-3.5 font-mono font-bold text-white">
                      {formatMoney(app.amountMinor, app.currency)}
                    </td>
                    <td className="p-3.5">
                      <span className="text-slate-300 font-medium">{app.thresholdLabel}</span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-400">{app.ageDays}d ago</td>
                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                          app.decision === 'Approved'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : app.decision === 'Rejected'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {app.decision}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      {app.decision === 'Pending' && (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            disabled={isBlockedForManager}
                            onClick={() => handleApproveClick(app)}
                            title={isBlockedForManager ? 'Above your limit (25%) — COO / Operations must approve' : undefined}
                            className="px-3 py-1.5 bg-[#0E9F8E] hover:bg-[#0c8879] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-xs transition-colors"
                          >
                            Approve
                          </button>
                          {isBlockedForManager && (
                            <button
                              onClick={() => handleEscalateClick(app)}
                              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl text-xs transition-colors"
                            >
                              Escalate →
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setSelectedApproval(app);
                              setShowRejectModal(true);
                            }}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 font-semibold rounded-xl text-xs border border-slate-700 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sensitive Action Modal for Approval */}
      {showSensitiveModal && selectedApproval && (
        <SensitiveActionDialog
          actionName={`Approve ${selectedApproval.objectType} ${selectedApproval.objectId}`}
          summary={`Granting financial/operational approval for ${selectedApproval.objectTitle}. Amount: ${formatMoney(
            selectedApproval.amountMinor,
            selectedApproval.currency
          )}.`}
          userLimit={selectedApproval.thresholdLabel}
          onConfirm={handleConfirmApprove}
          onCancel={() => {
            setShowSensitiveModal(false);
            setSelectedApproval(null);
          }}
        />
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedApproval && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Reject Approval Request</h3>
            <p className="text-xs text-slate-400">
              Rejecting request <span className="font-mono text-white">{selectedApproval.objectId}</span>
            </p>
            <div className="space-y-1.5 text-xs">
              <label className="block text-slate-300 font-semibold">Rejection Reason (Required)</label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="State why this proposal is rejected..."
                rows={3}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setSelectedApproval(null);
                }}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                disabled={!rejectReason}
                onClick={handleRejectSubmit}
                className="px-4 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white rounded-xl shadow-lg"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
