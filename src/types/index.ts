export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'physician' | 'researcher';
  specialty: string;
  avatar?: string;
}

export interface PatientCase {
  id: string;
  patientId: string;
  condition: string;
  age: number;
  geneticMarkers: string[];
  comorbidities: string[];
  assignedPhysicians: string[];
  status: 'active' | 'completed' | 'pending';
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  title: string;
  doi?: string;
  authors: string[];
  uploadedBy: string;
  uploadedAt: string;
  tags: string[];
  evidenceLevel: 1 | 2 | 3 | 4;
  specialty: string;
  summary: string;
  keyFindings: string[];
  url?: string;
}

export interface TreatmentProtocol {
  id: string;
  name: string;
  effectiveness: number;
  evidenceLevel: 1 | 2 | 3 | 4;
  sideEffects: string[];
  contraindications: string[];
  citations: string[];
}

export interface Annotation {
  id: string;
  documentId: string;
  userId: string;
  userName: string;
  text: string;
  comment: string;
  position: { start: number; end: number };
  resolved: boolean;
  createdAt: string;
  replies: AnnotationReply[];
}

export interface AnnotationReply {
  id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
}

export interface Alert {
  id: string;
  userId: string;
  title: string;
  query: string;
  specialty: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  lastSent?: string;
  active: boolean;
  createdAt: string;
}

export interface Recommendation {
  id: string;
  caseId: string;
  recommendation: string;
  rationale: string;
  evidenceLevel: 1 | 2 | 3 | 4;
  certainty: 'Low' | 'Moderate' | 'High';
  citations: string[];
  createdBy: string;
  createdAt: string;
}

export interface ComplianceCheck {
  compliant: boolean;
  violatedGuidelines: string[];
  remediationSteps: string[];
  confidence: number;
}