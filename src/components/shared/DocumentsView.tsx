'use client';

import React from 'react';
import { FileText } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function DocumentsView({ onNavigate }: { onNavigate?: (view: string, data?: Record<string, unknown>) => void }) {
  const documents = useAppStore((s) => s.documents);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-6 h-6 text-[#2563EB]" />
          Documents &amp; Proof of Debt Repository
        </h1>
        <p className="text-xs text-slate-600">Contracts, loan agreements, bank statements, legal notices, and dispute evidence.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Doc ID</th>
                <th className="p-3">Title / Category</th>
                <th className="p-3">Entity ID</th>
                <th className="p-3">Uploaded Date</th>
                <th className="p-3 text-center">OCR Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {documents.map(d => (
                <tr key={d.id} className="hover:bg-slate-100/50">
                  <td className="p-3 font-mono font-bold text-slate-900">{d.id}</td>
                  <td className="p-3 font-semibold text-slate-800">
                    {d.fileName}
                    <div className="text-[10px] text-slate-500 font-normal">{d.category}</div>
                  </td>
                  <td className="p-3 font-mono text-[#2563EB]">{d.entityId}</td>
                  <td className="p-3 font-mono text-slate-600">{d.uploadedAt}</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {d.ocrStatus}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button onClick={() => onNavigate?.('account_detail', { id: d.entityId })} className="text-[#2563EB] hover:underline font-semibold">
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
