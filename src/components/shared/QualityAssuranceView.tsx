'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function QualityAssuranceView({ onNavigate }: { onNavigate?: (view: string, data?: Record<string, unknown>) => void }) {
  const accounts = useAppStore((s) => s.accounts);

  const qaAudits = [
    { id: 'QA-1092', officer: 'Ama Darko', account: 'ACC-100232', score: 96, status: 'Passed', reviewer: 'Efua Boateng', date: '2026-09-30', finding: 'Excellent disclosure & identity verification' },
    { id: 'QA-1093', officer: 'Kwesi Appiah', account: 'ACC-100377', score: 88, status: 'Passed', reviewer: 'Efua Boateng', date: '2026-09-29', finding: 'Minor: Missing SLA timestamp follow-up note' },
    { id: 'QA-1094', officer: 'Grace Wambui', account: 'ACC-200114', score: 72, status: 'Coaching Required', reviewer: 'David Mensah-Bonsu', date: '2026-09-28', finding: 'Tone exceeded empathy threshold during dispute pitch' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-[#0E9F8E]" />
          Quality Assurance &amp; Call Audit Reviews
        </h1>
        <p className="text-xs text-slate-400">Call scoring, compliance checks, officer coaching logs, and regulatory audit sampling.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs text-slate-400 font-semibold mb-1">Average Team QA Score</div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">91.4%</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs text-slate-400 font-semibold mb-1">Audits Completed (MTD)</div>
          <div className="text-2xl font-extrabold text-white font-mono">48</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs text-slate-400 font-semibold mb-1">Coaching Sessions Pending</div>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">2</div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl p-6">
        <h3 className="text-sm font-bold text-white mb-4">Recent QA Reviews</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">Audit Ref</th>
                <th className="p-3">Officer</th>
                <th className="p-3">Account</th>
                <th className="p-3 text-center">Score</th>
                <th className="p-3">Finding Summary</th>
                <th className="p-3">Reviewer</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {qaAudits.map(q => (
                <tr key={q.id} className="hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-bold text-white">{q.id}</td>
                  <td className="p-3 font-semibold text-slate-200">{q.officer}</td>
                  <td className="p-3 font-mono text-[#0E9F8E]">{q.account}</td>
                  <td className="p-3 text-center font-mono font-bold text-emerald-400">{q.score}%</td>
                  <td className="p-3 text-slate-300">{q.finding}</td>
                  <td className="p-3 text-slate-400">{q.reviewer}</td>
                  <td className="p-3 text-right">
                    <button onClick={() => onNavigate?.('account_detail', { id: q.account })} className="text-[#0E9F8E] hover:underline font-semibold">
                      Inspect →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
