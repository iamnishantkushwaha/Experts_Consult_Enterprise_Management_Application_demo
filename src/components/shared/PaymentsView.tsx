'use client';

import React, { useState } from 'react';
import { CreditCard, Search, Download, Upload, Filter } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatMoney } from '@/lib/mock-data';
import { PaymentStatus } from '@/lib/types';

export function PaymentsView({ onNavigate }: { onNavigate?: (view: string, data?: Record<string, unknown>) => void }) {
  const payments = useAppStore((s) => s.payments);
  const [searchQ, setSearchQ] = useState('');
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'All'>('All');
  const [sourceFilter, setSourceFilter] = useState<string>('All');

  const filtered = payments.filter(p => {
    const matchesSearch = !searchQ || p.payerName.toLowerCase().includes(searchQ.toLowerCase()) || p.reference.toLowerCase().includes(searchQ.toLowerCase()) || p.id.toLowerCase().includes(searchQ.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesSource = sourceFilter === 'All' || p.source === sourceFilter;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const statusColors: Record<string, string> = {
    Received: 'bg-sky-950 text-sky-300 border-sky-800',
    Matching: 'bg-violet-950 text-violet-300 border-violet-800',
    Allocated: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    Unmatched: 'bg-amber-950 text-amber-300 border-amber-800',
    Reconciliation: 'bg-slate-800 text-slate-300 border-slate-700',
    Approved: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    Remitted: 'bg-[#0E9F8E]/20 text-[#0E9F8E] border-[#0E9F8E]/30',
    Closed: 'bg-slate-800 text-slate-400 border-slate-700',
    Exception: 'bg-rose-950 text-rose-300 border-rose-800',
    Reversed: 'bg-rose-950 text-rose-300 border-rose-800',
  };

  const totalReceived = filtered.reduce((acc, p) => acc + p.amountMinor, 0);
  const exceptionCount = payments.filter(p => p.status === 'Exception' || p.status === 'Unmatched').length;

  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const addAuditEvent = useAppStore((s) => s.addAuditEvent);

  const handleExportPayments = (format: string) => {
    setShowExportMenu(false);
    const headers = 'PaymentRef,Payer,Source,Amount,ReceivedDate,Status,MatchedAccount\n';
    const rows = filtered.map(p => `${p.reference},"${p.payerName}",${p.source},${p.amountMinor / 100},${p.receivedDate},${p.status},${p.matchedAccountId || ''}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payments_export_${new Date().toISOString().slice(0,10)}.${format.toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    addAuditEvent({
      actor: 'Current User',
      actorRole: 'CFO / Finance',
      action: 'EXPORT',
      objectType: 'PAYMENTS',
      objectId: `EXPORT_${format}`,
      after: `Exported ${filtered.length} payments in ${format} format`,
      ipDevice: '192.168.1.45',
      sourceChannel: 'Web Application'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-[#0E9F8E]" />
            All Payments
          </h1>
          <p className="text-xs text-slate-400">Inbound payments across all bank accounts and channels. Auto-matched via reference lookup.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#0E9F8E] hover:bg-[#0c8879] text-white text-xs font-semibold rounded-xl transition-colors shadow-lg shadow-[#0E9F8E]/20"
          >
            <Upload className="w-3.5 h-3.5" />
            Import Bank Statement
          </button>
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#0E9F8E]" />
              Export
            </button>
            {showExportMenu && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setShowExportMenu(false)} />
                <div className="absolute top-full right-0 mt-1 w-40 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-30 py-1">
                  <button onClick={() => handleExportPayments('CSV')} className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800">Export as CSV</button>
                  <button onClick={() => handleExportPayments('XLSX')} className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800">Export as XLSX</button>
                  <button onClick={() => handleExportPayments('PDF')} className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800">Export as PDF</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Total Shown</div>
          <div className="text-xl font-extrabold text-white font-mono mt-1">{formatMoney(totalReceived, 'USD')}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Payments Count</div>
          <div className="text-xl font-extrabold text-white font-mono mt-1">{filtered.length}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Allocated</div>
          <div className="text-xl font-extrabold text-[#0E9F8E] font-mono mt-1">{payments.filter(p => p.status === 'Allocated').length}</div>
        </div>
        <div className="bg-slate-900 border border-rose-900/50 rounded-2xl p-4">
          <div className="text-[10px] text-rose-400 uppercase tracking-wider font-semibold">Exceptions / Unmatched</div>
          <div className="text-xl font-extrabold text-rose-400 font-mono mt-1">{exceptionCount}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search by payer, reference, ID…"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-8 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0E9F8E]"
          />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Filter className="w-3.5 h-3.5" />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as PaymentStatus | 'All')}
          className="bg-slate-900 border border-slate-700 text-slate-300 text-xs font-semibold rounded-xl px-3 py-2"
        >
          <option value="All">All Statuses</option>
          <option value="Received">Received</option>
          <option value="Matching">Matching</option>
          <option value="Allocated">Allocated</option>
          <option value="Unmatched">Unmatched</option>
          <option value="Exception">Exception</option>
          <option value="Remitted">Remitted</option>
          <option value="Reversed">Reversed</option>
        </select>
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="bg-slate-900 border border-slate-700 text-slate-300 text-xs font-semibold rounded-xl px-3 py-2"
        >
          <option value="All">All Sources</option>
          <option value="Bank transfer">Bank transfer</option>
          <option value="Mobile money">Mobile money</option>
          <option value="Card/gateway">Card/gateway</option>
          <option value="Cheque">Cheque</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 sticky top-0">
              <tr>
                <th className="p-3.5">Payment Ref</th>
                <th className="p-3.5">Payer</th>
                <th className="p-3.5">Source</th>
                <th className="p-3.5 text-right">Amount</th>
                <th className="p-3.5">Received</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Matched Account</th>
                <th className="p-3.5">Exception</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map(p => (
                <tr key={p.id} className={`hover:bg-slate-800/50 transition-colors ${p.status === 'Exception' || p.status === 'Unmatched' ? 'bg-rose-950/10' : ''}`}>
                  <td className="p-3.5 font-mono font-bold text-white">{p.reference}</td>
                  <td className="p-3.5 font-semibold text-slate-200">{p.payerName}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      {p.source}
                    </span>
                  </td>
                  <td className="p-3.5 text-right font-mono font-bold text-white">{formatMoney(p.amountMinor, p.currency)}</td>
                  <td className="p-3.5 font-mono text-slate-400">{p.receivedDate}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${statusColors[p.status] || 'bg-slate-800 text-slate-300 border-slate-700'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3.5">
                    {p.matchedAccountId ? (
                      <button
                        onClick={() => onNavigate?.('account_detail', { id: p.matchedAccountId })}
                        className="font-mono text-[#0E9F8E] hover:underline font-bold"
                      >
                        {p.matchedAccountId}
                      </button>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                  <td className="p-3.5 text-rose-300 max-w-xs truncate">{p.exceptionReason || '—'}</td>
                  <td className="p-3.5 text-right">
                    {(p.status === 'Unmatched' || p.status === 'Exception') && (
                      <button
                        onClick={() => onNavigate?.('reconciliation')}
                        className="px-3 py-1.5 bg-[#0E9F8E] hover:bg-[#0c8879] text-white font-semibold rounded-xl text-[11px] transition-colors"
                      >
                        Resolve
                      </button>
                    )}
                    {p.status === 'Received' && (
                      <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-[11px] border border-slate-700 transition-colors">
                        Match
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3.5 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-between">
          <span>Showing {filtered.length} of {payments.length} payments</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-slate-800 rounded-lg text-slate-400 hover:text-white">← Prev</button>
            <button className="px-3 py-1 bg-slate-800 rounded-lg text-slate-400 hover:text-white">Next →</button>
          </div>
        </div>
      </div>
      {/* Bank Statement Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 p-6 space-y-5">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#0E9F8E]" />
                Import Bank Statement (MT940 / CSV / CAMT.053)
              </h3>
              <button onClick={() => setShowImportModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Target Account / Bank</label>
                <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200">
                  <option>Ecobank Ghana — GHS Clearing Account (ACC-1002)</option>
                  <option>KCB Kenya — KES Collection Account (ACC-2001)</option>
                  <option>Standard Chartered UK — GBP Payout Account (ACC-3000)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Statement File</label>
                <div className="border-2 border-dashed border-slate-700 hover:border-[#0E9F8E] bg-slate-950 rounded-xl p-6 text-center cursor-pointer transition-colors">
                  <Upload className="w-8 h-8 text-[#0E9F8E] mx-auto mb-2" />
                  <span className="text-xs text-white font-semibold block">Drag &amp; drop bank statement here</span>
                  <span className="text-[11px] text-slate-400">Supports .csv, .mt940, .xml, .txt</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowImportModal(false);
                  addAuditEvent({
                    actor: 'Current User',
                    actorRole: 'CFO / Finance',
                    action: 'IMPORT_BANK_STATEMENT',
                    objectType: 'PAYMENTS',
                    objectId: 'IMPORT_STMT',
                    after: 'Imported Ecobank GHS statement with 14 payments',
                    ipDevice: '192.168.1.45',
                    sourceChannel: 'Web Application'
                  });
                }}
                className="px-4 py-2 bg-[#0E9F8E] hover:bg-[#0c8879] text-white text-xs font-semibold rounded-xl shadow-lg shadow-[#0E9F8E]/20"
              >
                Upload &amp; Process Auto-Match
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
