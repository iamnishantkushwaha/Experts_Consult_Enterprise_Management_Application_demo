export type RoleId =
  | 'executive'
  | 'cfo'
  | 'coo'
  | 'recovery_manager'
  | 'recovery_officer'
  | 'investigator'
  | 'legal_manager'
  | 'compliance'
  | 'super_admin'
  | 'auditor'
  | 'hr'
  | 'client_admin_volta'
  | 'client_admin_savannah'
  | 'legal_partner'
  | 'vendor'
  | 'debtor';

export interface RoleConfig {
  id: RoleId;
  group: 'Leadership & Finance' | 'Operations & Recovery' | 'Control & Specialist Functions' | 'External Users';
  name: string;
  personName: string;
  mandate: string;
  landingPage: string;
  avatarInitials: string;
}

export type CountryCode = 'GH' | 'KE' | 'GB' | 'NG' | 'AE';

export interface Country {
  code: CountryCode;
  name: string;
  currency: string;
  timezone: string;
  status: 'Active' | 'Activating' | 'Draft';
  activationStep: number; // 0 to 11
  certification: 'Certified' | 'Pending' | 'n.a.';
  entityId: string;
  approvedChannels: string[];
  holidays: string[];
}

export interface Client {
  id: string;
  name: string;
  sector: string;
  countryCode: CountryCode;
  contractRef: string;
  feeModel: 'Contingency' | 'Fixed fee' | 'Hybrid';
  feeRateText: string;
  feeRatePct?: number;
  slaTargets: string;
  approvalOverlay: boolean; // client approval required above 25%
  status: 'Active' | 'Onboarding' | 'Pending approval' | 'Inactive';
  portalAdmins: string[];
  assignedUSD: number;
  recoveredUSD: number;
  recoveryRatePct: number;
}

export interface Portfolio {
  id: string;
  clientId: string;
  clientName: string;
  name: string;
  country: CountryCode;
  currency: string;
  assignedMinor: number;
  recoveredMinor: number;
  recoveryRatePct: number;
  assignedUSD: number;
  recoveredUSD: number;
  status: 'Active' | 'Pending validation' | 'Paused' | 'Closed';
  strategy: string;
  ownerTeam: string;
  intakeStats?: {
    uploaded: number;
    valid: number;
    duplicates: number;
    missingEvidence: number;
  };
}

export interface Debtor {
  id: string;
  type: 'Individual' | 'Company';
  legalName: string;
  idType: string;
  idNumberMasked: string;
  phoneMasked: string;
  emailMasked: string;
  addressMasked: string;
  preferredLanguage: string;
  preferences: {
    sms: boolean;
    email: boolean;
    calls: boolean;
    window: string;
  };
  risk: 'Low' | 'Medium' | 'High';
}

export type AccountStatus =
  | 'Received'
  | 'Validation'
  | 'Verified'
  | 'Ready for recovery'
  | 'Active recovery'
  | 'Promise'
  | 'Payment plan'
  | 'Settlement'
  | 'Resolved'
  | 'Legal'
  | 'Closed'
  | 'Disputed'
  | 'Suspended'
  | 'Uncontactable'
  | 'Documentation required'
  | 'Write-off pending';

export interface RequiredDocs {
  contract: boolean;
  invoice: boolean;
  statement: boolean;
  proofOfDebt: boolean;
}

export interface Account {
  id: string;
  portfolioId: string;
  debtorId: string;
  debtorName: string;
  debtorType: 'Individual' | 'Company';
  clientName: string;
  countryCode: CountryCode;
  currency: string;
  principalMinor: number;
  chargesMinor: number;
  paidMinor: number;
  balanceMinor: number;
  disputedMinor: number;
  dueDate: string;
  agingBucket: '0–30' | '31–60' | '61–90' | '91–180' | '181–365' | '365+';
  status: AccountStatus;
  risk: 'Low' | 'Medium' | 'High';
  ownerUserId: string;
  ownerName: string;
  nextAction?: {
    type: string;
    due: string;
  };
  requiredDocs: RequiredDocs;
}

export interface ContactEvent {
  id: string;
  accountId: string;
  userId: string;
  userName: string;
  channel: 'Call' | 'SMS' | 'Email' | 'Letter' | 'WhatsApp' | 'Visit';
  dateTime: string;
  outcome:
    | 'No answer'
    | 'Wrong number'
    | 'Spoke to debtor'
    | 'Promise to pay'
    | 'Refuses to pay'
    | 'Dispute raised'
    | 'Requests payment plan'
    | 'Third-party contact'
    | 'Message left';
  notes: string;
  identityVerified: boolean;
  nextAction?: string;
  pendingSync?: boolean;
}

export interface PromiseToPay {
  id: string;
  accountId: string;
  amountMinor: number;
  dueDate: string;
  status: 'Pending' | 'Kept' | 'Broken';
  source: string;
  approval?: string;
}

export interface PaymentPlanInstallment {
  no: number;
  due: string;
  amountMinor: number;
  status: 'Paid' | 'Due' | 'Missed';
}

export interface PaymentPlan {
  id: string;
  accountId: string;
  installments: PaymentPlanInstallment[];
  status: 'Active' | 'Requested' | 'Completed' | 'Cancelled';
  requestedBy: 'Officer' | 'Debtor';
  approval?: string;
}

export type SettlementStatus =
  | 'Proposed'
  | 'Authority check'
  | 'Pending approval'
  | 'Escalated'
  | 'Awaiting client'
  | 'Approved'
  | 'Rejected'
  | 'Terms issued'
  | 'In progress'
  | 'Completed'
  | 'Defaulted'
  | 'Cancelled';

export interface ApprovalStep {
  role: string;
  userName: string;
  status: 'Passed' | 'Pending' | 'Approved' | 'Escalated' | 'Rejected';
  comment?: string;
}

export interface Settlement {
  id: string;
  accountId: string;
  debtorName: string;
  clientName: string;
  currency: string;
  outstandingMinor: number;
  discountPct: number;
  settlementMinor: number;
  type: 'Lump sum' | 'Structured';
  status: SettlementStatus;
  approvalChain: ApprovalStep[];
  clientApprovalRequired: boolean;
  clientApprovalStatus: 'Not required' | 'Pending' | 'Approved' | 'Rejected';
  terms: string;
  conditions: string[];
  requestedBy: string;
  createdAt: string;
}

export type PaymentStatus =
  | 'Received'
  | 'Matching'
  | 'Allocated'
  | 'Unmatched'
  | 'Reconciliation'
  | 'Approved'
  | 'Remitted'
  | 'Closed'
  | 'Exception'
  | 'Reversed';

export interface Payment {
  id: string;
  payerName: string;
  reference: string;
  amountMinor: number;
  currency: string;
  receivedDate: string;
  source: 'Bank transfer' | 'Mobile money' | 'Card/gateway' | 'Cheque';
  status: PaymentStatus;
  matchedAccountId?: string;
  duplicateOf?: string;
  exceptionReason?: string;
  bankAccountId: string;
}

export interface Allocation {
  id: string;
  paymentId: string;
  accountId: string;
  amountMinor: number;
  allocationType: 'Principal' | 'Charges' | 'Fee';
  feeRuleId?: string;
}

export type RemittanceStatus = 'Blocked' | 'In preparation' | 'Pending approval' | 'Remitted';

export interface Remittance {
  id: string;
  clientId: string;
  clientName: string;
  period: string;
  currency: string;
  recoveredMinor: number;
  feesMinor: number;
  expensesMinor: number;
  netMinor: number;
  status: RemittanceStatus;
  blockers: string[];
  feeRuleVersion: string;
  date?: string;
}

export interface FeeRule {
  id: string;
  clientId: string;
  clientName: string;
  portfolioId?: string;
  feeType: string;
  rateOrAmount: string;
  effectiveFrom: string;
  version: string;
  status: 'Current' | 'Superseded' | 'Draft';
}

export interface Dispute {
  id: string;
  accountId: string;
  debtorName: string;
  amountMinor: number;
  currency: string;
  reason: 'Amount incorrect' | 'Not my debt' | 'Already paid' | 'Service issue' | 'Interest incorrect' | 'Other';
  status: 'Open' | 'Under review' | 'Upheld' | 'Partially upheld' | 'Rejected';
  evidenceCount: number;
  owner: string;
  explanation?: string;
}

export interface Complaint {
  id: string;
  accountId: string;
  debtorName: string;
  source: 'Debtor portal' | 'Phone' | 'Email' | 'Regulator';
  category: 'Harassment' | 'Incorrect calculation' | 'Identity mismatch' | 'Data privacy' | 'Service delay';
  severity: 'Low' | 'Medium' | 'High';
  investigatorUserId: string;
  finding?: string;
  status: 'Received' | 'Acknowledged' | 'Triage' | 'Investigation' | 'Decision' | 'Response' | 'Corrective action' | 'Closed';
  evidenceIds: string[];
  createdAt: string;
  slaDue: string;
}

export interface LegalMatter {
  id: string;
  accountId: string;
  debtorName: string;
  clientName: string;
  counselVendorId: string;
  counselName: string;
  jurisdiction: string;
  currency: string;
  stage: 'Proposed' | 'Pre-action' | 'Filed (writ)' | 'Hearing scheduled' | 'Judgment' | 'Enforcement';
  claimMinor: number;
  deadlines: { date: string; task: string; done: boolean }[];
  nextHearing?: string;
  judgment?: { date: string; amountMinor: number; costsMinor: number };
  enforcementStatus?: string;
  clientApproval: 'Pending' | 'Approved' | 'Not required';
  lastUpdate: string;
}

export interface Document {
  id: string;
  entityType: 'Account' | 'Portfolio' | 'LegalMatter' | 'Complaint' | 'Client';
  entityId: string;
  category: 'Engagement/mandate' | 'Contract' | 'Invoice' | 'Statement' | 'Proof of payment' | 'Correspondence' | 'Identity/KYC' | 'Settlement' | 'Legal';
  fileName: string;
  version: string;
  classification: 'Public' | 'Internal' | 'Confidential' | 'Restricted';
  uploadedBy: string;
  uploadedAt: string;
  ocrStatus: 'OCR complete' | 'Processing' | 'Pending';
  checksum: string;
  retention: string;
  sizeBytes?: number;
}

export interface Approval {
  id: string;
  objectType: 'Settlement' | 'Write-off' | 'Refund' | 'Remittance' | 'Legal referral' | 'Country activation' | 'Reassignment' | 'Configuration change';
  objectId: string;
  objectTitle: string;
  requestedBy: string;
  approverRole: string;
  approverUserId?: string;
  thresholdLabel: string;
  currency: string;
  amountMinor: number;
  withinUserLimit: boolean;
  ageDays: number;
  submittedAt: string;
  decision: 'Pending' | 'Approved' | 'Rejected' | 'Changes requested';
  decidedAt?: string;
  comment?: string;
}

export interface AuditEvent {
  id: string;
  actor: string;
  actorRole: string;
  action: string;
  objectType: string;
  objectId: string;
  timestamp: string;
  ipDevice: string;
  before?: string;
  after?: string;
  reason?: string;
  approvalRef?: string;
  sourceChannel: string;
}

export interface Incident {
  id: string;
  category: string;
  severity: 'Low' | 'Medium' | 'High';
  affectedSystem: string;
  response: string;
  status: 'Open' | 'Investigating' | 'Closed';
}

export interface Vendor {
  id: string;
  name: string;
  type: 'Counsel' | 'Tracing' | 'Payment gateway' | 'SMS' | 'E-signature';
  jurisdiction: string;
  contractExpiry: string;
  dueDiligenceStatus: 'Approved' | 'Review due' | 'Pending';
  slaScore: number;
}

export interface ComplianceRequirement {
  id: string;
  countryCode: CountryCode;
  category: string;
  requirement: string;
  owner: string;
  status: 'Valid' | 'Expiring' | 'Missing' | 'Due for review';
  expiry: string;
  nextReview: string;
}

export interface Investigation {
  id: string;
  accountId: string;
  debtorName: string;
  type: string;
  objective: string;
  lawfulBasis: string;
  status: 'Assigned' | 'In progress' | 'Submitted' | 'Closed';
  assignedTo: string;
  findings: string[];
}

export interface Task {
  id: string;
  title: string;
  accountId?: string;
  assigneeUserId: string;
  due: string;
  status: 'Pending' | 'Completed' | 'Overdue';
  type: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface User {
  id: string;
  name: string;
  role: RoleId;
  roleTitle: string;
  entity: string;
  team: string;
  country: CountryCode;
  status: 'Active' | 'On leave' | 'Leaver' | 'Pending access';
  mfa: boolean;
  lastLogin: string;
  training: Record<string, 'Complete' | 'Due' | 'Overdue' | 'N/A'>;
  capacityPct: number;
}

export interface Notification {
  id: string;
  userId: string;
  roleId: RoleId;
  type: 'Approval' | 'Alert' | 'System' | 'Message';
  title: string;
  preview: string;
  relativeTime: string;
  read: boolean;
  linkRecordId?: string;
  linkPage?: string;
}

export interface AlertItem {
  id: string;
  text: string;
  type: 'Approval' | 'Hearing' | 'Reconciliation' | 'Licence' | 'Complaint' | 'Export';
  linkTarget?: string;
}

export interface DemoChapter {
  id: number;
  title: string;
  duration: string;
  roleId: RoleId;
  roleName: string;
  steps: {
    id: number;
    text: string;
    done: boolean;
  }[];
  presenterSay: string;
  nextRoleId?: RoleId;
}
