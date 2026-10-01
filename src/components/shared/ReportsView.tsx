'use client';

import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, Clock, CheckCircle2, Plus } from 'lucide-react';
import { useToast } from '../common/Toast';
import { useAppStore } from '@/lib/store';

export function ReportsView() {
  const { toast } = useToast();
  const addAuditEvent = useAppStore((s) => s.addAuditEvent);

  const [selectedReport, setSelectedReport] = useState('Daily cash receipts');
  const [dateRange, setDateRange] = useState('This Month');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleFreq, setScheduleFreq] = useState('Daily');

  const reportsList = [
    { id: 'Daily cash receipts', group: 'Finance', desc: 'Detailed breakdown of all cash receipts matched and allocated across portfolios.' },
    { id: 'Daily recovery activity', group: 'Recovery', desc: 'Log of officer outreach, contacts made, and promises secured.' },
    { id: 'Portfolio aging', group: 'Recovery', desc: 'Aging breakdown (0-30 to 365+ days) across active portfolios.' },
    { id: 'Client performance', group: 'Recovery', desc: 'Liquidation rates, fee earnings, and SLA compliance per client.' },
    { id: 'Unreconciled payments', group: 'Finance', desc: 'Exceptions queue summary of unmatched, duplicate, and overpaid funds.' },
    { id: 'Remittance statement', group: 'Finance', desc: 'Monthly client payout calculation sheets and fee deductions.' },
    { id: 'Legal pipeline', group: 'Legal', desc: 'Status of referrals, active court suits, and judgment enforcement.' },
    { id: 'Complaint register', group: 'Compliance', desc: 'Customer treatment incidents, SLA resolution times, and audit logs.' },
    { id: 'Audit & access report', group: 'Audit', desc: 'System access events, PII unmasks, and sensitive administrative actions.' }
  ];

  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleExport = (format: string) => {
    setShowExportMenu(false);
    // Trigger actual file download
    const dummyContent = `Report,Format,GeneratedDate\n"${selectedReport}",${format},${new Date().toISOString()}`;
    const blob = new Blob([dummyContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedReport.toLowerCase().replace(/\s+/g, '_')}_export.${format.toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast(`Export prepared (${format}) — logged in audit trail`, 'success');
    addAuditEvent({
      actor: 'Current User',
      actorRole: 'User',
      action: 'EXPORT',
      objectType: 'Report',
      objectId: selectedReport,
      after: `Exported ${selectedReport} in ${format} format`,
      ipDevice: '192.168.1.45',
      sourceChannel: 'Web Application'
    });
  };

  const handleScheduleSubmit = () => {
    toast(`Report scheduled (${scheduleFreq}) — notification configured`, 'success');
    setShowScheduleModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#2563EB]" />
            Enterprise Reports &amp; Analytics
          </h1>
          <p className="text-xs text-slate-600">Standard operational, financial, compliance, and audit reports (§20.1).</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowScheduleModal(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl border border-slate-300 transition-colors"
          >
            <Clock className="w-4 h-4 text-[#2563EB]" />
            <span>Schedule Report</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-xl transition-colors shadow-lg shadow-[#2563EB]/20"
            >
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
            {showExportMenu && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setShowExportMenu(false)} />
                <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-slate-300 rounded-xl shadow-2xl z-30 py-1">
                  <button
                    onClick={() => handleExport('PDF')}
                    className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    Export PDF
                  </button>
                  <button
                    onClick={() => handleExport('XLSX')}
                    className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    Export XLSX
                  </button>
                  <button
                    onClick={() => handleExport('CSV')}
                    className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    Export CSV
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Report List (1/3) & Preview Pane (2/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report List */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2">
          <span className="text-xs font-bold uppercase text-slate-600 px-2 tracking-wider block mb-2">
            Available Standard Reports
          </span>
          {reportsList.map((r) => (
            <div
              key={r.id}
              onClick={() => setSelectedReport(r.id)}
              className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                selectedReport === r.id
                  ? 'bg-[#2563EB]/10 border-[#2563EB] text-slate-900'
                  : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex justify-between items-center font-semibold mb-1">
                <span>{r.id}</span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  {r.group}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Report Preview Pane */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900">{selectedReport}</h2>
              <span className="text-xs text-slate-600">Generated on 1 Oct 2026 for {dateRange}</span>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-xl px-3 py-1.5"
              >
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="Year to Date">Year to Date</option>
              </select>
            </div>
          </div>

          {/* Sample Table Preview */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
            <span className="text-xs font-bold text-slate-700">Preview Data Sheet</span>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-white text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Date</th>
                    <th className="p-2.5">Portfolio</th>
                    <th className="p-2.5">Client</th>
                    <th className="p-2.5">Gross Recovered</th>
                    <th className="p-2.5">Fee Rate</th>
                    <th className="p-2.5">Net Remitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-white/50">
                    <td className="p-2.5 font-mono">2026-09-29</td>
                    <td className="p-2.5">PF-2026-002</td>
                    <td className="p-2.5">Savannah Commercial Bank</td>
                    <td className="p-2.5 font-mono font-bold text-slate-900">GHS 120,000.00</td>
                    <td className="p-2.5 font-mono">22%</td>
                    <td className="p-2.5 font-mono text-emerald-600">GHS 93,600.00</td>
                  </tr>
                  <tr className="hover:bg-white/50">
                    <td className="p-2.5 font-mono">2026-09-25</td>
                    <td className="p-2.5">PF-2026-001</td>
                    <td className="p-2.5">Volta Telecom Ghana</td>
                    <td className="p-2.5 font-mono font-bold text-slate-900">GHS 25,000.00</td>
                    <td className="p-2.5 font-mono">18%</td>
                    <td className="p-2.5 font-mono text-emerald-600">GHS 20,500.00</td>
                  </tr>
                  <tr className="hover:bg-white/50">
                    <td className="p-2.5 font-mono">2026-09-29</td>
                    <td className="p-2.5">PF-2026-003</td>
                    <td className="p-2.5">Nairobi Power & Light</td>
                    <td className="p-2.5 font-mono font-bold text-slate-900">KES 150,000.00</td>
                    <td className="p-2.5 font-mono">15%</td>
                    <td className="p-2.5 font-mono text-emerald-600">KES 127,500.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-50/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900">Schedule Report</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Frequency</label>
                <select
                  value={scheduleFreq}
                  onChange={(e) => setScheduleFreq(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
                >
                  <option value="Daily">Daily at 08:00</option>
                  <option value="Weekly">Weekly (Every Monday)</option>
                  <option value="Monthly">Monthly (1st of month)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Format</label>
                <select className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900">
                  <option value="PDF">PDF Document</option>
                  <option value="XLSX">Excel Spreadsheet (XLSX)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleSubmit}
                className="px-4 py-2 text-xs font-semibold bg-[#2563EB] text-white rounded-xl shadow-lg"
              >
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
