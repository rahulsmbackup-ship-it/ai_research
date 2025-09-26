import { PatientCase, Document, TreatmentProtocol, Alert, Recommendation } from '../types';

export const mockCases: PatientCase[] = [
  {
    id: 'CASE-0001',
    patientId: 'PT-001',
    condition: 'Stage II Breast Cancer',
    age: 45,
    geneticMarkers: ['BRCA1+'],
    comorbidities: ['Hypertension'],
    assignedPhysicians: ['1', '2'],
    status: 'active',
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-12-15T14:20:00Z'
  },
  {
    id: 'CASE-0002',
    patientId: 'PT-002',
    condition: 'Acute Myocardial Infarction',
    age: 62,
    geneticMarkers: ['CYP2C19*2'],
    comorbidities: ['Diabetes Type 2', 'Chronic Kidney Disease'],
    assignedPhysicians: ['2'],
    status: 'active',
    createdAt: '2024-12-10T10:15:00Z',
    updatedAt: '2024-12-15T09:45:00Z'
  },
  {
    id: 'CASE-0003',
    patientId: 'PT-003',
    condition: 'Non-Small Cell Lung Cancer',
    age: 58,
    geneticMarkers: ['EGFR+'],
    comorbidities: ['COPD'],
    assignedPhysicians: ['1'],
    status: 'pending',
    createdAt: '2024-12-14T16:00:00Z',
    updatedAt: '2024-12-14T16:00:00Z'
  }
];

export const mockDocuments: Document[] = [
  {
    id: 'DOC-001',
    title: 'Trastuzumab and Chemotherapy in HER2-Positive Breast Cancer: Updated Analysis',
    doi: '10.1056/NEJMoa2024406',
    authors: ['Smith JA', 'Johnson MB', 'Williams CC'],
    uploadedBy: '1',
    uploadedAt: '2024-12-01T14:30:00Z',
    tags: ['breast-cancer', 'HER2', 'trastuzumab', 'chemotherapy'],
    evidenceLevel: 1,
    specialty: 'Oncology',
    summary: 'Large randomized controlled trial (N=1,200) demonstrates 85% response rate with trastuzumab plus chemotherapy in HER2-positive breast cancer patients, with manageable cardiotoxicity profile.',
    keyFindings: [
      '85% overall response rate in treatment group vs 62% in control',
      'Improved progression-free survival (HR 0.72, 95% CI 0.61-0.85)',
      'Cardiotoxicity occurred in 8% of patients, mostly reversible'
    ]
  },
  {
    id: 'DOC-002',
    title: 'Dual Antiplatelet Therapy Duration After PCI: Meta-Analysis of Recent Trials',
    doi: '10.1161/CIRCULATIONAHA.124.068234',
    authors: ['Rodriguez M', 'Chen L', 'Anderson KR'],
    uploadedBy: '2',
    uploadedAt: '2024-11-28T09:15:00Z',
    tags: ['PCI', 'antiplatelet', 'DAPT', 'cardiology'],
    evidenceLevel: 1,
    specialty: 'Cardiology',
    summary: 'Meta-analysis of 15 RCTs (N=45,000) shows optimal DAPT duration of 6-12 months post-PCI balances ischemic and bleeding risks in most patients.',
    keyFindings: [
      'No significant difference in MACE between 6 vs 12 months DAPT',
      'Bleeding risk increases significantly after 12 months',
      'High-risk patients may benefit from extended therapy'
    ]
  },
  {
    id: 'DOC-003',
    title: 'EGFR Tyrosine Kinase Inhibitors in Advanced NSCLC: Real-World Outcomes',
    doi: '10.1200/JCO.2024.41.15.2456',
    authors: ['Park SH', 'Kumar V', 'Thompson A'],
    uploadedBy: '1',
    uploadedAt: '2024-12-12T11:20:00Z',
    tags: ['NSCLC', 'EGFR', 'TKI', 'osimertinib'],
    evidenceLevel: 2,
    specialty: 'Oncology',
    summary: 'Real-world study of 2,500 EGFR-mutated NSCLC patients shows median overall survival of 28.5 months with first-line osimertinib.',
    keyFindings: [
      'Median OS 28.5 months with osimertinib vs 22.1 months with other TKIs',
      'Better tolerability profile with fewer dose reductions',
      'CNS progression significantly delayed'
    ]
  }
];

export const mockTreatmentProtocols: TreatmentProtocol[] = [
  {
    id: 'PROT-001',
    name: 'Trastuzumab + Chemotherapy',
    effectiveness: 85,
    evidenceLevel: 1,
    sideEffects: ['Cardiotoxicity', 'Fatigue', 'Nausea', 'Hair loss'],
    contraindications: ['Severe heart failure', 'Uncontrolled hypertension'],
    citations: ['DOI-001', 'DOI-002']
  },
  {
    id: 'PROT-002',
    name: 'Targeted HER2 Inhibitors',
    effectiveness: 73,
    evidenceLevel: 2,
    sideEffects: ['Diarrhea', 'Rash', 'Fatigue'],
    contraindications: ['Severe hepatic impairment'],
    citations: ['DOI-003']
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'ALERT-001',
    userId: '1',
    title: 'Oncology Literature Updates',
    query: 'breast cancer, HER2, immunotherapy',
    specialty: 'Oncology',
    frequency: 'weekly',
    lastSent: '2024-12-08T09:00:00Z',
    active: true,
    createdAt: '2024-11-01T10:00:00Z'
  },
  {
    id: 'ALERT-002',
    userId: '2',
    title: 'Cardiology Guidelines Updates',
    query: 'STEMI, PCI, antiplatelet',
    specialty: 'Cardiology',
    frequency: 'monthly',
    lastSent: '2024-12-01T09:00:00Z',
    active: true,
    createdAt: '2024-10-15T14:00:00Z'
  }
];

export const mockRecommendations: Recommendation[] = [
  {
    id: 'REC-001',
    caseId: 'CASE-0001',
    recommendation: 'Initiate trastuzumab plus chemotherapy regimen',
    rationale: 'Based on RCT evidence showing 85% response rate in HER2-positive breast cancer with manageable side effect profile. Patient\'s BRCA1+ status and age support aggressive treatment approach.',
    evidenceLevel: 1,
    certainty: 'High',
    citations: ['DOI:10.1056/NEJMoa2024406'],
    createdBy: '1',
    createdAt: '2024-12-15T14:30:00Z'
  }
];