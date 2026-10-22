import React, { useState } from 'react';
import { MASTER_GRADES, SCHOOL_INFO } from '../../data/mockAccountingData';

interface PrintLegerViewProps {
  onBack: () => void;
}

export const PrintLegerView: React.FC<PrintLegerViewProps> = ({ onBack }) => {
  const [paperSize, setPaperSize] = useState('a4-l');
  const [showSignatures, setShowSignatures] = useState(true);
  const [showWatermark, setShowWatermark] = useState(true);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Workbench Controls (Hidden during print) */}
      <div className="no-print p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Kembali ke Rekap Nilai</span>
          </button>
          <div className="h-5 w-px bg-slate-200" />
          <div>
            <h2 className="font-bold text-sm text-slate-900 leading-tight">
              Pratinjau Leger Nilai Resmi Kedinasan
            </h2>
            <p className="text-[11px] text-slate-500">
              Format Standar e-Rapor Kurikulum Merdeka SMK
            </p>
          </div>
        </div>

        {/* Paper & Layout toggles */}
        <div className="flex items-center gap-3 flex-wrap text-xs">
          <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
            <span className="material-symbols-outlined text-[16px] text-slate-500">description</span>
            <select
              value={paperSize}
              onChange={(e) => setPaperSize(e.target.value)}
              className="bg-transparent font-semibold text-slate-800 cursor-pointer focus:outline-none"
            >
              <option value="a4-l">A4 Landscape (297 x 210 mm)</option>
              <option value="f4-l">F4 / Folio Landscape (330 x 215 mm)</option>
              <option value="legal-l">US Legal Landscape</option>
            </select>
          </div>

          <label className="flex items-center gap-1.5 text-slate-700 font-medium cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showSignatures}
              onChange={(e) => setShowSignatures(e.target.checked)}
              className="accent-[#0F2942] rounded"
            />
            <span>Tanda Tangan Pejabat</span>
          </label>

          <label className="flex items-center gap-1.5 text-slate-700 font-medium cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showWatermark}
              onChange={(e) => setShowWatermark(e.target.checked)}
              className="accent-[#0F2942] rounded"
            />
            <span>Watermark Resmi</span>
          </label>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#0F2942] hover:bg-[#163a5d] text-white font-bold shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      {/* PRINT CANVAS (Realistic A4 Landscape Paper Layout) */}
      <div className="bg-white rounded-xl border border-slate-300 p-8 shadow-md relative overflow-hidden print:p-0 print:border-none print:shadow-none">
        {/* Subtle Watermark */}
        {showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
            <span className="text-[120px] font-black uppercase text-slate-900 -rotate-12">
              SMKN 1 SURABAYA
            </span>
          </div>
        )}

        {/* OFFICIAL KOP SURAT (Letterhead) */}
        <div className="border-b-4 border-double border-slate-900 pb-4 mb-5 text-center relative">
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[32px] text-slate-800">school</span>
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-widest text-slate-600">
                Pemerintah Provinsi Jawa Timur • Dinas Pendidikan
              </p>
              <h1 className="text-lg md:text-xl font-black text-slate-900 tracking-tight uppercase">
                {SCHOOL_INFO.name}
              </h1>
              <p className="text-xs font-bold text-slate-800 tracking-wide">
                {SCHOOL_INFO.department}
              </p>
              <p className="text-[11px] text-slate-600">
                Jl. SMEA No. 4, Wonokromo, Surabaya • Telp. (031) 8292038 • NPSN: 20532189
              </p>
            </div>
          </div>
        </div>

        {/* Document Title & Metadata */}
        <div className="text-center mb-4">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 underline">
            LEGER NILAI HASIL EVALUASI CAPAIAN PEMBELAJARAN
          </h2>
          <p className="text-xs text-slate-700 font-semibold mt-0.5">
            Konsentrasi Keahlian: Akuntansi Lembaga • Rombel: X AKL 1 • {SCHOOL_INFO.academicYear}
          </p>
        </div>

        <div className="flex justify-between text-xs text-slate-700 mb-3 font-medium">
          <div>
            <span>Mata Pelajaran: <strong>Dasar-Dasar Akuntansi & Keuangan</strong></span>
            <span className="mx-2">•</span>
            <span>Standar KKTP: <strong>75.0</strong></span>
          </div>
          <div>
            <span>Guru Pengampu: <strong>{SCHOOL_INFO.teacher}</strong></span>
          </div>
        </div>

        {/* Master Table */}
        <div className="overflow-x-auto border border-slate-900">
          <table className="w-full text-left text-[11px] border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-900 text-center">
                <th rowSpan={2} className="py-2 px-2 border-r border-slate-900 w-8">No</th>
                <th rowSpan={2} className="py-2 px-2 border-r border-slate-900 w-24">NISN</th>
                <th rowSpan={2} className="py-2 px-3 border-r border-slate-900 text-left min-w-[170px]">Nama Peserta Didik</th>
                <th colSpan={4} className="py-1 px-1 border-r border-slate-900">Nilai Praktik LKPD</th>
                <th colSpan={2} className="py-1 px-1 border-r border-slate-900">Asesmen Formatif</th>
                <th rowSpan={2} className="py-2 px-2 border-r border-slate-900 w-14">Sumatif</th>
                <th rowSpan={2} className="py-2 px-2 border-r border-slate-900 w-16 bg-slate-200">Nilai Akhir</th>
                <th rowSpan={2} className="py-2 px-2 border-r border-slate-900 w-10">Predikat</th>
                <th rowSpan={2} className="py-2 px-2 w-20">Keterangan</th>
              </tr>
              <tr className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-900 text-center text-[10px]">
                <th className="py-1 px-1 border-r border-slate-900 w-11">LKPD 1</th>
                <th className="py-1 px-1 border-r border-slate-900 w-11">LKPD 2</th>
                <th className="py-1 px-1 border-r border-slate-900 w-11 bg-emerald-50">LKPD 3</th>
                <th className="py-1 px-1 border-r border-slate-900 w-11">LKPD 4</th>
                <th className="py-1 px-1 border-r border-slate-900 w-12">Formatif 1</th>
                <th className="py-1 px-1 border-r border-slate-900 w-12">Formatif 2</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300 font-data-mono">
              {MASTER_GRADES.map((g, idx) => (
                <tr key={g.id} className="text-slate-900">
                  <td className="py-1.5 px-2 text-center border-r border-slate-300">{idx + 1}</td>
                  <td className="py-1.5 px-2 text-center border-r border-slate-300">{g.nisn}</td>
                  <td className="py-1.5 px-3 font-sans font-medium border-r border-slate-300 text-slate-900">{g.name}</td>
                  <td className="py-1.5 px-1 text-center border-r border-slate-300">{g.lkpd1}</td>
                  <td className="py-1.5 px-1 text-center border-r border-slate-300">{g.lkpd2}</td>
                  <td className="py-1.5 px-1 text-center border-r border-slate-300 font-bold bg-emerald-50/50">{g.lkpd3}</td>
                  <td className="py-1.5 px-1 text-center border-r border-slate-300">{g.lkpd4}</td>
                  <td className="py-1.5 px-1 text-center border-r border-slate-300">{g.formatif1}</td>
                  <td className="py-1.5 px-1 text-center border-r border-slate-300">{g.formatif2}</td>
                  <td className="py-1.5 px-2 text-center border-r border-slate-300">{g.sumatif}</td>
                  <td className="py-1.5 px-2 text-center font-extrabold border-r border-slate-300 bg-slate-100">{g.finalScore}</td>
                  <td className="py-1.5 px-2 text-center font-bold border-r border-slate-300">{g.predikat}</td>
                  <td className="py-1.5 px-2 text-center font-sans text-[10px]">
                    {g.finalScore >= 75 ? (
                      <span className="text-emerald-800 font-bold">TUNTAS</span>
                    ) : (
                      <span className="text-rose-800 font-bold">REMEDIAL</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Statistical Summary row */}
        <div className="mt-3 grid grid-cols-4 gap-2 text-xs border border-slate-300 p-2.5 rounded bg-slate-50 font-data-mono">
          <div>Rata-rata Kelas: <strong>84.2</strong></div>
          <div>Nilai Tertinggi: <strong>96.0</strong></div>
          <div>Ketuntasan Belajar: <strong>91.7%</strong></div>
          <div>Jumlah Siswa: <strong>36 Siswa</strong></div>
        </div>

        {/* SIGNATURES BLOCK */}
        {showSignatures && (
          <div className="mt-10 grid grid-cols-2 text-xs text-slate-900 print-break-inside-avoid">
            <div className="text-center space-y-16">
              <div>
                <p>Mengetahui,</p>
                <p className="font-bold">Kepala SMK Negeri 1 Surabaya</p>
              </div>
              <div>
                <p className="font-bold underline text-sm">{SCHOOL_INFO.headmaster}</p>
                <p className="text-[11px] text-slate-600 font-data-mono">NIP. {SCHOOL_INFO.headmasterNip}</p>
              </div>
            </div>

            <div className="text-center space-y-16">
              <div>
                <p>Surabaya, 15 Mei 2025</p>
                <p className="font-bold">Guru Mata Pelajaran Produktif AKL</p>
              </div>
              <div>
                <p className="font-bold underline text-sm">{SCHOOL_INFO.teacher}</p>
                <p className="text-[11px] text-slate-600 font-data-mono">NIP. {SCHOOL_INFO.teacherNip}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
