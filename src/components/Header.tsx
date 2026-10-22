import React, { useState } from 'react';
import { UserRole } from '../types/accounting';

interface HeaderProps {
  currentRole: UserRole;
  onRoleToggle: () => void;
  selectedClass: string;
  onClassChange: (newClass: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCreateModal: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleToggle,
  selectedClass,
  onClassChange,
  searchQuery,
  onSearchChange,
  onOpenCreateModal,
  isSidebarOpen,
  onToggleSidebar
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(4);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 z-40 px-4 md:px-6 flex items-center justify-between gap-3 shadow-xs">
      {/* Left zone: Brand & Class Selector */}
      <div className="flex items-center gap-3 md:gap-5 min-w-0">
        <button
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? "Tutup Menu Samping" : "Buka Menu Samping"}
          className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#0F2942] flex items-center justify-center text-white shadow-xs shrink-0">
            <span className="material-symbols-outlined text-[20px]">account_balance</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base text-[#0F2942] tracking-tight leading-none">AKUN LMS</span>
            <span className="text-[11px] font-semibold text-[#059669] uppercase tracking-wider leading-tight">SMK Akuntansi</span>
          </div>
        </div>

        <div className="hidden sm:block h-6 w-px bg-slate-200" />

        {/* Class Selector Dropdown */}
        <div className="relative hidden sm:block min-w-[210px]">
          <label htmlFor="class-select" className="sr-only">Pilih Kelas</label>
          <select
            id="class-select"
            value={selectedClass}
            onChange={(e) => onClassChange(e.target.value)}
            className="w-full appearance-none bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-semibold pl-8 pr-8 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0284C7] cursor-pointer transition-colors"
          >
            <option value="x-akl-1">X AKL 1 • Dasar Akuntansi</option>
            <option value="x-akl-2">X AKL 2 • Dasar Akuntansi</option>
            <option value="xi-akl-1">XI AKL 1 • Praktikum Lembaga</option>
            <option value="xi-akl-2">XI AKL 2 • Akuntansi Keuangan</option>
            <option value="xii-akl-1">XII AKL 1 • Perpajakan & Spreadsheet</option>
          </select>
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[16px] text-slate-500 pointer-events-none">school</span>
          <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[16px] text-slate-500 pointer-events-none">expand_more</span>
        </div>
      </div>

      {/* Center: Search input */}
      <div className="flex-1 max-w-md hidden md:block mx-2">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] pointer-events-none">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari materi, LKPD, jurnal, kode akun, siswa..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-slate-800 placeholder:text-slate-400 text-xs rounded-lg border border-transparent focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              title="Hapus pencarian"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Right zone: Actions, Role toggle, Notifications, User profile */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* + Buat button */}
        <button
          onClick={onOpenCreateModal}
          className="inline-flex items-center gap-1.5 bg-[#0F2942] hover:bg-[#163a5d] text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">add_circle</span>
          <span className="hidden sm:inline">+ Buat</span>
        </button>

        {/* Role Toggle Switcher */}
        <button
          onClick={onRoleToggle}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
            currentRole === 'teacher'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              : 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100'
          }`}
          title="Klik untuk beralih antara Mode Guru dan Mode Siswa"
          type="button"
        >
          <span className="material-symbols-outlined text-[15px]">
            {currentRole === 'teacher' ? 'verified_user' : 'person'}
          </span>
          <span>{currentRole === 'teacher' ? 'Mode Guru' : 'Mode Siswa'}</span>
          <span className="text-[10px] opacity-75 hidden sm:inline">
            • Switch {currentRole === 'teacher' ? 'Siswa' : 'Guru'}
          </span>
        </button>

        {/* Notification Bell with Badge */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Buka notifikasi sistem"
            className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Notifications Flyout */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white border border-slate-200 shadow-xl z-50 p-3 text-slate-800 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Notifikasi Sistem</span>
                <button
                  onClick={() => { setNotificationCount(0); setShowNotifications(false); }}
                  className="text-[11px] text-[#0284C7] hover:underline"
                >
                  Tandai Dibaca
                </button>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-1">
                <div className="py-2 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[16px]">cloud_sync</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800">Sinkronisasi e-Rapor & Dapodik</p>
                    <p className="text-[11px] text-slate-500">Nilai LKPD 3 Kelas X AKL 1 berhasil diverifikasi ke server sekolah.</p>
                    <span className="text-[10px] text-slate-400">10 menit yang lalu</span>
                  </div>
                </div>
                <div className="py-2 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[16px]">assignment_turned_in</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800">Tugas Masuk Baru</p>
                    <p className="text-[11px] text-slate-500">Siti Nurhaliza mengumpulkan LKPD 3 Jurnal Umum (100% Seimbang).</p>
                    <span className="text-[10px] text-slate-400">25 menit yang lalu</span>
                  </div>
                </div>
                <div className="py-2 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[16px]">mark_chat_read</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800">Notifikasi WA Terkirim</p>
                    <p className="text-[11px] text-slate-500">Paket Drill Remediasi #WA-REM-2026-X1 terkirim ke wali murid Rendy S.</p>
                    <span className="text-[10px] text-slate-400">1 jam yang lalu</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Tag */}
        <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
          <div className="text-right hidden xl:block">
            <p className="text-xs font-semibold text-slate-800 leading-tight">
              {currentRole === 'teacher' ? 'Ibu Ratna Dewi, S.Pd.' : 'Siti Nurhaliza'}
            </p>
            <p className="text-[11px] text-slate-500 leading-none">
              {currentRole === 'teacher' ? 'Guru Produktif AKL' : 'Siswa • NISN 00782194'}
            </p>
          </div>
          <div className="relative">
            <img
              src={
                currentRole === 'teacher'
                  ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCVPZlEtM1cWxM21ZbXYnnpq0mCIuCssl65ZhgPWfYL7i_gdK4TLvCPWUes4LjNeM065ytWbR2NbJ-XlnQzKPaDx-j5NcBcC-Q50h_tF1W-w7gGXbY2N5uaFSl6-az_vIu9LRE8NUJvoAZ1wbfmijGlimFvmPNO864hs4aEnAis697OTcwNTMr77qGphHxeNgblpOsDXtdzSF7WYSE08-jdc-keuePPXHNZF7ud_2A1DyHpzG7Mc-dqA'
                  : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
              }
              alt="Profil Pengguna"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>
        </div>
      </div>
    </header>
  );
};
