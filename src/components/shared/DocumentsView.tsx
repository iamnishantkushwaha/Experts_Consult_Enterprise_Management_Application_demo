'use client';

import React from 'react';
import { FileText } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function DocumentsView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const documents = useAppStore((s) => s.documents);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <FileText className="w-6 h-6 text-[#0E9F8E]" />
          Documents &amp; Proof of Debt Repository
        </h1>
        <p className="text-xs text-slate-400">Contracts, loan agreements, bank statements, legal notices, and dispute evidence.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">Doc ID</th>
                <th className="p-3">Title / Type</th>
                <th className="p-3">Account ID</th>
                <th className="p-3">Uploaded Date</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {documents.map(d => (
                <tr key={d.id} className="hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-bold text-white">{d.id}</td>
                  <td className="p-3 font-semibold text-slate-200">
                    {d.title}
                    <div className="text-[10px] text-slate-500 font-normal">{d.type}</div>
                  </td>
                  <td className="p-3 font-mono text-[#0E9F8E]">{d.accountId}</td>
                  <td className="p-3 font-mono text-slate-400">{d.uploadedDate}</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {d.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button onClick={() => onNavigate?.('account_detail', { id: d.accountId })} className="text-[#0E9F8E] hover:underline font-semibold">
                      Inspect Account
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
