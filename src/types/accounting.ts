export type AccountCategory = 
  | 'Aset Lancar' 
  | 'Aset Tetap' 
  | 'Liabilitas Jangka Pendek' 
  | 'Liabilitas Jangka Panjang' 
  | 'Ekuitas' 
  | 'Pendapatan Usaha' 
  | 'Beban Operasional' 
  | 'Pendapatan Lain-lain' 
  | 'Beban Lain-lain';

export interface ChartOfAccount {
  code: string;
  name: string;
  category: AccountCategory;
  normalBalance: 'debit' | 'credit';
  initialBalance?: number;
}

export type EvidenceType = 'BKM' | 'BKK' | 'FK' | 'NK' | 'BM';

export interface SourceDocument {
  id: string;
  type: EvidenceType;
  documentNumber: string;
  date: string;
  title: string;
  partyName: string;
  issuedBy: string;
  receivedBy: string;
  amount: number;
  description: string;
  paymentTerms?: string;
  items?: {
    description: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }[];
}

export interface JournalRow {
  id: string;
  accountCode: string;
  accountName: string;
  debit: number;
  credit: number;
  isCreditIndent?: boolean;
}

export interface JournalTransaction {
  id: string;
  date: string;
  evidenceNo: string;
  evidenceType: EvidenceType;
  description: string;
  rows: JournalRow[];
  pointsAwarded?: number;
  maxPoints?: number;
  status: 'valid' | 'has_error' | 'pending';
}

export interface CriticalReflection {
  id: string;
  questionNumber: number;
  title: string;
  question: string;
  studentAnswer: string;
  points: number;
  maxPoints: number;
  feedback: string;
  isMastered: boolean;
}

export interface RubricItem {
  id: string;
  criteria: string;
  description: string;
  score: number;
  maxScore: number;
  achievedPercentage: number;
  notes: string;
}

export interface Student {
  id: string;
  name: string;
  nisn: string;
  classId: string;
  avatarUrl: string;
  phone: string;
  parentName: string;
  parentPhone: string;
  attendanceStatus: 'hadir' | 'sakit' | 'izin' | 'alpa';
  attendanceTime?: string;
  kktpMastery: number; // e.g. 82%
  masteryLevel: 'Perlu Bimbingan' | 'Cukup' | 'Mahir' | 'Sangat Mahir';
  remediationStatus?: 'none' | 'assigned' | 'in_progress' | 'completed';
}

export interface CbtQuestion {
  id: string;
  number: number;
  code: string;
  category: string;
  difficulty: 'Mudah' | 'Sedang' | 'HOTS';
  bloomLevel: 'C2 Memahami' | 'C3 Menerapkan' | 'C4 Menganalisis';
  questionText: string;
  evidenceDocSnippet?: string;
  options: {
    id: string;
    label: string;
    text: string;
    isCorrect: boolean;
  }[];
  selectedOptionId?: string;
  misconceptionAlert?: string;
  explanation: string;
}

export interface AttendanceRecord {
  id: string;
  meetingNumber: number;
  date: string;
  timeRange: string;
  topic: string;
  rombel: string;
  subCompetency: string;
  room: string;
  hadir: number;
  sakit: number;
  izin: number;
  alpa: number;
  totalStudents: number;
  isLocked: boolean;
  notes: string;
}

export interface StudentGrade {
  id: string;
  studentId: string;
  name: string;
  nisn: string;
  lkpd1: number;
  lkpd2: number;
  lkpd3: number;
  lkpd4: number;
  formatif1: number;
  formatif2: number;
  sumatif: number;
  remedialScore?: number;
  finalScore: number;
  kktpStatus: 'Tuntas' | 'Remediasi';
  predikat: 'A' | 'B' | 'C' | 'D';
  catatanKarakter: string;
}

export type ViewMode = 
  | 'dashboard' 
  | 'lkpd' 
  | 'buku-besar' 
  | 'neraca-lajur' 
  | 'bank-soal' 
  | 'rekap-nilai' 
  | 'cetak-leger' 
  | 'presensi' 
  | 'analisis-diagnostik' 
  | 'remedial-drill';

export type UserRole = 'teacher' | 'student';
