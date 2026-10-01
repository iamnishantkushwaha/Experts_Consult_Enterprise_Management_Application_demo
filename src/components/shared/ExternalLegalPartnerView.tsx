'use client';

import React from 'react';
import { Scale } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatMoney } from '@/lib/mock-data';

export function ExternalLegalPartnerView({ activeNav = 'assigned_matters', onNavigate }: { activeNav?: string; onNavigate?: (view: string) => void }) {
  const legalMatters = useAppStore((s) => s.legalMatters);
  const assignedMatters = legalMatters.filter(m => m.counselName.toLowerCase().includes('adjei') || m.counselName.toLowerCase().includes('hartwell') || m.counselName.toLowerCase().includes('mwangi'));

  return (
    <div className="space-y-6">
      {/* 1. Assigned Matters */}
      {(activeNav === 'assigned_matters' || !activeNav) && (
        <>
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-6 h-6 text-[#2563EB]" />
              Legal Partner Portal — Assigned Matters
            </h1>
            <p className="text-xs text-slate-600">Scoped view for empanelled law firm (Adjei &amp; Partners LLP). Active litigation files and filings.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Assigned Active Matters ({assignedMatters.length})</h3>
            <div className="space-y-3">
              {assignedMatters.map(m => (
                <div key={m.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#2563EB] text-xs">{m.id}</span>
                      <span className="font-semibold text-slate-900 text-xs">— {m.debtorName}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-300">{m.stage}</span>
                    </div>
                    <div className="text-xs text-slate-600 mt-1">Claim: <strong className="text-slate-900 font-mono">{formatMoney(m.claimMinor, m.currency)}</strong> · Court: <span className="text-slate-700">{m.jurisdiction}</span></div>
                  </div>
                  <button onClick={() => onNavigate?.('account_detail')} className="px-3.5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-semibold">
                    Submit Filing
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* 2. Deadlines */}
      {activeNav === 'deadlines' && (
        <>
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-6 h-6 text-amber-600" />
              Court Deadlines &amp; Hearing Calendar
            </h1>
            <p className="text-xs text-slate-600">Statutory deadlines, court hearing dates, and required affidavit submissions.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
            {[
              { caseId: 'LEG-2026-001', title: 'Adwoa Trading — Summons Return Date', date: '2026-10-12', priority: 'High', location: 'High Court Commercial Div (Accra)' },
              { caseId: 'LEG-2026-004', title: 'Golden Star — Motion for Summary Judgment', date: '2026-10-18', priority: 'Urgent', location: 'High Court (Kumasi)' }
            ].map((d, i) => (
              <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="font-mono text-[#2563EB]">{d.caseId}</span>
                    <span>{d.title}</span>
                  </div>
                  <div className="text-slate-600 mt-1">{d.location} · <span className="font-mono text-amber-700">Due {d.date}</span></div>
                </div>
                <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[10px]">{d.priority}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 3. Assigned Tasks */}
      {activeNav === 'assigned_tasks' && (
        <>
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-6 h-6 text-[#2563EB]" />
              Assigned Field &amp; Service Tasks
            </h1>
            <p className="text-xs text-slate-600">Processes for personal service of court documents, asset tracing orders, and execution of writs.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
            {[
              { task: 'Execute Writ of Fi-Fa on Vehicles (Ghana Ports Authority ACC-100232)', status: 'In Progress', assignee: 'Bailiff Mensah' },
              { task: 'Serve Demand Notice & Statutory Letter of Intent', status: 'Pending Verification', assignee: 'Adjei & Partners' }
            ].map((t, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-slate-900">{t.task}</div>
                  <div className="text-slate-600 mt-1">Assigned to: <span className="text-slate-800">{t.assignee}</span></div>
                </div>
                <span className="px-2.5 py-1 rounded bg-sky-50 text-sky-700 border border-sky-200 font-bold text-[10px]">{t.status}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 4. Contract & SLA */}
      {activeNav === 'contract_sla' && (
        <>
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-6 h-6 text-[#2563EB]" />
              Firm Retainer Contract &amp; Performance SLA
            </h1>
            <p className="text-xs text-slate-600">Master legal services agreement, litigation turn-around SLAs, and commission fee tiers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 text-xs">
              <div className="font-bold text-slate-900 text-sm">Contract Details</div>
              <div className="text-slate-600">Empanelled Firm: <span className="text-slate-900 font-semibold">Adjei &amp; Partners LLP</span></div>
              <div className="text-slate-600">Jurisdiction: <span className="text-slate-900 font-semibold">Ghana (High Court / Circuit Court)</span></div>
              <div className="text-slate-600">Contingency Fee Scale: <span className="text-emerald-600 font-mono font-bold">12.5% of Recovered Funds</span></div>
              <div className="text-slate-600">Status: <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px]">Active Retainer</span></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 text-xs">
              <div className="font-bold text-slate-900 text-sm">Service Level Metrics</div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Average Filing Turnaround</span>
                <span className="text-slate-900 font-mono font-bold">4.2 Days (Target: &le; 5d)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Court Appearance Rate</span>
                <span className="text-emerald-600 font-mono font-bold">98.5%</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">SLA Rating</span>
                <span className="text-[#2563EB] font-bold">Tier A Preferred Partner</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
