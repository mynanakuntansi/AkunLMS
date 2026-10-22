import { 
  ChartOfAccount, 
  SourceDocument, 
  JournalTransaction, 
  CriticalReflection, 
  RubricItem, 
  Student, 
  CbtQuestion, 
  AttendanceRecord, 
  StudentGrade 
} from '../types/accounting';

export const CHART_OF_ACCOUNTS: ChartOfAccount[] = [
  { code: '111', name: 'Kas di Tangan', category: 'Aset Lancar', normalBalance: 'debit', initialBalance: 0 },
  { code: '112', name: 'Piutang Usaha', category: 'Aset Lancar', normalBalance: 'debit', initialBalance: 0 },
  { code: '113', name: 'Perlengkapan Bengkel', category: 'Aset Lancar', normalBalance: 'debit', initialBalance: 0 },
  { code: '114', name: 'Sewa Bengkel Dibayar di Muka', category: 'Aset Lancar', normalBalance: 'debit', initialBalance: 0 },
  { code: '121', name: 'Peralatan Bengkel & Mesin', category: 'Aset Tetap', normalBalance: 'debit', initialBalance: 0 },
  { code: '122', name: 'Akumulasi Penyusutan Peralatan', category: 'Aset Tetap', normalBalance: 'credit', initialBalance: 0 },
  { code: '211', name: 'Utang Usaha (Accounts Payable)', category: 'Liabilitas Jangka Pendek', normalBalance: 'credit', initialBalance: 0 },
  { code: '212', name: 'Utang Beban / Gaji', category: 'Liabilitas Jangka Pendek', normalBalance: 'credit', initialBalance: 0 },
  { code: '311', name: 'Modal Pemilik (Tn. Jaya)', category: 'Ekuitas', normalBalance: 'credit', initialBalance: 0 },
  { code: '312', name: 'Prive Tn. Jaya', category: 'Ekuitas', normalBalance: 'debit', initialBalance: 0 },
  { code: '411', name: 'Pendapatan Jasa Servis', category: 'Pendapatan Usaha', normalBalance: 'credit', initialBalance: 0 },
  { code: '511', name: 'Beban Gaji Mekanik & Teknisi', category: 'Beban Operasional', normalBalance: 'debit', initialBalance: 0 },
  { code: '512', name: 'Beban Listrik, Air & Telepon', category: 'Beban Operasional', normalBalance: 'debit', initialBalance: 0 },
  { code: '513', name: 'Beban Perlengkapan Bengkel', category: 'Beban Operasional', normalBalance: 'debit', initialBalance: 0 },
  { code: '514', name: 'Beban Sewa Bengkel', category: 'Beban Operasional', normalBalance: 'debit', initialBalance: 0 }
];

export const SOURCE_DOCUMENTS: SourceDocument[] = [
  {
    id: 'doc-001',
    type: 'BKM',
    documentNumber: 'BKM #001',
    date: '02 Oktober 2026',
    title: 'BUKTI KAS MASUK',
    partyName: 'Tn. Jaya (Pemilik)',
    issuedBy: 'Kasir Bengkel Maju Jaya',
    receivedBy: 'Bendahara Umum',
    amount: 30000000,
    description: 'Penyetoran modal awal secara tunai untuk mendirikan usaha Bengkel Maju Jaya.',
    paymentTerms: 'Tunai Kas'
  },
  {
    id: 'doc-002',
    type: 'BKK',
    documentNumber: 'BKK #014',
    date: '05 Oktober 2026',
    title: 'BUKTI KAS KELUAR',
    partyName: 'Bpk. H. Rasyid (Pemilik Properti)',
    issuedBy: 'Bagian Keuangan Bengkel Maju Jaya',
    receivedBy: 'Bpk. H. Rasyid',
    amount: 6000000,
    description: 'Pembayaran sewa ruko bengkel untuk periode 1 tahun (Pendekatan Neraca / Aset).',
    paymentTerms: 'Tunai Kas (Kuitansi Terlampir No. 049/SR/X)'
  },
  {
    id: 'doc-003',
    type: 'FK',
    documentNumber: 'FK #102',
    date: '09 Oktober 2026',
    title: 'FAKTUR PENJUALAN / PEMBELIAN KREDIT',
    partyName: 'PT Sinar Teknik Perkakas Mandiri',
    issuedBy: 'PT Sinar Teknik Perkakas',
    receivedBy: 'Bengkel Maju Jaya',
    amount: 7500000,
    description: 'Pembelian mesin kompresor udara & hydraulic jack bergaransi resmi.',
    paymentTerms: '2/10, n/30 (Diskon 2% jika lunas dalam 10 hari)',
    items: [
      { description: 'Kompresor Udara 3HP Swan High Pressure', quantity: 1, unitPrice: 4500000, subtotal: 4500000 },
      { description: 'Hydraulic Motorcycle Lift Jack Pro', quantity: 2, unitPrice: 1500000, subtotal: 3000000 }
    ]
  },
  {
    id: 'doc-004',
    type: 'BKM',
    documentNumber: 'BKM #002',
    date: '14 Oktober 2026',
    title: 'BUKTI KAS MASUK',
    partyName: 'Pelanggan Tunai Retail',
    issuedBy: 'Admin Service Bengkel Maju Jaya',
    receivedBy: 'Kasir Utama',
    amount: 2750000,
    description: 'Penerimaan kas jasa servis berkala, tune-up, dan ganti oli 8 unit sepeda motor.',
    paymentTerms: 'Tunai Kas'
  },
  {
    id: 'doc-005',
    type: 'FK',
    documentNumber: 'FK #103',
    date: '19 Oktober 2026',
    title: 'FAKTUR JASA PIUTANG',
    partyName: 'PT Sumber Berkah Ekspedisi',
    issuedBy: 'Bengkel Maju Jaya',
    receivedBy: 'PT Sumber Berkah Ekspedisi',
    amount: 1350000,
    description: 'Jasa overhaul mesin dan kelistrikan 2 unit armada kurir operasional mitra.',
    paymentTerms: 'n/15 (Jatuh tempo 15 hari)'
  },
  {
    id: 'doc-006',
    type: 'BKK',
    documentNumber: 'BKK #015',
    date: '25 Oktober 2026',
    title: 'BUKTI KAS KELUAR',
    partyName: 'Mekanik & Teknisi Bengkel',
    issuedBy: 'Bagian Keuangan Bengkel Maju Jaya',
    receivedBy: 'Koordinator Mekanik (Sdr. Danu dkk)',
    amount: 450000,
    description: 'Pelunasan biaya operasional & upah lembur mekanik periode minggu ke-3.',
    paymentTerms: 'Tunai Kas'
  }
];

export const INITIAL_JOURNAL_TRANSACTIONS: JournalTransaction[] = [
  {
    id: 'tx-1',
    date: '02/10/2026',
    evidenceNo: 'BKM #001',
    evidenceType: 'BKM',
    description: 'Penyetoran modal awal tunai bengkel oleh Tn. Jaya',
    pointsAwarded: 15,
    maxPoints: 15,
    status: 'valid',
    rows: [
      { id: 'r-1-1', accountCode: '111', accountName: 'Kas di Tangan', debit: 30000000, credit: 0, isCreditIndent: false },
      { id: 'r-1-2', accountCode: '311', accountName: 'Modal Pemilik (Tn. Jaya)', debit: 0, credit: 30000000, isCreditIndent: true }
    ]
  },
  {
    id: 'tx-2',
    date: '05/10/2026',
    evidenceNo: 'BKK #014',
    evidenceType: 'BKK',
    description: 'Pembayaran sewa ruko 1 tahun dimuka (Pendekatan Neraca)',
    pointsAwarded: 15,
    maxPoints: 15,
    status: 'valid',
    rows: [
      { id: 'r-2-1', accountCode: '114', accountName: 'Sewa Bengkel Dibayar di Muka', debit: 6000000, credit: 0, isCreditIndent: false },
      { id: 'r-2-2', accountCode: '111', accountName: 'Kas di Tangan', debit: 0, credit: 6000000, isCreditIndent: true }
    ]
  },
  {
    id: 'tx-3',
    date: '09/10/2026',
    evidenceNo: 'FK #102',
    evidenceType: 'FK',
    description: 'Pembelian mesin kompresor & hidrolik kredit, syarat 2/10, n/30',
    pointsAwarded: 15,
    maxPoints: 15,
    status: 'valid',
    rows: [
      { id: 'r-3-1', accountCode: '121', accountName: 'Peralatan Bengkel & Mesin', debit: 7500000, credit: 0, isCreditIndent: false },
      { id: 'r-3-2', accountCode: '211', accountName: 'Utang Usaha (PT Sinar Teknik)', debit: 0, credit: 7500000, isCreditIndent: true }
    ]
  },
  {
    id: 'tx-4',
    date: '14/10/2026',
    evidenceNo: 'BKM #002',
    evidenceType: 'BKM',
    description: 'Penerimaan kas jasa servis berkala 8 unit sepeda motor',
    pointsAwarded: 15,
    maxPoints: 15,
    status: 'valid',
    rows: [
      { id: 'r-4-1', accountCode: '111', accountName: 'Kas di Tangan', debit: 2750000, credit: 0, isCreditIndent: false },
      { id: 'r-4-2', accountCode: '411', accountName: 'Pendapatan Jasa Servis', debit: 0, credit: 2750000, isCreditIndent: true }
    ]
  },
  {
    id: 'tx-5',
    date: '19/10/2026',
    evidenceNo: 'FK #103',
    evidenceType: 'FK',
    description: 'Penyelesaian overhaul mesin armada kurir PT Sumber Berkah',
    pointsAwarded: 15,
    maxPoints: 15,
    status: 'valid',
    rows: [
      { id: 'r-5-1', accountCode: '112', accountName: 'Piutang Usaha (PT Sumber Berkah)', debit: 1350000, credit: 0, isCreditIndent: false },
      { id: 'r-5-2', accountCode: '411', accountName: 'Pendapatan Jasa Servis', debit: 0, credit: 1350000, isCreditIndent: true }
    ]
  },
  {
    id: 'tx-6',
    date: '25/10/2026',
    evidenceNo: 'BKK #015',
    evidenceType: 'BKK',
    description: 'Pelunasan beban operasional & upah lembur mekanik tunai',
    pointsAwarded: 10,
    maxPoints: 10,
    status: 'valid',
    rows: [
      { id: 'r-6-1', accountCode: '511', accountName: 'Beban Gaji Mekanik & Teknisi', debit: 450000, credit: 0, isCreditIndent: false },
      { id: 'r-6-2', accountCode: '111', accountName: 'Kas di Tangan', debit: 0, credit: 450000, isCreditIndent: true }
    ]
  }
];

export const INITIAL_REFLECTIONS: CriticalReflection[] = [
  {
    id: 'refl-1',
    questionNumber: 1,
    title: 'Pendekatan Aset vs Beban pada Pembayaran Dimuka',
    question: "Mengapa pada transaksi 05 Oktober pencatatan menggunakan akun 'Sewa Bengkel Dibayar di Muka' (Pendekatan Neraca/Harta) lebih tepat dibanding langsung mengakuinya sebagai Beban Sewa?",
    studentAnswer: '“Karena sewa ruko bengkel tersebut dibayarkan sekaligus untuk masa manfaat 1 tahun penuh ke depan. Berdasarkan prinsip pengaitan (matching principle) dan periodisasi akuntansi, pada saat tanggal transaksi 5 Oktober manfaat ekonomis ruangan belum terpakai seluruhnya, sehingga masih menjadi hak/aset lancar bengkel. Jika langsung dicatat sebagai Beban Sewa, laporan laba rugi bulan Oktober akan terdistorsi (understated) padahal beban riil bulan Oktober baru dihitung proporsional pada akhir periode saat jurnal penyesuaian (AJP).”',
    points: 10,
    maxPoints: 10,
    feedback: 'Pemahaman Konseptual Sempurna • Kaidah matching principle & periodisasi diuraikan secara tepat sesuai standar SAK ETAP/EMKM.',
    isMastered: true
  },
  {
    id: 'refl-2',
    questionNumber: 2,
    title: 'Implikasi Termin Pembayaran 2/10, n/30 Terhadap Arus Kas',
    question: "Jika Bengkel Maju Jaya melunasi faktur FK #102 pada tanggal 18 Oktober 2026, analisislah apakah bengkel berhak atas potongan pembelian tunai dan bagaimana pencatatan jurnal pelunasannya?",
    studentAnswer: '“Tanggal faktur adalah 09 Oktober. Batas waktu diskon 10 hari adalah tanggal 19 Oktober (9 + 10 = 19). Karena pelunasan dilakukan tanggal 18 Oktober, bengkel MASIH BERHAK mendapatkan potongan tunai 2% x Rp7.500.000 = Rp150.000. Jurnal pelunasannya: Utang Usaha di DEBIT Rp7.500.000, Potongan Pembelian di KREDIT Rp150.000, dan Kas di Tangan di KREDIT Rp7.350.000.”',
    points: 10,
    maxPoints: 10,
    feedback: 'Perhitungan diskon termin tepat waktu dan akun lawan di sisi kredit seimbang sempurna.',
    isMastered: true
  }
];

export const INITIAL_RUBRICS: RubricItem[] = [
  {
    id: 'rub-1',
    criteria: 'Kesesuaian Kode & Nama Akun Standar AKL',
    description: 'Ketepatan pemilihan akun debit dan kredit sesuai bagan akun (COA) perusahaan jasa.',
    score: 40,
    maxScore: 40,
    achievedPercentage: 100,
    notes: 'Seluruh kode akun (111, 114, 121, 211, 311, 411, 511) terisi akurat tanpa kesalahan klasifikasi.'
  },
  {
    id: 'rub-2',
    criteria: 'Keseimbangan Neraca Debit & Kredit (Balance)',
    description: 'Keseimbangan nilai nominal debit dan kredit pada setiap ayat jurnal dan saldo total.',
    score: 25,
    maxScore: 25,
    achievedPercentage: 100,
    notes: 'Total saldo Rp48.050.000 = Rp48.050.000 (Selisih Rp0, double-underlined).'
  },
  {
    id: 'rub-3',
    criteria: 'Analisis Bukti Transaksi & Nomor Referensi',
    description: 'Kelengkapan nomor bukti (BKM, BKK, FK) dan penguraian tanggal transaksi.',
    score: 15,
    maxScore: 15,
    achievedPercentage: 100,
    notes: 'Seluruh nomor voucher kas dan faktur sinkron dengan berkas sumber transaksi.'
  },
  {
    id: 'rub-4',
    criteria: 'Penalaran Kritis & Pemahaman Teori (HOTS)',
    description: 'Kedalaman argumentasi pada soal uraian reflektif berbasis standar akuntansi.',
    score: 15,
    maxScore: 20,
    achievedPercentage: 75,
    notes: 'Penjelasan prinsip matching principle sangat komprehensif, sedikit penajaman pada pencatatan memo penyesuaian.'
  }
];

export const STUDENTS_DATA: Student[] = [
  {
    id: 'std-01',
    name: 'Siti Nurhaliza',
    nisn: '00782194',
    classId: 'x-akl-1',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    phone: '+62 821-4455-8891',
    parentName: 'Ibu Fatimah',
    parentPhone: '+62 812-7788-1201',
    attendanceStatus: 'hadir',
    attendanceTime: '07:12 WIB',
    kktpMastery: 95,
    masteryLevel: 'Sangat Mahir',
    remediationStatus: 'completed'
  },
  {
    id: 'std-02',
    name: 'Ahmad Fauzi',
    nisn: '00782170',
    classId: 'x-akl-1',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    phone: '+62 813-9022-1144',
    parentName: 'Bpk. Hendro Fauzi',
    parentPhone: '+62 813-7722-9011',
    attendanceStatus: 'hadir',
    attendanceTime: '07:05 WIB',
    kktpMastery: 90,
    masteryLevel: 'Sangat Mahir',
    remediationStatus: 'none'
  },
  {
    id: 'std-03',
    name: 'Bella Safitri',
    nisn: '00782175',
    classId: 'x-akl-1',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    phone: '+62 878-1123-5567',
    parentName: 'Ibu Sri Wahyuni',
    parentPhone: '+62 878-9900-1122',
    attendanceStatus: 'hadir',
    attendanceTime: '07:18 WIB',
    kktpMastery: 88,
    masteryLevel: 'Mahir',
    remediationStatus: 'none'
  },
  {
    id: 'std-04',
    name: 'Dimas Pratama Putra',
    nisn: '00782180',
    classId: 'x-akl-1',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    phone: '+62 822-4411-9988',
    parentName: 'Bpk. Bambang Pratama',
    parentPhone: '+62 822-1133-7766',
    attendanceStatus: 'hadir',
    attendanceTime: '07:22 WIB',
    kktpMastery: 78,
    masteryLevel: 'Mahir',
    remediationStatus: 'none'
  },
  {
    id: 'std-05',
    name: 'Rendy Saputra',
    nisn: '00782205',
    classId: 'x-akl-1',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250',
    phone: '+62 821-5541-0982',
    parentName: 'Bpk. Saputra',
    parentPhone: '+62 821-9988-7612',
    attendanceStatus: 'hadir',
    attendanceTime: '07:28 WIB',
    kktpMastery: 68,
    masteryLevel: 'Perlu Bimbingan',
    remediationStatus: 'in_progress'
  },
  {
    id: 'std-06',
    name: 'Zahra Mustika Ratu',
    nisn: '00782210',
    classId: 'x-akl-1',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    phone: '+62 856-7788-9900',
    parentName: 'Ibu Ratu Asri',
    parentPhone: '+62 856-1122-3344',
    attendanceStatus: 'hadir',
    attendanceTime: '07:15 WIB',
    kktpMastery: 86,
    masteryLevel: 'Mahir',
    remediationStatus: 'none'
  },
  {
    id: 'std-07',
    name: 'Bima Satria Nugraha',
    nisn: '00782178',
    classId: 'x-akl-1',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=250',
    phone: '+62 812-4400-9911',
    parentName: 'Bpk. Nugraha',
    parentPhone: '+62 812-9900-4411',
    attendanceStatus: 'sakit',
    kktpMastery: 72,
    masteryLevel: 'Cukup',
    remediationStatus: 'assigned'
  },
  {
    id: 'std-08',
    name: 'Cantika Dewi Lestari',
    nisn: '00782182',
    classId: 'x-akl-1',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    phone: '+62 857-8899-2211',
    parentName: 'Ibu Dewi Lestari',
    parentPhone: '+62 857-1122-8899',
    attendanceStatus: 'izin',
    kktpMastery: 84,
    masteryLevel: 'Mahir',
    remediationStatus: 'none'
  },
  {
    id: 'std-09',
    name: 'Daffa Rizky Ramadhan',
    nisn: '00782185',
    classId: 'x-akl-1',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=250',
    phone: '+62 823-7766-5544',
    parentName: 'Bpk. Ramadhan',
    parentPhone: '+62 823-9988-1122',
    attendanceStatus: 'hadir',
    attendanceTime: '07:10 WIB',
    kktpMastery: 92,
    masteryLevel: 'Sangat Mahir',
    remediationStatus: 'none'
  },
  {
    id: 'std-10',
    name: 'Eka Putri Rahayu',
    nisn: '00782188',
    classId: 'x-akl-1',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=250',
    phone: '+62 895-3322-1144',
    parentName: 'Ibu Rahayu',
    parentPhone: '+62 895-9988-7766',
    attendanceStatus: 'hadir',
    attendanceTime: '07:08 WIB',
    kktpMastery: 87,
    masteryLevel: 'Mahir',
    remediationStatus: 'none'
  },
  {
    id: 'std-11',
    name: 'Farhan Maulana',
    nisn: '00782190',
    classId: 'x-akl-1',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=250',
    phone: '+62 813-1122-3344',
    parentName: 'Bpk. Maulana',
    parentPhone: '+62 813-5566-7788',
    attendanceStatus: 'hadir',
    attendanceTime: '07:20 WIB',
    kktpMastery: 70,
    masteryLevel: 'Perlu Bimbingan',
    remediationStatus: 'in_progress'
  },
  {
    id: 'std-12',
    name: 'Gita Nirmala',
    nisn: '00782192',
    classId: 'x-akl-1',
    avatarUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=250',
    phone: '+62 877-6655-4433',
    parentName: 'Ibu Nirmala',
    parentPhone: '+62 877-2211-0099',
    attendanceStatus: 'hadir',
    attendanceTime: '07:14 WIB',
    kktpMastery: 89,
    masteryLevel: 'Mahir',
    remediationStatus: 'none'
  }
];

export const CBT_QUESTIONS: CbtQuestion[] = [
  {
    id: 'q-09',
    number: 9,
    code: 'CBT-AKL-E.09',
    category: 'Jurnal Umum - Beban Dibayar Dimuka',
    difficulty: 'Sedang',
    bloomLevel: 'C3 Menerapkan',
    questionText: 'Pada tanggal 01 November 2026, Salon Jelita membayar premi asuransi kebakaran tempat usaha untuk masa pertanggungan 1 tahun sebesar Rp3.600.000. Jika perusahaan menggunakan Pendekatan Neraca (Harta), ayat jurnal umum yang benar pada saat pembayaran adalah...',
    evidenceDocSnippet: 'Kwitansi #ASR-882: Diterima dari Salon Jelita uang sejumlah Rp3.600.000 untuk premi asuransi gedung 01 Nov 2026 s.d. 31 Okt 2027.',
    options: [
      { id: 'opt-a', label: 'A', text: 'Asuransi Dibayar di Muka (D) Rp3.600.000 ; Kas di Tangan (K) Rp3.600.000', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 'Beban Asuransi (D) Rp3.600.000 ; Kas di Tangan (K) Rp3.600.000', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 'Kas di Tangan (D) Rp3.600.000 ; Asuransi Dibayar di Muka (K) Rp3.600.000', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 'Beban Asuransi (D) Rp300.000 ; Kas di Tangan (K) Rp300.000', isCorrect: false }
    ],
    selectedOptionId: 'opt-a',
    misconceptionAlert: 'Miskonsepsi umum siswa: Memilih Opsi B karena menganggap semua pengeluaran kas operasional langsung menjadi Beban, padahal pendekatan neraca mewajibkan pengakuan aset lancar (Dibayar di Muka).',
    explanation: 'Dalam pendekatan neraca, pengeluaran kas yang manfaat ekonomisnya melampaui satu periode akuntansi dicatat ke akun Harta Lancar: Asuransi Dibayar di Muka (Debit) dan Kas di Tangan (Kredit).'
  },
  {
    id: 'q-14',
    number: 14,
    code: 'CBT-AKL-E.14',
    category: 'Termin Pembayaran Kredit & Diskon Pembelian',
    difficulty: 'HOTS',
    bloomLevel: 'C4 Menganalisis',
    questionText: 'Dibeli peralatan kantor seharga Rp10.000.000 pada tanggal 10 Mei dengan syarat 2/10, n/30. Pada tanggal 19 Mei dilakukan pembayaran pelunasan penuh. Pencatatan jurnal umum pelunasan yang benar oleh pihak pembeli adalah...',
    options: [
      { id: 'opt-14-a', label: 'A', text: 'Utang Usaha (D) Rp10.000.000 ; Kas di Tangan (K) Rp10.000.000', isCorrect: false },
      { id: 'opt-14-b', label: 'B', text: 'Utang Usaha (D) Rp10.000.000 ; Kas (K) Rp9.800.000 ; Potongan Pembelian (K) Rp200.000', isCorrect: true },
      { id: 'opt-14-c', label: 'C', text: 'Peralatan Kantor (D) Rp10.000.000 ; Kas (K) Rp9.800.000 ; Pendapatan Diskon (K) Rp200.000', isCorrect: false },
      { id: 'opt-14-d', label: 'D', text: 'Utang Usaha (D) Rp9.800.000 ; Kas di Tangan (K) Rp9.800.000', isCorrect: false }
    ],
    selectedOptionId: 'opt-14-b',
    misconceptionAlert: 'Miskonsepsi: Menghitung tanggal 10 + 10 = 20 Mei. Karena dilunasi 19 Mei (hari ke-9), potongan tunai 2% (Rp200.000) wajib diakui dan dikreditkan.',
    explanation: 'Periode diskon berlaku sampai 20 Mei. Pelunasan tanggal 19 Mei berhak diskon 2% (Rp200.000). Utang berkurang penuh Rp10.000.000 di debit, Kas keluar Rp9.800.000 di kredit, dan Potongan Pembelian di kredit Rp200.000.'
  },
  {
    id: 'q-18',
    number: 18,
    code: 'CBT-AKL-E.18',
    category: 'Jurnal Penyesuaian - Perlengkapan Terpakai',
    difficulty: 'Sedang',
    bloomLevel: 'C3 Menerapkan',
    questionText: 'Saldo akun Perlengkapan Bengkel di neraca saldo menunjukkan Rp4.500.000. Pada tanggal 31 Desember 2026, hasil inventarisasi fisik (stock opname) menunjukkan perlengkapan yang masih tersisa adalah sebesar Rp1.200.000. Jurnal penyesuaian yang tepat adalah...',
    options: [
      { id: 'opt-18-a', label: 'A', text: 'Beban Perlengkapan (D) Rp3.300.000 ; Perlengkapan (K) Rp3.300.000', isCorrect: true },
      { id: 'opt-18-b', label: 'B', text: 'Beban Perlengkapan (D) Rp1.200.000 ; Perlengkapan (K) Rp1.200.000', isCorrect: false },
      { id: 'opt-18-c', label: 'C', text: 'Perlengkapan (D) Rp3.300.000 ; Beban Perlengkapan (K) Rp3.300.000', isCorrect: false },
      { id: 'opt-18-d', label: 'D', text: 'Ikhtisar Laba Rugi (D) Rp4.500.000 ; Perlengkapan (K) Rp4.500.000', isCorrect: false }
    ],
    selectedOptionId: 'opt-18-a',
    explanation: 'Beban perlengkapan yang diakui adalah nilai perlengkapan yang TERPAKAI selama periode berjalan = Saldo Awal (Rp4.500.000) - Sisa Fisik (Rp1.200.000) = Rp3.300.000.'
  }
];

export const ATTENDANCE_TODAY: AttendanceRecord = {
  id: 'att-sesi-12',
  meetingNumber: 12,
  date: 'Rabu, 15 Mei 2025',
  timeRange: '08.00 - 09.40 WIB (Jam Ke 1-3)',
  topic: 'Pencatatan Jurnal Penyesuaian & Neraca Lajur 10 Kolom',
  rombel: 'X AKL 1 - Dasar Akuntansi (36 Siswa)',
  subCompetency: 'Analisis Bukti Transaksi Penyesuaian Akhir Periode Akuntansi Perusahaan Jasa',
  room: 'Lab Akuntansi Komputer 2',
  hadir: 33,
  sakit: 1,
  izin: 2,
  alpa: 0,
  totalStudents: 36,
  isLocked: false,
  notes: 'Semua siswa telah melakukan tap kartu presensi lab. 1 siswa sakit (Bima Satria, surat dokter terlampir di file e-Rapor). Sesi berlangsung interaktif.'
};

export const MASTER_GRADES: StudentGrade[] = [
  { id: 'grd-01', studentId: 'std-01', name: 'Siti Nurhaliza', nisn: '00782194', lkpd1: 95, lkpd2: 92, lkpd3: 95, lkpd4: 94, formatif1: 90, formatif2: 92, sumatif: 96, finalScore: 94, kktpStatus: 'Tuntas', predikat: 'A', catatanKarakter: 'Sangat teliti dalam audit penyeimbang jurnal dan penalaran siklus akuntansi.' },
  { id: 'grd-02', studentId: 'std-02', name: 'Ahmad Fauzi', nisn: '00782170', lkpd1: 90, lkpd2: 88, lkpd3: 90, lkpd4: 92, formatif1: 88, formatif2: 85, sumatif: 91, finalScore: 89, kktpStatus: 'Tuntas', predikat: 'A', catatanKarakter: 'Mandiri dan aktif membantu rekan dalam diskusi kelompok buku besar.' },
  { id: 'grd-03', studentId: 'std-03', name: 'Bella Safitri', nisn: '00782175', lkpd1: 88, lkpd2: 85, lkpd3: 88, lkpd4: 86, formatif1: 84, formatif2: 86, sumatif: 88, finalScore: 87, kktpStatus: 'Tuntas', predikat: 'B', catatanKarakter: 'Konsisten menyelesaikan lembar kerja sebelum batas tenggat waktu.' },
  { id: 'grd-04', studentId: 'std-04', name: 'Dimas Pratama Putra', nisn: '00782180', lkpd1: 82, lkpd2: 80, lkpd3: 78, lkpd4: 82, formatif1: 76, formatif2: 78, sumatif: 80, finalScore: 79, kktpStatus: 'Tuntas', predikat: 'B', catatanKarakter: 'Cukup cermat dalam menghitung saldo normal neraca saldo.' },
  { id: 'grd-05', studentId: 'std-05', name: 'Rendy Saputra', nisn: '00782205', lkpd1: 70, lkpd2: 68, lkpd3: 68, lkpd4: 72, formatif1: 65, formatif2: 68, sumatif: 70, remedialScore: 78, finalScore: 74, kktpStatus: 'Remediasi', predikat: 'C', catatanKarakter: 'Memerlukan scaffolding tambahan pada konsep beban dibayar di muka dan termin diskon.' },
  { id: 'grd-06', studentId: 'std-06', name: 'Zahra Mustika Ratu', nisn: '00782210', lkpd1: 86, lkpd2: 84, lkpd3: 86, lkpd4: 88, formatif1: 82, formatif2: 84, sumatif: 87, finalScore: 85, kktpStatus: 'Tuntas', predikat: 'B', catatanKarakter: 'Kerapian format voucher dan jurnal dua kolom sangat baik.' },
  { id: 'grd-07', studentId: 'std-07', name: 'Bima Satria Nugraha', nisn: '00782178', lkpd1: 74, lkpd2: 72, lkpd3: 72, lkpd4: 75, formatif1: 70, formatif2: 72, sumatif: 74, remedialScore: 80, finalScore: 75, kktpStatus: 'Tuntas', predikat: 'B', catatanKarakter: 'Kemampuan analisis meningkat setelah menyelesaikan modul drill interaktif.' },
  { id: 'grd-08', studentId: 'std-08', name: 'Cantika Dewi Lestari', nisn: '00782182', lkpd1: 85, lkpd2: 82, lkpd3: 84, lkpd4: 85, formatif1: 80, formatif2: 83, sumatif: 85, finalScore: 84, kktpStatus: 'Tuntas', predikat: 'B', catatanKarakter: 'Kritis dalam menganalisis dokumen faktur dan nota debit.' },
  { id: 'grd-09', studentId: 'std-09', name: 'Daffa Rizky Ramadhan', nisn: '00782185', lkpd1: 94, lkpd2: 90, lkpd3: 92, lkpd4: 93, formatif1: 91, formatif2: 89, sumatif: 93, finalScore: 92, kktpStatus: 'Tuntas', predikat: 'A', catatanKarakter: 'Pemahaman konsep akrual dan penutupan buku sangat mendalam.' },
  { id: 'grd-10', studentId: 'std-10', name: 'Eka Putri Rahayu', nisn: '00782188', lkpd1: 88, lkpd2: 85, lkpd3: 87, lkpd4: 86, formatif1: 84, formatif2: 86, sumatif: 88, finalScore: 86, kktpStatus: 'Tuntas', predikat: 'B', catatanKarakter: 'Aktif berpartisipasi dalam diskusi kelas dan penugasan mandiri.' },
  { id: 'grd-11', studentId: 'std-11', name: 'Farhan Maulana', nisn: '00782190', lkpd1: 72, lkpd2: 70, lkpd3: 70, lkpd4: 73, formatif1: 68, formatif2: 70, sumatif: 72, remedialScore: 76, finalScore: 73, kktpStatus: 'Remediasi', predikat: 'C', catatanKarakter: 'Perlu latihan lanjutan dalam posting ke buku besar bentuk 4 kolom.' },
  { id: 'grd-12', studentId: 'std-12', name: 'Gita Nirmala', nisn: '00782192', lkpd1: 90, lkpd2: 87, lkpd3: 89, lkpd4: 91, formatif1: 86, formatif2: 88, sumatif: 90, finalScore: 89, kktpStatus: 'Tuntas', predikat: 'A', catatanKarakter: 'Teliti dalam menyusun kertas kerja neraca lajur 10 kolom.' }
];

export const SCHOOL_INFO = {
  name: 'SMK NEGERI 1 KOTA SURABAYA',
  department: 'PROGRAM KEAHLIAN AKUNTANSI DAN KEUANGAN LEMBAGA (AKL)',
  curriculum: 'Kurikulum Merdeka SMK (Fase E/F)',
  academicYear: 'Tahun Ajaran 2024/2025 Genap',
  headmaster: 'Drs. H. Bambang Irianto, M.M.',
  headmasterNip: '19680315 199303 1 004',
  teacher: 'Ibu Ratna Dewi, S.Pd.',
  teacherNip: '19830412 200801 2 006',
  kktpStandard: 75
};
