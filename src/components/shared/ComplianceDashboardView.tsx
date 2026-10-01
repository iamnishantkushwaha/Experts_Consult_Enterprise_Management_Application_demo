'use client';

import React from 'react';
import { ShieldAlert, Globe, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function ComplianceDashboardView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const countries = useAppStore((s) => s.countries);
  const complaints = useAppStore((s) => s.complaints);
  const incidents = useAppStore((s) => s.incidents);
  const complianceReqs = useAppStore((s) => s.complianceReqs);

  const openComplaints = complaints.filter(c => c.status !== 'Closed');
  const highSeverity = complaints.filter(c => c.severity === 'High' && c.status !== 'Closed');
  const expiringReqs = complianceReqs.filter(r => r.status === 'Expiring' || r.status === 'Due for review');
  const openIncidents = incidents.filter(i => i.status !== 'Closed');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-[#2563EB]" />
          Compliance Dashboard
        </h1>
        <p className="text-xs text-slate-600">Regulatory posture, complaint lifecycle, incident management, and country certification status.</p>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Countries Certified', value: countries.filter(c => c.certification === 'Certified').length + '/' + countries.length, color: 'text-[#2563EB]' },
          { label: 'Open Complaints', value: openComplaints.length.toString(), color: highSeverity.length > 0 ? 'text-rose-600' : 'text-amber-600' },
          { label: 'High Severity', value: highSeverity.length.toString(), color: 'text-rose-600' },
          { label: 'Expiring Licences', value: expiringReqs.length.toString(), color: expiringReqs.length > 0 ? 'text-amber-600' : 'text-slate-700' },
          { label: 'Open Incidents', value: openIncidents.length.toString(), color: openIncidents.length > 0 ? 'text-amber-600' : 'text-[#2563EB]' },
        ].map(t => (
          <div key={t.label} className="bg-white border border-slate-200 rounded-2xl p-4 hover:border-slate-300 transition-colors">
            <div className="text-[10px] text-slate-600 uppercase tracking-wider font-semibold">{t.label}</div>
            <div className={`text-2xl font-extrabold font-mono mt-1 ${t.color}`}>{t.value}</div>
          </div>
        ))}
      </div>

      {/* Country Certification Heat Map */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#2563EB]" />
            Country Regulatory Status
          </h3>
          <button onClick={() => onNavigate?.('country_register')} className="text-xs text-[#2563EB] hover:underline">View full register →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
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
            <tbody className="divide-y divide-slate-200">
              {countries.map(c => {
                const reqs = complianceReqs.filter((r: { countryCode: string; status: string }) => r.countryCode === c.code);
                const valid = reqs.filter((r: { countryCode: string; status: string }) => r.status === 'Valid').length;
                const total = reqs.length;
                return (
                  <tr key={c.code} className="hover:bg-slate-100/50 transition-colors">
                    <td className="p-3">
                      <span className="font-semibold text-slate-900">{c.name}</span>
                      <span className="text-slate-500 ml-1 text-[10px] font-mono">({c.code})</span>
                    </td>
                    <td className="p-3 text-slate-600 font-mono text-[11px]">{c.entityId}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        c.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        c.status === 'Activating' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-slate-100 text-slate-600 border-slate-300'
                      }`}>{c.status}</span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        c.certification === 'Certified' ? 'bg-[#2563EB]/20 text-[#2563EB] border-[#2563EB]/30' :
                        c.certification === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-slate-100 text-slate-600 border-slate-300'
                      }`}>{c.certification}</span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-50 rounded-full h-1.5 overflow-hidden max-w-24">
                          <div className="bg-[#2563EB] h-1.5 rounded-full" style={{ width: `${(c.activationStep / 11) * 100}%` }} />
                        </div>
                        <span className="text-[10px] font-mono text-slate-600">{c.activationStep}/11</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="text-[11px] font-mono">
                        <span className="text-[#2563EB]">{valid}</span>
                        <span className="text-slate-500">/{total}</span>
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {c.certification === 'Pending' && (
                        <button className="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-xl text-[11px] transition-colors">
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
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Open Complaints
            </h3>
            <button onClick={() => onNavigate?.('complaints')} className="text-xs text-[#2563EB] hover:underline">View all →</button>
          </div>
          <div className="space-y-2.5">
            {openComplaints.slice(0, 5).map(c => (
              <div key={c.id} className={`p-3 bg-slate-50 border rounded-xl space-y-1 ${c.severity === 'High' ? 'border-rose-200/60' : 'border-slate-200'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-slate-900">{c.id}</span>
                    <span className="text-slate-600 ml-1.5 text-[11px]">— {c.debtorName}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    c.severity === 'High' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                    c.severity === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-slate-100 text-slate-700 border-slate-300'
                  }`}>{c.severity}</span>
                </div>
                <div className="text-[11px] text-slate-600">{c.category} · {c.source} · Status: <span className="text-slate-800">{c.status}</span></div>
                <div className="text-[10px] text-slate-500">SLA: {c.slaDue}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Incidents */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
              Incidents
            </h3>
            <button onClick={() => onNavigate?.('incidents')} className="text-xs text-[#2563EB] hover:underline">View all →</button>
          </div>
          <div className="space-y-2.5">
            {incidents.map(inc => (
              <div key={inc.id} className={`p-3 bg-slate-50 border rounded-xl space-y-1 ${inc.severity === 'High' ? 'border-rose-200/60' : 'border-slate-200'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-slate-900">{inc.id}</span>
                    <span className="text-slate-600 ml-1.5 text-[11px]">— {inc.category}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    inc.status === 'Closed' ? 'bg-slate-100 text-slate-600 border-slate-300' :
                    inc.severity === 'High' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                    'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>{inc.status}</span>
                </div>
                <div className="text-[11px] text-slate-600">System: {inc.affectedSystem}</div>
                <div className="text-[11px] text-slate-700">{inc.response}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
