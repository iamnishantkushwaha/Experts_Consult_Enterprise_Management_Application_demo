'use client';

import React, { useState } from 'react';
import { Briefcase, Building2, Plus, Search, ArrowUpRight } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatMoney } from '@/lib/mock-data';
import { PortfolioIntakeModal } from './PortfolioIntakeModal';

export function ClientsPortfoliosView({ activeNav = 'clients_portfolios', onNavigate }: { activeNav?: string; onNavigate?: (view: string, data?: Record<string, unknown>) => void }) {
  const portfolios = useAppStore((s) => s.portfolios);
  const clients = useAppStore((s) => s.clients);
  const [showIntakeModal, setShowIntakeModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredPortfolios = portfolios.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAssigned = portfolios.reduce((acc, p) => acc + (p.assignedUSD * 100), 0);
  const totalRecovered = portfolios.reduce((acc, p) => acc + (p.recoveredUSD * 100), 0);
  const overallRate = totalAssigned > 0 ? ((totalRecovered / totalAssigned) * 100).toFixed(1) : '0';

  const adminTitles: Record<string, { title: string; subtitle: string }> = {
    organization: { title: 'Organization & Group Operating Entities', subtitle: 'Legal entities, regional branch offices, and multi-country corporate structure.' },
    users_roles: { title: 'Users & System RBAC Roles', subtitle: 'Global user directory, identity mappings, and permission assignments.' },
    workflow_automation: { title: 'Workflow & Automation Rules', subtitle: 'Automated dunning triggers, SLA escalations, and debt assignment workflows.' },
    authority_matrix: { title: 'Delegation of Authority Matrix', subtitle: 'Approval thresholds for settlement discounts, write-offs, and legal waivers.' },
    templates: { title: 'Document & Communication Templates', subtitle: 'SMS, WhatsApp, and legal notice template library.' },
    integrations: { title: 'Third-Party & API Integrations', subtitle: 'Core banking connectors, telecom MoMo gateways, and credit reference APIs.' },
    config_changes: { title: 'System Configuration Audit Trail', subtitle: 'Historical record of system configuration and parameter changes.' },
    system_health: { title: 'System Health & Infrastructure Telemetry', subtitle: 'Microservices uptime, DB connections, and API latency metrics.' },
    security_events: { title: 'Security & Threat Event Logs', subtitle: 'MFA enforcement, unauthorized access attempts, and IP whitelist alerts.' },
    country_performance: { title: 'Country Performance Metrics', subtitle: 'Cross-border recovery throughput and regulatory performance.' },
    clients_portfolios: { title: 'Clients & Portfolios Overview', subtitle: 'Manage institutional debt portfolios, client SLAs, allocation rules, and intake files.' },
  };

  const currentHeader = adminTitles[activeNav] || adminTitles.clients_portfolios;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-[#0E9F8E]" />
            {currentHeader.title}
          </h1>
          <p className="text-xs text-slate-400">{currentHeader.subtitle}</p>
        </div>
        {activeNav === 'clients_portfolios' && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowIntakeModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#0E9F8E] hover:bg-[#0c8879] text-white text-xs font-semibold rounded-xl transition-colors shadow-lg shadow-[#0E9F8E]/20"
            >
              <Plus className="w-4 h-4" />
              New Portfolio Intake
            </button>
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs text-slate-400 font-semibold mb-1">Total Active Clients</div>
          <div className="text-2xl font-extrabold text-white font-mono">{clients.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">{portfolios.length} Total Portfolios Onboarded</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs text-slate-400 font-semibold mb-1">Total Assigned Volume</div>
          <div className="text-2xl font-extrabold text-white font-mono">{formatMoney(totalAssigned, 'USD')}</div>
          <div className="text-[11px] text-[#0E9F8E] mt-1">Across 5 jurisdictions</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs text-slate-400 font-semibold mb-1">Overall Recovery Rate</div>
          <div className="text-2xl font-extrabold text-[#0E9F8E] font-mono">{overallRate}%</div>
          <div className="text-[11px] text-slate-400 mt-1">{formatMoney(totalRecovered, 'USD')} Recovered to date</div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search portfolios or clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0E9F8E]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-900 border border-slate-700 text-slate-300 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0E9F8E]"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Onboarding">Onboarding</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* Portfolios Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Portfolio</th>
                <th className="p-3.5">Client</th>
                <th className="p-3.5">Country</th>
                <th className="p-3.5 text-right">Assigned Value</th>
                <th className="p-3.5 text-right">Recovered</th>
                <th className="p-3.5 text-center">Accounts</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredPortfolios.map((p) => {
                const recRate = p.assignedUSD > 0 ? ((p.recoveredUSD / p.assignedUSD) * 100).toFixed(1) : '0';
                return (
                  <tr key={p.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-white text-sm">{p.name}</div>
                      <div className="text-[10px] font-mono text-slate-500">{p.id} · {p.strategy}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#0E9F8E]" />
                        {p.clientName}
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-slate-400">{p.country} ({p.currency})</td>
                    <td className="p-3.5 text-right font-mono font-bold text-white">
                      {formatMoney(p.assignedUSD * 100, 'USD')}
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold text-[#0E9F8E]">
                      {formatMoney(p.recoveredUSD * 100, 'USD')}
                      <div className="text-[10px] text-slate-400 font-normal">{recRate}%</div>
                    </td>
                    <td className="p-3.5 text-center font-mono font-bold text-slate-200">
                      {((p as unknown as Record<string, unknown>).accountCount as number ?? 120).toLocaleString()}
                    </td>
                    <td className="p-3.5 text-center">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${
                        p.status === 'Active' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                        p.status === 'Pending validation' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                        'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => onNavigate?.('portfolio_detail', { id: p.id })}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs border border-slate-700 transition-colors inline-flex items-center gap-1"
                      >
                        View
                        <ArrowUpRight className="w-3 h-3 text-[#0E9F8E]" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Portfolio Intake Modal */}
      {showIntakeModal && (
        <PortfolioIntakeModal onClose={() => setShowIntakeModal(false)} />
      )}
    </div>
  );
}
