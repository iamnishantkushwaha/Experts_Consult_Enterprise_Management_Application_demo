'use client';

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Building2,
  PieChart,
  CheckSquare,
  ShieldAlert,
  FileText,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  User as UserIcon,
  RotateCcw,
  LogOut,
  Globe,
  Briefcase,
  Users,
  Scale,
  Settings,
  HelpCircle,
  Smartphone,
  Wifi,
  WifiOff,
  ChevronDown,
  X,
  CreditCard,
  FileCheck,
  Zap,
  Lock,
  Eye,
  BookOpen
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { ROLE_CONFIGS } from '@/lib/mock-data';
import { RoleId, CountryCode } from '@/lib/types';
import { useToast } from '../common/Toast';
import { GuidedDemoGuide } from '../common/GuidedDemoGuide';

interface ShellProps {
  children: React.ReactNode;
  activeNav?: string;
  onNavigate?: (navId: string, itemData?: Record<string, unknown>) => void;
}

export function Shell({ children, activeNav = 'dashboard', onNavigate }: ShellProps) {
  const { toast } = useToast();

  // Store selections
  const currentRole = useAppStore((s) => s.currentRole);
  const selectedCountry = useAppStore((s) => s.selectedCountry);
  const switchRole = useAppStore((s) => s.switchRole);
  const setSelectedCountry = useAppStore((s) => s.setSelectedCountry);
  const resetDemoData = useAppStore((s) => s.resetDemoData);
  const notifications = useAppStore((s) => s.notifications);
  const markNotificationRead = useAppStore((s) => s.markNotificationRead);
  const markAllNotificationsRead = useAppStore((s) => s.markAllNotificationsRead);
  const accounts = useAppStore((s) => s.accounts);
  const debtors = useAppStore((s) => s.debtors);
  const portfolios = useAppStore((s) => s.portfolios);
  const clients = useAppStore((s) => s.clients);
  const legalMatters = useAppStore((s) => s.legalMatters);
  const mobileMode = useAppStore((s) => s.mobileMode);
  const isOffline = useAppStore((s) => s.isOffline);
  const setIsOffline = useAppStore((s) => s.setIsOffline);
  const pendingSyncCount = useAppStore((s) => s.pendingSyncCount);
  const clientViewerMode = useAppStore((s) => s.clientViewerMode);
  const setClientViewerMode = useAppStore((s) => s.setClientViewerMode);

  // Local state
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showNotificationPopover, setShowNotificationPopover] = useState(false);
  const [showUserMenuPopover, setShowUserMenuPopover] = useState(false);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);

  const roleConfig = ROLE_CONFIGS.find((r) => r.id === currentRole) || ROLE_CONFIGS[0];

  // Shortcut key ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const input = document.getElementById('global-search-input');
        if (input) input.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter global search results
  const searchResults = React.useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return null;
    const q = searchQuery.toLowerCase();

    const matchingAccounts = accounts.filter(
      (a) => a.id.toLowerCase().includes(q) || a.debtorName.toLowerCase().includes(q)
    );
    const matchingDebtors = debtors.filter(
      (d) => d.id.toLowerCase().includes(q) || d.legalName.toLowerCase().includes(q)
    );
    const matchingPortfolios = portfolios.filter(
      (p) => p.id.toLowerCase().includes(q) || p.name.toLowerCase().includes(q)
    );
    const matchingClients = clients.filter(
      (c) => c.id.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
    );
    const matchingCases = legalMatters.filter(
      (m) => m.id.toLowerCase().includes(q) || m.debtorName.toLowerCase().includes(q)
    );

    return {
      accounts: matchingAccounts.slice(0, 4),
      debtors: matchingDebtors.slice(0, 3),
      portfolios: matchingPortfolios.slice(0, 3),
      clients: matchingClients.slice(0, 3),
      cases: matchingCases.slice(0, 3)
    };
  }, [searchQuery, accounts, debtors, portfolios, clients, legalMatters]);

  // Sidebar nav items per role
  const getNavItems = () => {
    switch (currentRole) {
      case 'executive':
        return [
          { id: 'command_center', label: 'Command Center', icon: LayoutDashboard },
          { id: 'clients_portfolios', label: 'Clients & Portfolios', icon: Building2 },
          { id: 'country_performance', label: 'Country Performance', icon: Globe },
          { id: 'approvals', label: 'Approvals', icon: CheckSquare },
          { id: 'risk_summary', label: 'Risk & Compliance', icon: ShieldAlert },
          { id: 'reports', label: 'Reports', icon: FileText },
          { id: 'notifications', label: 'Notifications', icon: Bell }
        ];
      case 'cfo':
        return [
          { id: 'finance_dashboard', label: 'Finance Dashboard', icon: LayoutDashboard },
          { id: 'payments', label: 'Payments', icon: CreditCard },
          { id: 'reconciliation', label: 'Reconciliation', icon: Zap },
          { id: 'fees_billing', label: 'Fees & Billing', icon: FileCheck },
          { id: 'remittances', label: 'Remittances', icon: Building2 },
          { id: 'approvals', label: 'Approvals', icon: CheckSquare },
          { id: 'reports', label: 'Reports', icon: FileText },
          { id: 'notifications', label: 'Notifications', icon: Bell }
        ];
      case 'coo':
        return [
          { id: 'operations_dashboard', label: 'Operations Dashboard', icon: LayoutDashboard },
          { id: 'portfolio_allocation', label: 'Portfolio Allocation', icon: Briefcase },
          { id: 'teams_productivity', label: 'Teams & Productivity', icon: Users },
          { id: 'quality_assurance', label: 'Quality Assurance', icon: ShieldAlert },
          { id: 'escalations', label: 'Escalations', icon: ShieldAlert },
          { id: 'workflow_monitor', label: 'Workflow Monitor', icon: Zap },
          { id: 'approvals', label: 'Approvals', icon: CheckSquare },
          { id: 'reports', label: 'Reports', icon: FileText },
          { id: 'notifications', label: 'Notifications', icon: Bell }
        ];
      case 'recovery_manager':
        return [
          { id: 'team_dashboard', label: 'Team Dashboard', icon: LayoutDashboard },
          { id: 'team_accounts', label: 'Team Accounts', icon: Briefcase },
          { id: 'approvals', label: 'Approvals', icon: CheckSquare },
          { id: 'qa_review', label: 'QA Review', icon: ShieldAlert },
          { id: 'escalations', label: 'Escalations', icon: ShieldAlert },
          { id: 'team_performance', label: 'Team Performance', icon: Users },
          { id: 'notifications', label: 'Notifications', icon: Bell }
        ];
      case 'recovery_officer':
        return [
          { id: 'my_queue', label: 'My Queue', icon: LayoutDashboard },
          { id: 'promises_plans', label: 'Promises & Plans', icon: CheckSquare },
          { id: 'tasks', label: 'Tasks', icon: FileCheck },
          { id: 'documents', label: 'Documents', icon: FileText },
          { id: 'notifications', label: 'Notifications', icon: Bell }
        ];
      case 'investigator':
        return [
          { id: 'my_investigations', label: 'My Investigations', icon: LayoutDashboard },
          { id: 'notifications', label: 'Notifications', icon: Bell }
        ];
      case 'legal_manager':
        return [
          { id: 'legal_dashboard', label: 'Legal Dashboard', icon: LayoutDashboard },
          { id: 'referrals', label: 'Referrals Pipeline', icon: Scale },
          { id: 'legal_matters', label: 'Legal Matters', icon: Briefcase },
          { id: 'deadlines_hearings', label: 'Deadlines & Hearings', icon: CheckSquare },
          { id: 'counsel_network', label: 'Counsel Network', icon: Users },
          { id: 'notifications', label: 'Notifications', icon: Bell }
        ];
      case 'compliance':
        return [
          { id: 'compliance_dashboard', label: 'Compliance Dashboard', icon: LayoutDashboard },
          { id: 'country_register', label: 'Country Register', icon: Globe },
          { id: 'kyc_conflicts', label: 'KYC & Conflicts', icon: ShieldAlert },
          { id: 'complaints', label: 'Complaints', icon: ShieldAlert },
          { id: 'incidents', label: 'Incidents', icon: ShieldAlert },
          { id: 'risk_ratings', label: 'Risk Ratings', icon: PieChart },
          { id: 'audit_findings', label: 'Audit Findings', icon: FileCheck },
          { id: 'notifications', label: 'Notifications', icon: Bell }
        ];
      case 'super_admin':
        return [
          { id: 'admin_overview', label: 'Admin Overview', icon: LayoutDashboard },
          { id: 'organization', label: 'Organization', icon: Building2 },
          { id: 'users_roles', label: 'Users & Roles', icon: Users },
          { id: 'workflow_automation', label: 'Workflow & Automation', icon: Zap },
          { id: 'authority_matrix', label: 'Authority Matrix', icon: Scale },
          { id: 'templates', label: 'Templates', icon: FileText },
          { id: 'integrations', label: 'Integrations', icon: Settings },
          { id: 'config_changes', label: 'Config Changes', icon: FileCheck },
          { id: 'system_health', label: 'System Health', icon: Zap },
          { id: 'security_events', label: 'Security Events', icon: ShieldAlert }
        ];
      case 'auditor':
        return [
          { id: 'audit_log', label: 'Audit Log', icon: BookOpen },
          { id: 'access_report', label: 'Access Report', icon: FileText },
          { id: 'evidence_sampling', label: 'Evidence Sampling', icon: FileCheck },
          { id: 'reports', label: 'Reports', icon: PieChart }
        ];
      case 'hr':
        return [
          { id: 'staff_directory', label: 'Staff Directory', icon: Users },
          { id: 'training_competency', label: 'Training & Competency', icon: CheckSquare },
          { id: 'access_lifecycle', label: 'Access Lifecycle', icon: Lock },
          { id: 'availability', label: 'Availability', icon: LayoutDashboard }
        ];
      case 'client_admin_volta':
      case 'client_admin_savannah':
        return [
          { id: 'portfolio_dashboard', label: 'Portfolio Dashboard', icon: LayoutDashboard },
          { id: 'accounts', label: 'Accounts', icon: Briefcase },
          { id: 'settlement_approvals', label: 'Settlement Approvals', icon: CheckSquare },
          { id: 'legal_cases', label: 'Legal Cases', icon: Scale },
          { id: 'reports', label: 'Reports', icon: FileText },
          { id: 'documents', label: 'Documents', icon: FileText },
          { id: 'remittances', label: 'Remittance Statements', icon: CreditCard },
          { id: 'messages', label: 'Messages & Requests', icon: Bell },
          { id: 'users_api', label: 'Users & API Credentials', icon: Settings }
        ];
      case 'legal_partner':
        return [
          { id: 'assigned_matters', label: 'Assigned Matters', icon: Scale },
          { id: 'deadlines', label: 'Deadlines', icon: CheckSquare },
          { id: 'messages', label: 'Messages', icon: Bell }
        ];
      case 'vendor':
        return [
          { id: 'assigned_tasks', label: 'Assigned Tasks', icon: CheckSquare },
          { id: 'contract_sla', label: 'Contract & SLA', icon: FileText },
          { id: 'messages', label: 'Messages', icon: Bell }
        ];
      case 'debtor':
        return [
          { id: 'my_account', label: 'My Account', icon: LayoutDashboard },
          { id: 'pay_now', label: 'Pay Now', icon: CreditCard },
          { id: 'payment_plan', label: 'Payment Plan Request', icon: CheckSquare },
          { id: 'dispute', label: 'Raise a Dispute', icon: ShieldAlert },
          { id: 'documents', label: 'Documents & Receipts', icon: FileText },
          { id: 'preferences', label: 'Preferences', icon: Settings },
          { id: 'complaint', label: 'Make a Complaint', icon: HelpCircle }
        ];
      default:
        return [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }];
    }
  };

  const navItems = getNavItems();
  const unreadNotifs = notifications.filter((n) => !n.read && n.roleId === currentRole);

  const hideCountrySwitcher = ['client_admin_volta', 'client_admin_savannah', 'legal_partner', 'vendor', 'debtor'].includes(currentRole);

  return (
    <div className="flex h-screen bg-[#070E1A] text-slate-100 overflow-hidden font-sans">
      {/* Guided Demo floating guide */}
      <GuidedDemoGuide />

      {/* LEFT SIDEBAR (#0B1F3A) */}
      <aside
        className={`bg-[#0B1F3A] border-r border-slate-800/80 flex flex-col justify-between transition-all duration-300 z-20 shrink-0 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Top logo header */}
        <div>
          <div className="h-16 flex items-center px-4 border-b border-slate-800/80 justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-[#0E9F8E] flex items-center justify-center font-bold text-white shadow-lg shadow-[#0E9F8E]/30 shrink-0">
                EC
              </div>
              {!collapsed && (
                <div className="truncate">
                  <div className="text-sm font-bold text-white leading-none tracking-tight">
                    EXPERTS CONSULT
                  </div>
                  <div className="text-[10px] text-[#0E9F8E] font-medium tracking-wider uppercase mt-1">
                    Enterprise Operating System
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Nav Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-160px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate?.(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#0E9F8E] text-white shadow-lg shadow-[#0E9F8E]/25'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Role Indicator & Collapse Chevron */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
          {!collapsed && (
            <div className="mb-2 px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
              <div className="truncate">
                <span className="text-slate-500 block text-[10px]">Active Persona:</span>
                <span className="font-semibold text-white">{roleConfig.personName}</span>
              </div>
              <span className="text-[9px] bg-[#0E9F8E]/20 text-[#0E9F8E] px-1.5 py-0.5 rounded font-mono">
                {roleConfig.name.split(' ')[0]}
              </span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TOP BAR */}
        <header className="h-16 bg-[#0B1F3A]/95 backdrop-blur-md border-b border-slate-800/80 px-6 flex items-center justify-between z-10 gap-4">
          {/* Left: Breadcrumbs & Clock */}
          <div className="flex items-center gap-4 text-xs text-slate-400 min-w-0">
            <div className="flex items-center gap-2 truncate">
              <span className="hover:text-white cursor-pointer" onClick={() => onNavigate?.(navItems[0].id)}>
                {roleConfig.name}
              </span>
              <span>/</span>
              <span className="font-semibold text-slate-100 truncate capitalize">
                {activeNav.replace(/_/g, ' ')}
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Thu 1 Oct 2026 · 09:30 Local</span>
            </div>
          </div>

          {/* Center: Global Search (⌘K / Ctrl+K) */}
          <div className="relative flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="global-search-input"
                type="text"
                placeholder="Global search (Accounts, Debtors, Portfolios)..."
                value={searchQuery}
                onFocus={() => setShowSearchDropdown(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-9 pr-14 py-1.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0E9F8E]"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                ⌘K
              </div>
            </div>

            {/* Dropdown Results */}
            {showSearchDropdown && searchResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 p-3 max-h-96 overflow-y-auto text-xs space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="font-semibold text-slate-400">Search Results</span>
                  <button onClick={() => setShowSearchDropdown(false)} className="text-slate-500 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {searchResults.accounts.length > 0 && (
                  <div>
                    <div className="text-[10px] font-bold uppercase text-[#0E9F8E] mb-1">Accounts</div>
                    {searchResults.accounts.map((acc) => (
                      <div
                        key={acc.id}
                        onClick={() => {
                          onNavigate?.('account_detail', acc as unknown as Record<string, unknown>);
                          setShowSearchDropdown(false);
                        }}
                        className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer flex justify-between items-center"
                      >
                        <span className="font-semibold text-white">{acc.id} — {acc.debtorName}</span>
                        <span className="text-slate-400 font-mono">{acc.currency} {(acc.balanceMinor / 100).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}

                {searchResults.debtors.length > 0 && (
                  <div>
                    <div className="text-[10px] font-bold uppercase text-amber-400 mb-1">Debtors</div>
                    {searchResults.debtors.map((d) => (
                      <div
                        key={d.id}
                        onClick={() => {
                          onNavigate?.('account_detail', { debtorId: d.id });
                          setShowSearchDropdown(false);
                        }}
                        className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer flex justify-between items-center text-slate-200"
                      >
                        <span>{d.id} — {d.legalName}</span>
                        <span className="text-slate-500 text-[11px]">{d.type}</span>
                      </div>
                    ))}
                  </div>
                )}

                {searchResults.portfolios.length > 0 && (
                  <div>
                    <div className="text-[10px] font-bold uppercase text-teal-400 mb-1">Portfolios</div>
                    {searchResults.portfolios.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onNavigate?.('portfolio_detail', p as unknown as Record<string, unknown>);
                          setShowSearchDropdown(false);
                        }}
                        className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer flex justify-between items-center text-slate-200"
                      >
                        <span>{p.id} — {p.name}</span>
                        <span className="text-slate-400">{p.clientName}</span>
                      </div>
                    ))}
                  </div>
                )}

                {searchResults.accounts.length === 0 &&
                  searchResults.debtors.length === 0 &&
                  searchResults.portfolios.length === 0 && (
                    <div className="text-center py-6 text-slate-500">No records match &quot;{searchQuery}&quot;</div>
                  )}
              </div>
            )}
          </div>

          {/* Right Controls: Country Switcher, Offline status, Notifications, User menu */}
          <div className="flex items-center gap-3">
            {/* Offline toggle for Recovery Officer */}
            {currentRole === 'recovery_officer' && (
              <button
                onClick={() => setIsOffline(!isOffline)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                  isOffline
                    ? 'bg-amber-950/80 border-amber-600 text-amber-300'
                    : 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                }`}
              >
                {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
                <span>{isOffline ? 'Offline Mode' : 'Online'}</span>
                {pendingSyncCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 bg-amber-500 text-slate-950 rounded-full font-mono text-[10px]">
                    {pendingSyncCount} pending
                  </span>
                )}
              </button>
            )}

            {/* Client Viewer Mode Banner Toggle */}
            {(currentRole === 'client_admin_volta' || currentRole === 'client_admin_savannah') && (
              <button
                onClick={() => setClientViewerMode(!clientViewerMode)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                  clientViewerMode
                    ? 'bg-sky-950 border-sky-600 text-sky-300'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{clientViewerMode ? 'Viewer Mode (Read-only)' : 'Admin Mode'}</span>
              </button>
            )}

            {/* Country / Entity Switcher Dropdown */}
            {!hideCountrySwitcher && (
              <div className="relative">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value as CountryCode | 'ALL')}
                  className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#0E9F8E]"
                >
                  <option value="ALL">🌐 All Countries</option>
                  <option value="GH">🇬🇭 Ghana (GHS)</option>
                  <option value="KE">🇰🇪 Kenya (KES)</option>
                  <option value="GB">🇬🇧 United Kingdom (GBP)</option>
                  <option value="NG" disabled>
                    🇳🇬 Nigeria (Not active)
                  </option>
                  <option value="AE" disabled>
                    🇦🇪 UAE (Not active)
                  </option>
                </select>
              </div>
            )}

            {/* Notifications Popover Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationPopover(!showNotificationPopover)}
                className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full font-mono text-[9px] font-bold flex items-center justify-center shadow-lg">
                    {unreadNotifs.length}
                  </span>
                )}
              </button>

              {showNotificationPopover && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 p-4 space-y-3 animate-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="font-bold text-xs text-white">Notifications</span>
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-[#0E9F8E] hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.slice(0, 6).map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationRead(n.id);
                          setShowNotificationPopover(false);
                          if (n.linkPage) onNavigate?.(n.linkPage, { recordId: n.linkRecordId });
                        }}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                          n.read
                            ? 'bg-slate-950/40 border-slate-800 text-slate-400'
                            : 'bg-slate-800/80 border-slate-700 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-500 font-normal">{n.relativeTime}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 italic">{n.preview}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-center">
                    <button
                      onClick={() => {
                        setShowNotificationPopover(false);
                        onNavigate?.('notifications');
                      }}
                      className="text-xs font-semibold text-[#0E9F8E] hover:underline"
                    >
                      View all notifications →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu (Avatar + Name) */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenuPopover(!showUserMenuPopover)}
                className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-[#0E9F8E] text-white font-bold text-xs flex items-center justify-center">
                  {roleConfig.avatarInitials}
                </div>
                <span className="text-xs font-semibold text-white hidden md:inline truncate max-w-[120px]">
                  {roleConfig.personName}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showUserMenuPopover && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 p-2 space-y-1 animate-in zoom-in-95">
                  <div className="px-3 py-2 border-b border-slate-800">
                    <div className="font-bold text-xs text-white">{roleConfig.personName}</div>
                    <div className="text-[10px] text-[#0E9F8E]">{roleConfig.name}</div>
                  </div>

                  <button
                    onClick={() => {
                      setShowUserMenuPopover(false);
                      switchRole('executive');
                      onNavigate?.('role_picker');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl text-left"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>Switch Role</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowUserMenuPopover(false);
                      setShowResetConfirmModal(true);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-amber-400 hover:bg-amber-950/40 rounded-xl text-left"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Demo Data</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowUserMenuPopover(false);
                      toast('Signed out of demo', 'info');
                      onNavigate?.('role_picker');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/40 rounded-xl text-left border-t border-slate-800 mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MAIN BODY VIEW */}
        <main className="flex-1 overflow-y-auto p-6 relative">
          {clientViewerMode && (
            <div className="mb-4 bg-sky-950 border border-sky-600 text-sky-200 px-4 py-2.5 rounded-xl text-xs flex items-center justify-between">
              <span className="flex items-center gap-2 font-semibold">
                <Eye className="w-4 h-4" /> Client Read-Only Viewer Mode — Approval, upload, and credential modifications are disabled.
              </span>
              <button
                onClick={() => setClientViewerMode(false)}
                className="underline hover:text-white"
              >
                Exit Viewer Mode
              </button>
            </div>
          )}
          {children}
        </main>
      </div>

      {/* Reset Demo Data Modal */}
      {showResetConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Reset Demo Data?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Reset all accounts, payments, approvals, and audit logs to their starting seed state? Any modifications made during this browser session will be restored.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirmModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetDemoData();
                  setShowResetConfirmModal(false);
                  toast('Demo data reset to seed state', 'success');
                  onNavigate?.('role_picker');
                }}
                className="px-4 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded-xl shadow-lg"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
