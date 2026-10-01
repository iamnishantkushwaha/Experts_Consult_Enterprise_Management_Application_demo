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
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Scale className="w-6 h-6 text-[#0E9F8E]" />
              Legal Partner Portal — Assigned Matters
            </h1>
            <p className="text-xs text-slate-400">Scoped view for empanelled law firm (Adjei &amp; Partners LLP). Active litigation files and filings.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl p-6">
            <h3 className="text-sm font-bold text-white mb-4">Assigned Active Matters ({assignedMatters.length})</h3>
            <div className="space-y-3">
              {assignedMatters.map(m => (
                <div key={m.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#0E9F8E] text-xs">{m.id}</span>
                      <span className="font-semibold text-white text-xs">— {m.debtorName}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">{m.stage}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Claim: <strong className="text-white font-mono">{formatMoney(m.claimMinor, m.currency)}</strong> · Court: <span className="text-slate-300">{m.jurisdiction}</span></div>
                  </div>
                  <button onClick={() => onNavigate?.('account_detail')} className="px-3.5 py-2 bg-[#0E9F8E] hover:bg-[#0c8879] text-white rounded-xl text-xs font-semibold">
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
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Scale className="w-6 h-6 text-amber-400" />
              Court Deadlines &amp; Hearing Calendar
            </h1>
            <p className="text-xs text-slate-400">Statutory deadlines, court hearing dates, and required affidavit submissions.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            {[
              { caseId: 'LEG-2026-001', title: 'Adwoa Trading — Summons Return Date', date: '2026-10-12', priority: 'High', location: 'High Court Commercial Div (Accra)' },
              { caseId: 'LEG-2026-004', title: 'Golden Star — Motion for Summary Judgment', date: '2026-10-18', priority: 'Urgent', location: 'High Court (Kumasi)' }
            ].map((d, i) => (
              <div key={i} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className="font-mono text-[#0E9F8E]">{d.caseId}</span>
                    <span>{d.title}</span>
                  </div>
                  <div className="text-slate-400 mt-1">{d.location} · <span className="font-mono text-amber-300">Due {d.date}</span></div>
                </div>
                <span className="px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold text-[10px]">{d.priority}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 3. Assigned Tasks */}
      {activeNav === 'assigned_tasks' && (
        <>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Scale className="w-6 h-6 text-[#0E9F8E]" />
              Assigned Field &amp; Service Tasks
            </h1>
            <p className="text-xs text-slate-400">Processes for personal service of court documents, asset tracing orders, and execution of writs.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            {[
              { task: 'Execute Writ of Fi-Fa on Vehicles (Ghana Ports Authority ACC-100232)', status: 'In Progress', assignee: 'Bailiff Mensah' },
              { task: 'Serve Demand Notice & Statutory Letter of Intent', status: 'Pending Verification', assignee: 'Adjei & Partners' }
            ].map((t, idx) => (
              <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-white">{t.task}</div>
                  <div className="text-slate-400 mt-1">Assigned to: <span className="text-slate-200">{t.assignee}</span></div>
                </div>
                <span className="px-2.5 py-1 rounded bg-sky-950 text-sky-300 border border-sky-800 font-bold text-[10px]">{t.status}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 4. Contract & SLA */}
      {activeNav === 'contract_sla' && (
        <>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Scale className="w-6 h-6 text-[#0E9F8E]" />
              Firm Retainer Contract &amp; Performance SLA
            </h1>
            <p className="text-xs text-slate-400">Master legal services agreement, litigation turn-around SLAs, and commission fee tiers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 text-xs">
              <div className="font-bold text-white text-sm">Contract Details</div>
              <div className="text-slate-400">Empanelled Firm: <span className="text-white font-semibold">Adjei &amp; Partners LLP</span></div>
              <div className="text-slate-400">Jurisdiction: <span className="text-white font-semibold">Ghana (High Court / Circuit Court)</span></div>
              <div className="text-slate-400">Contingency Fee Scale: <span className="text-emerald-400 font-mono font-bold">12.5% of Recovered Funds</span></div>
              <div className="text-slate-400">Status: <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold text-[10px]">Active Retainer</span></div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 text-xs">
              <div className="font-bold text-white text-sm">Service Level Metrics</div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Average Filing Turnaround</span>
                <span className="text-white font-mono font-bold">4.2 Days (Target: &le; 5d)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Court Appearance Rate</span>
                <span className="text-emerald-400 font-mono font-bold">98.5%</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">SLA Rating</span>
                <span className="text-[#0E9F8E] font-bold">Tier A Preferred Partner</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
