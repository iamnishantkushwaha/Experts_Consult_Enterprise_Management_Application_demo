'use client';

import React, { useState } from 'react';
import {
  User as UserIcon,
  Clock,
  ChevronRight,
  ShieldAlert,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  XCircle,
  Sparkles,
  FileText,
  CreditCard,
  AlertTriangle,
  Plus,
  ArrowUpRight,
  Calendar,
  Lock,
  MessageSquare,
  DollarSign
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Account, ContactEvent, PromiseToPay, Document, Dispute } from '@/lib/types';
import { formatMoney } from '@/lib/mock-data';
import { useToast } from '../common/Toast';
import { HistoryDrawer } from '../common/HistoryDrawer';
import { RevealModal } from '../common/RevealModal';
import { SensitiveActionDialog } from '../common/SensitiveActionDialog';
import { SettlementWizardModal } from './SettlementWizardModal';

interface AccountDetailViewProps {
  accountId?: string;
  onBack?: () => void;
}

export function AccountDetailView({ accountId = 'ACC-100377', onBack }: AccountDetailViewProps) {
  const { toast } = useToast();

  const accounts = useAppStore((s) => s.accounts);
  const debtors = useAppStore((s) => s.debtors);
  const contactEvents = useAppStore((s) => s.contactEvents);
  const promises = useAppStore((s) => s.promises);
  const paymentPlans = useAppStore((s) => s.paymentPlans);
  const payments = useAppStore((s) => s.payments);
  const documents = useAppStore((s) => s.documents);
  const disputes = useAppStore((s) => s.disputes);
  const legalMatters = useAppStore((s) => s.legalMatters);
  const auditEvents = useAppStore((s) => s.auditEvents);
  const currentRole = useAppStore((s) => s.currentRole);
  const revealedPII = useAppStore((s) => s.revealedPII);
  const logContact = useAppStore((s) => s.logContact);
  const recordPromise = useAppStore((s) => s.recordPromise);
  const acceptAiRecommendation = useAppStore((s) => s.acceptAiRecommendation);
  const overrideAiRecommendation = useAppStore((s) => s.overrideAiRecommendation);

  const account = accounts.find((a) => a.id === accountId) || accounts[5]; // Default ACC-100377 Yaw Boateng
  const debtor = debtors.find((d) => d.id === account.debtorId) || debtors[2];
  const accContacts = contactEvents.filter((c) => c.accountId === account.id);
  const accPromises = promises.filter((p) => p.accountId === account.id);
  const accPlans = paymentPlans.filter((p) => p.accountId === account.id);
  const accPayments = payments.filter((p) => p.matchedAccountId === account.id);
  const accDocs = documents.filter((d) => d.entityId === account.id);
  const accDisputes = disputes.filter((d) => d.accountId === account.id);
  const accLegal = legalMatters.find((l) => l.accountId === account.id);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'chronology' | 'contacts' | 'promises' | 'payments' | 'documents' | 'disputes' | 'legal'>('overview');

  // Modals & Side Sheets
  const [showHistory, setShowHistory] = useState(false);
  const [showRevealModal, setShowRevealModal] = useState<string | null>(null);
  const [showLogContactModal, setShowLogContactModal] = useState(false);
  const [showPromiseModal, setShowPromiseModal] = useState(false);
  const [showSettlementWizard, setShowSettlementWizard] = useState(false);
  const [showAiOverrideModal, setShowAiOverrideModal] = useState(false);
  const [aiOverrideReason, setAiOverrideReason] = useState('');

  // Log contact form state
  const [logChannel, setLogChannel] = useState<ContactEvent['channel']>('Call');
  const [logOutcome, setLogOutcome] = useState<ContactEvent['outcome']>('Spoke to debtor');
  const [logNotes, setLogNotes] = useState('');
  const [logIdentityVerified, setLogIdentityVerified] = useState(true);
  const [logNextAction, setLogNextAction] = useState('Follow-up call');

  // Record promise state
  const [promiseAmount, setPromiseAmount] = useState('50000');
  const [promiseDueDate, setPromiseDueDate] = useState('2026-10-15');

  // Reveal status
  const phoneUnmasked = revealedPII[`${debtor.id}_phone`];
  const emailUnmasked = revealedPII[`${debtor.id}_email`];
  const addressUnmasked = revealedPII[`${debtor.id}_address`];

  const handleLogContactSubmit = () => {
    const res = logContact({
      accountId: account.id,
      userId: 'USR-AMADARKO',
      userName: 'Ama Darko',
      channel: logChannel,
      outcome: logOutcome,
      notes: logNotes,
      identityVerified: logIdentityVerified,
      nextAction: logNextAction
    });

    if (!res.success) {
      toast(res.error || 'Failed to log contact', 'error');
    } else {
      toast('Contact logged successfully', 'success');
      setShowLogContactModal(false);
      setLogNotes('');
    }
  };

  const handlePromiseSubmit = () => {
    const amountMinor = Math.round(parseFloat(promiseAmount) * 100);
    recordPromise({
      accountId: account.id,
      amountMinor,
      dueDate: promiseDueDate,
      source: 'Officer contact (Ama Darko)'
    });
    toast('Promise recorded — reminder scheduled', 'success');
    setShowPromiseModal(false);
  };

  const handleAiAccept = () => {
    acceptAiRecommendation(account.id);
    toast('Task created from recommendation', 'success');
  };

  const handleAiOverrideSubmit = () => {
    if (!aiOverrideReason) return;
    overrideAiRecommendation(account.id, aiOverrideReason);
    toast('Override recorded', 'warning');
    setShowAiOverrideModal(false);
    setAiOverrideReason('');
  };

  const isDocRequiredState = account.status === 'Documentation required';

  return (
    <div className="space-y-6">
      {/* Sticky Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl sticky top-0 z-10 backdrop-blur-md">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">{account.debtorName}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 border border-slate-300 text-slate-700">
                {account.debtorType}
              </span>
              <span className="text-xs font-mono text-[#2563EB] font-semibold bg-[#2563EB]/10 px-2.5 py-0.5 rounded-full border border-[#2563EB]/30">
                {account.id}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <span>Client: <strong className="text-slate-800">{account.clientName}</strong></span>
              <span>•</span>
              <span>Country: <strong className="text-slate-800">{account.countryCode}</strong></span>
              <span>•</span>
              <span>Portfolio: <strong className="text-slate-800">{account.portfolioId}</strong></span>
            </div>
          </div>

          {/* Action buttons & History */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistory(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition-colors border border-slate-300"
            >
              <Clock className="w-4 h-4 text-[#2563EB]" />
              <span>History</span>
            </button>

            {/* Actions Menu */}
            {currentRole !== 'auditor' && currentRole !== 'client_admin_volta' && (
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs transition-colors shadow-lg shadow-[#2563EB]/20">
                  <span>Actions</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-slate-300 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-30 py-1">
                  <button
                    disabled={isDocRequiredState}
                    onClick={() => setShowLogContactModal(true)}
                    title={isDocRequiredState ? 'Complete validation before recovery contact' : undefined}
                    className="w-full text-left px-3.5 py-2 text-xs text-slate-800 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Log contact
                  </button>
                  <button
                    onClick={() => setShowPromiseModal(true)}
                    className="w-full text-left px-3.5 py-2 text-xs text-slate-800 hover:bg-slate-100"
                  >
                    Add promise-to-pay
                  </button>
                  <button
                    onClick={() => setShowSettlementWizard(true)}
                    className="w-full text-left px-3.5 py-2 text-xs text-slate-800 hover:bg-slate-100"
                  >
                    Propose settlement
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Badges & Balance Strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-slate-200">
          <div>
            <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block mb-1">
              Status
            </span>
            <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {account.status}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block mb-1">
              Risk Level
            </span>
            <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold border ${
              account.risk === 'High' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              {account.risk} Risk
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block mb-1">
              Aging Bucket
            </span>
            <span className="text-xs font-semibold text-slate-800">{account.agingBucket} days past due</span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block mb-1">
              Owner
            </span>
            <span className="text-xs font-semibold text-slate-800">{account.ownerName}</span>
          </div>

          <div className="col-span-2 md:col-span-1 bg-slate-50 p-3 rounded-xl border border-slate-200 text-right">
            <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider block">
              Outstanding Balance
            </span>
            <span className="text-lg font-extrabold text-slate-900 font-mono">
              {formatMoney(account.balanceMinor, account.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Tabs Pane (3/4) & Right AI Recommendation Card (1/4) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          {/* Tab Navigation */}
          <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto pb-1">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'chronology', label: 'Chronology' },
              { id: 'contacts', label: `Contacts (${accContacts.length})` },
              { id: 'promises', label: `Promises & Plans (${accPromises.length})` },
              { id: 'payments', label: `Payments (${accPayments.length})` },
              { id: 'documents', label: `Documents (${accDocs.length})` },
              { id: 'disputes', label: `Disputes (${accDisputes.length})` },
              { id: 'legal', label: 'Legal' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2 text-xs font-semibold rounded-t-xl transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#2563EB] text-slate-900 border-b-2 border-[#2563EB]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Debtor Profile Card with Masked PII */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                    <span>Debtor Profile & PII</span>
                    <span className="text-[10px] text-slate-500 font-mono">ID: {debtor.id}</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Phone className="w-4 h-4 text-slate-500" />
                        <span>Phone:</span>
                        <strong className="font-mono text-slate-900">
                          {phoneUnmasked ? '+233 24 412 4471' : debtor.phoneMasked}
                        </strong>
                      </div>
                      {!phoneUnmasked && (
                        <button
                          onClick={() => setShowRevealModal('Phone')}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-[#2563EB] rounded-lg font-semibold text-[11px] transition-colors"
                        >
                          Reveal
                        </button>
                      )}
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Mail className="w-4 h-4 text-slate-500" />
                        <span>Email:</span>
                        <strong className="font-mono text-slate-900">
                          {emailUnmasked ? 'kofi.mensah@gmail.com' : debtor.emailMasked}
                        </strong>
                      </div>
                      {!emailUnmasked && (
                        <button
                          onClick={() => setShowRevealModal('Email')}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-[#2563EB] rounded-lg font-semibold text-[11px] transition-colors"
                        >
                          Reveal
                        </button>
                      )}
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-2 text-slate-700">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span>Address:</span>
                        <strong className="text-slate-900">
                          {addressUnmasked ? 'Plot 14, East Legon, Accra, Ghana' : debtor.addressMasked}
                        </strong>
                      </div>
                      {!addressUnmasked && (
                        <button
                          onClick={() => setShowRevealModal('Address')}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-[#2563EB] rounded-lg font-semibold text-[11px] transition-colors"
                        >
                          Reveal
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Account Strategy Card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">Strategy & Next Action</h3>
                  <div className="space-y-3 text-xs">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                      <span className="text-slate-600 font-medium">Recovery Strategy</span>
                      <p className="text-slate-800 font-semibold">
                        Structured Workout & Commercial Settlement Proposal
                      </p>
                    </div>

                    <div className="bg-[#2563EB]/10 border border-[#2563EB]/30 p-3 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider block">
                          Next Action Due
                        </span>
                        <span className="text-sm font-bold text-slate-900">
                          {account.nextAction?.type || 'Settlement Proposal Follow-up'}
                        </span>
                        <span className="text-xs text-slate-600 block mt-0.5">
                          Due: {account.nextAction?.due || '2026-10-02'}
                        </span>
                      </div>
                      <button
                        onClick={() => toast('Next action marked done', 'success')}
                        className="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs rounded-lg transition-colors shadow-md"
                      >
                        Mark Done
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CHRONOLOGY */}
          {activeTab === 'chronology' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Account Event Chronology (Immutable)</h3>
              <div className="relative border-l-2 border-slate-200 left-3 space-y-6">
                {accContacts.map((ev) => (
                  <div key={ev.id} className="relative pl-6">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[#2563EB] border-4 border-slate-900"></div>
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">
                          {ev.channel} Contact — {ev.outcome}
                        </span>
                        <span className="text-slate-500 font-mono">{ev.dateTime}</span>
                      </div>
                      <p className="text-xs text-slate-700">{ev.notes}</p>
                      <div className="text-[10px] text-slate-500">Logged by: {ev.userName}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CONTACTS */}
          {activeTab === 'contacts' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-900">Contact Events Log</h3>
                <button
                  disabled={isDocRequiredState}
                  onClick={() => setShowLogContactModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-xl transition-colors disabled:opacity-40"
                >
                  <Plus className="w-4 h-4" /> Log Contact
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Date/Time</th>
                      <th className="p-3">Channel</th>
                      <th className="p-3">Outcome</th>
                      <th className="p-3">User</th>
                      <th className="p-3">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {accContacts.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-100/50">
                        <td className="p-3 font-mono text-slate-600">{c.dateTime}</td>
                        <td className="p-3 font-semibold text-slate-900">{c.channel}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#2563EB]/20 text-[#2563EB]">
                            {c.outcome}
                          </span>
                        </td>
                        <td className="p-3">{c.userName}</td>
                        <td className="p-3 max-w-xs truncate">{c.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: PROMISES & PLANS */}
          {activeTab === 'promises' && (
            <div className="space-y-6">
              {/* Promises Table */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-900">Promises to Pay (PTP)</h3>
                  <button
                    onClick={() => setShowPromiseModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563EB] text-white text-xs font-semibold rounded-xl"
                  >
                    <Plus className="w-4 h-4" /> Add Promise
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Due Date</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Source</th>
                        <th className="p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {accPromises.map((ptp) => (
                        <tr key={ptp.id} className="hover:bg-slate-100/50">
                          <td className="p-3 font-mono font-bold text-slate-900">
                            {formatMoney(ptp.amountMinor, account.currency)}
                          </td>
                          <td className="p-3 font-mono">{ptp.dueDate}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                ptp.status === 'Kept'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : ptp.status === 'Broken'
                                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                            >
                              {ptp.status}
                            </span>
                          </td>
                          <td className="p-3">{ptp.source}</td>
                          <td className="p-3">
                            <button
                              disabled
                              title="A promise is not cash — confirm via a received payment (§14.1)"
                              className="px-2 py-1 bg-slate-100 text-slate-500 rounded text-[10px] cursor-not-allowed"
                            >
                              Mark kept
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
              {/* Checklist Panel */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Required Evidence Checklist
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" /> Contract ✓
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" /> Invoice ✓
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" /> Statement ✓
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" /> Proof of Debt ✓
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {accDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 hover:border-[#2563EB] transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-xs text-slate-900">{doc.fileName}</span>
                      <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-mono">
                        {doc.version}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 flex justify-between">
                      <span>Category: {doc.category}</span>
                      <span className="text-[#2563EB] font-medium">{doc.ocrStatus}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT RAIL: AI NEXT BEST ACTION CARD (§10) */}
        <div className="space-y-4">
          <div className="bg-white border border-[#2563EB]/40 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#2563EB]" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">AI Recommendation</h3>
                <span className="text-[10px] text-slate-500 font-mono">model recovery-nba v2.3</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div>
                <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider block">
                  Probability of Payment
                </span>
                <span className="text-2xl font-extrabold text-[#2563EB] font-mono">78%</span>
              </div>

              <div>
                <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider block mb-1">
                  Suggested Action
                </span>
                <p className="text-xs text-slate-800 font-semibold leading-snug">
                  Propose 30% lump sum settlement (GHS 340,340.00). High likelihood of agreement prior to court filing.
                </p>
              </div>

              <div>
                <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider block">
                  Channel & Window
                </span>
                <span className="text-xs text-slate-700">Direct Call (10:00–12:00 window)</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAiAccept}
                className="flex-1 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs rounded-xl transition-colors shadow-md"
              >
                Accept
              </button>
              <button
                onClick={() => setShowAiOverrideModal(true)}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors border border-slate-300"
              >
                Override
              </button>
            </div>

            <p className="text-[10px] text-slate-500 text-center italic">
              AI suggestions are advisory. High-impact actions need human approval.
            </p>
          </div>
        </div>
      </div>

      {/* History Drawer */}
      {showHistory && (
        <HistoryDrawer recordId={account.id} recordType="Account" onClose={() => setShowHistory(false)} />
      )}

      {/* Reveal PII Modal */}
      {showRevealModal && (
        <RevealModal
          debtorId={debtor.id}
          debtorName={account.debtorName}
          fieldLabel={showRevealModal}
          onClose={() => setShowRevealModal(null)}
        />
      )}

      {/* Settlement Wizard Modal */}
      {showSettlementWizard && (
        <SettlementWizardModal account={account} onClose={() => setShowSettlementWizard(false)} />
      )}

      {/* Log Contact Modal */}
      {showLogContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-50/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900">Log Contact Event</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Channel</label>
                <select
                  value={logChannel}
                  onChange={(e) => setLogChannel(e.target.value as ContactEvent['channel'])}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
                >
                  <option value="Call">Call</option>
                  <option value="SMS">SMS</option>
                  <option value="Email">Email</option>
                  <option value="Letter">Letter</option>
                  <option value="WhatsApp" disabled>
                    WhatsApp (Disabled for Ghana)
                  </option>
                  <option value="Visit">Visit</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Outcome</label>
                <select
                  value={logOutcome}
                  onChange={(e) => setLogOutcome(e.target.value as ContactEvent['outcome'])}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
                >
                  <option value="Spoke to debtor">Spoke to debtor</option>
                  <option value="Promise to pay">Promise to pay</option>
                  <option value="No answer">No answer</option>
                  <option value="Refuses to pay">Refuses to pay</option>
                  <option value="Dispute raised">Dispute raised</option>
                  <option value="Requests payment plan">Requests payment plan</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Notes</label>
                <textarea
                  value={logNotes}
                  onChange={(e) => setLogNotes(e.target.value)}
                  placeholder="Enter detailed outcome notes..."
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowLogContactModal(false)}
                className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={handleLogContactSubmit}
                className="px-4 py-2 text-xs font-semibold bg-[#2563EB] text-white rounded-xl shadow-lg"
              >
                Save Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Record Promise Modal */}
      {showPromiseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-50/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900">Record Promise to Pay</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Promised Amount (GHS)</label>
                <input
                  type="number"
                  value={promiseAmount}
                  onChange={(e) => setPromiseAmount(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Due Date</label>
                <input
                  type="date"
                  value={promiseDueDate}
                  onChange={(e) => setPromiseDueDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowPromiseModal(false)}
                className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={handlePromiseSubmit}
                className="px-4 py-2 text-xs font-semibold bg-[#2563EB] text-white rounded-xl shadow-lg"
              >
                Save Promise
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Override Modal */}
      {showAiOverrideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-50/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900">Override AI Recommendation</h3>
            <div className="space-y-3 text-xs">
              <label className="block text-slate-700 font-semibold mb-1">Reason for Override (Required)</label>
              <textarea
                value={aiOverrideReason}
                onChange={(e) => setAiOverrideReason(e.target.value)}
                placeholder="Explain why the recommendation is being overridden..."
                rows={3}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowAiOverrideModal(false)}
                className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                disabled={!aiOverrideReason}
                onClick={handleAiOverrideSubmit}
                className="px-4 py-2 text-xs font-semibold bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-slate-900 rounded-xl shadow-lg"
              >
                Log Override
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
