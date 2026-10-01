import {
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
  RoleConfig,
  Notification,
  AlertItem,
  DemoChapter
} from './types';

export const FX_RATES: Record<string, number> = {
  USD: 1.0,
  GHS: 15.0,
  KES: 130.0,
  GBP: 0.78,
  NGN: 1550.0,
  AED: 3.67
};

export function convertToUSD(amountMinor: number, currency: string): number {
  const rate = FX_RATES[currency] || 1.0;
  return Math.round((amountMinor / 100) / rate);
}

export function formatMoney(amountMinor: number, currency: string): string {
  const amount = (amountMinor / 100).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return `${currency} ${amount}`;
}

export const INITIAL_COUNTRIES: Country[] = [
  {
    code: 'GH',
    name: 'Ghana',
    currency: 'GHS',
    timezone: 'UTC+0',
    status: 'Active',
    activationStep: 11,
    certification: 'Certified',
    entityId: 'ENT-GH-01',
    approvedChannels: ['Call', 'SMS', 'Email', 'Letter', 'Visit'],
    holidays: ['2026-03-06', '2026-05-01', '2026-08-04']
  },
  {
    code: 'KE',
    name: 'Kenya',
    currency: 'KES',
    timezone: 'UTC+3',
    status: 'Active',
    activationStep: 11,
    certification: 'Certified',
    entityId: 'ENT-KE-01',
    approvedChannels: ['Call', 'SMS', 'Email', 'Letter', 'WhatsApp', 'Visit'],
    holidays: ['2026-06-01', '2026-10-20', '2026-12-12']
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    currency: 'GBP',
    timezone: 'UTC+1',
    status: 'Active',
    activationStep: 11,
    certification: 'Certified',
    entityId: 'ENT-UK-01',
    approvedChannels: ['Call', 'SMS', 'Email', 'Letter'],
    holidays: ['2026-05-25', '2026-08-31', '2026-12-25']
  },
  {
    code: 'NG',
    name: 'Nigeria',
    currency: 'NGN',
    timezone: 'UTC+1',
    status: 'Activating',
    activationStep: 7,
    certification: 'Pending',
    entityId: 'ENT-NG-01',
    approvedChannels: ['Call', 'SMS', 'Email'],
    holidays: ['2026-10-01']
  },
  {
    code: 'AE',
    name: 'UAE',
    currency: 'AED',
    timezone: 'UTC+4',
    status: 'Draft',
    activationStep: 3,
    certification: 'n.a.',
    entityId: 'ENT-AE-01',
    approvedChannels: ['Call', 'Email'],
    holidays: ['2026-12-02']
  }
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'CL-001',
    name: 'Volta Telecom Ghana',
    sector: 'Telecom',
    countryCode: 'GH',
    contractRef: 'MND-2024-GH-001',
    feeModel: 'Contingency',
    feeRateText: '18%',
    feeRatePct: 18,
    slaTargets: 'Initial contact 48h · Resolution 90d',
    approvalOverlay: false,
    status: 'Active',
    portalAdmins: ['Esther Tetteh'],
    assignedUSD: 321333,
    recoveredUSD: 46820,
    recoveryRatePct: 14.6
  },
  {
    id: 'CL-002',
    name: 'Savannah Commercial Bank',
    sector: 'Bank',
    countryCode: 'GH',
    contractRef: 'MND-2024-GH-004',
    feeModel: 'Contingency',
    feeRateText: '22%',
    feeRatePct: 22,
    slaTargets: 'Initial contact 24h · Resolution 60d',
    approvalOverlay: true, // Client approval required above 25% discount!
    status: 'Active',
    portalAdmins: ['Daniel Asante'],
    assignedUSD: 830000,
    recoveredUSD: 124533,
    recoveryRatePct: 15.0
  },
  {
    id: 'CL-003',
    name: 'Nairobi Power & Light',
    sector: 'Utility',
    countryCode: 'KE',
    contractRef: 'MND-2025-KE-002',
    feeModel: 'Contingency',
    feeRateText: '15%',
    feeRatePct: 15,
    slaTargets: 'Initial contact 72h · Resolution 120d',
    approvalOverlay: false,
    status: 'Active',
    portalAdmins: ['James Kilonzo'],
    assignedUSD: 663077,
    recoveredUSD: 86200,
    recoveryRatePct: 13.0
  },
  {
    id: 'CL-004',
    name: 'Thames Valley Energy',
    sector: 'Utility',
    countryCode: 'GB',
    contractRef: 'MND-2025-UK-001',
    feeModel: 'Contingency',
    feeRateText: '12%',
    feeRatePct: 12,
    slaTargets: 'Initial contact 24h · Resolution 60d',
    approvalOverlay: false,
    status: 'Active',
    portalAdmins: ['Arthur Pendelton'],
    assignedUSD: 1717949,
    recoveredUSD: 274872,
    recoveryRatePct: 16.0
  },
  {
    id: 'CL-005',
    name: 'Akwaaba Health Insurance',
    sector: 'Insurer',
    countryCode: 'GH',
    contractRef: 'MND-2025-GH-009',
    feeModel: 'Contingency',
    feeRateText: '20%',
    feeRatePct: 20,
    slaTargets: 'Initial contact 48h · Resolution 90d',
    approvalOverlay: true, // Overlay active
    status: 'Active',
    portalAdmins: ['Kofi Annan Jr'],
    assignedUSD: 143333,
    recoveredUSD: 37267,
    recoveryRatePct: 26.0
  },
  {
    id: 'CL-006',
    name: 'Kilimanjaro Distributors',
    sector: 'Trade',
    countryCode: 'KE',
    contractRef: 'MND-2026-KE-011',
    feeModel: 'Fixed fee',
    feeRateText: 'KES 450,000 fixed',
    slaTargets: 'Intake validation 14d',
    approvalOverlay: false,
    status: 'Onboarding',
    portalAdmins: ['Sarah Njeri'],
    assignedUSD: 315385,
    recoveredUSD: 0,
    recoveryRatePct: 0
  }
];

export const INITIAL_PORTFOLIOS: Portfolio[] = [
  {
    id: 'PF-2026-001',
    clientId: 'CL-001',
    clientName: 'Volta Telecom Ghana',
    name: 'Postpaid Arrears Q1',
    country: 'GH',
    currency: 'GHS',
    assignedMinor: 482000000, // GHS 4,820,000.00
    recoveredMinor: 70230000, // GHS 702,300.00
    recoveryRatePct: 14.6,
    assignedUSD: 321333,
    recoveredUSD: 46820,
    status: 'Active',
    strategy: 'High-volume automated SMS/Call + Field contact',
    ownerTeam: 'Ghana Recovery Team Alpha'
  },
  {
    id: 'PF-2026-002',
    clientId: 'CL-002',
    clientName: 'Savannah Commercial Bank',
    name: 'SME Loans 90+',
    country: 'GH',
    currency: 'GHS',
    assignedMinor: 1245000000, // GHS 12,450,000.00
    recoveredMinor: 186800000, // GHS 1,868,000.00
    recoveryRatePct: 15.0,
    assignedUSD: 830000,
    recoveredUSD: 124533,
    status: 'Active',
    strategy: 'Structured workout & legal escalation',
    ownerTeam: 'Ghana Commercial Workout Team'
  },
  {
    id: 'PF-2026-003',
    clientId: 'CL-003',
    clientName: 'Nairobi Power & Light',
    name: 'Commercial Arrears',
    country: 'KE',
    currency: 'KES',
    assignedMinor: 8620000000, // KES 86,200,000.00
    recoveredMinor: 1120600000, // KES 11,206,000.00
    recoveryRatePct: 13.0,
    assignedUSD: 663077,
    recoveredUSD: 86200,
    status: 'Active',
    strategy: 'Utility disconnection warning + payment plans',
    ownerTeam: 'Kenya Utilities Team'
  },
  {
    id: 'PF-2026-004',
    clientId: 'CL-004',
    clientName: 'Thames Valley Energy',
    name: 'Final Bills',
    country: 'GB',
    currency: 'GBP',
    assignedMinor: 134000000, // GBP 1,340,000.00
    recoveredMinor: 21440000, // GBP 214,400.00
    recoveryRatePct: 16.0,
    assignedUSD: 1717949,
    recoveredUSD: 274872,
    status: 'Active',
    strategy: 'Digital outreach & credit agency reporting',
    ownerTeam: 'UK Retail Recovery Team'
  },
  {
    id: 'PF-2026-005',
    clientId: 'CL-005',
    clientName: 'Akwaaba Health Insurance',
    name: 'Premium Arrears',
    country: 'GH',
    currency: 'GHS',
    assignedMinor: 215000000, // GHS 2,150,000.00
    recoveredMinor: 55900000, // GHS 559,000.00
    recoveryRatePct: 26.0,
    assignedUSD: 143333,
    recoveredUSD: 37267,
    status: 'Active',
    strategy: 'Policy reinstatement incentives',
    ownerTeam: 'Ghana Recovery Team Beta'
  },
  {
    id: 'PF-2026-006',
    clientId: 'CL-006',
    clientName: 'Kilimanjaro Distributors',
    name: 'Trade Receivables',
    country: 'KE',
    currency: 'KES',
    assignedMinor: 4100000000, // KES 41,000,000.00
    recoveredMinor: 0,
    recoveryRatePct: 0,
    assignedUSD: 315385,
    recoveredUSD: 0,
    status: 'Pending validation',
    strategy: 'Intake validation & conflict check',
    ownerTeam: 'Kenya Intake Desk',
    intakeStats: {
      uploaded: 1240,
      valid: 1187,
      duplicates: 31,
      missingEvidence: 22
    }
  }
];

export const INITIAL_DEBTORS: Debtor[] = [
  {
    id: 'DB-0231',
    type: 'Individual',
    legalName: 'Kofi Mensah',
    idType: 'Ghana Card',
    idNumberMasked: 'GHA-722•••9-1',
    phoneMasked: '+233 24 ••• 4471',
    emailMasked: 'k•••••@mail.com',
    addressMasked: 'Plot 14, East Legon, Accra',
    preferredLanguage: 'English',
    preferences: { sms: true, email: true, calls: true, window: '09:00–17:00' },
    risk: 'Medium'
  },
  {
    id: 'DB-0232',
    type: 'Company',
    legalName: 'Adwoa Trading Ltd',
    idType: 'TIN',
    idNumberMasked: 'C000•••411',
    phoneMasked: '+233 30 ••• 2190',
    emailMasked: 'a•••••@adwoatrading.com',
    addressMasked: 'Industrial Area, Ring Road, Accra',
    preferredLanguage: 'English',
    preferences: { sms: false, email: true, calls: false, window: '10:00–16:00' },
    risk: 'Low'
  },
  {
    id: 'DB-0377',
    type: 'Company',
    legalName: 'Yaw Boateng Logistics Ltd',
    idType: 'TIN',
    idNumberMasked: 'C000•••882',
    phoneMasked: '+233 20 ••• 8802',
    emailMasked: 'y•••••@yblogistics.com',
    addressMasked: 'Tema Port Commercial Zone, Tema',
    preferredLanguage: 'English',
    preferences: { sms: true, email: true, calls: true, window: '08:00–18:00' },
    risk: 'High'
  },
  {
    id: 'DB-0378',
    type: 'Individual',
    legalName: 'Esi Owusu',
    idType: 'Ghana Card',
    idNumberMasked: 'GHA-810•••3-4',
    phoneMasked: '+233 55 ••• 1136',
    emailMasked: 'e•••••@gmail.com',
    addressMasked: 'Ahodwo, Kumasi',
    preferredLanguage: 'Twi',
    preferences: { sms: true, email: false, calls: false, window: '12:00–15:00' },
    risk: 'Medium'
  },
  {
    id: 'DB-2114',
    type: 'Company',
    legalName: 'Wanjiru Holdings Ltd',
    idType: 'PIN',
    idNumberMasked: 'P051•••90X',
    phoneMasked: '+254 7•• ••• 305',
    emailMasked: 'info@w•••••.co.ke',
    addressMasked: 'Kilimani, Nairobi',
    preferredLanguage: 'Swahili / English',
    preferences: { sms: false, email: true, calls: true, window: '09:00–17:00' },
    risk: 'High'
  },
  {
    id: 'DB-3052',
    type: 'Individual',
    legalName: 'Oliver Hargreaves',
    idType: 'NIN',
    idNumberMasked: 'QQ12•••4C',
    phoneMasked: '+44 7••• •• 5521',
    emailMasked: 'o•••••@btinternet.com',
    addressMasked: '14 Station Road, Reading',
    preferredLanguage: 'English',
    preferences: { sms: false, email: true, calls: false, window: '09:00–17:00' },
    risk: 'Medium'
  }
];

export const INITIAL_ACCOUNTS: Account[] = [
  {
    id: 'ACC-100199',
    portfolioId: 'PF-2026-001',
    debtorId: 'DB-0199',
    debtorName: 'Oduro Hardware Ltd',
    debtorType: 'Company',
    clientName: 'Volta Telecom Ghana',
    countryCode: 'GH',
    currency: 'GHS',
    principalMinor: 0,
    chargesMinor: 0,
    paidMinor: 3200000,
    balanceMinor: 0,
    disputedMinor: 0,
    dueDate: '2026-02-15',
    agingBucket: '365+',
    status: 'Closed',
    risk: 'Low',
    ownerUserId: 'USR-AMADARKO',
    ownerName: 'Ama Darko',
    requiredDocs: { contract: true, invoice: true, statement: true, proofOfDebt: true }
  },
  {
    id: 'ACC-100231',
    portfolioId: 'PF-2026-001',
    debtorId: 'DB-0231',
    debtorName: 'Kofi Mensah',
    debtorType: 'Individual',
    clientName: 'Volta Telecom Ghana',
    countryCode: 'GH',
    currency: 'GHS',
    principalMinor: 1620000, // GHS 16,200.00
    chargesMinor: 225000,  // GHS 2,250.00
    paidMinor: 0,
    balanceMinor: 1845000, // GHS 18,450.00
    disputedMinor: 0,
    dueDate: '2026-05-10',
    agingBucket: '91–180',
    status: 'Active recovery',
    risk: 'Medium',
    ownerUserId: 'USR-AMADARKO',
    ownerName: 'Ama Darko',
    nextAction: { type: 'Call follow-up', due: '2026-10-01' },
    requiredDocs: { contract: true, invoice: true, statement: true, proofOfDebt: true }
  },
  {
    id: 'ACC-100232',
    portfolioId: 'PF-2026-001',
    debtorId: 'DB-0232',
    debtorName: 'Adwoa Trading Ltd',
    debtorType: 'Company',
    clientName: 'Volta Telecom Ghana',
    countryCode: 'GH',
    currency: 'GHS',
    principalMinor: 12800000, // GHS 128,000.00
    chargesMinor: 1480000,  // GHS 14,800.00
    paidMinor: 2500000,
    balanceMinor: 14280000, // GHS 142,800.00
    disputedMinor: 0,
    dueDate: '2026-07-01',
    agingBucket: '61–90',
    status: 'Payment plan',
    risk: 'Low',
    ownerUserId: 'USR-AMADARKO',
    ownerName: 'Ama Darko',
    nextAction: { type: 'Installment review', due: '2026-10-25' },
    requiredDocs: { contract: true, invoice: true, statement: true, proofOfDebt: true }
  },
  {
    id: 'ACC-100255',
    portfolioId: 'PF-2026-001',
    debtorId: 'DB-0255',
    debtorName: 'Kumasi Fresh Foods Ltd',
    debtorType: 'Company',
    clientName: 'Volta Telecom Ghana',
    countryCode: 'GH',
    currency: 'GHS',
    principalMinor: 5600000, // GHS 56,000.00
    chargesMinor: 800000,   // GHS 8,000.00
    paidMinor: 0,
    balanceMinor: 6400000,  // GHS 64,000.00
    disputedMinor: 0,
    dueDate: '2026-04-20',
    agingBucket: '91–180',
    status: 'Settlement',
    risk: 'Medium',
    ownerUserId: 'USR-AMADARKO',
    ownerName: 'Ama Darko',
    nextAction: { type: 'Manager approval review', due: '2026-10-02' },
    requiredDocs: { contract: true, invoice: true, statement: true, proofOfDebt: true }
  },
  {
    id: 'ACC-100290',
    portfolioId: 'PF-2026-001',
    debtorId: 'DB-0290',
    debtorName: 'Asante & Sons Traders',
    debtorType: 'Company',
    clientName: 'Volta Telecom Ghana',
    countryCode: 'GH',
    currency: 'GHS',
    principalMinor: 9600000, // GHS 96,000.00
    chargesMinor: 1200000,  // GHS 12,000.00
    paidMinor: 0,
    balanceMinor: 10800000, // GHS 108,000.00 (USD 7,200)
    disputedMinor: 0,
    dueDate: '2025-09-15',
    agingBucket: '365+',
    status: 'Write-off pending',
    risk: 'High',
    ownerUserId: 'USR-AMADARKO',
    ownerName: 'Ama Darko',
    nextAction: { type: 'CEO write-off sign-off', due: '2026-10-01' },
    requiredDocs: { contract: true, invoice: true, statement: true, proofOfDebt: true }
  },
  {
    id: 'ACC-100377',
    portfolioId: 'PF-2026-002',
    debtorId: 'DB-0377',
    debtorName: 'Yaw Boateng Logistics Ltd',
    debtorType: 'Company',
    clientName: 'Savannah Commercial Bank',
    countryCode: 'GH',
    currency: 'GHS',
    principalMinor: 42000000, // GHS 420,000.00
    chargesMinor: 6620000,   // GHS 66,200.00
    paidMinor: 12000000,    // GHS 120,000.00
    balanceMinor: 48620000,  // GHS 486,200.00
    disputedMinor: 0,
    dueDate: '2026-01-10',
    agingBucket: '181–365',
    status: 'Active recovery',
    risk: 'High',
    ownerUserId: 'USR-AMADARKO',
    ownerName: 'Ama Darko',
    nextAction: { type: 'Settlement proposal', due: '2026-10-01' },
    requiredDocs: { contract: true, invoice: true, statement: true, proofOfDebt: true }
  },
  {
    id: 'ACC-100378',
    portfolioId: 'PF-2026-002',
    debtorId: 'DB-0378',
    debtorName: 'Esi Owusu',
    debtorType: 'Individual',
    clientName: 'Savannah Commercial Bank',
    countryCode: 'GH',
    currency: 'GHS',
    principalMinor: 2800000, // GHS 28,000.00
    chargesMinor: 490000,   // GHS 4,900.00
    paidMinor: 0,
    balanceMinor: 3290000,  // GHS 32,900.00
    disputedMinor: 3290000,
    dueDate: '2026-04-12',
    agingBucket: '91–180',
    status: 'Disputed',
    risk: 'Medium',
    ownerUserId: 'USR-KWESIAPPIAH',
    ownerName: 'Kwesi Appiah',
    nextAction: { type: 'Dispute investigation', due: '2026-10-03' },
    requiredDocs: { contract: true, invoice: true, statement: true, proofOfDebt: true }
  },
  {
    id: 'ACC-100412',
    portfolioId: 'PF-2026-002',
    debtorId: 'DB-0412',
    debtorName: 'Techiman Agro Ltd',
    debtorType: 'Company',
    clientName: 'Savannah Commercial Bank',
    countryCode: 'GH',
    currency: 'GHS',
    principalMinor: 48000000, // GHS 480,000.00
    chargesMinor: 6000000,   // GHS 60,000.00
    paidMinor: 0,
    balanceMinor: 54000000,  // GHS 540,000.00
    disputedMinor: 0,
    dueDate: '2025-08-01',
    agingBucket: '365+',
    status: 'Legal',
    risk: 'High',
    ownerUserId: 'USR-KWESIAPPIAH',
    ownerName: 'Kwesi Appiah',
    nextAction: { type: 'Garnishee order execution', due: '2026-10-15' },
    requiredDocs: { contract: true, invoice: true, statement: true, proofOfDebt: true }
  },
  {
    id: 'ACC-200114',
    portfolioId: 'PF-2026-003',
    debtorId: 'DB-2114',
    debtorName: 'Wanjiru Holdings Ltd',
    debtorType: 'Company',
    clientName: 'Nairobi Power & Light',
    countryCode: 'KE',
    currency: 'KES',
    principalMinor: 250000000, // KES 2,500,000.00
    chargesMinor: 34000000,   // KES 340,000.00
    paidMinor: 15000000,     // KES 150,000.00
    balanceMinor: 284000000,  // KES 2,840,000.00
    disputedMinor: 40000000,  // KES 400,000.00
    dueDate: '2026-04-18',
    agingBucket: '91–180',
    status: 'Active recovery',
    risk: 'High',
    ownerUserId: 'USR-GRACEWAMBUI',
    ownerName: 'Grace Wambui',
    nextAction: { type: 'Legal referral review', due: '2026-10-04' },
    requiredDocs: { contract: true, invoice: true, statement: true, proofOfDebt: false } // missing proof of debt!
  },
  {
    id: 'ACC-200115',
    portfolioId: 'PF-2026-003',
    debtorId: 'DB-2115',
    debtorName: 'Peter Kamau',
    debtorType: 'Individual',
    clientName: 'Nairobi Power & Light',
    countryCode: 'KE',
    currency: 'KES',
    principalMinor: 8200000, // KES 82,000.00
    chargesMinor: 1450000,  // KES 14,500.00
    paidMinor: 0,
    balanceMinor: 9650000,  // KES 96,500.00
    disputedMinor: 0,
    dueDate: '2026-08-10',
    agingBucket: '31–60',
    status: 'Settlement',
    risk: 'Low',
    ownerUserId: 'USR-GRACEWAMBUI',
    ownerName: 'Grace Wambui',
    nextAction: { type: 'Collect installment', due: '2026-10-05' },
    requiredDocs: { contract: true, invoice: true, statement: true, proofOfDebt: true }
  },
  {
    id: 'ACC-300052',
    portfolioId: 'PF-2026-004',
    debtorId: 'DB-3052',
    debtorName: 'Oliver Hargreaves',
    debtorType: 'Individual',
    clientName: 'Thames Valley Energy',
    countryCode: 'GB',
    currency: 'GBP',
    principalMinor: 119000, // GBP 1,190.00
    chargesMinor: 9540,    // GBP 95.40
    paidMinor: 12000,
    balanceMinor: 128540,  // GBP 1,285.40
    disputedMinor: 0,
    dueDate: '2026-07-22',
    agingBucket: '61–90',
    status: 'Payment plan',
    risk: 'Medium',
    ownerUserId: 'USR-HANNAHCLARKE',
    ownerName: 'Hannah Clarke',
    nextAction: { type: 'Check plan payment', due: '2026-10-15' },
    requiredDocs: { contract: true, invoice: true, statement: true, proofOfDebt: true }
  },
  {
    id: 'ACC-300060',
    portfolioId: 'PF-2026-004',
    debtorId: 'DB-3060',
    debtorName: 'Marlow Cleaning Services Ltd',
    debtorType: 'Company',
    clientName: 'Thames Valley Energy',
    countryCode: 'GB',
    currency: 'GBP',
    principalMinor: 1690000, // GBP 16,900.00
    chargesMinor: 130000,   // GBP 1,300.00
    paidMinor: 0,
    balanceMinor: 1820000,  // GBP 18,200.00
    disputedMinor: 0,
    dueDate: '2026-02-14',
    agingBucket: '181–365',
    status: 'Legal',
    risk: 'High',
    ownerUserId: 'USR-HANNAHCLARKE',
    ownerName: 'Hannah Clarke',
    nextAction: { type: 'Pre-action protocol response', due: '2026-10-10' },
    requiredDocs: { contract: true, invoice: true, statement: true, proofOfDebt: true }
  },
  {
    id: 'ACC-300053',
    portfolioId: 'PF-2026-004',
    debtorId: 'DB-3053',
    debtorName: 'Sarah Whitfield',
    debtorType: 'Individual',
    clientName: 'Thames Valley Energy',
    countryCode: 'GB',
    currency: 'GBP',
    principalMinor: 79000,
    chargesMinor: 5210,
    paidMinor: 0,
    balanceMinor: 84210,
    disputedMinor: 0,
    dueDate: '2026-08-20',
    agingBucket: '31–60',
    status: 'Active recovery',
    risk: 'Low',
    ownerUserId: 'USR-HANNAHCLARKE',
    ownerName: 'Hannah Clarke',
    nextAction: { type: 'Promise follow up', due: '2026-10-02' },
    requiredDocs: { contract: true, invoice: true, statement: true, proofOfDebt: true }
  },
  {
    id: 'ACC-400021',
    portfolioId: 'PF-2026-002',
    debtorId: 'DB-4021',
    debtorName: 'Brightway Pharma Ltd',
    debtorType: 'Company',
    clientName: 'Savannah Commercial Bank',
    countryCode: 'GH',
    currency: 'GHS',
    principalMinor: 19000000,
    chargesMinor: 2400000,
    paidMinor: 0,
    balanceMinor: 21400000,
    disputedMinor: 0,
    dueDate: '2026-04-05',
    agingBucket: '91–180',
    status: 'Legal',
    risk: 'High',
    ownerUserId: 'USR-KWESIAPPIAH',
    ownerName: 'Kwesi Appiah',
    nextAction: { type: 'Court hearing', due: '2026-10-14' },
    requiredDocs: { contract: true, invoice: true, statement: true, proofOfDebt: true }
  }
];

export const INITIAL_CONTACT_EVENTS: ContactEvent[] = [
  {
    id: 'CE-001',
    accountId: 'ACC-100231',
    userId: 'USR-AMADARKO',
    userName: 'Ama Darko',
    channel: 'Call',
    dateTime: '2026-09-28T10:12:00Z',
    outcome: 'Promise to pay',
    notes: 'Promised GHS 5,000 by 30 Sep after salary payment.',
    identityVerified: true,
    nextAction: 'Verify payment on 30 Sep'
  },
  {
    id: 'CE-002',
    accountId: 'ACC-100231',
    userId: 'USR-AMADARKO',
    userName: 'Ama Darko',
    channel: 'SMS',
    dateTime: '2026-09-30T17:40:00Z',
    outcome: 'Message left',
    notes: 'Reminder sent from approved template v3.',
    identityVerified: true,
    nextAction: 'Follow up call 1 Oct'
  },
  {
    id: 'CE-003',
    accountId: 'ACC-100231',
    userId: 'USR-AMADARKO',
    userName: 'Ama Darko',
    channel: 'Call',
    dateTime: '2026-10-01T08:55:00Z',
    outcome: 'No answer',
    notes: 'Phone rang, no answer. Will retry at 10:00.',
    identityVerified: false,
    nextAction: 'Retry call 10:00'
  },
  {
    id: 'CE-004',
    accountId: 'ACC-100231',
    userId: 'USR-AMADARKO',
    userName: 'Ama Darko',
    channel: 'Call',
    dateTime: '2026-09-22T14:03:00Z',
    outcome: 'Spoke to debtor',
    notes: 'Identity verified; debtor disputes interest calculation.',
    identityVerified: true
  }
];

export const INITIAL_PROMISES: PromiseToPay[] = [
  {
    id: 'PTP-0881',
    accountId: 'ACC-100231',
    amountMinor: 500000, // GHS 5,000.00
    dueDate: '2026-09-30',
    status: 'Broken',
    source: 'Officer contact (Ama Darko)'
  },
  {
    id: 'PTP-0884',
    accountId: 'ACC-100232',
    amountMinor: 2500000, // GHS 25,000.00
    dueDate: '2026-09-25',
    status: 'Kept',
    source: 'Payment plan schedule (PAY-884201)'
  },
  {
    id: 'PTP-0890',
    accountId: 'ACC-200114',
    amountMinor: 30000000, // KES 300,000.00
    dueDate: '2026-10-03',
    status: 'Pending',
    source: 'Officer contact (Grace Wambui)'
  },
  {
    id: 'PTP-0891',
    accountId: 'ACC-300053',
    amountMinor: 12000, // GBP 120.00
    dueDate: '2026-10-02',
    status: 'Pending',
    source: 'Officer contact (Hannah Clarke)'
  }
];

export const INITIAL_PAYMENT_PLANS: PaymentPlan[] = [
  {
    id: 'PLAN-0210',
    accountId: 'ACC-100232',
    status: 'Active',
    requestedBy: 'Officer',
    installments: [
      { no: 1, due: '2026-10-25', amountMinor: 2380000, status: 'Due' },
      { no: 2, due: '2026-11-25', amountMinor: 2380000, status: 'Due' },
      { no: 3, due: '2026-12-25', amountMinor: 2380000, status: 'Due' },
      { no: 4, due: '2027-01-25', amountMinor: 2380000, status: 'Due' },
      { no: 5, due: '2027-02-25', amountMinor: 2380000, status: 'Due' },
      { no: 6, due: '2027-03-25', amountMinor: 2380000, status: 'Due' }
    ]
  },
  {
    id: 'PLAN-0214',
    accountId: 'ACC-300052',
    status: 'Active',
    requestedBy: 'Officer',
    installments: [
      { no: 1, due: '2026-10-15', amountMinor: 21423, status: 'Due' },
      { no: 2, due: '2026-11-15', amountMinor: 21423, status: 'Due' },
      { no: 3, due: '2026-12-15', amountMinor: 21423, status: 'Due' },
      { no: 4, due: '2027-01-15', amountMinor: 21423, status: 'Due' },
      { no: 5, due: '2027-02-15', amountMinor: 21423, status: 'Due' },
      { no: 6, due: '2027-03-15', amountMinor: 21425, status: 'Due' }
    ]
  }
];

export const INITIAL_SETTLEMENTS: Settlement[] = [
  {
    id: 'SET-0402',
    accountId: 'ACC-100199',
    debtorName: 'Oduro Hardware Ltd',
    clientName: 'Volta Telecom Ghana',
    currency: 'GHS',
    outstandingMinor: 4000000,
    discountPct: 20,
    settlementMinor: 3200000,
    type: 'Lump sum',
    status: 'Completed',
    approvalChain: [
      { role: 'Recovery Manager', userName: 'Efua Boateng', status: 'Approved' }
    ],
    clientApprovalRequired: false,
    clientApprovalStatus: 'Not required',
    terms: 'Single payment of GHS 32,000 within 7 days',
    conditions: ['Full & final release'],
    requestedBy: 'Ama Darko',
    createdAt: '2026-08-10T09:00:00Z'
  },
  {
    id: 'SET-0409',
    accountId: 'ACC-200115',
    debtorName: 'Peter Kamau',
    clientName: 'Nairobi Power & Light',
    currency: 'KES',
    outstandingMinor: 9650000,
    discountPct: 15,
    settlementMinor: 8202500,
    type: 'Structured',
    status: 'In progress',
    approvalChain: [
      { role: 'Recovery Manager', userName: 'James Okello', status: 'Approved' }
    ],
    clientApprovalRequired: false,
    clientApprovalStatus: 'Not required',
    terms: 'Two installments of KES 41,012.50',
    conditions: ['Default converts to full balance'],
    requestedBy: 'Grace Wambui',
    createdAt: '2026-09-15T11:30:00Z'
  },
  {
    id: 'SET-0415',
    accountId: 'ACC-100255',
    debtorName: 'Kumasi Fresh Foods Ltd',
    clientName: 'Volta Telecom Ghana',
    currency: 'GHS',
    outstandingMinor: 6400000,
    discountPct: 15,
    settlementMinor: 5440000,
    type: 'Lump sum',
    status: 'Pending approval',
    approvalChain: [
      { role: 'Recovery Officer', userName: 'Ama Darko', status: 'Passed' },
      { role: 'Recovery Manager', userName: 'Efua Boateng', status: 'Pending' }
    ],
    clientApprovalRequired: false,
    clientApprovalStatus: 'Not required',
    terms: 'Single payment of GHS 54,400.00',
    conditions: ['Payment by 15 Oct 2026'],
    requestedBy: 'Ama Darko',
    createdAt: '2026-09-30T14:15:00Z'
  }
];

export const INITIAL_PAYMENTS: Payment[] = [
  {
    id: 'PAY-884201',
    payerName: 'Adwoa Trading Ltd',
    reference: 'ADW-PLAN-02',
    amountMinor: 2500000, // GHS 25,000.00
    currency: 'GHS',
    receivedDate: '2026-09-25',
    source: 'Bank transfer',
    status: 'Allocated',
    matchedAccountId: 'ACC-100232',
    bankAccountId: 'BANK-GH-GCB-01'
  },
  {
    id: 'PAY-884202',
    payerName: 'Yaw Boateng Logistics Ltd',
    reference: 'YBL-PART-01',
    amountMinor: 12000000, // GHS 120,000.00
    currency: 'GHS',
    receivedDate: '2026-09-29',
    source: 'Bank transfer',
    status: 'Allocated',
    matchedAccountId: 'ACC-100377',
    bankAccountId: 'BANK-GH-GCB-01'
  },
  {
    id: 'PAY-884203',
    payerName: '(unknown)',
    reference: 'MM-77120',
    amountMinor: 430000, // GHS 4,300.00
    currency: 'GHS',
    receivedDate: '2026-09-30',
    source: 'Mobile money',
    status: 'Unmatched',
    exceptionReason: 'Unmatched mobile money reference',
    bankAccountId: 'BANK-GH-MTN-01'
  },
  {
    id: 'PAY-884204',
    payerName: 'Wanjiru Holdings Ltd',
    reference: 'WH-0930',
    amountMinor: 15000000, // KES 150,000.00
    currency: 'KES',
    receivedDate: '2026-09-29',
    source: 'Bank transfer',
    status: 'Allocated',
    matchedAccountId: 'ACC-200114',
    bankAccountId: 'BANK-KE-KCB-01'
  },
  {
    id: 'PAY-884205',
    payerName: 'Oliver Hargreaves',
    reference: 'OH-PLAN-02',
    amountMinor: 12000, // GBP 120.00
    currency: 'GBP',
    receivedDate: '2026-09-30',
    source: 'Card/gateway',
    status: 'Allocated',
    matchedAccountId: 'ACC-300052',
    bankAccountId: 'BANK-UK-BARC-01'
  },
  {
    id: 'PAY-884206',
    payerName: '(unknown)',
    reference: 'UNKNOWN',
    amountMinor: 980000, // GHS 9,800.00
    currency: 'GHS',
    receivedDate: '2026-09-30',
    source: 'Bank transfer',
    status: 'Unmatched',
    exceptionReason: 'No reference provided',
    bankAccountId: 'BANK-GH-GCB-01'
  },
  {
    id: 'PAY-884207',
    payerName: 'Adwoa Trading Ltd',
    reference: 'ADW-PLAN-02',
    amountMinor: 2500000, // GHS 25,000.00
    currency: 'GHS',
    receivedDate: '2026-09-25',
    source: 'Bank transfer',
    status: 'Exception',
    exceptionReason: 'Possible duplicate of PAY-884201',
    duplicateOf: 'PAY-884201',
    bankAccountId: 'BANK-GH-GCB-01'
  },
  {
    id: 'PAY-884208',
    payerName: '(unknown)',
    reference: 'NPL-0930',
    amountMinor: 78000000, // KES 780,000.00
    currency: 'KES',
    receivedDate: '2026-09-30',
    source: 'Bank transfer',
    status: 'Unmatched',
    exceptionReason: 'Unreconciled bank feed credit',
    bankAccountId: 'BANK-KE-KCB-01'
  },
  {
    id: 'PAY-884209',
    payerName: 'Oliver Hargreaves',
    reference: 'OH-PLAN-03',
    amountMinor: 31000, // GBP 310.00
    currency: 'GBP',
    receivedDate: '2026-10-01',
    source: 'Card/gateway',
    status: 'Exception',
    exceptionReason: 'Over-payment against active plan installment',
    bankAccountId: 'BANK-UK-BARC-01'
  }
];

export const INITIAL_ALLOCATIONS: Allocation[] = [
  {
    id: 'AL-1',
    paymentId: 'PAY-884201',
    accountId: 'ACC-100232',
    amountMinor: 2500000,
    allocationType: 'Principal',
    feeRuleId: 'FR-001'
  },
  {
    id: 'AL-2',
    paymentId: 'PAY-884202',
    accountId: 'ACC-100377',
    amountMinor: 12000000,
    allocationType: 'Principal',
    feeRuleId: 'FR-002'
  },
  {
    id: 'AL-3',
    paymentId: 'PAY-884204',
    accountId: 'ACC-200114',
    amountMinor: 15000000,
    allocationType: 'Principal',
    feeRuleId: 'FR-003'
  }
];

export const INITIAL_REMITTANCES: Remittance[] = [
  {
    id: 'REM-2026-09-VTG',
    clientId: 'CL-001',
    clientName: 'Volta Telecom Ghana',
    period: 'September 2026',
    currency: 'GHS',
    recoveredMinor: 70230000,
    feesMinor: 12641400, // 18% fee
    expensesMinor: 150000,
    netMinor: 57438600,
    status: 'Blocked',
    blockers: ['Unresolved payment exception PAY-884207 (GHS 25,000.00 duplicate check)'],
    feeRuleVersion: 'FR-001 v2'
  },
  {
    id: 'REM-2026-09-SCB',
    clientId: 'CL-002',
    clientName: 'Savannah Commercial Bank',
    period: 'September 2026',
    currency: 'GHS',
    recoveredMinor: 186800000,
    feesMinor: 41096000, // 22% fee
    expensesMinor: 350000,
    netMinor: 145354000,
    status: 'In preparation',
    blockers: [],
    feeRuleVersion: 'FR-002 v1'
  },
  {
    id: 'REM-2026-09-NPL',
    clientId: 'CL-003',
    clientName: 'Nairobi Power & Light',
    period: 'September 2026',
    currency: 'KES',
    recoveredMinor: 1120600000,
    feesMinor: 168090000, // 15% fee
    expensesMinor: 1200000,
    netMinor: 951310000,
    status: 'Pending approval',
    blockers: [],
    feeRuleVersion: 'FR-003 v1'
  },
  {
    id: 'REM-2026-09-TVE',
    clientId: 'CL-004',
    clientName: 'Thames Valley Energy',
    period: 'September 2026',
    currency: 'GBP',
    recoveredMinor: 21440000,
    feesMinor: 2572800, // 12% fee
    expensesMinor: 25000,
    netMinor: 18842200,
    status: 'Remitted',
    blockers: [],
    feeRuleVersion: 'FR-004 v1',
    date: '2026-09-28'
  },
  {
    id: 'REM-2026-09-AHI',
    clientId: 'CL-005',
    clientName: 'Akwaaba Health Insurance',
    period: 'September 2026',
    currency: 'GHS',
    recoveredMinor: 55900000,
    feesMinor: 11180000, // 20% fee
    expensesMinor: 80000,
    netMinor: 44640000,
    status: 'Remitted',
    blockers: [],
    feeRuleVersion: 'FR-005 v1',
    date: '2026-09-29'
  }
];

export const INITIAL_FEE_RULES: FeeRule[] = [
  { id: 'FR-001', clientId: 'CL-001', clientName: 'Volta Telecom Ghana', feeType: 'Contingency', rateOrAmount: '18%', effectiveFrom: '2026-01-01', version: 'v2', status: 'Current' },
  { id: 'FR-002', clientId: 'CL-002', clientName: 'Savannah Commercial Bank', feeType: 'Contingency', rateOrAmount: '22%', effectiveFrom: '2026-01-01', version: 'v1', status: 'Current' },
  { id: 'FR-003', clientId: 'CL-003', clientName: 'Nairobi Power & Light', feeType: 'Contingency', rateOrAmount: '15%', effectiveFrom: '2026-01-01', version: 'v1', status: 'Current' },
  { id: 'FR-004', clientId: 'CL-004', clientName: 'Thames Valley Energy', feeType: 'Contingency', rateOrAmount: '12%', effectiveFrom: '2026-01-01', version: 'v1', status: 'Current' },
  { id: 'FR-005', clientId: 'CL-005', clientName: 'Akwaaba Health Insurance', feeType: 'Contingency', rateOrAmount: '20%', effectiveFrom: '2026-01-01', version: 'v1', status: 'Current' },
  { id: 'FR-006', clientId: 'CL-006', clientName: 'Kilimanjaro Distributors', feeType: 'Fixed fee', rateOrAmount: 'KES 450,000.00', effectiveFrom: '2026-09-01', version: 'v1', status: 'Current' }
];

export const INITIAL_DISPUTES: Dispute[] = [
  { id: 'DSP-0011', accountId: 'ACC-100378', debtorName: 'Esi Owusu', amountMinor: 3290000, currency: 'GHS', reason: 'Not my debt', status: 'Open', evidenceCount: 1, owner: 'Kwesi Appiah', explanation: 'Claims account opened fraudulently.' },
  { id: 'DSP-0012', accountId: 'ACC-100231', debtorName: 'Kofi Mensah', amountMinor: 310000, currency: 'GHS', reason: 'Interest incorrect', status: 'Under review', evidenceCount: 2, owner: 'Ama Darko', explanation: 'Disputes default charges added in Month 3.' },
  { id: 'DSP-0013', accountId: 'ACC-200114', debtorName: 'Wanjiru Holdings Ltd', amountMinor: 40000000, currency: 'KES', reason: 'Already paid', status: 'Open', evidenceCount: 1, owner: 'Grace Wambui', explanation: 'Claims direct payment to utility counter.' }
];

export const INITIAL_COMPLAINTS: Complaint[] = [
  { id: 'CMP-0187', accountId: 'ACC-100231', debtorName: 'Kofi Mensah', source: 'Phone', category: 'Incorrect calculation', severity: 'Low', investigatorUserId: 'USR-FATIMA', status: 'Triage', evidenceIds: ['DOC-5006'], createdAt: '2026-09-26T11:00:00Z', slaDue: '2026-10-03T11:00:00Z' },
  { id: 'CMP-0190', accountId: 'ACC-100377', debtorName: 'Yaw Boateng Logistics Ltd', source: 'Regulator', category: 'Harassment', severity: 'High', investigatorUserId: 'USR-FATIMA', status: 'Investigation', evidenceIds: [], createdAt: '2026-09-29T14:30:00Z', slaDue: '2026-10-02T14:30:00Z' },
  { id: 'CMP-0191', accountId: 'ACC-200114', debtorName: 'Wanjiru Holdings Ltd', source: 'Email', category: 'Data privacy', severity: 'Medium', investigatorUserId: 'USR-FATIMA', status: 'Acknowledged', evidenceIds: [], createdAt: '2026-09-30T09:15:00Z', slaDue: '2026-10-05T09:15:00Z' },
  { id: 'CMP-0192', accountId: 'ACC-300052', debtorName: 'Oliver Hargreaves', source: 'Debtor portal', category: 'Service delay', severity: 'Low', investigatorUserId: 'USR-FATIMA', status: 'Received', evidenceIds: [], createdAt: '2026-10-01T08:00:00Z', slaDue: '2026-10-08T08:00:00Z' }
];

export const INITIAL_LEGAL_MATTERS: LegalMatter[] = [
  {
    id: 'LM-0087',
    accountId: 'ACC-100412',
    debtorName: 'Techiman Agro Ltd',
    clientName: 'Savannah Commercial Bank',
    counselVendorId: 'VN-01',
    counselName: 'Adjei & Partners LLP',
    jurisdiction: 'Ghana High Court (Commercial)',
    currency: 'GHS',
    stage: 'Judgment',
    claimMinor: 54000000,
    deadlines: [
      { date: '2026-10-15', task: 'File Garnishee Order Nisi', done: false }
    ],
    nextHearing: '2026-10-15 10:00',
    judgment: { date: '2026-08-20', amountMinor: 54000000, costsMinor: 1500000 },
    enforcementStatus: 'Garnishee application pending',
    clientApproval: 'Approved',
    lastUpdate: '2026-09-25T16:00:00Z'
  },
  {
    id: 'LM-0090',
    accountId: 'ACC-300060',
    debtorName: 'Marlow Cleaning Services Ltd',
    clientName: 'Thames Valley Energy',
    counselVendorId: 'VN-03',
    counselName: 'Hartwell Solicitors',
    jurisdiction: 'UK County Court Money Claims',
    currency: 'GBP',
    stage: 'Pre-action',
    claimMinor: 1820000,
    deadlines: [
      { date: '2026-10-10', task: 'Pre-Action Protocol Letter Response Expiry', done: false }
    ],
    clientApproval: 'Approved',
    lastUpdate: '2026-09-28T10:00:00Z'
  },
  {
    id: 'LM-0092',
    accountId: 'ACC-400021',
    debtorName: 'Brightway Pharma Ltd',
    clientName: 'Savannah Commercial Bank',
    counselVendorId: 'VN-01',
    counselName: 'Adjei & Partners LLP',
    jurisdiction: 'Ghana High Court',
    currency: 'GHS',
    stage: 'Filed (writ)',
    claimMinor: 21400000,
    deadlines: [
      { date: '2026-10-14', task: 'Court Hearing (Application for summary judgment)', done: false }
    ],
    nextHearing: '2026-10-14 10:00',
    clientApproval: 'Approved',
    lastUpdate: '2026-09-29T11:20:00Z'
  },
  {
    id: 'LM-0093',
    accountId: 'ACC-200114',
    debtorName: 'Wanjiru Holdings Ltd',
    clientName: 'Nairobi Power & Light',
    counselVendorId: 'VN-02',
    counselName: 'Mwangi & Co Advocates',
    jurisdiction: 'Kenya High Court Nairobi',
    currency: 'KES',
    stage: 'Proposed',
    claimMinor: 284000000,
    deadlines: [
      { date: '2026-10-08', task: 'Client referral confirmation', done: false }
    ],
    clientApproval: 'Pending',
    lastUpdate: '2026-09-30T15:45:00Z'
  }
];

export const INITIAL_DOCUMENTS: Document[] = [
  { id: 'DOC-5001', entityType: 'Account', entityId: 'ACC-100377', category: 'Contract', fileName: 'SCB-SME-Loan-Agreement.pdf', version: 'v1', classification: 'Confidential', uploadedBy: 'Kwabena Ofosu', uploadedAt: '2026-09-01T10:00:00Z', ocrStatus: 'OCR complete', checksum: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', retention: '7 Years' },
  { id: 'DOC-5002', entityType: 'Account', entityId: 'ACC-100377', category: 'Statement', fileName: 'Statement-Aug2026.pdf', version: 'v3', classification: 'Internal', uploadedBy: 'Ama Darko', uploadedAt: '2026-09-05T14:20:00Z', ocrStatus: 'OCR complete', checksum: 'sha256:8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4', retention: '7 Years' },
  { id: 'DOC-5003', entityType: 'Account', entityId: 'ACC-100377', category: 'Invoice', fileName: 'Facility-Demand-Notice.pdf', version: 'v1', classification: 'Confidential', uploadedBy: 'Ama Darko', uploadedAt: '2026-09-10T11:00:00Z', ocrStatus: 'OCR complete', checksum: 'sha256:8743b52063cd84097a65d1633f5c74f5', retention: '7 Years' },
  { id: 'DOC-5004', entityType: 'Account', entityId: 'ACC-200114', category: 'Contract', fileName: 'Utility-Supply-Contract.pdf', version: 'v2', classification: 'Internal', uploadedBy: 'Grace Wambui', uploadedAt: '2026-09-12T09:30:00Z', ocrStatus: 'OCR complete', checksum: 'sha256:91238475928374928374', retention: '7 Years' },
  { id: 'DOC-5005', entityType: 'LegalMatter', entityId: 'LM-0092', category: 'Legal', fileName: 'Writ-of-Summons.pdf', version: 'v1', classification: 'Restricted', uploadedBy: 'Samuel Ofori', uploadedAt: '2026-09-20T15:00:00Z', ocrStatus: 'OCR complete', checksum: 'sha256:716253441524365', retention: '10 Years' },
  { id: 'DOC-5006', entityType: 'Complaint', entityId: 'CMP-0187', category: 'Correspondence', fileName: 'Call-log-export.csv', version: 'v1', classification: 'Confidential', uploadedBy: 'Fatima Alhassan', uploadedAt: '2026-09-26T12:00:00Z', ocrStatus: 'OCR complete', checksum: 'sha256:99887766554433', retention: '5 Years' }
];

export const INITIAL_APPROVALS: Approval[] = [
  {
    id: 'APR-0701',
    objectType: 'Write-off',
    objectId: 'WO-0031',
    objectTitle: 'Write-off request ACC-100290 Asante & Sons Traders',
    requestedBy: 'Ama Darko (Recovery Officer)',
    approverRole: 'CFO / Finance',
    approverUserId: 'USR-PRISCILLA',
    thresholdLabel: 'Up to USD 5,000',
    currency: 'GHS',
    amountMinor: 10800000, // USD 7,200 (exceeds CFO $5k limit -> CFO approved, CEO pending!)
    withinUserLimit: false,
    ageDays: 2,
    submittedAt: '2026-09-29T10:00:00Z',
    decision: 'Approved',
    decidedAt: '2026-09-30T16:00:00Z',
    comment: 'Recommending write-off. Debtor insolvent.'
  },
  {
    id: 'APR-0702',
    objectType: 'Write-off',
    objectId: 'WO-0031',
    objectTitle: 'Write-off request ACC-100290 Asante & Sons Traders',
    requestedBy: 'Priscilla Quaye (CFO)',
    approverRole: 'Executive (CEO / MD)',
    approverUserId: 'USR-NANAADJEI',
    thresholdLabel: 'Above USD 5,000 (CFO + CEO)',
    currency: 'GHS',
    amountMinor: 10800000,
    withinUserLimit: true,
    ageDays: 1,
    submittedAt: '2026-09-30T16:05:00Z',
    decision: 'Pending'
  },
  {
    id: 'APR-0703',
    objectType: 'Settlement',
    objectId: 'SET-0415',
    objectTitle: 'Settlement proposal ACC-100255 Kumasi Fresh Foods (15%)',
    requestedBy: 'Ama Darko',
    approverRole: 'Recovery Manager',
    approverUserId: 'USR-EFUABOATENG',
    thresholdLabel: 'Up to 25% discount',
    currency: 'GHS',
    amountMinor: 5440000,
    withinUserLimit: true,
    ageDays: 1,
    submittedAt: '2026-09-30T14:15:00Z',
    decision: 'Pending'
  },
  {
    id: 'APR-0704',
    objectType: 'Remittance',
    objectId: 'REM-2026-09-SCB',
    objectTitle: 'Client remittance Savannah Commercial Bank Sep 2026',
    requestedBy: 'Priscilla Quaye',
    approverRole: 'CFO / Finance',
    approverUserId: 'USR-PRISCILLA',
    thresholdLabel: 'Finance approval required',
    currency: 'GHS',
    amountMinor: 145354000,
    withinUserLimit: true,
    ageDays: 1,
    submittedAt: '2026-09-30T18:00:00Z',
    decision: 'Pending'
  },
  {
    id: 'APR-0705',
    objectType: 'Refund',
    objectId: 'RF-0008',
    objectTitle: 'Payment overpayment refund Oliver Hargreaves',
    requestedBy: 'Hannah Clarke',
    approverRole: 'CFO / Finance',
    approverUserId: 'USR-PRISCILLA',
    thresholdLabel: 'Refund approval',
    currency: 'GBP',
    amountMinor: 19000,
    withinUserLimit: true,
    ageDays: 1,
    submittedAt: '2026-10-01T08:30:00Z',
    decision: 'Pending'
  }
];

export const INITIAL_AUDIT_EVENTS: AuditEvent[] = [
  { id: 'AUD-9001', actor: 'Ama Darko', actorRole: 'Recovery Officer', action: 'LOGIN', objectType: 'UserSession', objectId: 'SESS-8812', timestamp: '2026-10-01T08:30:00Z', ipDevice: '192.168.1.45 (Chrome/Win11)', sourceChannel: 'Web Portal' },
  { id: 'AUD-9002', actor: 'Ama Darko', actorRole: 'Recovery Officer', action: 'PII_VIEW', objectType: 'Debtor', objectId: 'DB-0231', timestamp: '2026-10-01T08:35:00Z', ipDevice: '192.168.1.45', reason: 'Verify identity', sourceChannel: 'Web Portal' },
  { id: 'AUD-9003', actor: 'Ama Darko', actorRole: 'Recovery Officer', action: 'CONTACT_LOG', objectType: 'Account', objectId: 'ACC-100231', timestamp: '2026-10-01T08:55:00Z', ipDevice: '192.168.1.45', sourceChannel: 'Web Portal' },
  { id: 'AUD-9004', actor: 'Efua Boateng', actorRole: 'Recovery Manager', action: 'SETTLEMENT_SUBMIT', objectType: 'Settlement', objectId: 'SET-0415', timestamp: '2026-09-30T14:15:00Z', ipDevice: '192.168.1.50', sourceChannel: 'Web Portal' },
  { id: 'AUD-9005', actor: 'Priscilla Quaye', actorRole: 'CFO', action: 'APPROVAL_GRANT', objectType: 'Approval', objectId: 'APR-0701', timestamp: '2026-09-30T16:00:00Z', ipDevice: '192.168.1.12', approvalRef: 'APR-0701', sourceChannel: 'Web Portal' },
  { id: 'AUD-9006', actor: 'Fatima Alhassan', actorRole: 'Compliance Officer', action: 'CERTIFY_COUNTRY', objectType: 'Country', objectId: 'GH', timestamp: '2026-09-15T10:00:00Z', ipDevice: '192.168.1.88', sourceChannel: 'Web Portal' },
  { id: 'AUD-9007', actor: 'Nana Adjei', actorRole: 'CEO / MD', action: 'ACTIVATE_COUNTRY', objectType: 'Country', objectId: 'GH', timestamp: '2026-09-15T11:00:00Z', ipDevice: '192.168.1.2', approvalRef: 'ACT-GH-01', sourceChannel: 'Web Portal' },
  { id: 'AUD-9008', actor: 'Kofi Mensah', actorRole: 'Debtor', action: 'DEBTOR_VERIFY', objectType: 'Debtor', objectId: 'DB-0231', timestamp: '2026-10-01T09:10:00Z', ipDevice: '102.176.4.12 (Mobile Safari)', sourceChannel: 'Debtor Self-Service' }
];

export const INITIAL_INCIDENTS: Incident[] = [
  { id: 'INC-031', category: 'System', severity: 'Low', affectedSystem: 'SMS Gateway', response: 'Switched provider to backup route.', status: 'Closed' },
  { id: 'INC-032', category: 'Security', severity: 'High', affectedSystem: 'Data Export Engine', response: 'Export restricted to manager approval. Investigating bulk download after hours.', status: 'Investigating' },
  { id: 'INC-033', category: 'Operational', severity: 'Medium', affectedSystem: 'Bank Feed Connector', response: 'Manual statement upload active for Kenya GCB.', status: 'Open' }
];

export const INITIAL_VENDORS: Vendor[] = [
  { id: 'VN-01', name: 'Adjei & Partners LLP', type: 'Counsel', jurisdiction: 'Ghana', contractExpiry: '2027-06-30', dueDiligenceStatus: 'Approved', slaScore: 94 },
  { id: 'VN-02', name: 'Mwangi & Co Advocates', type: 'Counsel', jurisdiction: 'Kenya', contractExpiry: '2027-03-31', dueDiligenceStatus: 'Approved', slaScore: 88 },
  { id: 'VN-03', name: 'Hartwell Solicitors', type: 'Counsel', jurisdiction: 'UK', contractExpiry: '2026-12-31', dueDiligenceStatus: 'Review due', slaScore: 91 },
  { id: 'VN-04', name: 'SwiftTrace Skip-Tracing Ltd', type: 'Tracing', jurisdiction: 'Ghana / Kenya', contractExpiry: '2026-12-31', dueDiligenceStatus: 'Approved', slaScore: 96 },
  { id: 'VN-05', name: 'PayBridge Gateway', type: 'Payment gateway', jurisdiction: 'Global', contractExpiry: '2027-09-30', dueDiligenceStatus: 'Approved', slaScore: 99 },
  { id: 'VN-06', name: 'MsgPulse SMS', type: 'SMS', jurisdiction: 'Global', contractExpiry: '2027-06-30', dueDiligenceStatus: 'Approved', slaScore: 85 },
  { id: 'VN-07', name: 'SignSure', type: 'E-signature', jurisdiction: 'Global', contractExpiry: '2027-08-31', dueDiligenceStatus: 'Approved', slaScore: 98 }
];

export const INITIAL_COMPLIANCE_REQS: ComplianceRequirement[] = [
  { id: 'CR-GH-01', countryCode: 'GH', category: 'Licensing', requirement: 'Ghana Debt Collection Licence (Placeholder)', owner: 'Fatima Alhassan', status: 'Valid', expiry: '2027-03-31', nextReview: '2027-01-15' },
  { id: 'CR-GH-02', countryCode: 'GH', category: 'Privacy', requirement: 'Ghana Data Protection Commission Registration', owner: 'Fatima Alhassan', status: 'Valid', expiry: '2027-08-31', nextReview: '2027-06-01' },
  { id: 'CR-KE-01', countryCode: 'KE', category: 'Licensing', requirement: 'Kenya Debt Collector Registration Renewal', owner: 'Fatima Alhassan', status: 'Expiring', expiry: '2026-11-14', nextReview: '2026-10-15' },
  { id: 'CR-GB-01', countryCode: 'GB', category: 'Privacy', requirement: 'UK ICO Data Protection Fee & Registration', owner: 'Fatima Alhassan', status: 'Valid', expiry: '2027-05-31', nextReview: '2027-04-01' },
  { id: 'CR-NG-01', countryCode: 'NG', category: 'Licensing', requirement: 'Nigeria Collection & Recovery Operational Licence', owner: 'Fatima Alhassan', status: 'Missing', expiry: '2026-10-01', nextReview: '2026-10-01' },
  { id: 'CR-AE-01', countryCode: 'AE', category: 'Licensing', requirement: 'UAE Commercial Debt Collection Assessment', owner: 'Fatima Alhassan', status: 'Due for review', expiry: '2026-12-31', nextReview: '2026-10-10' }
];

export const INITIAL_INVESTIGATIONS: Investigation[] = [
  { id: 'INV-0071', accountId: 'ACC-100377', debtorName: 'Yaw Boateng Logistics Ltd', type: 'Asset Tracing', objective: 'Locate commercial fleet vehicles and registered charges.', lawfulBasis: 'Legitimate business interest / Contract enforcement', status: 'In progress', assignedTo: 'Kojo Antwi', findings: ['Identified 4 registered trucks under DVLA Ghana registry.', 'Bank account at GCB Commercial Branch confirmed active.'] },
  { id: 'INV-0072', accountId: 'ACC-200114', debtorName: 'Wanjiru Holdings Ltd', type: 'Director Search', objective: 'Verify corporate ownership structure & guarantors.', lawfulBasis: 'Court order / Pre-action evidence', status: 'Assigned', assignedTo: 'VN-04 (SwiftTrace)', findings: [] },
  { id: 'INV-0073', accountId: 'ACC-100231', debtorName: 'Kofi Mensah', type: 'Skip Trace', objective: 'Verify current residential address in Accra.', lawfulBasis: 'Legitimate interest', status: 'Submitted', assignedTo: 'Kojo Antwi', findings: ['Confirmed address: Plot 14, East Legon, Accra.', 'Employer confirmed as Volta River Authority (Senior Accountant).'] }
];

export const INITIAL_TASKS: Task[] = [
  { id: 'TSK-1', title: 'Call Kofi Mensah — promise follow-up', accountId: 'ACC-100231', assigneeUserId: 'USR-AMADARKO', due: '2026-10-01T10:00:00Z', status: 'Pending', type: 'Contact', priority: 'High' },
  { id: 'TSK-2', title: 'Send plan reminder to Adwoa Trading', accountId: 'ACC-100232', assigneeUserId: 'USR-AMADARKO', due: '2026-10-02T12:00:00Z', status: 'Pending', type: 'Outreach', priority: 'Medium' },
  { id: 'TSK-3', title: 'Collect proof of debt for ACC-100377', accountId: 'ACC-100377', assigneeUserId: 'USR-AMADARKO', due: '2026-10-02T16:00:00Z', status: 'Pending', type: 'Document', priority: 'High' },
  { id: 'TSK-4', title: 'Prepare write-off evidence for ACC-100290', accountId: 'ACC-100290', assigneeUserId: 'USR-AMADARKO', due: '2026-10-05T17:00:00Z', status: 'Pending', type: 'Compliance', priority: 'Low' }
];

export const INITIAL_USERS: User[] = [
  { id: 'USR-NANAADJEI', name: 'Nana Adjei', role: 'executive', roleTitle: 'CEO / Managing Director', entity: 'Experts Consult Inc.', team: 'Executive', country: 'GH', status: 'Active', mfa: true, lastLogin: '2026-10-01T08:15:00Z', training: { 'AML/KYC': 'Complete', 'Data protection': 'Complete', 'Customer treatment': 'Complete', 'Anti-bribery': 'Complete', 'Cybersecurity': 'Complete' }, capacityPct: 100 },
  { id: 'USR-PRISCILLA', name: 'Priscilla Quaye', role: 'cfo', roleTitle: 'CFO / Finance', entity: 'Experts Consult Inc.', team: 'Finance', country: 'GH', status: 'Active', mfa: true, lastLogin: '2026-10-01T08:30:00Z', training: { 'AML/KYC': 'Complete', 'Data protection': 'Complete', 'Customer treatment': 'Complete', 'Anti-bribery': 'Complete', 'Cybersecurity': 'Complete' }, capacityPct: 100 },
  { id: 'USR-DAVIDMENSAH', name: 'David Mensah-Bonsu', role: 'coo', roleTitle: 'COO / Operations', entity: 'Experts Consult Inc.', team: 'Operations', country: 'GH', status: 'Active', mfa: true, lastLogin: '2026-10-01T08:20:00Z', training: { 'AML/KYC': 'Complete', 'Data protection': 'Complete', 'Customer treatment': 'Complete', 'Anti-bribery': 'Complete', 'Cybersecurity': 'Complete' }, capacityPct: 100 },
  { id: 'USR-FATIMA', name: 'Fatima Alhassan', role: 'compliance', roleTitle: 'Head of Compliance & Risk', entity: 'Experts Consult Inc.', team: 'Compliance', country: 'GH', status: 'Active', mfa: true, lastLogin: '2026-10-01T08:45:00Z', training: { 'AML/KYC': 'Complete', 'Data protection': 'Complete', 'Customer treatment': 'Complete', 'Anti-bribery': 'Complete', 'Cybersecurity': 'Complete' }, capacityPct: 100 },
  { id: 'USR-EFUABOATENG', name: 'Efua Boateng', role: 'recovery_manager', roleTitle: 'Recovery Manager (Ghana)', entity: 'Experts Consult Ghana Ltd', team: 'Recovery Ghana', country: 'GH', status: 'Active', mfa: true, lastLogin: '2026-10-01T08:00:00Z', training: { 'AML/KYC': 'Complete', 'Data protection': 'Complete', 'Customer treatment': 'Complete', 'Anti-bribery': 'Complete', 'Cybersecurity': 'Complete' }, capacityPct: 100 },
  { id: 'USR-AMADARKO', name: 'Ama Darko', role: 'recovery_officer', roleTitle: 'Recovery Officer (Ghana)', entity: 'Experts Consult Ghana Ltd', team: 'Recovery Ghana Alpha', country: 'GH', status: 'Active', mfa: true, lastLogin: '2026-10-01T08:30:00Z', training: { 'AML/KYC': 'Complete', 'Data protection': 'Complete', 'Customer treatment': 'Complete', 'Anti-bribery': 'Complete', 'Cybersecurity': 'Complete' }, capacityPct: 100 },
  { id: 'USR-KWESIAPPIAH', name: 'Kwesi Appiah', role: 'recovery_officer', roleTitle: 'Recovery Officer (Ghana)', entity: 'Experts Consult Ghana Ltd', team: 'Recovery Ghana Beta', country: 'GH', status: 'Active', mfa: true, lastLogin: '2026-10-01T08:50:00Z', training: { 'AML/KYC': 'Complete', 'Data protection': 'Complete', 'Customer treatment': 'Complete', 'Anti-bribery': 'Complete', 'Cybersecurity': 'Overdue' }, capacityPct: 80 },
  { id: 'USR-GRACEWAMBUI', name: 'Grace Wambui', role: 'recovery_officer', roleTitle: 'Recovery Officer (Kenya)', entity: 'Experts Consult Kenya Ltd', team: 'Recovery Kenya', country: 'KE', status: 'Active', mfa: true, lastLogin: '2026-10-01T07:45:00Z', training: { 'AML/KYC': 'Complete', 'Data protection': 'Complete', 'Customer treatment': 'Complete', 'Anti-bribery': 'Complete', 'Cybersecurity': 'Complete' }, capacityPct: 100 },
  { id: 'USR-HANNAHCLARKE', name: 'Hannah Clarke', role: 'recovery_officer', roleTitle: 'Recovery Officer (UK)', entity: 'Experts Consult UK Ltd', team: 'Recovery UK', country: 'GB', status: 'Active', mfa: true, lastLogin: '2026-10-01T08:10:00Z', training: { 'AML/KYC': 'Complete', 'Data protection': 'Complete', 'Customer treatment': 'Complete', 'Anti-bribery': 'Complete', 'Cybersecurity': 'Complete' }, capacityPct: 100 },
  { id: 'USR-SAMUELOFORI', name: 'Samuel Ofori', role: 'legal_manager', roleTitle: 'Legal Manager', entity: 'Experts Consult Inc.', team: 'Legal', country: 'GH', status: 'Active', mfa: true, lastLogin: '2026-10-01T08:40:00Z', training: { 'AML/KYC': 'Complete', 'Data protection': 'Complete', 'Customer treatment': 'Complete', 'Anti-bribery': 'Complete', 'Cybersecurity': 'Complete' }, capacityPct: 100 },
  { id: 'USR-KOJOANTWI', name: 'Kojo Antwi', role: 'investigator', roleTitle: 'Investigator / Tracing Agent', entity: 'Experts Consult Ghana Ltd', team: 'Special Investigations', country: 'GH', status: 'Active', mfa: true, lastLogin: '2026-10-01T08:15:00Z', training: { 'AML/KYC': 'Complete', 'Data protection': 'Complete', 'Customer treatment': 'Complete', 'Anti-bribery': 'Complete', 'Cybersecurity': 'Complete' }, capacityPct: 100 },
  { id: 'USR-ABENASARPONG', name: 'Abena Sarpong', role: 'hr', roleTitle: 'HR & Training Manager', entity: 'Experts Consult Inc.', team: 'People & Culture', country: 'GH', status: 'Active', mfa: true, lastLogin: '2026-10-01T08:05:00Z', training: { 'AML/KYC': 'Complete', 'Data protection': 'Complete', 'Customer treatment': 'Complete', 'Anti-bribery': 'Complete', 'Cybersecurity': 'Complete' }, capacityPct: 100 },
  { id: 'USR-KWABENAOFOSU', name: 'Kwabena Ofosu', role: 'super_admin', roleTitle: 'Super Administrator', entity: 'Experts Consult Inc.', team: 'IT & Platform', country: 'GH', status: 'Active', mfa: true, lastLogin: '2026-10-01T07:30:00Z', training: { 'AML/KYC': 'Complete', 'Data protection': 'Complete', 'Customer treatment': 'Complete', 'Anti-bribery': 'Complete', 'Cybersecurity': 'Complete' }, capacityPct: 100 },
  { id: 'USR-HELENBROOKS', name: 'Helen Brooks', role: 'auditor', roleTitle: 'External Auditor', entity: 'Brightline Assurance', team: 'External Audit', country: 'GB', status: 'Active', mfa: true, lastLogin: '2026-10-01T09:00:00Z', training: { 'AML/KYC': 'Complete', 'Data protection': 'Complete', 'Customer treatment': 'N/A', 'Anti-bribery': 'N/A', 'Cybersecurity': 'Complete' }, capacityPct: 100 },
  { id: 'USR-ESTHERTETTEH', name: 'Esther Tetteh', role: 'client_admin_volta', roleTitle: 'Client Admin (Volta Telecom)', entity: 'Volta Telecom Ghana', team: 'Credit Control', country: 'GH', status: 'Active', mfa: true, lastLogin: '2026-10-01T08:50:00Z', training: {}, capacityPct: 100 },
  { id: 'USR-DANIELASANTE', name: 'Daniel Asante', role: 'client_admin_savannah', roleTitle: 'Client Admin (Savannah Bank)', entity: 'Savannah Commercial Bank', team: 'NPL Recovery Dept', country: 'GH', status: 'Active', mfa: true, lastLogin: '2026-10-01T08:55:00Z', training: {}, capacityPct: 100 },
  { id: 'USR-KOFIMENSAH', name: 'Kofi Mensah', role: 'debtor', roleTitle: 'Debtor Portal Account', entity: 'Individual Debtor', team: 'Debtor', country: 'GH', status: 'Active', mfa: false, lastLogin: '2026-10-01T09:10:00Z', training: {}, capacityPct: 100 }
];

export const ROLE_CONFIGS: RoleConfig[] = [
  // Leadership & Finance
  { id: 'executive', group: 'Leadership & Finance', name: 'Executive (CEO / MD)', personName: 'Nana Adjei', mandate: 'See global recovery performance, risk and cash at a glance; approve what exceeds delegated authority; activate countries.', landingPage: 'Command Center', avatarInitials: 'NA' },
  { id: 'cfo', group: 'Leadership & Finance', name: 'CFO / Finance', personName: 'Priscilla Quaye', mandate: 'Make sure every shilling and cedi received is traceable, allocated, reconciled and remitted correctly; approve refunds, write-offs and remittances.', landingPage: 'Finance Dashboard', avatarInitials: 'PQ' },
  { id: 'coo', group: 'Leadership & Finance', name: 'COO / Operations', personName: 'David Mensah-Bonsu', mandate: 'Allocate portfolios, keep teams productive and files high-quality, clear escalations.', landingPage: 'Operations Dashboard', avatarInitials: 'DM' },
  
  // Operations & Recovery
  { id: 'recovery_manager', group: 'Operations & Recovery', name: 'Recovery Manager (Ghana)', personName: 'Efua Boateng', mandate: 'Run a team\'s portfolios, approve within limits, review quality, handle escalations.', landingPage: 'Team Dashboard', avatarInitials: 'EB' },
  { id: 'recovery_officer', group: 'Operations & Recovery', name: 'Recovery Officer (Ghana)', personName: 'Ama Darko', mandate: 'Work the prioritised queue: contact debtors through permitted channels, log outcomes, record promises, propose settlements.', landingPage: 'My Queue', avatarInitials: 'AD' },
  { id: 'investigator', group: 'Operations & Recovery', name: 'Investigator / Tracing Agent', personName: 'Kojo Antwi', mandate: 'Work assigned tracing/investigation tasks using lawful sources and attach evidence.', landingPage: 'My Investigations', avatarInitials: 'KA' },
  
  // Control & Specialist Functions
  { id: 'legal_manager', group: 'Control & Specialist Functions', name: 'Legal Manager', personName: 'Samuel Ofori', mandate: 'Accept referrals, assign counsel, track deadlines, hearings and judgments.', landingPage: 'Legal Dashboard', avatarInitials: 'SO' },
  { id: 'compliance', group: 'Control & Specialist Functions', name: 'Compliance / Risk', personName: 'Fatima Alhassan', mandate: 'Own KYC/conflicts, complaints, incidents, the country compliance register and audit findings.', landingPage: 'Compliance Dashboard', avatarInitials: 'FA' },
  { id: 'super_admin', group: 'Control & Specialist Functions', name: 'Super Administrator', personName: 'Kwabena Ofosu', mandate: 'Configure the platform (entities, countries, roles, workflows, authority matrix, templates) — with no routine financial approval power.', landingPage: 'Admin Overview', avatarInitials: 'KO' },
  { id: 'auditor', group: 'Control & Specialist Functions', name: 'Auditor (external)', personName: 'Helen Brooks', mandate: 'Read-only inspection of records, logs and reports.', landingPage: 'Audit Log', avatarInitials: 'HB' },
  { id: 'hr', group: 'Control & Specialist Functions', name: 'HR / Training', personName: 'Abena Sarpong', mandate: 'Staff records, training/competency, access lifecycle (joiners, movers, leavers).', landingPage: 'Staff Directory', avatarInitials: 'AS' },
  
  // External Users
  { id: 'client_admin_volta', group: 'External Users', name: 'Client Admin (Volta Telecom)', personName: 'Esther Tetteh', mandate: 'Monitor Volta Telecom\'s portfolios, approve settlements, download reports and remittance statements.', landingPage: 'Portfolio Dashboard', avatarInitials: 'ET' },
  { id: 'client_admin_savannah', group: 'External Users', name: 'Client Admin (Savannah Bank)', personName: 'Daniel Asante', mandate: 'Monitor Savannah Commercial Bank\'s portfolios, approve high-discount settlements, view statements.', landingPage: 'Portfolio Dashboard', avatarInitials: 'DA' },
  { id: 'legal_partner', group: 'External Users', name: 'Legal Partner (External Counsel)', personName: 'Adjei & Partners LLP', mandate: 'See and update only the legal matters assigned to the firm.', landingPage: 'Assigned Matters', avatarInitials: 'AP' },
  { id: 'vendor', group: 'External Users', name: 'Vendor / Service Provider', personName: 'SwiftTrace Skip-Tracing Ltd', mandate: 'Complete assigned tracing tasks only.', landingPage: 'Assigned Tasks', avatarInitials: 'ST' },
  { id: 'debtor', group: 'External Users', name: 'Debtor / Customer', personName: 'Kofi Mensah', mandate: 'Verify identity, view verified balance, pay, request payment plan, dispute, complain.', landingPage: 'Verify Identity', avatarInitials: 'KM' }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 'NOTIF-1', userId: 'USR-NANAADJEI', roleId: 'executive', type: 'Approval', title: 'Write-off WO-0031 Pending CEO Sign-off', preview: 'Details are visible after opening', relativeTime: '1 hour ago', read: false, linkRecordId: 'WO-0031', linkPage: 'approvals' },
  { id: 'NOTIF-2', userId: 'USR-PRISCILLA', roleId: 'cfo', type: 'Alert', title: 'Unreconciled Funds Exceed Threshold', preview: 'Details are visible after opening', relativeTime: '2 hours ago', read: false, linkRecordId: 'PAY-884207', linkPage: 'reconciliation' },
  { id: 'NOTIF-3', userId: 'USR-DAVIDMENSAH', roleId: 'coo', type: 'Alert', title: 'Portfolio PF-2026-006 Intake Exceptions', preview: 'Details are visible after opening', relativeTime: '3 hours ago', read: false, linkRecordId: 'PF-2026-006', linkPage: 'portfolio_intake' },
  { id: 'NOTIF-4', userId: 'USR-EFUABOATENG', roleId: 'recovery_manager', type: 'Approval', title: 'Settlement SET-0415 Awaiting Review', preview: 'Details are visible after opening', relativeTime: '4 hours ago', read: false, linkRecordId: 'SET-0415', linkPage: 'approvals' },
  { id: 'NOTIF-5', userId: 'USR-AMADARKO', roleId: 'recovery_officer', type: 'System', title: 'New Promise Reminder Scheduled', preview: 'Details are visible after opening', relativeTime: '5 hours ago', read: true, linkRecordId: 'ACC-100231', linkPage: 'account_detail' },
  { id: 'NOTIF-6', userId: 'USR-FATIMA', roleId: 'compliance', type: 'Alert', title: 'High Severity Complaint CMP-0190 Filed', preview: 'Details are visible after opening', relativeTime: '30 mins ago', read: false, linkRecordId: 'CMP-0190', linkPage: 'complaints' }
];

export const INITIAL_ALERTS: AlertItem[] = [
  { id: 'ALT-1', text: 'WO-0031 write-off USD 7,200 awaits your approval', type: 'Approval', linkTarget: 'approvals' },
  { id: 'ALT-2', text: 'Brightway Pharma court hearing on 14 Oct 2026', type: 'Hearing', linkTarget: 'legal' },
  { id: 'ALT-3', text: 'Unreconciled funds: 5 receipts totaling USD 9,004', type: 'Reconciliation', linkTarget: 'reconciliation' },
  { id: 'ALT-4', text: 'Kenya collector registration renews in 44 days', type: 'Licence', linkTarget: 'compliance' },
  { id: 'ALT-5', text: 'CMP-0190 high-severity complaint under investigation', type: 'Complaint', linkTarget: 'complaints' },
  { id: 'ALT-6', text: 'INC-032 bulk export after hours logged in security audit', type: 'Export', linkTarget: 'security' }
];

export const DEMO_CHAPTERS: DemoChapter[] = [
  {
    id: 1,
    title: 'Chapter 1 — The big picture (CEO, 2 min)',
    duration: '2 min',
    roleId: 'executive',
    roleName: 'Executive (CEO / MD)',
    steps: [
      { id: 1, text: 'Command Center: Verify assigned USD 3.68M, recovered USD 569.7K (15.5%)', done: false },
      { id: 2, text: 'Hover the Recovery-vs-promises combo chart', done: false },
      { id: 3, text: 'Click Unreconciled funds tile (USD 9.0K red flag) to view read-only exceptions queue', done: false }
    ],
    presenterSay: '"One source of truth, drill-down on every tile, and an honest red flag on money we haven\'t reconciled."',
    nextRoleId: 'coo'
  },
  {
    id: 2,
    title: 'Chapter 2 — Onboard a portfolio (COO, 3 min)',
    duration: '3 min',
    roleId: 'coo',
    roleName: 'COO / Operations',
    steps: [
      { id: 1, text: 'Open Portfolio Allocation → PF-2026-006 Kilimanjaro Intake Validation', done: false },
      { id: 2, text: 'Notice 1,240 uploaded / 53 exceptions. Try "Approve for recovery" (disabled)', done: false },
      { id: 3, text: 'Click "Mark resolved" (bulk resolve exceptions) → click Approve for recovery → click Assign & publish', done: false }
    ],
    presenterSay: '"The correct process is the only easy one. Accounts missing evidence cannot enter recovery."',
    nextRoleId: 'recovery_officer'
  },
  {
    id: 3,
    title: 'Chapter 3 — Recovery cycle (Recovery Officer, 4 min)',
    duration: '4 min',
    roleId: 'recovery_officer',
    roleName: 'Recovery Officer (Ama Darko)',
    steps: [
      { id: 1, text: 'In My Queue open ACC-100231 Kofi Mensah', done: false },
      { id: 2, text: 'Click Reveal phone number (select reason "Verify identity" → access logged)', done: false },
      { id: 3, text: 'Try to log a 4th call (blocked by 3 contact per 7 day policy limit)', done: false },
      { id: 4, text: 'Record a promise, note "Mark kept" is disabled ("a promise is not cash")', done: false },
      { id: 5, text: 'Check AI recommendation card: accept one suggestion, override another', done: false },
      { id: 6, text: 'Toggle Mobile mode, set Offline ON, log a call to test offline-safe logging and sync chip', done: false }
    ],
    presenterSay: '"Every contact adheres to regulatory frequency limits and audit logging."',
    nextRoleId: 'recovery_officer'
  },
  {
    id: 4,
    title: 'Chapter 4 — Settlement above authority (Officer → Manager → COO → Client, 4 min)',
    duration: '4 min',
    roleId: 'recovery_officer',
    roleName: 'Multi-Role Settlement Chain',
    steps: [
      { id: 1, text: 'As Ama (Officer), open ACC-100377 Yaw Boateng Logistics → click Propose settlement', done: false },
      { id: 2, text: 'Set discount to 30% (GHS 340,340.00). Notice authority chain turns red/amber → Submit (SET-0412 created)', done: false },
      { id: 3, text: 'Switch to Recovery Manager (Efua) → Approvals → SET-0412: Approve disabled (>25%) → Click Escalate', done: false },
      { id: 4, text: 'Switch to COO (David) → Approvals → SET-0412: Click Approve (<=40%, moves to Awaiting Client)', done: false },
      { id: 5, text: 'Switch to Client Admin Savannah (Daniel Asante) → Settlement Approvals → Click Approve', done: false },
      { id: 6, text: 'Switch back to Recovery Officer → status is now Terms issued → click Mark terms signed → In progress', done: false }
    ],
    presenterSay: '"Authority is enforced by the system, not by memory or email."',
    nextRoleId: 'cfo'
  },
  {
    id: 5,
    title: 'Chapter 5 — Money in, reconciled out (Finance, 4 min)',
    duration: '4 min',
    roleId: 'cfo',
    roleName: 'CFO / Finance',
    steps: [
      { id: 1, text: 'Finance Dashboard → Payments → Import payments (PAY-884213 GHS 340,340.00 allocated to SET-0412)', done: false },
      { id: 2, text: 'Notice Settlement SET-0412 flips to Completed!', done: false },
      { id: 3, text: 'Open Exceptions: mark PAY-884207 as duplicate, match PAY-884203', done: false },
      { id: 4, text: 'Open Remittances → REM-2026-09-VTG: blocked banner clears → click Approve & remit → Remitted!', done: false }
    ],
    presenterSay: '"A remittance can\'t leave while reconciliation exceptions are open."',
    nextRoleId: 'client_admin_volta'
  },
  {
    id: 6,
    title: 'Chapter 6 — The client sees only theirs (Client Admin, 1.5 min)',
    duration: '1.5 min',
    roleId: 'client_admin_volta',
    roleName: 'Client Admin (Volta Telecom)',
    steps: [
      { id: 1, text: 'See new Remittance Statement REM-2026-09-VTG appear in portal', done: false },
      { id: 2, text: 'Attempt cross-client URL access to test 403 Access Isolation page', done: false },
      { id: 3, text: 'Toggle "View as read-only viewer" to see client viewer mode banner', done: false }
    ],
    presenterSay: '"Strict client isolation ensures complete data security for all partners."',
    nextRoleId: 'legal_manager'
  },
  {
    id: 7,
    title: 'Chapter 7 — Legal & complaints (Legal Manager + Compliance, 3 min)',
    duration: '3 min',
    roleId: 'legal_manager',
    roleName: 'Legal Manager & Compliance',
    steps: [
      { id: 1, text: 'Legal Manager: open referral for Wanjiru Holdings — Accept disabled until proof of debt attached', done: false },
      { id: 2, text: 'View Brightway Pharma court hearing on 14 Oct 2026', done: false },
      { id: 3, text: 'Compliance: open CMP-0190, try assigning officer who handled account (blocked by conflict rule)', done: false },
      { id: 4, text: 'Click "Simulate certification (demo)" on Nigeria to certify Nigeria compliance step', done: false }
    ],
    presenterSay: '"Legal referrals require complete evidence and non-conflicting investigators."',
    nextRoleId: 'super_admin'
  },
  {
    id: 8,
    title: 'Chapter 8 — Global controls (Admin + CEO, 2 min)',
    duration: '2 min',
    roleId: 'super_admin',
    roleName: 'Super Administrator & CEO',
    steps: [
      { id: 1, text: 'Super Admin: Authority Matrix → edit COO limit from 40% to 45% (creates pending ConfigChange)', done: false },
      { id: 2, text: 'Switch to CEO: Country Performance → Nigeria activation: Activate now enabled!', done: false },
      { id: 3, text: 'Attempt to create portfolio in UAE (blocked: "inactive country")', done: false }
    ],
    presenterSay: '"Governance rules regulate every country expansion and threshold edit."',
    nextRoleId: 'auditor'
  },
  {
    id: 9,
    title: 'Chapter 9 — Audit & debtor view (Auditor + Debtor, 2 min)',
    duration: '2 min',
    roleId: 'auditor',
    roleName: 'Auditor & Debtor',
    steps: [
      { id: 1, text: 'Auditor: Search Audit Log for SET-0412 to view full immutable trail & PII_VIEW events', done: false },
      { id: 2, text: 'Switch to Debtor (Kofi Mensah): verify with 4 digits → view account balance GHS 18,450.00', done: false },
      { id: 3, text: 'Debtor: test Pay Now / Request payment plan → switch to Officer to see new request instantly', done: false }
    ],
    presenterSay: '"Every core process is a controlled workflow with ownership, evidence, permissions, approvals, financial controls, audit history and reporting."',
    nextRoleId: 'executive'
  }
];
