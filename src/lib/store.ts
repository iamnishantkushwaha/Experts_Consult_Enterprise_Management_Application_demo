import { create } from 'zustand';
import {
  RoleId,
  CountryCode,
  Country,
  Client,
  Portfolio,
  Debtor,
  Account,
  ContactEvent,
  PromiseToPay,
  PaymentPlan,
  Settlement,
  Payment,
  Allocation,
  Remittance,
  FeeRule,
  Dispute,
  Complaint,
  LegalMatter,
  Document,
  Approval,
  AuditEvent,
  Incident,
  Vendor,
  ComplianceRequirement,
  Investigation,
  Task,
  User,
  Notification,
  AlertItem
} from './types';
import {
  INITIAL_COUNTRIES,
  INITIAL_CLIENTS,
  INITIAL_PORTFOLIOS,
  INITIAL_DEBTORS,
  INITIAL_ACCOUNTS,
  INITIAL_CONTACT_EVENTS,
  INITIAL_PROMISES,
  INITIAL_PAYMENT_PLANS,
  INITIAL_SETTLEMENTS,
  INITIAL_PAYMENTS,
  INITIAL_ALLOCATIONS,
  INITIAL_REMITTANCES,
  INITIAL_FEE_RULES,
  INITIAL_DISPUTES,
  INITIAL_COMPLAINTS,
  INITIAL_LEGAL_MATTERS,
  INITIAL_DOCUMENTS,
  INITIAL_APPROVALS,
  INITIAL_AUDIT_EVENTS,
  INITIAL_INCIDENTS,
  INITIAL_VENDORS,
  INITIAL_COMPLIANCE_REQS,
  INITIAL_INVESTIGATIONS,
  INITIAL_TASKS,
  INITIAL_USERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ALERTS,
  DEMO_CHAPTERS
} from './mock-data';

interface AppState {
  // Session & Global State
  currentRole: RoleId;
  selectedCountry: CountryCode | 'ALL';
  mobileMode: boolean;
  isOffline: boolean;
  pendingSyncCount: number;
  clientViewerMode: boolean;
  revealedPII: Record<string, boolean>; // key: `${debtorId}_${field}`
  
  // Guided Demo state
  guidedDemo: {
    active: boolean;
    currentChapterIndex: number;
    completedSteps: Record<number, boolean>;
    minimized: boolean;
  };

  // Entities
  countries: Country[];
  clients: Client[];
  portfolios: Portfolio[];
  debtors: Debtor[];
  accounts: Account[];
  contactEvents: ContactEvent[];
  promises: PromiseToPay[];
  paymentPlans: PaymentPlan[];
  settlements: Settlement[];
  payments: Payment[];
  allocations: Allocation[];
  remittances: Remittance[];
  feeRules: FeeRule[];
  disputes: Dispute[];
  complaints: Complaint[];
  legalMatters: LegalMatter[];
  documents: Document[];
  approvals: Approval[];
  auditEvents: AuditEvent[];
  incidents: Incident[];
  vendors: Vendor[];
  complianceReqs: ComplianceRequirement[];
  investigations: Investigation[];
  tasks: Task[];
  users: User[];
  notifications: Notification[];
  alerts: AlertItem[];

  // Actions
  switchRole: (roleId: RoleId) => void;
  setSelectedCountry: (country: CountryCode | 'ALL') => void;
  setMobileMode: (enabled: boolean) => void;
  setIsOffline: (offline: boolean) => void;
  setClientViewerMode: (viewer: boolean) => void;
  resetDemoData: () => void;
  revealPII: (debtorId: string, field: string, reason: string, note?: string, actor?: string) => void;
  
  // Recovery Officer Actions
  logContact: (data: { accountId: string; userId: string; userName: string; channel: ContactEvent['channel']; outcome: ContactEvent['outcome']; notes: string; identityVerified: boolean; nextAction?: string }) => { success: boolean; error?: string };
  recordPromise: (data: { accountId: string; amountMinor: number; dueDate: string; source: string }) => void;
  createPaymentPlan: (data: { accountId: string; installments: { no: number; due: string; amountMinor: number; status: 'Due' }[]; requestedBy: 'Officer' | 'Debtor' }) => void;
  proposeSettlement: (data: { accountId: string; discountPct: number; type: 'Lump sum' | 'Structured'; terms: string; conditions: string[]; requestedBy: string; userRole: string }) => { settlementId: string; routedTo: string };

  // Approval Actions
  approveApprovalItem: (approvalId: string, actorRole: string, actorName: string, reason?: string) => void;
  rejectApprovalItem: (approvalId: string, actorRole: string, actorName: string, reason: string) => void;
  escalateApprovalItem: (approvalId: string, actorRole: string, actorName: string) => void;
  clientApproveSettlement: (settlementId: string, actorName: string, reason: string) => void;
  markTermsSigned: (settlementId: string) => void;

  // Finance Actions
  importDemoPayments: () => void;
  allocatePayment: (paymentId: string, accountId: string, amountMinor: number) => void;
  resolvePaymentException: (paymentId: string, action: 'duplicate' | 'match', targetAccountId?: string) => void;
  approveRemittance: (remittanceId: string, actorName: string) => void;
  approveWriteOff: (writeOffId: string, actorName: string) => void;

  // Portfolio Intake
  resolvePortfolioIntake: (portfolioId: string) => void;
  assignPortfolio: (portfolioId: string) => void;

  // Country Activation
  saveCountryActivationStep: (countryCode: CountryCode, step: number) => void;
  certifyCountryCompliance: (countryCode: CountryCode) => void;
  activateCountry: (countryCode: CountryCode, actorName: string) => void;

  // Compliance & Legal
  advanceComplaintStatus: (complaintId: string, nextStatus: Complaint['status'], investigatorId?: string) => { success: boolean; error?: string };
  resolveComplaint: (complaintId: string, finding: string) => void;
  acceptLegalReferral: (matterId: string, counselName?: string) => { success: boolean; error?: string };

  // AI Actions
  acceptAiRecommendation: (accountId: string) => void;
  overrideAiRecommendation: (accountId: string, reason: string) => void;

  // Debtor Actions
  debtorPayNow: (accountId: string, amountMinor: number, method: string) => Payment;
  debtorRequestPlan: (accountId: string, monthlyAmountMinor: number, months: number, reason: string) => void;
  debtorRaiseDispute: (accountId: string, amountMinor: number, reason: Dispute['reason'], explanation: string) => void;
  debtorMakeComplaint: (accountId: string, subject: string, details: string) => void;

  // Admin & HR
  updateAuthorityLimit: (role: string, action: string, newLimitPct: number) => void;
  disableUserAccess: (userId: string, targetUserIdForTransfer?: string) => void;

  // Guided Demo Actions
  startGuidedDemo: (chapterIndex?: number) => void;
  toggleDemoStep: (stepId: number) => void;
  nextDemoChapter: () => void;
  minimizeGuidedDemo: () => void;
  exitGuidedDemo: () => void;

  // Notifications & Alerts
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  dismissAlert: (id: string) => void;
  addAuditEvent: (event: Omit<AuditEvent, 'id' | 'timestamp'>) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentRole: 'executive',
  selectedCountry: 'ALL',
  mobileMode: false,
  isOffline: false,
  pendingSyncCount: 0,
  clientViewerMode: false,
  revealedPII: {},
  guidedDemo: {
    active: false,
    currentChapterIndex: 0,
    completedSteps: {},
    minimized: false
  },

  countries: INITIAL_COUNTRIES,
  clients: INITIAL_CLIENTS,
  portfolios: INITIAL_PORTFOLIOS,
  debtors: INITIAL_DEBTORS,
  accounts: INITIAL_ACCOUNTS,
  contactEvents: INITIAL_CONTACT_EVENTS,
  promises: INITIAL_PROMISES,
  paymentPlans: INITIAL_PAYMENT_PLANS,
  settlements: INITIAL_SETTLEMENTS,
  payments: INITIAL_PAYMENTS,
  allocations: INITIAL_ALLOCATIONS,
  remittances: INITIAL_REMITTANCES,
  feeRules: INITIAL_FEE_RULES,
  disputes: INITIAL_DISPUTES,
  complaints: INITIAL_COMPLAINTS,
  legalMatters: INITIAL_LEGAL_MATTERS,
  documents: INITIAL_DOCUMENTS,
  approvals: INITIAL_APPROVALS,
  auditEvents: INITIAL_AUDIT_EVENTS,
  incidents: INITIAL_INCIDENTS,
  vendors: INITIAL_VENDORS,
  complianceReqs: INITIAL_COMPLIANCE_REQS,
  investigations: INITIAL_INVESTIGATIONS,
  tasks: INITIAL_TASKS,
  users: INITIAL_USERS,
  notifications: INITIAL_NOTIFICATIONS,
  alerts: INITIAL_ALERTS,

  switchRole: (roleId) => set({ currentRole: roleId }),
  setSelectedCountry: (country) => set({ selectedCountry: country }),
  setMobileMode: (enabled) => set({ mobileMode: enabled }),
  setIsOffline: (offline) => {
    if (!offline && get().pendingSyncCount > 0) {
      // Sync pending contacts
      const updatedEvents = get().contactEvents.map((ev) =>
        ev.pendingSync ? { ...ev, pendingSync: false } : ev
      );
      set({ contactEvents: updatedEvents, isOffline: false, pendingSyncCount: 0 });
      get().addAuditEvent({
        actor: 'Ama Darko',
        actorRole: 'Recovery Officer',
        action: 'OFFLINE_SYNC',
        objectType: 'ContactEvents',
        objectId: 'BULK_SYNC',
        ipDevice: 'Mobile App',
        sourceChannel: 'Mobile Officer App'
      });
    } else {
      set({ isOffline: offline });
    }
  },
  setClientViewerMode: (viewer) => set({ clientViewerMode: viewer }),

  resetDemoData: () => set({
    currentRole: 'executive',
    selectedCountry: 'ALL',
    mobileMode: false,
    isOffline: false,
    pendingSyncCount: 0,
    clientViewerMode: false,
    revealedPII: {},
    guidedDemo: { active: false, currentChapterIndex: 0, completedSteps: {}, minimized: false },
    countries: INITIAL_COUNTRIES,
    clients: INITIAL_CLIENTS,
    portfolios: INITIAL_PORTFOLIOS,
    debtors: INITIAL_DEBTORS,
    accounts: INITIAL_ACCOUNTS,
    contactEvents: INITIAL_CONTACT_EVENTS,
    promises: INITIAL_PROMISES,
    paymentPlans: INITIAL_PAYMENT_PLANS,
    settlements: INITIAL_SETTLEMENTS,
    payments: INITIAL_PAYMENTS,
    allocations: INITIAL_ALLOCATIONS,
    remittances: INITIAL_REMITTANCES,
    feeRules: INITIAL_FEE_RULES,
    disputes: INITIAL_DISPUTES,
    complaints: INITIAL_COMPLAINTS,
    legalMatters: INITIAL_LEGAL_MATTERS,
    documents: INITIAL_DOCUMENTS,
    approvals: INITIAL_APPROVALS,
    auditEvents: INITIAL_AUDIT_EVENTS,
    incidents: INITIAL_INCIDENTS,
    vendors: INITIAL_VENDORS,
    complianceReqs: INITIAL_COMPLIANCE_REQS,
    investigations: INITIAL_INVESTIGATIONS,
    tasks: INITIAL_TASKS,
    users: INITIAL_USERS,
    notifications: INITIAL_NOTIFICATIONS,
    alerts: INITIAL_ALERTS
  }),

  revealPII: (debtorId, field, reason, note, actor = 'Ama Darko') => {
    set((state) => ({
      revealedPII: { ...state.revealedPII, [`${debtorId}_${field}`]: true }
    }));
    get().addAuditEvent({
      actor,
      actorRole: 'Recovery Officer',
      action: 'PII_VIEW',
      objectType: 'Debtor',
      objectId: debtorId,
      reason,
      after: `Unmasked field ${field}. Note: ${note || 'N/A'}`,
      ipDevice: '192.168.1.45',
      sourceChannel: 'Web Application'
    });
  },

  logContact: (data) => {
    // Check contact frequency limit: policy max 3 contacts in last 7 days per account
    const state = get();
    const existing = state.contactEvents.filter((ev) => ev.accountId === data.accountId);
    if (existing.length >= 3) {
      return { success: false, error: 'Contact frequency limit reached for this account (policy: 3 per 7 days)' };
    }

    const newId = `CE-${String(state.contactEvents.length + 1).padStart(3, '0')}`;
    const newEvent: ContactEvent = {
      id: newId,
      ...data,
      dateTime: '2026-10-01T09:30:00Z',
      pendingSync: state.isOffline
    };

    set((s) => ({
      contactEvents: [newEvent, ...s.contactEvents],
      pendingSyncCount: state.isOffline ? s.pendingSyncCount + 1 : s.pendingSyncCount,
      accounts: s.accounts.map((acc) =>
        acc.id === data.accountId
          ? {
              ...acc,
              nextAction: data.nextAction ? { type: data.nextAction, due: '2026-10-02' } : acc.nextAction
            }
          : acc
      )
    }));

    get().addAuditEvent({
      actor: data.userName,
      actorRole: 'Recovery Officer',
      action: 'CONTACT_LOG',
      objectType: 'Account',
      objectId: data.accountId,
      after: `Channel: ${data.channel}, Outcome: ${data.outcome}`,
      ipDevice: state.isOffline ? 'Mobile Offline' : '192.168.1.45',
      sourceChannel: state.isOffline ? 'Mobile Offline App' : 'Web Application'
    });

    return { success: true };
  },

  recordPromise: (data) => {
    const newId = `PTP-${String(get().promises.length + 885).padStart(4, '0')}`;
    const newPromise: PromiseToPay = {
      id: newId,
      accountId: data.accountId,
      amountMinor: data.amountMinor,
      dueDate: data.dueDate,
      status: 'Pending',
      source: data.source
    };

    // Also schedule follow-up task due day before
    const newTask: Task = {
      id: `TSK-${get().tasks.length + 1}`,
      title: `Promise follow-up for ${data.accountId}`,
      accountId: data.accountId,
      assigneeUserId: 'USR-AMADARKO',
      due: data.dueDate,
      status: 'Pending',
      type: 'Promise follow-up',
      priority: 'High'
    };

    set((s) => ({
      promises: [newPromise, ...s.promises],
      tasks: [newTask, ...s.tasks],
      accounts: s.accounts.map((acc) =>
        acc.id === data.accountId ? { ...acc, status: 'Active recovery' } : acc
      )
    }));

    get().addAuditEvent({
      actor: 'Ama Darko',
      actorRole: 'Recovery Officer',
      action: 'PROMISE_RECORD',
      objectType: 'Account',
      objectId: data.accountId,
      after: `Promised minor amount ${data.amountMinor} due ${data.dueDate}`,
      ipDevice: '192.168.1.45',
      sourceChannel: 'Web Application'
    });
  },

  createPaymentPlan: (data) => {
    const newPlan: PaymentPlan = {
      id: `PLAN-${String(get().paymentPlans.length + 215).padStart(4, '0')}`,
      accountId: data.accountId,
      installments: data.installments,
      status: 'Active',
      requestedBy: data.requestedBy
    };

    set((s) => ({
      paymentPlans: [newPlan, ...s.paymentPlans],
      accounts: s.accounts.map((acc) =>
        acc.id === data.accountId ? { ...acc, status: 'Payment plan' } : acc
      )
    }));
  },

  proposeSettlement: ({ accountId, discountPct, type, terms, conditions, requestedBy, userRole }) => {
    const state = get();
    const account = state.accounts.find((a) => a.id === accountId);
    if (!account) throw new Error('Account not found');

    const outstanding = account.balanceMinor;
    const settlementMinor = Math.round(outstanding * (1 - discountPct / 100));
    const settlementId = `SET-${String(state.settlements.length + 416).padStart(4, '0')}`;

    // Determine authority chain based on G6 matrix
    // <=10% -> Officer can approve
    // <=25% -> Manager can approve
    // <=40% -> COO can approve
    // >40% -> CEO / MD
    // Check Client Overlay: Savannah Bank (CL-002) or Akwaaba (CL-005) need client approval if discount > 25%
    const client = state.clients.find((c) => c.name === account.clientName);
    const clientApprovalReq = !!(client?.approvalOverlay && discountPct > 25);

    let nextApproverRole = 'Recovery Manager';
    if (discountPct <= 10) nextApproverRole = 'Recovery Officer';
    else if (discountPct <= 25) nextApproverRole = 'Recovery Manager';
    else if (discountPct <= 40) nextApproverRole = 'COO / Operations';
    else nextApproverRole = 'Executive (CEO / MD)';

    const newSettlement: Settlement = {
      id: settlementId,
      accountId,
      debtorName: account.debtorName,
      clientName: account.clientName,
      currency: account.currency,
      outstandingMinor: outstanding,
      discountPct,
      settlementMinor,
      type,
      status: 'Pending approval',
      approvalChain: [
        { role: 'Recovery Officer', userName: requestedBy, status: 'Passed' },
        { role: nextApproverRole, userName: 'Pending', status: 'Pending' }
      ],
      clientApprovalRequired: clientApprovalReq,
      clientApprovalStatus: clientApprovalReq ? 'Pending' : 'Not required',
      terms,
      conditions,
      requestedBy,
      createdAt: '2026-10-01T09:30:00Z'
    };

    const newApproval: Approval = {
      id: `APR-${String(state.approvals.length + 707).padStart(4, '0')}`,
      objectType: 'Settlement',
      objectId: settlementId,
      objectTitle: `Settlement proposal ${accountId} (${discountPct}%)`,
      requestedBy,
      approverRole: nextApproverRole,
      thresholdLabel: `Up to ${discountPct <= 10 ? '10%' : discountPct <= 25 ? '25%' : discountPct <= 40 ? '40%' : '40%+'} discount`,
      currency: account.currency,
      amountMinor: settlementMinor,
      withinUserLimit: false,
      ageDays: 0,
      submittedAt: '2026-10-01T09:30:00Z',
      decision: 'Pending'
    };

    set((s) => ({
      settlements: [newSettlement, ...s.settlements],
      approvals: [newApproval, ...s.approvals],
      accounts: s.accounts.map((a) => (a.id === accountId ? { ...a, status: 'Settlement' } : a))
    }));

    get().addAuditEvent({
      actor: requestedBy,
      actorRole: userRole,
      action: 'SETTLEMENT_PROPOSE',
      objectType: 'Settlement',
      objectId: settlementId,
      after: `Proposed ${discountPct}% discount. Routed to ${nextApproverRole}`,
      ipDevice: '192.168.1.45',
      sourceChannel: 'Web Application'
    });

    return { settlementId, routedTo: nextApproverRole };
  },

  approveApprovalItem: (approvalId, actorRole, actorName, reason) => {
    const state = get();
    const app = state.approvals.find((a) => a.id === approvalId);
    if (!app) return;

    // Update approval record
    set((s) => ({
      approvals: s.approvals.map((a) =>
        a.id === approvalId
          ? { ...a, decision: 'Approved', decidedAt: '2026-10-01T09:35:00Z', comment: reason }
          : a
      )
    }));

    if (app.objectType === 'Settlement') {
      const setItem = state.settlements.find((s) => s.id === app.objectId);
      if (setItem) {
        if (setItem.clientApprovalRequired && setItem.clientApprovalStatus !== 'Approved') {
          // Internal approvals complete, now awaiting client signoff!
          set((s) => ({
            settlements: s.settlements.map((setObj) =>
              setObj.id === setItem.id
                ? {
                    ...setObj,
                    status: 'Awaiting client',
                    approvalChain: setObj.approvalChain.map((step) =>
                      step.status === 'Pending' ? { ...step, status: 'Approved', userName: actorName } : step
                    )
                  }
                : setObj
            )
          }));
        } else {
          // Complete approval!
          set((s) => ({
            settlements: s.settlements.map((setObj) =>
              setObj.id === setItem.id
                ? { ...setObj, status: 'Terms issued' }
                : setObj
            )
          }));
        }
      }
    } else if (app.objectType === 'Write-off') {
      // Complete write off
      set((s) => ({
        accounts: s.accounts.map((acc) =>
          acc.id === 'ACC-100290' ? { ...acc, status: 'Closed', balanceMinor: 0 } : acc
        )
      }));
    }

    get().addAuditEvent({
      actor: actorName,
      actorRole,
      action: 'APPROVAL_GRANT',
      objectType: app.objectType,
      objectId: app.objectId,
      approvalRef: approvalId,
      reason,
      ipDevice: '192.168.1.12',
      sourceChannel: 'Web Application'
    });
  },

  rejectApprovalItem: (approvalId, actorRole, actorName, reason) => {
    set((s) => ({
      approvals: s.approvals.map((a) =>
        a.id === approvalId
          ? { ...a, decision: 'Rejected', decidedAt: '2026-10-01T09:35:00Z', comment: reason }
          : a
      )
    }));
  },

  escalateApprovalItem: (approvalId, actorRole, actorName) => {
    const state = get();
    const app = state.approvals.find((a) => a.id === approvalId);
    if (!app) return;

    let nextRole = 'COO / Operations';
    if (actorRole.includes('Manager')) nextRole = 'COO / Operations';
    else if (actorRole.includes('COO')) nextRole = 'Executive (CEO / MD)';

    set((s) => ({
      approvals: s.approvals.map((a) =>
        a.id === approvalId
          ? { ...a, approverRole: nextRole, withinUserLimit: false }
          : a
      )
    }));

    if (app.objectType === 'Settlement') {
      set((s) => ({
        settlements: s.settlements.map((setObj) =>
          setObj.id === app.objectId ? { ...setObj, status: 'Escalated' } : setObj
        )
      }));
    }
  },

  clientApproveSettlement: (settlementId, actorName, reason) => {
    set((s) => ({
      settlements: s.settlements.map((setItem) =>
        setItem.id === settlementId
          ? {
              ...setItem,
              clientApprovalStatus: 'Approved',
              status: 'Terms issued'
            }
          : setItem
      )
    }));

    get().addAuditEvent({
      actor: actorName,
      actorRole: 'Client Admin',
      action: 'CLIENT_SETTLEMENT_APPROVE',
      objectType: 'Settlement',
      objectId: settlementId,
      reason,
      ipDevice: '196.201.33.12',
      sourceChannel: 'Client Portal'
    });
  },

  markTermsSigned: (settlementId) => {
    set((s) => ({
      settlements: s.settlements.map((setItem) =>
        setItem.id === settlementId ? { ...setItem, status: 'In progress' } : setItem
      )
    }));
  },

  importDemoPayments: () => {
    // Add settlement payment PAY-884213 GHS 340,340.00 for ACC-100377 SET-0412
    const state = get();
    const newPay: Payment = {
      id: 'PAY-884213',
      payerName: 'Yaw Boateng Logistics Ltd',
      reference: 'YBL-SET-0412',
      amountMinor: 34034000,
      currency: 'GHS',
      receivedDate: '2026-10-01',
      source: 'Bank transfer',
      status: 'Allocated',
      matchedAccountId: 'ACC-100377',
      bankAccountId: 'BANK-GH-GCB-01'
    };

    set((s) => ({
      payments: [newPay, ...s.payments],
      settlements: s.settlements.map((setItem) =>
        setItem.accountId === 'ACC-100377' ? { ...setItem, status: 'Completed' } : setItem
      ),
      accounts: s.accounts.map((acc) =>
        acc.id === 'ACC-100377' ? { ...acc, status: 'Resolved', balanceMinor: 0 } : acc
      )
    }));

    get().addAuditEvent({
      actor: 'Priscilla Quaye',
      actorRole: 'CFO',
      action: 'PAYMENT_IMPORT_ALLOCATE',
      objectType: 'Payment',
      objectId: 'PAY-884213',
      after: 'GHS 340,340.00 allocated to SET-0412. Settlement Completed.',
      ipDevice: '192.168.1.12',
      sourceChannel: 'Web Application'
    });
  },

  allocatePayment: (paymentId, accountId, amountMinor) => {
    set((s) => ({
      payments: s.payments.map((p) =>
        p.id === paymentId ? { ...p, status: 'Allocated', matchedAccountId: accountId } : p
      )
    }));
  },

  resolvePaymentException: (paymentId, action, targetAccountId) => {
    set((s) => ({
      payments: s.payments.map((p) => {
        if (p.id !== paymentId) return p;
        if (action === 'duplicate') {
          return { ...p, status: 'Reversed', exceptionReason: 'Resolved: Duplicate reversed' };
        } else {
          return { ...p, status: 'Allocated', matchedAccountId: targetAccountId || 'ACC-100231', exceptionReason: undefined };
        }
      }),
      // Unblock Remittance REM-2026-09-VTG if PAY-884207 resolved
      remittances: s.remittances.map((rem) =>
        rem.id === 'REM-2026-09-VTG'
          ? { ...rem, status: 'Pending approval', blockers: [] }
          : rem
      )
    }));

    get().addAuditEvent({
      actor: 'Priscilla Quaye',
      actorRole: 'CFO',
      action: 'EXCEPTION_RESOLVE',
      objectType: 'Payment',
      objectId: paymentId,
      after: `Resolved via ${action}`,
      ipDevice: '192.168.1.12',
      sourceChannel: 'Web Application'
    });
  },

  approveRemittance: (remittanceId, actorName) => {
    set((s) => ({
      remittances: s.remittances.map((rem) =>
        rem.id === remittanceId ? { ...rem, status: 'Remitted', date: '2026-10-01' } : rem
      )
    }));

    get().addAuditEvent({
      actor: actorName,
      actorRole: 'CFO',
      action: 'REMITTANCE_COMPLETED',
      objectType: 'Remittance',
      objectId: remittanceId,
      ipDevice: '192.168.1.12',
      sourceChannel: 'Web Application'
    });
  },

  approveWriteOff: (writeOffId, actorName) => {
    set((s) => ({
      approvals: s.approvals.map((a) =>
        a.objectId === writeOffId ? { ...a, decision: 'Approved', decidedAt: '2026-10-01T09:30:00Z' } : a
      ),
      accounts: s.accounts.map((acc) =>
        acc.id === 'ACC-100290' ? { ...acc, status: 'Closed', balanceMinor: 0 } : acc
      )
    }));
  },

  resolvePortfolioIntake: (portfolioId) => {
    set((s) => ({
      portfolios: s.portfolios.map((p) =>
        p.id === portfolioId
          ? {
              ...p,
              intakeStats: p.intakeStats
                ? { ...p.intakeStats, missingEvidence: 0, duplicates: 0 }
                : undefined
            }
          : p
      )
    }));
  },

  assignPortfolio: (portfolioId) => {
    set((s) => ({
      portfolios: s.portfolios.map((p) =>
        p.id === portfolioId ? { ...p, status: 'Active' } : p
      )
    }));

    get().addAuditEvent({
      actor: 'David Mensah-Bonsu',
      actorRole: 'COO',
      action: 'PORTFOLIO_ASSIGN',
      objectType: 'Portfolio',
      objectId: portfolioId,
      after: 'Portfolio intake approved and activated for recovery',
      ipDevice: '192.168.1.20',
      sourceChannel: 'Web Application'
    });
  },

  saveCountryActivationStep: (countryCode, step) => {
    set((s) => ({
      countries: s.countries.map((c) =>
        c.code === countryCode ? { ...c, activationStep: step } : c
      )
    }));
  },

  certifyCountryCompliance: (countryCode) => {
    set((s) => ({
      countries: s.countries.map((c) =>
        c.code === countryCode ? { ...c, certification: 'Certified' } : c
      )
    }));

    get().addAuditEvent({
      actor: 'Fatima Alhassan',
      actorRole: 'Compliance Officer',
      action: 'CERTIFY_COUNTRY',
      objectType: 'Country',
      objectId: countryCode,
      ipDevice: '192.168.1.88',
      sourceChannel: 'Web Application'
    });
  },

  activateCountry: (countryCode, actorName) => {
    set((s) => ({
      countries: s.countries.map((c) =>
        c.code === countryCode ? { ...c, status: 'Active', activationStep: 11 } : c
      )
    }));

    get().addAuditEvent({
      actor: actorName,
      actorRole: 'CEO / MD',
      action: 'ACTIVATE_COUNTRY',
      objectType: 'Country',
      objectId: countryCode,
      ipDevice: '192.168.1.2',
      sourceChannel: 'Web Application'
    });
  },

  advanceComplaintStatus: (complaintId, nextStatus, investigatorId) => {
    const state = get();
    const cmp = state.complaints.find((c) => c.id === complaintId);
    if (!cmp) return { success: false, error: 'Complaint not found' };

    // Conflict of interest check: investigator cannot be officer who handled account
    if (investigatorId && investigatorId === 'USR-AMADARKO' && cmp.accountId === 'ACC-100231') {
      return { success: false, error: 'Conflict of interest rule: Staff member handled account recovery and cannot investigate complaint' };
    }

    set((s) => ({
      complaints: s.complaints.map((c) =>
        c.id === complaintId
          ? {
              ...c,
              status: nextStatus,
              investigatorUserId: investigatorId || c.investigatorUserId
            }
          : c
      )
    }));

    get().addAuditEvent({
      actor: 'Fatima Alhassan',
      actorRole: 'Compliance Officer',
      action: 'COMPLAINT_ADVANCE',
      objectType: 'Complaint',
      objectId: complaintId,
      after: `Advanced to status ${nextStatus}`,
      ipDevice: '192.168.1.88',
      sourceChannel: 'Web Application'
    });

    return { success: true };
  },

  resolveComplaint: (complaintId, finding) => {
    set((s) => ({
      complaints: s.complaints.map((c) =>
        c.id === complaintId ? { ...c, status: 'Closed', finding } : c
      )
    }));
  },

  acceptLegalReferral: (matterId, counselName) => {
    const state = get();
    const matter = state.legalMatters.find((m) => m.id === matterId);
    if (!matter) return { success: false, error: 'Matter not found' };

    const acc = state.accounts.find((a) => a.id === matter.accountId);
    if (acc && !acc.requiredDocs.proofOfDebt) {
      return { success: false, error: 'Evidence incomplete: Required document (Proof of Debt) is missing from file.' };
    }

    set((s) => ({
      legalMatters: s.legalMatters.map((m) =>
        m.id === matterId
          ? {
              ...m,
              stage: 'Pre-action',
              counselName: counselName || m.counselName
            }
          : m
      )
    }));

    return { success: true };
  },

  acceptAiRecommendation: (accountId) => {
    const newTask: Task = {
      id: `TSK-${get().tasks.length + 1}`,
      title: `AI Recommended Action for ${accountId}`,
      accountId,
      assigneeUserId: 'USR-AMADARKO',
      due: '2026-10-02T10:00:00Z',
      status: 'Pending',
      type: 'Outreach',
      priority: 'High'
    };

    set((s) => ({ tasks: [newTask, ...s.tasks] }));

    get().addAuditEvent({
      actor: 'Ama Darko',
      actorRole: 'Recovery Officer',
      action: 'AI_ACCEPT',
      objectType: 'Account',
      objectId: accountId,
      after: 'Accepted recommendation model recovery-nba v2.3',
      ipDevice: '192.168.1.45',
      sourceChannel: 'Web Application'
    });
  },

  overrideAiRecommendation: (accountId, reason) => {
    get().addAuditEvent({
      actor: 'Ama Darko',
      actorRole: 'Recovery Officer',
      action: 'AI_OVERRIDE',
      objectType: 'Account',
      objectId: accountId,
      reason,
      after: 'Overrode model recovery-nba v2.3',
      ipDevice: '192.168.1.45',
      sourceChannel: 'Web Application'
    });
  },

  debtorPayNow: (accountId, amountMinor, method) => {
    const newPaymentId = `PAY-${Math.floor(100000 + Math.random() * 900000)}`;
    const newPay: Payment = {
      id: newPaymentId,
      payerName: 'Kofi Mensah',
      reference: 'DEBTOR-ONLINE',
      amountMinor,
      currency: 'GHS',
      receivedDate: '2026-10-01',
      source: method as Payment['source'],
      status: 'Allocated',
      matchedAccountId: accountId,
      bankAccountId: 'BANK-GH-MTN-01'
    };

    set((s) => ({
      payments: [newPay, ...s.payments],
      accounts: s.accounts.map((acc) =>
        acc.id === accountId
          ? {
              ...acc,
              paidMinor: acc.paidMinor + amountMinor,
              balanceMinor: Math.max(0, acc.balanceMinor - amountMinor)
            }
          : acc
      )
    }));

    get().addAuditEvent({
      actor: 'Kofi Mensah',
      actorRole: 'Debtor',
      action: 'DEBTOR_PAYMENT',
      objectType: 'Payment',
      objectId: newPaymentId,
      after: `Paid GHS ${(amountMinor / 100).toFixed(2)} via ${method}`,
      ipDevice: '102.176.4.12',
      sourceChannel: 'Debtor Self-Service Portal'
    });

    return newPay;
  },

  debtorRequestPlan: (accountId, monthlyAmountMinor, months, reason) => {
    const newPlan: PaymentPlan = {
      id: `PLAN-${get().paymentPlans.length + 1}`,
      accountId,
      status: 'Requested',
      requestedBy: 'Debtor',
      installments: Array.from({ length: months }, (_, i) => ({
        no: i + 1,
        due: `2026-11-${String((i % 28) + 1).padStart(2, '0')}`,
        amountMinor: monthlyAmountMinor,
        status: 'Due'
      }))
    };

    set((s) => ({
      paymentPlans: [newPlan, ...s.paymentPlans]
    }));
  },

  debtorRaiseDispute: (accountId, amountMinor, reason, explanation) => {
    const newDispute: Dispute = {
      id: `DSP-${String(get().disputes.length + 14).padStart(4, '0')}`,
      accountId,
      debtorName: 'Kofi Mensah',
      amountMinor,
      currency: 'GHS',
      reason,
      status: 'Open',
      evidenceCount: 1,
      owner: 'Ama Darko',
      explanation
    };

    set((s) => ({
      disputes: [newDispute, ...s.disputes],
      accounts: s.accounts.map((acc) =>
        acc.id === accountId
          ? { ...acc, disputedMinor: amountMinor, status: 'Disputed' }
          : acc
      )
    }));
  },

  debtorMakeComplaint: (accountId, subject, details) => {
    const newId = `CMP-${String(get().complaints.length + 194).padStart(4, '0')}`;
    const newComplaint: Complaint = {
      id: newId,
      accountId,
      debtorName: 'Kofi Mensah',
      source: 'Debtor portal',
      category: subject as Complaint['category'],
      severity: 'Medium',
      investigatorUserId: 'USR-FATIMA',
      status: 'Received',
      evidenceIds: [],
      createdAt: '2026-10-01T09:30:00Z',
      slaDue: '2026-10-08T09:30:00Z'
    };

    set((s) => ({
      complaints: [newComplaint, ...s.complaints]
    }));
  },

  updateAuthorityLimit: (role, action, newLimitPct) => {
    get().addAuditEvent({
      actor: 'Kwabena Ofosu',
      actorRole: 'Super Administrator',
      action: 'CONFIG_CHANGE_PROPOSE',
      objectType: 'AuthorityRule',
      objectId: `${role}_${action}`,
      after: `Limit updated to ${newLimitPct}%`,
      ipDevice: '192.168.1.77',
      sourceChannel: 'Web Application'
    });
  },

  disableUserAccess: (userId, targetUserIdForTransfer) => {
    set((s) => ({
      users: s.users.map((u) => (u.id === userId ? { ...u, status: 'Leaver' } : u)),
      accounts: targetUserIdForTransfer
        ? s.accounts.map((acc) =>
            acc.ownerUserId === userId ? { ...acc, ownerUserId: targetUserIdForTransfer } : acc
          )
        : s.accounts
    }));

    get().addAuditEvent({
      actor: 'Abena Sarpong',
      actorRole: 'HR Manager',
      action: 'USER_DISABLE',
      objectType: 'User',
      objectId: userId,
      after: `User status set to Leaver. Work transferred to ${targetUserIdForTransfer || 'N/A'}`,
      ipDevice: '192.168.1.66',
      sourceChannel: 'Web Application'
    });
  },

  startGuidedDemo: (chapterIndex = 0) => {
    const chap = DEMO_CHAPTERS[chapterIndex];
    set({
      guidedDemo: {
        active: true,
        currentChapterIndex: chapterIndex,
        completedSteps: {},
        minimized: false
      },
      currentRole: chap.roleId
    });
  },

  toggleDemoStep: (stepId) => {
    set((s) => ({
      guidedDemo: {
        ...s.guidedDemo,
        completedSteps: {
          ...s.guidedDemo.completedSteps,
          [stepId]: !s.guidedDemo.completedSteps[stepId]
        }
      }
    }));
  },

  nextDemoChapter: () => {
    const s = get();
    const nextIdx = s.guidedDemo.currentChapterIndex + 1;
    if (nextIdx < DEMO_CHAPTERS.length) {
      const nextChap = DEMO_CHAPTERS[nextIdx];
      set({
        guidedDemo: {
          ...s.guidedDemo,
          currentChapterIndex: nextIdx,
          completedSteps: {}
        },
        currentRole: nextChap.roleId
      });
    } else {
      set({ guidedDemo: { ...s.guidedDemo, active: false } });
    }
  },

  minimizeGuidedDemo: () => set((s) => ({ guidedDemo: { ...s.guidedDemo, minimized: !s.guidedDemo.minimized } })),
  exitGuidedDemo: () => set((s) => ({ guidedDemo: { ...s.guidedDemo, active: false } })),

  markNotificationRead: (id) => set((s) => ({
    notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
  })),

  markAllNotificationsRead: () => set((s) => ({
    notifications: s.notifications.map((n) => ({ ...n, read: true }))
  })),

  dismissAlert: (id) => set((s) => ({
    alerts: s.alerts.filter((a) => a.id !== id)
  })),

  addAuditEvent: (eventData) => {
    const newId = `AUD-${get().auditEvents.length + 9009}`;
    const newEvent: AuditEvent = {
      id: newId,
      timestamp: new Date().toISOString(),
      ...eventData
    };
    set((s) => ({ auditEvents: [newEvent, ...s.auditEvents] }));
  }
}));
