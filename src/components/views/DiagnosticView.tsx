import React, { useState } from 'react';
import { STUDENTS_DATA } from '../../data/mockAccountingData';

export const DiagnosticView: React.FC = () => {
  const [showWaSuccessToast, setShowWaSuccessToast] = useState(false);
  const [remedialStatus, setRemedialStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const remedialStudents = STUDENTS_DATA.filter((s) => s.kktpMastery < 75);

  const handleSendRemedialDrill = () => {
    setRemedialStatus('sending');
    setTimeout(() => {
      setRemedialStatus('sent');
      setShowWaSuccessToast(true);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notifikasi Sukses Pengiriman WhatsApp matching Image_18 */}
      {showWaSuccessToast && (
        <div className="relative overflow-hidden bg-white p-4 rounded-xl border border-emerald-200 shadow-md transition-all animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-600" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pl-2">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs">
                <span className="material-symbols-outlined text-[22px]">mark_chat_read</span>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-bold text-sm text-slate-900">
                    Pesan Pengingat WhatsApp & Modul Drill Terkirim Sukses!
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">done_all</span> Terkirim & Terbaca
                  </span>
                  <span className="font-data-mono text-[11px] text-slate-400">11:46 WIB</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Terkirim simultan ke <strong className="text-slate-800">Bpk. Saputra</strong> (<span className="font-data-mono">+62 821-9988-7612</span>) dan siswa <strong className="text-slate-800">Rendy Saputra</strong> (<span className="font-data-mono">+62 821-5541-0982</span>). Riwayat terarsip di log intervensi <span className="font-data-mono text-slate-700">#WA-REM-2026-X1</span>.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowWaSuccessToast(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold self-end md:self-center transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Header & Meta */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <span>Evaluasi & Asesmen</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#0F2942] font-semibold">Analisis Butir Soal & Diagnostik</span>
          </nav>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl md:text-2xl font-bold text-[#0F2942] tracking-tight">
              Analisis Pembelajaran & Monitoring Drill Adaptif
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Live Sync: Terhubung ke Sesi Siswa
            </span>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSendRemedialDrill}
            disabled={remedialStatus === 'sending'}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0F2942] hover:bg-[#163a5d] text-white text-xs font-bold shadow-xs transition-colors disabled:opacity-75"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
            <span>
              {remedialStatus === 'sending' ? 'Mengirim...' : 'Kirim Paket Drill / WA Pengingat'}
            </span>
          </button>
        </div>
      </div>

      {/* Diagnostic KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="w-full h-1 bg-emerald-500 absolute top-0 left-0" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Tingkat Ketuntasan Kelas</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-data-mono font-bold text-2xl text-slate-900">89.4%</span>
            <span className="text-emerald-700 text-xs font-bold">+4.2%</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Fase E Kurikulum Merdeka</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="w-full h-1 bg-amber-500 absolute top-0 left-0" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Siswa Sasaran Remediasi</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-data-mono font-bold text-2xl text-amber-700">3 Siswa</span>
            <span className="text-xs text-slate-400">X AKL 1</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Rendy S, Farhan M, Bima S</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="w-full h-1 bg-sky-500 absolute top-0 left-0" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Miskonsepsi Dominan</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-bold text-base text-sky-900">Pendekatan Aset</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Butir 09 CBT (62% salah)</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="w-full h-1 bg-indigo-500 absolute top-0 left-0" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Status Mesin Drill</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-bold text-base text-emerald-700">Multi-Kanal Aktif</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">LMS & WhatsApp Gateway</p>
        </div>
      </div>

      {/* Target Students Remediation Drill Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-amber-600">emergency_share</span>
            <h3 className="font-bold text-sm text-slate-900">
              Pelacakan Langsung Drill Remediasi Adaptif (3 Siswa Sasaran)
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-data-mono">KKTP Standar: 75.0</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                <th className="py-2.5 px-4">Nama Siswa & Kontak</th>
                <th className="py-2.5 px-3">Skor Awal</th>
                <th className="py-2.5 px-4">Fokus Miskonsepsi</th>
                <th className="py-2.5 px-3">Progres Drill</th>
                <th className="py-2.5 px-3 text-center">Status Remediasi</th>
                <th className="py-2.5 px-4 text-center">Aksi Multi-Kanal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {remedialStudents.map((std) => (
                <tr key={std.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{std.name}</div>
                    <div className="text-[11px] text-slate-500 font-data-mono">
                      NISN {std.nisn} • Wali: {std.parentName} ({std.parentPhone})
                    </div>
                  </td>
                  <td className="py-3 px-3 font-data-mono font-bold text-rose-700">
                    {std.kktpMastery} / 100
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    <div className="font-medium">Pendekatan Aset vs Beban (Sewa Dibayar Dimuka)</div>
                    <div className="text-[10px] text-slate-400">Butir 09 & 14 Penilaian Formatif 2</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="w-28 bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '66%' }} />
                    </div>
                    <span className="font-data-mono text-[10px] text-slate-500">2 dari 3 butir selesai</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                      {remedialStatus === 'sent' ? 'Drill Dikirim WA' : 'Perlu Intervensi'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={handleSendRemedialDrill}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-semibold text-[11px] border border-emerald-200 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[13px]">chat</span>
                      <span>Kirim WA</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
