'use client';

import React from 'react';
import { Activity } from 'lucide-react';

export function WorkflowMonitorView({ onNavigate }: { onNavigate?: (view: string) => void }) {

  const workflowTriggers = [
    { name: 'SLA Warning Trigger', event: 'Account inactive > 14 days', action: 'Auto-escalate to Recovery Manager', status: 'Active', executions: 142 },
    { name: 'Settlement Discount Limit Check', event: 'Discount requested > Authority limit', action: 'Route to Approvals Inbox overlay', status: 'Active', executions: 38 },
    { name: 'Payment Auto-Match', event: 'Statement payment reference matches account', action: 'Set status Allocated & notify officer', status: 'Active', executions: 890 },
    { name: 'Legal Referral Gateway', event: 'Debtor dispute unresolved > 60 days', action: 'Generate legal referral pack', status: 'Active', executions: 12 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Activity className="w-6 h-6 text-[#2563EB]" />
          Workflow Automation &amp; Triggers Monitor
        </h1>
        <p className="text-xs text-slate-600">Real-time status of event-driven automation rules, SLAs, and background execution queues.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workflowTriggers.map((w, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-start">
              <div className="font-bold text-slate-900 text-sm">{w.name}</div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {w.status}
              </span>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <div><strong className="text-slate-700">Trigger Event:</strong> {w.event}</div>
              <div><strong className="text-slate-700">Action:</strong> {w.action}</div>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-[11px] font-mono text-slate-500">
              <span>Executions: {w.executions}</span>
              <button onClick={() => onNavigate?.('audit_log')} className="text-[#2563EB] font-sans font-semibold hover:underline">
                View Logs →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
