'use client';

import React from 'react';
import { BookOpen, Download, Search } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function AuditLogView({ activeNav = 'audit_log' }: { activeNav?: string }) {
  const auditEvents = useAppStore((s) => s.auditEvents);

  const titles: Record<string, { title: string; subtitle: string }> = {
    audit_log: { title: 'Audit Log', subtitle: 'Immutable, append-only record of all system actions. Read-only access.' },
    access_report: { title: 'Access & Security Report', subtitle: 'Detailed record of user logins, role switches, PII access, and IP address locations.' },
    evidence_sampling: { title: 'Compliance Evidence Sampling', subtitle: 'Randomized audit sampling of collection notes, recorded calls, and settlement approvals.' }
  };

  const currentTitle = titles[activeNav] || titles.audit_log;

  const actionColors: Record<string, string> = {
    LOGIN: 'bg-sky-50 text-sky-700 border-sky-200',
    PII_VIEW: 'bg-amber-50 text-amber-700 border-amber-200',
    CONTACT_LOG: 'bg-[#2563EB]/20 text-[#2563EB] border-[#2563EB]/30',
    SETTLEMENT_SUBMIT: 'bg-violet-950 text-violet-300 border-violet-800',
    APPROVAL_GRANT: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    CERTIFY_COUNTRY: 'bg-violet-950 text-violet-300 border-violet-800',
    ACTIVATE_COUNTRY: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    DEBTOR_VERIFY: 'bg-sky-50 text-sky-700 border-sky-200',
    EXPORT: 'bg-rose-50 text-rose-700 border-rose-200',
    AI_ACCEPT: 'bg-[#2563EB]/20 text-[#2563EB] border-[#2563EB]/30',
    AI_OVERRIDE: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#2563EB]" />
            {currentTitle.title}
          </h1>
          <p className="text-xs text-slate-600">{currentTitle.subtitle}</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl border border-slate-300 transition-colors">
          <Download className="w-3.5 h-3.5" />
          Export Audit Log
        </button>
      </div>

      {/* Note */}
      <div className="bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-[11px] text-slate-600 italic">
        Audit data is immutable — no edit or delete controls are available on any record (§22.1). All PII access is logged with reason codes.
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search by actor, action, object…"
            className="w-full bg-white border border-slate-300 rounded-xl pl-8 pr-4 py-2 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </div>
        <select className="bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2">
          <option>All Actions</option>
          <option>PII_VIEW</option>
          <option>APPROVAL_GRANT</option>
          <option>EXPORT</option>
          <option>LOGIN</option>
        </select>
        <select className="bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2">
          <option>All Actors</option>
          <option>Ama Darko</option>
          <option>Priscilla Quaye</option>
          <option>Nana Adjei</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 sticky top-0">
              <tr>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Actor</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Action</th>
                <th className="p-3.5">Object</th>
                <th className="p-3.5">Channel</th>
                <th className="p-3.5">IP / Device</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {auditEvents.map(ev => (
                <tr key={ev.id} className="hover:bg-slate-100/50 transition-colors">
                  <td className="p-3.5 font-mono text-slate-600 whitespace-nowrap">{ev.timestamp}</td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#2563EB]/20 text-[#2563EB] flex items-center justify-center text-[10px] font-bold shrink-0">
                        {ev.actor.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-900">{ev.actor}</span>
                    </div>
                  </td>
                  <td className="p-3.5 text-slate-600">{ev.actorRole}</td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${actionColors[ev.action] || 'bg-slate-100 text-slate-700 border-slate-300'}`}>
                      {ev.action}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="text-slate-700">{ev.objectType}</span>
                    <span className="text-slate-500 ml-1 font-mono text-[10px]">/{ev.objectId}</span>
                  </td>
                  <td className="p-3.5 text-slate-600">{ev.sourceChannel}</td>
                  <td className="p-3.5 font-mono text-[11px] text-slate-500 max-w-xs truncate">{ev.ipDevice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3.5 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Showing {auditEvents.length} of {auditEvents.length} records (demo dataset)</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900">← Prev</button>
            <button className="px-3 py-1 bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900">Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
