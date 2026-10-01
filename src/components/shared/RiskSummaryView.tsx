'use client';

import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, FileCheck, CheckCircle2, XCircle, Info, Lock } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useToast } from '../common/Toast';

export function RiskSummaryView({ activeNav = 'risk_summary' }: { activeNav?: string }) {
  const { toast } = useToast();
  
  const complaints = useAppStore((s) => s.complaints);
  const incidents = useAppStore((s) => s.incidents);
  const complianceReqs = useAppStore((s) => s.complianceReqs);
  const accounts = useAppStore((s) => s.accounts);
  
  const [showBriefingModal, setShowBriefingModal] = useState(false);
  const [briefingTopic, setBriefingTopic] = useState('');

  const openComplaints = complaints.filter(c => c.status !== 'Closed').length;
  const openIncidents = incidents.filter(i => i.status !== 'Closed').length;
  const expiringReqs = complianceReqs.filter(r => r.status === 'Expiring' || r.status === 'Due for review').length;
  const highRiskAccounts = accounts.filter(a => a.risk === 'High').length;

  const handleRequestBriefing = () => {
    toast('Briefing requested', 'success');
    setShowBriefingModal(false);
    setBriefingTopic('');
  };

  // Determine section title & subtitle based on activeNav
  const navTitles: Record<string, { title: string; subtitle: string }> = {
    country_register: { title: 'Country Regulatory Register', subtitle: 'Jurisdictional licenses, central bank permits, and data protection filings across operational countries.' },
    kyc_conflicts: { title: 'KYC & Conflict of Interest Checks', subtitle: 'Debtor identity verification statuses and potential conflict screenings.' },
    complaints: { title: 'Complaints Register', subtitle: 'Tracked debtor grievances, harassment allegations, and resolution SLAs.' },
    incidents: { title: 'Compliance Incidents', subtitle: 'Operational risk events, unauthorized disclosures, and regulatory escalation logs.' },
    risk_ratings: { title: 'Portfolio Risk Ratings', subtitle: 'Automated AML, jurisdiction, and legal risk classification matrix.' },
    audit_findings: { title: 'Audit Findings & Remediation', subtitle: 'Internal and external regulatory audit recommendations and action items.' },
    risk_summary: { title: 'Risk & Compliance Summary', subtitle: 'Executive overview of complaints, incidents, and regulatory posture.' },
  };

  const currentInfo = navTitles[activeNav] || navTitles.risk_summary;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-[#0E9F8E]" />
            {currentInfo.title}
          </h1>
          <p className="text-xs text-slate-400">{currentInfo.subtitle}</p>
        </div>
        <button
          onClick={() => setShowBriefingModal(true)}
          className="bg-[#0E9F8E] hover:bg-[#0c8879] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg transition-colors"
        >
          Request Compliance Briefing
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Open Complaints */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/50 flex items-center justify-center text-amber-500">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">Open Complaints</span>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{openComplaints}</div>
        </div>

        {/* Compliance Incidents */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-rose-950/50 flex items-center justify-center text-rose-500">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">Compliance Incidents</span>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{openIncidents}</div>
        </div>

        {/* Expiring Licences */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-sky-950/50 flex items-center justify-center text-sky-500">
              <FileCheck className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">Licences Expiring ≤90d</span>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{expiringReqs}</div>
        </div>

        {/* High Risk Accounts */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-rose-950/50 flex items-center justify-center text-rose-500">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">High-Risk Accounts</span>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{highRiskAccounts}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white mb-4">Complaints & Incidents Overview</h3>
          <div className="h-64 flex items-center justify-center border border-dashed border-slate-800 rounded-xl bg-slate-950">
             <span className="text-xs text-slate-500 flex items-center gap-2">
               <Info className="w-4 h-4" /> Interactive charts would render here using Recharts
             </span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white mb-4">Country Compliance Heatmap</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3">Country</th>
                  <th className="p-3 text-center">Licensing</th>
                  <th className="p-3 text-center">Privacy</th>
                  <th className="p-3 text-center">AML/KYC</th>
                  <th className="p-3 text-center">Cybersecurity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                {['Ghana', 'Kenya', 'UK', 'Nigeria'].map(country => (
                   <tr key={country} className="hover:bg-slate-800/50">
                     <td className="p-3 font-semibold text-white">{country}</td>
                     <td className="p-3 text-center">
                        <CheckCircle2 className={`w-4 h-4 mx-auto ${country === 'Nigeria' ? 'text-rose-500' : 'text-emerald-500'}`} />
                     </td>
                     <td className="p-3 text-center">
                        <CheckCircle2 className="w-4 h-4 mx-auto text-emerald-500" />
                     </td>
                     <td className="p-3 text-center">
                        <CheckCircle2 className="w-4 h-4 mx-auto text-emerald-500" />
                     </td>
                     <td className="p-3 text-center">
                        <CheckCircle2 className="w-4 h-4 mx-auto text-emerald-500" />
                     </td>
                   </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showBriefingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Request Compliance Briefing</h3>
            <div className="space-y-3 text-xs">
              <label className="block text-slate-300 font-semibold mb-1">Topic</label>
              <input 
                type="text" 
                value={briefingTopic} 
                onChange={(e) => setBriefingTopic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white" 
                placeholder="e.g. Nigeria Activation Status"
              />
              <label className="block text-slate-300 font-semibold mb-1 mt-3">Due Date</label>
              <input 
                type="date" 
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white" 
              />
              <label className="block text-slate-300 font-semibold mb-1 mt-3">Note</label>
              <textarea 
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white" 
                rows={3}
                placeholder="Specific questions for the Compliance team..."
              ></textarea>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowBriefingModal(false)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                disabled={!briefingTopic}
                onClick={handleRequestBriefing}
                className="px-4 py-2 text-xs font-semibold bg-[#0E9F8E] text-white disabled:opacity-50 rounded-xl shadow-lg"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
