import React from 'react';
import { UserRole, ViewMode } from '../../types/accounting';
import { SCHOOL_INFO, STUDENTS_DATA } from '../../data/mockAccountingData';

interface DashboardViewProps {
  currentRole: UserRole;
  onNavigate: (view: ViewMode) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentRole,
  onNavigate
}) => {
  if (currentRole === 'student') {
    // Mode Siswa: Siti Nurhaliza (matching Image_10)
    return (
      <div className="space-y-6">
        {/* Top Mini Ribbon */}
        <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-bold uppercase tracking-wider text-[#0F2942]">Portal Siswa</span>
            <span>/</span>
            <span>Dashboard Akademik</span>
            <span>/</span>
            <span className="font-semibold text-slate-800">TA 2024/2025 Genap</span>
          </div>
          <div className="flex items-center gap-3 font-data-mono text-[11px]">
            <span className="text-emerald-700 font-bold">STATUS KKTP: 100% TUNTAS SIKLUS 1</span>
            <span className="text-slate-300">|</span>
            <span>Terakhir Diperbarui: Hari ini, 09:12 WIB</span>
          </div>
        </div>

        {/* HERO BANNER: Celebratory Achievement (Matching Image_10) */}
        <div className="relative overflow-hidden rounded-2xl bg-[#0F2942] text-white p-6 md:p-8 shadow-sm">
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-emerald-300 text-xs font-semibold">
              <span className="material-symbols-outlined text-[15px]">celebration</span>
              <span>Pencapaian Remediasi Mandiri Terverifikasi</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Semangat Belajar, Siti Nurhaliza! 👏
            </h1>

            <p className="text-slate-200 text-xs md:text-sm leading-relaxed">
              Fase E Kurikulum Merdeka: <strong className="text-white font-bold">82% Capaian Tuntas</strong> • 15 dari 18 Indikator Kompetensi Akuntansi berhasil dikuasai. Selangkah lagi menuju siklus neraca lajur dan jurnal penutup.
            </p>

            {/* Achievement Callout Ribbon */}
            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md flex items-start gap-3 border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-300">
                  Remediasi CBT Bab 4 Tuntas Sempurna!
                </p>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Nilai akhir terverifikasi: <strong className="text-white font-data-mono font-bold">95/100</strong>. Anda telah memenuhi seluruh kriteria ketercapaian tujuan pembelajaran.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Shortcuts for Student */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">table_chart</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                100% Selesai
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">LKPD 3 • Jurnal Umum</h3>
              <p className="text-xs text-slate-500 mt-0.5">Bengkel Maju Jaya (Okt 2026)</p>
            </div>
            <button
              onClick={() => onNavigate('lkpd')}
              className="w-full py-2 rounded-lg bg-[#0F2942] hover:bg-[#163a5d] text-white text-xs font-semibold transition-colors"
            >
              Buka Lembar Kerja & Refleksi
            </button>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">quiz</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[10px] font-bold border border-sky-200">
                CBT Formatif
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Kuis & Ujian CBT</h3>
              <p className="text-xs text-slate-500 mt-0.5">Analisis Transaksi & Termin 2/10, n/30</p>
            </div>
            <button
              onClick={() => onNavigate('bank-soal')}
              className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              Mulai Latihan Mandiri
            </button>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">receipt_long</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                Berikutnya
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Neraca Lajur 10 Kolom</h3>
              <p className="text-xs text-slate-500 mt-0.5">Kertas Kerja & Laba Rugi</p>
            </div>
            <button
              onClick={() => onNavigate('neraca-lajur')}
              className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              Lihat Kertas Kerja
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Mode Guru: Ibu Ratna Dewi, S.Pd. (matching Image_14)
  return (
    <div className="space-y-6">
      {/* Teacher Profile & Real-Time Sync Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3PgBpQSBlWyhIcbmVzdUBxUrZkVeim-OHspFCE8egrKt0rY3V-hTAZ73Esy5H1jcRukD48ZZbQ0x9HqULTsI1pGCLqddJsWrZlOGFtpDymAvHoPqBBLPkN0qT8tEmBSNYynNLzCBHaIi5vGS9V-sCAYOhCItfavN3RG-ddr2cJrJymy-8ahjhXO10sY0IzFWqcsUAKbQ2ngoLiMUek27EepVGlA5B4qcEP4fC75N4lxFNp_BSSVMJ8g"
              alt="Ibu Ratna Dewi, S.Pd."
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover ring-4 ring-slate-100 shadow-xs"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                ROMBEL AKTIF: X AKL 1
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1 font-data-mono">
                <span className="material-symbols-outlined text-[14px] text-emerald-600">sync</span>
                Dapodik & e-Rapor: Terkini
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
              Selamat Datang Kembali, Ibu Ratna Dewi, S.Pd.
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Kelas X AKL 1 • Dasar-Dasar Akuntansi & Keuangan Lembaga • Semester Genap TA 2024/2025
            </p>
          </div>
        </div>

        {/* Quick Teacher Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onNavigate('cetak-leger')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-emerald-700">download</span>
            <span>Leger PDF</span>
          </button>
          <button
            onClick={() => onNavigate('presensi')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-[#0284C7]">edit_note</span>
            <span>Jurnal Mengajar</span>
          </button>
          <button
            onClick={() => onNavigate('lkpd')}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#0F2942] hover:bg-[#163a5d] text-white text-xs font-bold shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            <span>Koreksi LKPD 3</span>
          </button>
        </div>
      </div>

      {/* 4 Statistical Cards (matching Image_14) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="w-full h-1 bg-emerald-500 absolute top-0 left-0" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Rata-Rata Capaian</span>
            <span className="p-1 rounded-lg bg-emerald-50 text-emerald-700">
              <span className="material-symbols-outlined text-[18px]">analytics</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-data-mono font-extrabold text-3xl text-slate-900">84.2</span>
            <span className="text-emerald-700 text-xs font-semibold">+2.1%</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">KKTP: 75.0 (33 Siswa Tuntas)</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="w-full h-1 bg-sky-500 absolute top-0 left-0" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Kehadiran Hari Ini</span>
            <span className="p-1 rounded-lg bg-sky-50 text-sky-700">
              <span className="material-symbols-outlined text-[18px]">co_present</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-data-mono font-extrabold text-3xl text-slate-900">91.7%</span>
            <span className="text-slate-400 text-xs font-data-mono">33/36 Siswa</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">1 Sakit, 2 Izin, 0 Alpa</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="w-full h-1 bg-amber-500 absolute top-0 left-0" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">LKPD Perlu Dikoreksi</span>
            <span className="p-1 rounded-lg bg-amber-50 text-amber-700">
              <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-data-mono font-extrabold text-3xl text-amber-700">2</span>
            <span className="text-xs text-slate-500">Tugas Baru</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Dimas P. & Zahra M.</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="w-full h-1 bg-indigo-500 absolute top-0 left-0" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Progres Drill Remediasi</span>
            <span className="p-1 rounded-lg bg-indigo-50 text-indigo-700">
              <span className="material-symbols-outlined text-[18px]">psychology</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-data-mono font-extrabold text-3xl text-indigo-900">3 Siswa</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Paket WA & LMS terkirim</p>
        </div>
      </div>

      {/* Quick Access to Main Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => onNavigate('lkpd')}
          className="p-5 rounded-xl bg-white border border-slate-200 hover:border-[#0284C7] shadow-xs text-left transition-all group"
        >
          <span className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px]">table_chart</span>
          </span>
          <h4 className="font-bold text-sm text-slate-900">LKPD 3 • Jurnal Umum</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Periksa ayat jurnal dua kolom, auto-audit keseimbangan debit/kredit, dan penilaian rubrik.
          </p>
        </button>

        <button
          onClick={() => onNavigate('buku-besar')}
          className="p-5 rounded-xl bg-white border border-slate-200 hover:border-[#0284C7] shadow-xs text-left transition-all group"
        >
          <span className="w-9 h-9 rounded-lg bg-sky-100 text-[#0284C7] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px]">account_tree</span>
          </span>
          <h4 className="font-bold text-sm text-slate-900">Buku Besar (Ledger)</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Format 4 kolom running balance dan bentuk T-Account otomatis dari jurnal transaksi.
          </p>
        </button>

        <button
          onClick={() => onNavigate('neraca-lajur')}
          className="p-5 rounded-xl bg-white border border-slate-200 hover:border-[#0284C7] shadow-xs text-left transition-all group"
        >
          <span className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px]">receipt_long</span>
          </span>
          <h4 className="font-bold text-sm text-slate-900">Neraca Lajur 10 Kolom</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Kertas kerja penyesuaian, neraca saldo disesuaikan, laba rugi, dan posisi keuangan.
          </p>
        </button>

        <button
          onClick={() => onNavigate('rekap-nilai')}
          className="p-5 rounded-xl bg-white border border-slate-200 hover:border-[#0284C7] shadow-xs text-left transition-all group"
        >
          <span className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px]">calculate</span>
          </span>
          <h4 className="font-bold text-sm text-slate-900">Rekap Nilai (Gradebook)</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Matriks nilai 36 siswa, ketuntasan KKTP, cetak leger resmi kedinasan.
          </p>
        </button>
      </div>
    </div>
  );
};
