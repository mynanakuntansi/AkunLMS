import React, { useState } from 'react';
import { 
  JournalTransaction, 
  CriticalReflection, 
  RubricItem, 
  SourceDocument,
  UserRole
} from '../../types/accounting';
import { 
  CHART_OF_ACCOUNTS, 
  SOURCE_DOCUMENTS, 
  INITIAL_JOURNAL_TRANSACTIONS, 
  INITIAL_REFLECTIONS, 
  INITIAL_RUBRICS,
  STUDENTS_DATA
} from '../../data/mockAccountingData';
import { formatRupiah, parseRupiahInput } from '../../utils/formatters';

interface LkpdJournalViewProps {
  currentRole: UserRole;
  onOpenDocument: (doc: SourceDocument) => void;
  onNavigateToLedger: () => void;
}

export const LkpdJournalView: React.FC<LkpdJournalViewProps> = ({
  currentRole,
  onOpenDocument,
  onNavigateToLedger
}) => {
  const [transactions, setTransactions] = useState<JournalTransaction[]>(INITIAL_JOURNAL_TRANSACTIONS);
  const [reflections, setReflections] = useState<CriticalReflection[]>(INITIAL_REFLECTIONS);
  const [rubrics, setRubrics] = useState<RubricItem[]>(INITIAL_RUBRICS);
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(0);
  const [teacherNote, setTeacherNote] = useState(
    'Pengerjaan sangat sistematis dan rapi. Penguasaan analisis dokumen bukti kas masuk dan faktur pembelian kredit sudah melampaui indikator KKTP Fase E. Pertahankan performa untuk siklus penyesuaian akhir periode!'
  );
  const [isPublished, setIsPublished] = useState(true);
  const [showPublishToast, setShowPublishToast] = useState(false);
  const [showAccountReferenceModal, setShowAccountReferenceModal] = useState(false);

  const currentStudent = STUDENTS_DATA[selectedStudentIndex] || STUDENTS_DATA[0];

  // Calculate totals
  const totalDebit = transactions.reduce((sum, tx) => {
    return sum + tx.rows.reduce((rowSum, r) => rowSum + (r.debit || 0), 0);
  }, 0);

  const totalCredit = transactions.reduce((sum, tx) => {
    return sum + tx.rows.reduce((rowSum, r) => rowSum + (r.credit || 0), 0);
  }, 0);

  const difference = Math.abs(totalDebit - totalCredit);
  const isBalanced = totalDebit > 0 && totalDebit === totalCredit;

  // Calculate current score
  const totalScore = rubrics.reduce((sum, r) => sum + r.score, 0);

  // Add a new row to the last transaction or create a new transaction
  const handleAddNewRow = () => {
    const newTx: JournalTransaction = {
      id: `tx-${Date.now()}`,
      date: '28/10/2026',
      evidenceNo: 'BM #001',
      evidenceType: 'BM',
      description: 'Penyesuaian perlengkapan terpakai akhir bulan',
      status: 'pending',
      rows: [
        { id: `r-${Date.now()}-1`, accountCode: '513', accountName: 'Beban Perlengkapan Bengkel', debit: 500000, credit: 0, isCreditIndent: false },
        { id: `r-${Date.now()}-2`, accountCode: '113', accountName: 'Perlengkapan Bengkel', debit: 0, credit: 500000, isCreditIndent: true }
      ]
    };
    setTransactions([...transactions, newTx]);
  };

  const handleReset = () => {
    setTransactions(INITIAL_JOURNAL_TRANSACTIONS);
    setReflections(INITIAL_REFLECTIONS);
    setRubrics(INITIAL_RUBRICS);
  };

  const handlePublishScore = () => {
    setIsPublished(true);
    setShowPublishToast(true);
    setTimeout(() => setShowPublishToast(false), 4000);
  };

  const handleDocumentClick = (evidenceNo: string) => {
    const foundDoc = SOURCE_DOCUMENTS.find(
      (d) => d.documentNumber.toLowerCase() === evidenceNo.toLowerCase()
    );
    if (foundDoc) {
      onOpenDocument(foundDoc);
    } else {
      // Fallback: create mock doc on the fly
      onOpenDocument({
        id: 'generic-doc',
        type: 'BM',
        documentNumber: evidenceNo,
        date: '28 Oktober 2026',
        title: 'BUKTI MEMORIAL AKUNTANSI',
        partyName: 'Bagian Akuntansi Bengkel Maju Jaya',
        issuedBy: 'Teknisi & Kasir',
        receivedBy: 'Siti Nurhaliza',
        amount: 500000,
        description: `Bukti transaksi memorial untuk ayat penyesuaian nomor ${evidenceNo}.`
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification when saving/publishing */}
      {showPublishToast && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 shadow-sm flex items-center justify-between text-emerald-900 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-emerald-600 text-[22px]">check_circle</span>
            <div>
              <p className="text-xs font-bold">Nilai & Ulasan LKPD Berhasil Dipublikasikan!</p>
              <p className="text-[11px] text-emerald-700">
                Nilai {totalScore}/100 milik {currentStudent.name} tersinkronkan ke Buku Nilai e-Rapor dan portofolio siswa.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowPublishToast(false)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-semibold px-2 py-1"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Breadcrumb & Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <span>Pembelajaran</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>LKPD Interaktif</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#0F2942] font-semibold">LKPD 3 • Jurnal Umum Bengkel Maju Jaya</span>
          </nav>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl md:text-2xl font-bold text-[#0F2942] tracking-tight">
              Lembar Kerja Peserta Didik (LKPD 3)
            </h1>
            <span className="font-data-mono text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
              Basis Akrual
            </span>
            <span className="font-data-mono text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
              Fase E Kurikulum Merdeka
            </span>
          </div>
        </div>

        {/* Student Selector Toolbar */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">Peserta:</span>
          <div className="relative">
            <select
              value={selectedStudentIndex}
              onChange={(e) => setSelectedStudentIndex(parseInt(e.target.value, 10))}
              className="appearance-none bg-white text-slate-800 text-xs font-semibold pl-3 pr-8 py-1.5 rounded-lg border border-slate-200 shadow-2xs hover:bg-slate-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
            >
              {STUDENTS_DATA.map((std, idx) => (
                <option key={std.id} value={idx}>
                  {std.name} ({std.nisn}) — {std.kktpMastery}%
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[16px]">
              unfold_more
            </span>
          </div>

          <button
            onClick={() => setShowAccountReferenceModal(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            title="Lihat Daftar Akun (Bagan Akun)"
          >
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            <span className="hidden sm:inline">Daftar Akun</span>
          </button>
        </div>
      </div>

      {/* Student Meta & Submission Badge */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={currentStudent.avatarUrl}
              alt={currentStudent.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100 shadow-xs"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-bold text-base text-slate-900">{currentStudent.name}</h2>
              <span className="font-data-mono text-[11px] text-slate-500 px-2 py-0.5 rounded bg-slate-100">
                NISN {currentStudent.nisn}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                Diserahkan Tepat Waktu
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Kelas X AKL 1 • Dikumpulkan 27 Okt 2026, 10:45 WIB • Resi: <span className="font-data-mono text-slate-600 font-medium">SUB-LKPD3/AKL-X/10-0419</span>
            </p>
          </div>
        </div>

        {/* Next step CTA */}
        <div className="flex items-center gap-2 self-end md:self-center">
          <button
            onClick={onNavigateToLedger}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 text-[#0284C7] hover:bg-sky-100 font-semibold text-xs border border-sky-200 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">forward</span>
            <span>Posting ke Buku Besar</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Journal Table & Reflection */}
        <div className="lg:col-span-8 space-y-6">
          {/* Automated Audit Strip */}
          <div className={`p-4 rounded-xl border transition-all ${
            isBalanced 
              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' 
              : 'bg-rose-50 border-rose-200 text-rose-950'
          } shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                isBalanced ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
              }`}>
                <span className="material-symbols-outlined text-[22px]">
                  {isBalanced ? 'verified' : 'error'}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">Auto-Audit Mesin Penyeimbang Jurnal</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    isBalanced ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                  }`}>
                    {isBalanced ? 'Seimbang 100% (Balance)' : `Selisih ${formatRupiah(difference)}`}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  {isBalanced 
                    ? 'Kaidah tata buku berpasangan (double-entry bookkeeping) terverifikasi valid tanpa selisih.'
                    : 'Periksa kembali akun sisi debit atau kredit. Jumlah nominal belum sama.'}
                </p>
              </div>
            </div>

            {/* Balances pills */}
            <div className="flex items-center gap-2 font-data-mono text-xs">
              <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-right shadow-2xs">
                <span className="block text-[10px] uppercase font-bold text-slate-400">Total Debit</span>
                <span className="font-bold text-slate-900">{formatRupiah(totalDebit)}</span>
              </div>
              <span className="font-bold text-slate-400">=</span>
              <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-right shadow-2xs">
                <span className="block text-[10px] uppercase font-bold text-slate-400">Total Kredit</span>
                <span className="font-bold text-slate-900">{formatRupiah(totalCredit)}</span>
              </div>
            </div>
          </div>

          {/* JURNAL UMUM TABLE CONTAINER */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Table Header Controls */}
            <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0F2942] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">table_chart</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-tight">
                    Jurnal Umum Dua Kolom • Bengkel Maju Jaya
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Periode Oktober 2026 • Standar Akuntansi SMK AKL
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddNewRow}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0F2942] hover:bg-[#163a5d] text-white text-xs font-semibold transition-colors"
                >
                  <span className="material-symbols-outlined text-[15px]">add</span>
                  <span>+ Tambah Transaksi</span>
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium transition-colors"
                  title="Kembalikan ke data awal LKPD"
                >
                  <span className="material-symbols-outlined text-[15px]">restart_alt</span>
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                    <th className="py-2.5 px-3 w-16">Tanggal</th>
                    <th className="py-2.5 px-3 w-24">No. Bukti</th>
                    <th className="py-2.5 px-4 min-w-[240px]">Nama Akun & Keterangan</th>
                    <th className="py-2.5 px-3 text-center w-14">Ref</th>
                    <th className="py-2.5 px-4 text-right w-32">Debit (Rp)</th>
                    <th className="py-2.5 px-4 text-right w-32">Kredit (Rp)</th>
                    <th className="py-2.5 px-3 text-center w-20">Audit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.map((tx) => (
                    <React.Fragment key={tx.id}>
                      {tx.rows.map((row, rIdx) => {
                        const isFirstInTx = rIdx === 0;
                        return (
                          <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                            {/* Date */}
                            <td className="py-2.5 px-3 font-data-mono text-slate-500 align-top">
                              {isFirstInTx ? tx.date.split('/')[0] + '/10' : ''}
                            </td>

                            {/* Evidence No */}
                            <td className="py-2.5 px-3 align-top">
                              {isFirstInTx ? (
                                <button
                                  onClick={() => handleDocumentClick(tx.evidenceNo)}
                                  className="font-data-mono font-semibold text-[#0284C7] hover:underline flex items-center gap-0.5"
                                  title="Klik untuk membuka bukti transaksi"
                                >
                                  <span>{tx.evidenceNo}</span>
                                  <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                                </button>
                              ) : null}
                            </td>

                            {/* Account & Description */}
                            <td className="py-2.5 px-4">
                              <div className={`${row.isCreditIndent ? 'pl-5 text-slate-700 italic' : 'font-medium text-slate-900'}`}>
                                {row.accountName}
                              </div>
                              {rIdx === tx.rows.length - 1 && (
                                <div className="text-[11px] text-slate-400 mt-0.5 italic">
                                  ({tx.description})
                                </div>
                              )}
                            </td>

                            {/* Ref */}
                            <td className="py-2.5 px-3 text-center font-data-mono text-slate-500 align-top">
                              {row.accountCode}
                            </td>

                            {/* Debit */}
                            <td className="py-2.5 px-4 text-right font-data-mono font-semibold text-slate-900 align-top">
                              {row.debit > 0 ? formatRupiah(row.debit, false) : '-'}
                            </td>

                            {/* Credit */}
                            <td className="py-2.5 px-4 text-right font-data-mono font-semibold text-slate-900 align-top">
                              {row.credit > 0 ? formatRupiah(row.credit, false) : '-'}
                            </td>

                            {/* Audit / points */}
                            <td className="py-2.5 px-3 text-center align-top">
                              {isFirstInTx && (
                                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                  <span className="material-symbols-outlined text-[12px]">check</span>
                                  +{tx.pointsAwarded || 15}
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </tbody>

                {/* Footer Totals Row with Double Underline */}
                <tfoot>
                  <tr className="bg-[#0F2942] text-white font-semibold">
                    <td colSpan={4} className="py-3 px-4 text-right uppercase tracking-wider text-xs">
                      TOTAL SALDO JURNAL (BALANCE) :
                    </td>
                    <td className="py-3 px-4 text-right font-data-mono font-bold text-sm text-emerald-300 border-b-4 border-double border-emerald-400">
                      {formatRupiah(totalDebit)}
                    </td>
                    <td className="py-3 px-4 text-right font-data-mono font-bold text-sm text-emerald-300 border-b-4 border-double border-emerald-400">
                      {formatRupiah(totalCredit)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="material-symbols-outlined text-emerald-400 text-[20px]">
                        task_alt
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* CRITICAL REFLECTION SECTION (Penalaran Kritis HOTS) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-[#0284C7] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">psychology</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    Refleksi Penalaran Kritis & Analisis Kasus
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Penilaian kompetensi uraian kualitatif HOTS • Bobot: 20 Poin
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                Nilai Refleksi: 20/20 Pts
              </span>
            </div>

            {reflections.map((refl, idx) => (
              <div key={refl.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Pertanyaan Analisis #{refl.questionNumber}
                    </span>
                    <p className="text-xs font-semibold text-slate-800 leading-snug">
                      {refl.question}
                    </p>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-data-mono font-bold text-xs shrink-0">
                    {refl.points}/{refl.maxPoints} Pts
                  </div>
                </div>

                {/* Student's answer box */}
                <div className="p-3.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 leading-relaxed font-sans relative pl-4">
                  <div className="absolute left-0 top-2.5 bottom-2.5 w-1 bg-emerald-500 rounded-full" />
                  <p className="italic text-slate-700">{refl.studentAnswer}</p>
                </div>

                {/* Feedback badge */}
                <div className="flex items-center gap-1.5 text-emerald-700 text-[11px] font-medium">
                  <span className="material-symbols-outlined text-[15px]">verified</span>
                  <span>{refl.feedback}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (4 cols): Teacher Rubric Scoring & e-Rapor Sync */}
        <div className="lg:col-span-4 space-y-5">
          {/* Main Score Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Rubrik Penilaian LKPD
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                Telah Dinilai Resmi
              </span>
            </div>

            {/* Score Display */}
            <div className="text-center py-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">
                Total Capaian Skor
              </span>
              <div className="flex items-baseline justify-center gap-1 mt-1">
                <span className="font-data-mono font-extrabold text-4xl text-[#0F2942]">
                  {totalScore}
                </span>
                <span className="text-slate-400 text-sm font-semibold">/ 100</span>
              </div>
              <p className="text-xs font-semibold text-emerald-700 mt-1">
                Kategori: Sangat Mahir (KKTP 75 Terlampaui)
              </p>
            </div>

            {/* Rubric Breakdown */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              {rubrics.map((rubric) => (
                <div key={rubric.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">{rubric.criteria}</span>
                    <span className="font-data-mono font-bold text-xs text-slate-900">
                      {rubric.score}/{rubric.maxScore}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${(rubric.score / rubric.maxScore) * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {rubric.notes}
                  </p>
                </div>
              ))}
            </div>

            {/* Teacher Feedback textarea */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700 block">
                Catatan & Rekomendasi Guru Pengampu:
              </label>
              <textarea
                value={teacherNote}
                onChange={(e) => setTeacherNote(e.target.value)}
                rows={4}
                className="w-full p-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7] transition-all leading-relaxed"
                placeholder="Tulis ulasan formatif untuk siswa..."
              />
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handlePublishScore}
                className="w-full py-2.5 rounded-lg bg-[#0F2942] hover:bg-[#163a5d] text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[17px]">sync_saved_locally</span>
                <span>Simpan & Publikasikan ke e-Rapor</span>
              </button>

              <button
                onClick={onNavigateToLedger}
                className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[17px]">account_balance_wallet</span>
                <span>Buka Buku Besar (T-Account)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Account Reference Drawer Modal */}
      {showAccountReferenceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-h-[80vh] flex flex-col">
            <div className="p-4 bg-[#0F2942] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400">format_list_numbered</span>
                <h3 className="font-bold text-sm">Bagan Akun Standar (Chart of Accounts)</h3>
              </div>
              <button
                onClick={() => setShowAccountReferenceModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-4 overflow-y-auto space-y-2">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 font-semibold text-slate-700">
                  <tr>
                    <th className="py-2 px-3 w-16">Kode</th>
                    <th className="py-2 px-3">Nama Akun</th>
                    <th className="py-2 px-3">Klasifikasi</th>
                    <th className="py-2 px-3 text-center">Saldo Normal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CHART_OF_ACCOUNTS.map((acc) => (
                    <tr key={acc.code} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-data-mono font-bold text-slate-900">{acc.code}</td>
                      <td className="py-2 px-3 text-slate-800">{acc.name}</td>
                      <td className="py-2 px-3 text-slate-500">{acc.category}</td>
                      <td className="py-2 px-3 text-center uppercase font-data-mono font-semibold text-emerald-700">
                        {acc.normalBalance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-slate-50 border-t border-slate-200 text-right">
              <button
                onClick={() => setShowAccountReferenceModal(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
