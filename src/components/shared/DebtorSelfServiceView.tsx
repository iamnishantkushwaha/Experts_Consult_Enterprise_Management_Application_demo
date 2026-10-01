'use client';

import React, { useState } from 'react';
import { CreditCard, CheckCircle2, ShieldCheck, DollarSign, Calendar, AlertTriangle, FileText, Settings, MessageSquare, X } from 'lucide-react';
import { useToast } from '../common/Toast';

export function DebtorSelfServiceView({ activeNav = 'my_account' }: { activeNav?: string; onNavigate?: (view: string) => void }) {
  const { toast } = useToast();
  const [showPayModal, setShowPayModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Mobile Money');
  const [disputeReason, setDisputeReason] = useState('');
  const [disputeSubmitted, setDisputeSubmitted] = useState(false);

  const handlePayConfirm = () => {
    toast(`Payment of GHS 121,380.00 processed via ${paymentMethod}`, 'success');
    setShowPayModal(false);
  };

  const handlePlanConfirm = () => {
    toast('Monthly payment plan of GHS 11,900/mo submitted for approval', 'success');
    setShowPlanModal(false);
  };

  const handleDisputeSubmit = () => {
    if (!disputeReason.trim()) return;
    setDisputeSubmitted(true);
    toast('Dispute registered — assigned to compliance officer', 'warning');
  };

  return (
    <div className="space-y-6">
      {/* ── 1. My Account ────────────────────────────────────────── */}
      {activeNav === 'my_account' && (
        <>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-[#0E9F8E]" />
              Debtor Account Overview
            </h1>
            <p className="text-xs text-slate-400">View outstanding balance, settlement options, and dedicated account officer contact.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:col-span-2">
              <div className="text-xs text-slate-400">Account Reference: <span className="font-mono text-white font-bold">ACC-100232</span> (Adwoa Trading Ltd)</div>
              <div className="text-3xl font-extrabold text-white font-mono mt-2">GHS 142,800.00</div>
              <div className="text-xs text-emerald-400 mt-1 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Discount Eligible: Up to 15% off for full settlement (Pay GHS 121,380.00)
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowPayModal(true)}
                  className="px-5 py-2.5 bg-[#0E9F8E] hover:bg-[#0c8879] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#0E9F8E]/20 transition-all"
                >
                  Pay Full Settlement Now
                </button>
                <button
                  onClick={() => setShowPlanModal(true)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all"
                >
                  Set Up Monthly Plan
                </button>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Assigned Recovery Officer</div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0E9F8E]/20 text-[#0E9F8E] flex items-center justify-center font-bold text-sm">
                  FA
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Fatima Alhassan</div>
                  <div className="text-xs text-slate-400">Senior Recovery Specialist</div>
                </div>
              </div>
              <div className="pt-2 text-xs text-slate-400 space-y-1 font-mono">
                <div>📞 +233 20 889 0122</div>
                <div>✉️ f.alhassan@expertsconsult.com</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-4">Recent Payment History &amp; Receipts</h3>
            <div className="space-y-3 text-xs">
              {[
                { date: '2026-09-15', desc: 'Monthly Installment Payment #2', amount: 'GHS 11,900.00', status: 'Completed', ref: 'PAY-88301' },
                { date: '2026-08-15', desc: 'Monthly Installment Payment #1', amount: 'GHS 11,900.00', status: 'Completed', ref: 'PAY-77192' }
              ].map((p, idx) => (
                <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{p.desc}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{p.date} · Ref: {p.ref}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-emerald-400">{p.amount}</div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">{p.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── 2. Pay Now ────────────────────────────────────────────── */}
      {activeNav === 'pay_now' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-[#0E9F8E]" />
              Make Instant Payment
            </h1>
            <p className="text-xs text-slate-400">Pay your balance instantly using Mobile Money (MTN, Telecel, AT) or Bank Card.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 max-w-xl">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
              <div>
                <div className="text-xs text-slate-400">Full Settlement Special Offer</div>
                <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-0.5">GHS 121,380.00</div>
                <div className="text-[11px] text-slate-400">Original Balance: GHS 142,800.00 (Saved GHS 21,420.00)</div>
              </div>
              <button
                onClick={() => setShowPayModal(true)}
                className="px-4 py-2.5 bg-[#0E9F8E] hover:bg-[#0c8879] text-white text-xs font-bold rounded-xl shadow-lg"
              >
                Pay Offered Amount
              </button>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300">Or Enter Custom Payment Amount (GHS)</label>
              <input
                type="number"
                defaultValue="5000"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm font-mono text-white outline-none focus:border-[#0E9F8E]"
              />
              <button
                onClick={() => setShowPayModal(true)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700"
              >
                Proceed to Payment Gateway
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 2. Payment Plan Request ────────────────────────────────────────── */}
      {activeNav === 'payment_plan' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[#0E9F8E]" />
              Installment Payment Plan Setup
            </h1>
            <p className="text-xs text-slate-400">Structure a customized payment plan over 3 to 12 months with automated debit instructions.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Select Duration</label>
              <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200">
                <option>6 Months — GHS 23,800 / month</option>
                <option>12 Months — GHS 11,900 / month</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">First Payment Date</label>
              <input type="date" defaultValue="2026-10-10" className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200" />
            </div>
            <button onClick={handlePlanConfirm} className="w-full py-2.5 bg-[#0E9F8E] hover:bg-[#0c8879] text-white text-xs font-bold rounded-xl shadow-lg">
              Submit Installment Proposal
            </button>
          </div>
        </div>
      )}

      {/* ── 3. Raise a Dispute / Complaint ──────────────────────────────────── */}
      {(activeNav === 'dispute' || activeNav === 'complaint') && (
        <div className="space-y-6">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              Raise a Dispute or Formal Complaint
            </h1>
            <p className="text-xs text-slate-400">If you contest the debt balance or experienced unfair treatment, submit details for independent review.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 max-w-xl">
            {disputeSubmitted ? (
              <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-xl text-xs text-emerald-300 space-y-2">
                <div className="font-bold text-sm">Dispute Ticket Logged (#DISP-9904)</div>
                <div>Your dispute has been assigned to Compliance Officer Fatima Alhassan. Collections activity is temporarily paused pending review.</div>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Dispute Category</label>
                  <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200">
                    <option>Balance Discrepancy (Payment already made)</option>
                    <option>Identity / Fraudulent Account</option>
                    <option>Unfair Debt Collection Conduct</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Detailed Explanation</label>
                  <textarea
                    rows={4}
                    placeholder="Provide details and references to attached receipts..."
                    value={disputeReason}
                    onChange={(e) => setDisputeReason(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 outline-none"
                  />
                </div>
                <button onClick={handleDisputeSubmit} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-amber-950 text-xs font-bold rounded-xl">
                  Register Official Dispute
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── 4. Documents & Receipts ─────────────────────────────────────────── */}
      {activeNav === 'documents' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-[#0E9F8E]" />
              Documents &amp; Payment Receipts
            </h1>
            <p className="text-xs text-slate-400">Download official payment receipts, settlement clearance certificates, and contract copies.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            {[
              { title: 'Statement of Account — Q3 2026', type: 'PDF Document', date: '2026-09-30' },
              { title: 'Volta Telecom Original Facility Agreement', type: 'PDF Contract', date: '2025-01-15' },
            ].map((d, i) => (
              <div key={i} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-white">{d.title}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{d.type} · Issued {d.date}</div>
                </div>
                <button onClick={() => toast('Document downloaded', 'success')} className="text-[#0E9F8E] hover:underline font-semibold">
                  Download ↓
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 5. Preferences ──────────────────────────────────────────────────── */}
      {activeNav === 'preferences' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Settings className="w-6 h-6 text-[#0E9F8E]" />
              Communication Preferences &amp; Contact Details
            </h1>
            <p className="text-xs text-slate-400">Manage preferred contact methods, phone numbers, and notification frequencies.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 max-w-xl text-xs text-slate-300">
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="accent-[#0E9F8E]" />
                <span>Receive payment reminders via SMS (+233 24 412 3456)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="accent-[#0E9F8E]" />
                <span>Receive digital receipts via email (kofi.mensah@gmail.com)</span>
              </label>
            </div>
            <button onClick={() => toast('Preferences saved', 'success')} className="px-4 py-2 bg-[#0E9F8E] text-white font-bold rounded-xl">
              Save Preferences
            </button>
          </div>
        </div>
      )}

      {/* Pay Modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Select Payment Channel</h3>
              <button onClick={() => setShowPayModal(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-2 text-xs">
              <label className="flex items-center justify-between p-3 bg-slate-950 border border-slate-700 rounded-xl cursor-pointer">
                <span>MTN Mobile Money (MoMo)</span>
                <input type="radio" name="pay" defaultChecked onChange={() => setPaymentMethod('Mobile Money')} />
              </label>
              <label className="flex items-center justify-between p-3 bg-slate-950 border border-slate-700 rounded-xl cursor-pointer">
                <span>Credit / Debit Card (Visa/Mastercard)</span>
                <input type="radio" name="pay" onChange={() => setPaymentMethod('Card')} />
              </label>
            </div>
            <button onClick={handlePayConfirm} className="w-full py-2.5 bg-[#0E9F8E] text-white font-bold rounded-xl text-xs">
              Confirm &amp; Pay GHS 121,380.00
            </button>
          </div>
        </div>
      )}

      {/* Plan Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Monthly Plan Setup</h3>
              <button onClick={() => setShowPlanModal(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <div className="text-xs text-slate-300">Pay 12 monthly installments of <strong className="text-white">GHS 11,900.00/month</strong></div>
            <button onClick={handlePlanConfirm} className="w-full py-2.5 bg-[#0E9F8E] text-white font-bold rounded-xl text-xs">
              Confirm Plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
