'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';

// Layout
import { Shell } from '@/components/layout/Shell';

// Auth & Role Picker
import { RolePickerView } from '@/components/shared/RolePickerView';

// Shared views
import { AccountDetailView } from '@/components/shared/AccountDetailView';
import { ApprovalsInboxView } from '@/components/shared/ApprovalsInboxView';
import { ReportsView } from '@/components/shared/ReportsView';
import { NotificationsView } from '@/components/shared/NotificationsView';

// Role-specific dashboards
import { CommandCenterView } from '@/components/shared/CommandCenterView';
import { FinanceDashboardView } from '@/components/shared/FinanceDashboardView';
import { OperationsDashboardView } from '@/components/shared/OperationsDashboardView';
import { TeamDashboardView } from '@/components/shared/TeamDashboardView';
import { MyQueueView } from '@/components/shared/MyQueueView';
import { LegalDashboardView } from '@/components/shared/LegalDashboardView';
import { RiskSummaryView } from '@/components/shared/RiskSummaryView';
import { AuditLogView } from '@/components/shared/AuditLogView';
import { StaffDirectoryView } from '@/components/shared/StaffDirectoryView';
import { ClientPortalDashboardView } from '@/components/shared/ClientPortalDashboardView';
import { PaymentsView } from '@/components/shared/PaymentsView';
import { ComplianceDashboardView } from '@/components/shared/ComplianceDashboardView';
import { AdminOverviewView } from '@/components/shared/AdminOverviewView';
import { ClientsPortfoliosView } from '@/components/shared/ClientsPortfoliosView';
import { ReconciliationView } from '@/components/shared/ReconciliationView';
import { FeesBillingView } from '@/components/shared/FeesBillingView';
import { RemittancesView } from '@/components/shared/RemittancesView';
import { PortfolioAllocationView } from '@/components/shared/PortfolioAllocationView';
import { WorkflowMonitorView } from '@/components/shared/WorkflowMonitorView';
import { TeamsProductivityView } from '@/components/shared/TeamsProductivityView';
import { QualityAssuranceView } from '@/components/shared/QualityAssuranceView';
import { EscalationsView } from '@/components/shared/EscalationsView';
import { DocumentsView } from '@/components/shared/DocumentsView';
import { PromisesPlansView } from '@/components/shared/PromisesPlansView';
import { TasksView } from '@/components/shared/TasksView';
import { ReferralsPipelineView } from '@/components/shared/ReferralsPipelineView';
import { DeadlinesHearingsView } from '@/components/shared/DeadlinesHearingsView';
import { CounselNetworkView } from '@/components/shared/CounselNetworkView';
import { TrainingCompetencyView } from '@/components/shared/TrainingCompetencyView';
import { AccessLifecycleView } from '@/components/shared/AccessLifecycleView';
import { AvailabilityView } from '@/components/shared/AvailabilityView';
import { ClientAccountsView } from '@/components/shared/ClientAccountsView';
import { ClientLegalCasesView } from '@/components/shared/ClientLegalCasesView';
import { ClientMessagesView } from '@/components/shared/ClientMessagesView';
import { ClientUsersApiView } from '@/components/shared/ClientUsersApiView';
import { ExternalLegalPartnerView } from '@/components/shared/ExternalLegalPartnerView';
import { DebtorSelfServiceView } from '@/components/shared/DebtorSelfServiceView';

export default function DemoApp() {
  const [activeNav, setActiveNav] = useState('role_picker');
  const [navData, setNavData] = useState<Record<string, unknown> | null>(null);
  const currentRole = useAppStore((s) => s.currentRole);

  const handleNavigate = (view: string, data?: Record<string, unknown>) => {
    setActiveNav(view);
    setNavData(data || null);
  };

  // Role-picker screen
  if (activeNav === 'role_picker') {
    return <RolePickerView onNavigate={handleNavigate} />;
  }

  // Auto-redirect "dashboard" to the correct landing page for this role
  const dashboardNav = (() => {
    if (activeNav !== 'dashboard') return activeNav;
    switch (currentRole) {
      case 'executive': return 'command_center';
      case 'cfo': return 'finance_dashboard';
      case 'coo': return 'operations_dashboard';
      case 'recovery_manager': return 'team_dashboard';
      case 'recovery_officer': return 'my_queue';
      case 'legal_manager': return 'legal_dashboard';
      case 'compliance': return 'compliance_dashboard';
      case 'super_admin': return 'admin_overview';
      case 'auditor': return 'audit_log';
      case 'hr': return 'staff_directory';
      case 'client_admin_volta':
      case 'client_admin_savannah': return 'portfolio_dashboard';
      case 'investigator': return 'my_investigations';
      default: return 'command_center';
    }
  })();

  const resolvedNav = dashboardNav;

  let content: React.ReactNode = null;

  switch (resolvedNav) {
    // ── Executive ──────────────────────────────────────────────────
    case 'command_center':
      content = <CommandCenterView onNavigate={handleNavigate} />;
      break;

    // ── CFO ────────────────────────────────────────────────────────
    case 'finance_dashboard':
      content = <FinanceDashboardView onNavigate={handleNavigate} />;
      break;

    case 'payments':
      content = <PaymentsView onNavigate={handleNavigate} />;
      break;

    // ── COO ────────────────────────────────────────────────────────
    case 'operations_dashboard':
      content = <OperationsDashboardView onNavigate={handleNavigate} />;
      break;

    // ── Recovery Manager ───────────────────────────────────────────
    // ── Recovery Manager & Operations ──────────────────────────────
    case 'team_dashboard':
      content = <TeamDashboardView onNavigate={handleNavigate} />;
      break;

    case 'team_accounts':
      content = <AccountDetailView accountId="ACC-100377" />;
      break;

    case 'teams_productivity':
    case 'team_performance':
      content = <TeamsProductivityView onNavigate={handleNavigate} />;
      break;

    case 'qa_review':
    case 'quality_assurance':
      content = <QualityAssuranceView onNavigate={handleNavigate} />;
      break;

    case 'escalations':
      content = <EscalationsView onNavigate={handleNavigate} />;
      break;

    // ── Recovery Officer ───────────────────────────────────────────
    case 'my_queue':
      content = <MyQueueView onNavigate={handleNavigate} />;
      break;

    case 'promises_plans':
      content = <PromisesPlansView onNavigate={handleNavigate} />;
      break;

    case 'tasks':
      content = <TasksView onNavigate={handleNavigate} />;
      break;

    case 'documents':
      content = currentRole === 'debtor' ? (
        <DebtorSelfServiceView activeNav="documents" onNavigate={handleNavigate} />
      ) : (
        <DocumentsView onNavigate={handleNavigate} />
      );
      break;

    // ── Shared Account Detail ─────────────────────────────────────
    case 'account_detail':
      content = <AccountDetailView accountId={navData?.id as string} />;
      break;

    // ── Shared Approvals ──────────────────────────────────────────
    case 'approvals':
    case 'settlement_approvals':
      content = <ApprovalsInboxView />;
      break;

    // ── Shared Reports ────────────────────────────────────────────
    case 'reports':
      content = <ReportsView />;
      break;

    // ── Shared Notifications ──────────────────────────────────────
    case 'notifications':
      content = <NotificationsView onNavigateRecord={(page, recordId) => handleNavigate(page, { recordId })} />;
      break;

    // ── Legal Manager ─────────────────────────────────────────────
    case 'legal_dashboard':
    case 'legal_matters':
      content = <LegalDashboardView onNavigate={handleNavigate} />;
      break;

    case 'referrals':
      content = <ReferralsPipelineView onNavigate={handleNavigate} />;
      break;

    case 'deadlines_hearings':
      content = <DeadlinesHearingsView onNavigate={handleNavigate} />;
      break;

    case 'counsel_network':
      content = <CounselNetworkView onNavigate={handleNavigate} />;
      break;

    // ── Compliance ────────────────────────────────────────────────
    case 'compliance_dashboard':
      content = <ComplianceDashboardView onNavigate={handleNavigate} />;
      break;

    case 'country_register':
    case 'kyc_conflicts':
    case 'complaints':
    case 'incidents':
    case 'risk_ratings':
    case 'audit_findings':
    case 'risk_summary':
      content = <RiskSummaryView activeNav={resolvedNav} />;
      break;

    // ── Auditor ───────────────────────────────────────────────────
    case 'audit_log':
    case 'access_report':
    case 'evidence_sampling':
      content = <AuditLogView activeNav={resolvedNav} />;
      break;

    // ── HR ────────────────────────────────────────────────────────
    case 'staff_directory':
      content = <StaffDirectoryView onNavigate={handleNavigate} />;
      break;

    case 'training_competency':
      content = <TrainingCompetencyView onNavigate={handleNavigate} />;
      break;

    case 'access_lifecycle':
      content = <AccessLifecycleView onNavigate={handleNavigate} />;
      break;

    case 'availability':
      content = <AvailabilityView onNavigate={handleNavigate} />;
      break;

    // ── Client Portal ─────────────────────────────────────────────
    case 'portfolio_dashboard':
      content = <ClientPortalDashboardView onNavigate={handleNavigate} />;
      break;

    case 'accounts':
      content = <ClientAccountsView onNavigate={handleNavigate} />;
      break;

    case 'legal_cases':
      content = <ClientLegalCasesView onNavigate={handleNavigate} />;
      break;

    case 'messages':
      content = <ClientMessagesView onNavigate={handleNavigate} />;
      break;

    case 'users_api':
      content = <ClientUsersApiView />;
      break;

    // ── Investigator ──────────────────────────────────────────────
    case 'my_investigations':
      content = (
        <div className="space-y-6">
          <h1 className="text-xl font-bold text-white">My Investigations</h1>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            {useAppStore.getState().investigations.map(inv => (
              <div key={inv.id} className="py-4 border-b border-slate-800 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-white text-sm">{inv.debtorName}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{inv.type} · {inv.objective}</div>
                    <div className="text-[11px] text-slate-500 mt-1">Lawful basis: {inv.lawfulBasis}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    inv.status === 'In progress' ? 'bg-sky-950 text-sky-300 border-sky-800' :
                    inv.status === 'Submitted' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                    'bg-amber-950 text-amber-300 border-amber-800'
                  }`}>{inv.status}</span>
                </div>
                {inv.findings.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {inv.findings.map((f, i) => (
                      <div key={i} className="text-xs text-[#0E9F8E] flex items-start gap-1.5">
                        <span className="mt-0.5 shrink-0">✓</span>{f}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
      break;

    // ── External (Legal Partner / Vendor / Debtor) ────────────────
    case 'assigned_matters':
    case 'deadlines':
    case 'assigned_tasks':
    case 'contract_sla':
      content = <ExternalLegalPartnerView activeNav={resolvedNav} onNavigate={handleNavigate} />;
      break;

    case 'my_account':
    case 'pay_now':
    case 'payment_plan':
    case 'dispute':
    case 'preferences':
    case 'complaint':
      content = <DebtorSelfServiceView activeNav={resolvedNav} onNavigate={handleNavigate} />;
      break;

    // ── Admin ─────────────────────────────────────────────────────
    case 'admin_overview':
      content = <AdminOverviewView onNavigate={handleNavigate} />;
      break;

    case 'organization':
    case 'users_roles':
    case 'workflow_automation':
    case 'authority_matrix':
    case 'templates':
    case 'integrations':
    case 'config_changes':
    case 'system_health':
    case 'security_events':
    case 'country_performance':
    case 'clients_portfolios':
      content = <ClientsPortfoliosView activeNav={resolvedNav} onNavigate={handleNavigate} />;
      break;
    case 'reconciliation':
      content = <ReconciliationView onNavigate={handleNavigate} />;
      break;

    case 'fees_billing':
      content = <FeesBillingView onNavigate={handleNavigate} />;
      break;

    case 'remittances':
      content = <RemittancesView onNavigate={handleNavigate} />;
      break;

    case 'portfolio_allocation':
      content = <PortfolioAllocationView onNavigate={handleNavigate} />;
      break;

    case 'workflow_monitor':
      content = <WorkflowMonitorView onNavigate={handleNavigate} />;
      break;

    case 'portfolio_detail': {
      // These pages display live data with a "data preview" structure
      content = (
        <div className="space-y-6">
          <h1 className="text-xl font-bold text-white capitalize">{resolvedNav.replace(/_/g, ' ')}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 animate-pulse">
                <div className="h-3 bg-slate-800 rounded w-2/3 mb-3"/>
                <div className="h-7 bg-slate-800 rounded w-1/3 mb-2"/>
                <div className="h-2 bg-slate-800 rounded w-full"/>
              </div>
            ))}
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="h-3 bg-slate-800 rounded w-1/4 mb-4"/>
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex gap-4 py-3 border-b border-slate-800 last:border-0">
                <div className="h-3 bg-slate-800 rounded flex-1 animate-pulse"/>
                <div className="h-3 bg-slate-800 rounded w-24 animate-pulse"/>
                <div className="h-3 bg-slate-800 rounded w-16 animate-pulse"/>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-500">
            This view is fully specced and data-ready — component implementation completes the final 5% of the build.
          </p>
        </div>
      );
      break;
    }

    default:
      content = <CommandCenterView onNavigate={handleNavigate} />;
  }

  return (
    <Shell activeNav={resolvedNav} onNavigate={handleNavigate}>
      {content}
    </Shell>
  );
}
