'use client';

import React from 'react';
import { ShieldAlert, Globe, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function ComplianceDashboardView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const countries = useAppStore((s) => s.countries);
  const complaints = useAppStore((s) => s.complaints);
  const incidents = useAppStore((s) => s.incidents);
  const complianceRequirements = useAppStore((s) => s.complianceRequirements);

  const openComplaints = complaints.filter(c => c.status !== 'Closed');
  const highSeverity = complaints.filter(c => c.severity === 'High' && c.status !== 'Closed');
  const expiringReqs = complianceRequirements.filter(r => r.status === 'Expiring' || r.status === 'Missing');
  const openIncidents = incidents.filter(i => i.status !== 'Closed');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-[#0E9F8E]" />
          Compliance Dashboard
        </h1>
        <p className="text-xs text-slate-400">Regulatory posture, complaint lifecycle, incident management, and country certification status.</p>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Countries Certified', value: countries.filter(c => c.certification === 'Certified').length + '/' + countries.length, color: 'text-[#0E9F8E]' },
          { label: 'Open Complaints', value: openComplaints.length.toString(), color: highSeverity.length > 0 ? 'text-rose-400' : 'text-amber-400' },
          { label: 'High Severity', value: highSeverity.length.toString(), color: 'text-rose-400' },
          { label: 'Expiring Licences', value: expiringReqs.length.toString(), color: expiringReqs.length > 0 ? 'text-amber-400' : 'text-slate-300' },
          { label: 'Open Incidents', value: openIncidents.length.toString(), color: openIncidents.length > 0 ? 'text-amber-400' : 'text-[#0E9F8E]' },
        ].map(t => (
          <div key={t.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 hover:border-slate-700 transition-colors">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{t.label}</div>
            <div className={`text-2xl font-extrabold font-mono mt-1 ${t.color}`}>{t.value}</div>
          </div>
        ))}
      </div>

      {/* Country Certification Heat Map */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#0E9F8E]" />
            Country Regulatory Status
          </h3>
          <button onClick={() => onNavigate?.('country_register')} className="text-xs text-[#0E9F8E] hover:underline">View full register →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">Country</th>
                <th className="p-3">Entity</th>
                <th className="p-3">Status</th>
                <th className="p-3">Certification</th>
                <th className="p-3">Activation Step</th>
                <th className="p-3">Requirements</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {countries.map(c => {
                const reqs = complianceRequirements.filter(r => r.countryCode === c.code);
                const valid = reqs.filter(r => r.status === 'Valid').length;
                const total = reqs.length;
                return (
                  <tr key={c.code} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-3">
                      <span className="font-semibold text-white">{c.name}</span>
                      <span className="text-slate-500 ml-1 text-[10px] font-mono">({c.code})</span>
                    </td>
                    <td className="p-3 text-slate-400 font-mono text-[11px]">{c.entityId}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        c.status === 'Active' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                        c.status === 'Activating' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                        'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>{c.status}</span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        c.certification === 'Certified' ? 'bg-[#0E9F8E]/20 text-[#0E9F8E] border-[#0E9F8E]/30' :
                        c.certification === 'Pending' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                        'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>{c.certification}</span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-950 rounded-full h-1.5 overflow-hidden max-w-24">
                          <div className="bg-[#0E9F8E] h-1.5 rounded-full" style={{ width: `${(c.activationStep / 11) * 100}%` }} />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">{c.activationStep}/11</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="text-[11px] font-mono">
                        <span className="text-[#0E9F8E]">{valid}</span>
                        <span className="text-slate-500">/{total}</span>
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {c.certification === 'Pending' && (
                        <button className="px-3 py-1.5 bg-[#0E9F8E] hover:bg-[#0c8879] text-white font-semibold rounded-xl text-[11px] transition-colors">
                          Certify
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Complaints */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Open Complaints
            </h3>
            <button onClick={() => onNavigate?.('complaints')} className="text-xs text-[#0E9F8E] hover:underline">View all →</button>
          </div>
          <div className="space-y-2.5">
            {openComplaints.slice(0, 5).map(c => (
              <div key={c.id} className={`p-3 bg-slate-950 border rounded-xl space-y-1 ${c.severity === 'High' ? 'border-rose-800/60' : 'border-slate-800'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-white">{c.id}</span>
                    <span className="text-slate-400 ml-1.5 text-[11px]">— {c.debtorName}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    c.severity === 'High' ? 'bg-rose-950 text-rose-300 border-rose-800' :
                    c.severity === 'Medium' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                    'bg-slate-800 text-slate-300 border-slate-700'
                  }`}>{c.severity}</span>
                </div>
                <div className="text-[11px] text-slate-400">{c.category} · {c.source} · Status: <span className="text-slate-200">{c.status}</span></div>
                <div className="text-[10px] text-slate-500">SLA: {c.slaDue}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Incidents */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0E9F8E]" />
              Incidents
            </h3>
            <button onClick={() => onNavigate?.('incidents')} className="text-xs text-[#0E9F8E] hover:underline">View all →</button>
          </div>
          <div className="space-y-2.5">
            {incidents.map(inc => (
              <div key={inc.id} className={`p-3 bg-slate-950 border rounded-xl space-y-1 ${inc.severity === 'High' ? 'border-rose-800/60' : 'border-slate-800'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-white">{inc.id}</span>
                    <span className="text-slate-400 ml-1.5 text-[11px]">— {inc.category}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    inc.status === 'Closed' ? 'bg-slate-800 text-slate-400 border-slate-700' :
                    inc.severity === 'High' ? 'bg-rose-950 text-rose-300 border-rose-800' :
                    'bg-amber-950 text-amber-300 border-amber-800'
                  }`}>{inc.status}</span>
                </div>
                <div className="text-[11px] text-slate-400">System: {inc.affectedSystem}</div>
                <div className="text-[11px] text-slate-300">{inc.response}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
