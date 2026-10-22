import React, { useState } from 'react';
import { MASTER_GRADES } from '../../data/mockAccountingData';
import { StudentGrade } from '../../types/accounting';

interface GradebookViewProps {
  onNavigateToPrintLeger: () => void;
  onNavigateToDiagnostic: () => void;
}

export const GradebookView: React.FC<GradebookViewProps> = ({
  onNavigateToPrintLeger,
  onNavigateToDiagnostic
}) => {
  const [grades, setGrades] = useState<StudentGrade[]>(MASTER_GRADES);
  const [filterKktp, setFilterKktp] = useState<'all' | 'tuntas' | 'remedial'>('all');
  const [searchStudent, setSearchStudent] = useState('');
  const [showSyncSuccessToast, setShowSyncSuccessToast] = useState(false);

  const filteredGrades = grades.filter((g) => {
    const matchesSearch = g.name.toLowerCase().includes(searchStudent.toLowerCase()) || g.nisn.includes(searchStudent);
    if (!matchesSearch) return false;
    if (filterKktp === 'tuntas') return g.finalScore >= 75;
    if (filterKktp === 'remedial') return g.finalScore < 75;
    return true;
  });

  const tuntasCount = grades.filter((g) => g.finalScore >= 75).length;
  const remedialCount = grades.filter((g) => g.finalScore < 75).length;
  const classAvg = Math.round(grades.reduce((s, g) => s + g.finalScore, 0) / grades.length);

  const handleSyncToErapor = () => {
    setShowSyncSuccessToast(true);
    setTimeout(() => setShowSyncSuccessToast(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {showSyncSuccessToast && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center justify-between text-xs animate-in fade-in duration-200 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600">cloud_done</span>
            <div>
              <p className="font-bold">Sinkronisasi e-Rapor & Dapodik Sukses!</p>
              <p className="text-emerald-700 text-[11px]">Seluruh 12 nilai siswa X AKL 1 berhasil diverifikasi ke database dinas pendidikan.</p>
            </div>
          </div>
          <button onClick={() => setShowSyncSuccessToast(false)} className="text-emerald-700 font-bold">
            Tutup
          </button>
        </div>
      )}

      {/* Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <span>Evaluasi & Asesmen</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#0F2942] font-semibold">Buku Rekap Nilai Siswa (Gradebook)</span>
          </nav>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl md:text-2xl font-bold text-[#0F2942] tracking-tight">
              Buku Rekap Nilai Akademik & Portofolio Siswa
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold">
              Kelas X AKL 1 (36 Siswa)
            </span>
          </div>
        </div>

        {/* Action Hub */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onNavigateToDiagnostic}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 text-xs font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">psychology</span>
            <span>Analisis Diagnostik</span>
          </button>

          <button
            onClick={onNavigateToPrintLeger}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-rose-600">picture_as_pdf</span>
            <span>Cetak Leger Resmi</span>
          </button>

          <button
            onClick={handleSyncToErapor}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0F2942] hover:bg-[#163a5d] text-white text-xs font-bold shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">sync</span>
            <span>Kirim ke e-Rapor</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Rata-Rata Capaian Kelas</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-data-mono font-extrabold text-3xl text-[#0F2942]">{classAvg}</span>
            <span className="text-emerald-600 text-xs font-semibold flex items-center">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +3.5
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Target KKTP: 75.0</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Tuntas Standar KKTP</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-data-mono font-extrabold text-3xl text-emerald-700">{tuntasCount}</span>
            <span className="text-xs text-slate-500">/ {grades.length} Siswa</span>
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">
            {Math.round((tuntasCount / grades.length) * 100)}% Ketuntasan Klasikal
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Perlu Drill Remediasi</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-data-mono font-extrabold text-3xl text-rose-700">{remedialCount}</span>
            <span className="text-xs text-slate-500">Siswa Sasaran</span>
          </div>
          <p className="text-[11px] text-rose-700 font-semibold mt-1">Modul adaptif terkirim via WA</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Capaian Tertinggi</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-data-mono font-extrabold text-3xl text-sky-700">96</span>
            <span className="text-xs text-slate-500">Siti Nurhaliza</span>
          </div>
          <p className="text-[11px] text-sky-700 font-semibold mt-1">Audit jurnal & CBT sempurna</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Filter Ketuntasan:</span>
          <div className="p-1 rounded-lg bg-slate-100 flex text-xs">
            <button
              onClick={() => setFilterKktp('all')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                filterKktp === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Semua ({grades.length})
            </button>
            <button
              onClick={() => setFilterKktp('tuntas')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                filterKktp === 'tuntas' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Tuntas ({tuntasCount})
            </button>
            <button
              onClick={() => setFilterKktp('remedial')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                filterKktp === 'remedial' ? 'bg-white text-rose-800 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Remediasi ({remedialCount})
            </button>
          </div>
        </div>

        <div className="relative w-64">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchStudent}
            onChange={(e) => setSearchStudent(e.target.value)}
            placeholder="Cari siswa / NISN..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
          />
        </div>
      </div>

      {/* Master Gradebook Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="py-2.5 px-3 w-10 text-center">No</th>
                <th className="py-2.5 px-3 w-24">NISN</th>
                <th className="py-2.5 px-4 min-w-[180px]">Nama Siswa</th>
                <th className="py-2.5 px-2 text-center w-16">LKPD 1</th>
                <th className="py-2.5 px-2 text-center w-16">LKPD 2</th>
                <th className="py-2.5 px-2 text-center w-16 bg-emerald-50 text-emerald-900">LKPD 3</th>
                <th className="py-2.5 px-2 text-center w-16">LKPD 4</th>
                <th className="py-2.5 px-2 text-center w-16">Formatif</th>
                <th className="py-2.5 px-2 text-center w-16">Sumatif</th>
                <th className="py-2.5 px-3 text-center w-20 font-bold text-slate-900 bg-slate-200/50">Nilai Akhir</th>
                <th className="py-2.5 px-3 text-center w-24">Status KKTP</th>
                <th className="py-2.5 px-3 text-center w-12">Predikat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredGrades.map((g, idx) => {
                const isTuntas = g.finalScore >= 75;
                return (
                  <tr key={g.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2 px-3 text-center text-slate-400 font-data-mono">{idx + 1}</td>
                    <td className="py-2 px-3 font-data-mono text-slate-600">{g.nisn}</td>
                    <td className="py-2 px-4 font-semibold text-slate-900">{g.name}</td>
                    <td className="py-2 px-2 text-center font-data-mono">{g.lkpd1}</td>
                    <td className="py-2 px-2 text-center font-data-mono">{g.lkpd2}</td>
                    <td className="py-2 px-2 text-center font-data-mono font-bold text-emerald-800 bg-emerald-50/40">{g.lkpd3}</td>
                    <td className="py-2 px-2 text-center font-data-mono">{g.lkpd4}</td>
                    <td className="py-2 px-2 text-center font-data-mono">{g.formatif2}</td>
                    <td className="py-2 px-2 text-center font-data-mono">{g.sumatif}</td>
                    <td className="py-2 px-3 text-center font-data-mono font-extrabold text-sm text-[#0F2942] bg-slate-100/50">
                      {g.finalScore}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-block ${
                        isTuntas ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {isTuntas ? 'Tuntas' : 'Remediasi'}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-center font-bold font-data-mono">
                      <span className={g.predikat === 'A' ? 'text-emerald-700' : g.predikat === 'B' ? 'text-sky-700' : 'text-amber-700'}>
                        {g.predikat}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
