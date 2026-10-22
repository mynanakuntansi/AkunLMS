import React from 'react';
import { ViewMode, UserRole } from '../types/accounting';

interface SidebarProps {
  activeView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  currentRole: UserRole;
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  id: ViewMode;
  label: string;
  icon: string;
  badge?: string;
  badgeColor?: string;
  teacherOnly?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onNavigate,
  currentRole,
  isOpen,
  onClose
}) => {
  const primaryNav: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'space_dashboard' },
    { id: 'lkpd', label: 'LKPD Interaktif', icon: 'table_chart', badge: 'Jurnal', badgeColor: 'bg-emerald-100 text-emerald-800' },
    { id: 'buku-besar', label: 'Buku Besar (Ledger)', icon: 'account_tree' },
    { id: 'neraca-lajur', label: 'Neraca Saldo & Lajur', icon: 'receipt_long' },
  ];

  const evaluationNav: NavItem[] = [
    { id: 'bank-soal', label: 'Kuis & CBT Akuntansi', icon: 'quiz', badge: 'CBT', badgeColor: 'bg-sky-100 text-sky-800' },
    { id: 'rekap-nilai', label: 'Rekap Nilai (Gradebook)', icon: 'calculate' },
    { id: 'cetak-leger', label: 'Pratinjau Leger Nilai', icon: 'print', badge: 'Resmi', badgeColor: 'bg-slate-100 text-slate-700' },
    { id: 'presensi', label: 'Presensi & Jurnal Sesi', icon: 'co_present' },
    { id: 'analisis-diagnostik', label: 'Diagnostik & Remediasi', icon: 'insights', badge: 'Adaptif', badgeColor: 'bg-amber-100 text-amber-800' },
  ];

  const handleItemClick = (id: ViewMode) => {
    onNavigate(id);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-16 bottom-0 w-72 bg-white border-r border-slate-200 z-50 lg:z-30 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {/* Active Academic Term Badge */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-slate-700">TA 2024/2025 Genap</span>
            </div>
            <span className="font-data-mono text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
              Fase E
            </span>
          </div>

          {/* Navigation Section 1: Pembelajaran & Siklus Akuntansi */}
          <div>
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Siklus Akuntansi
            </p>
            <nav className="space-y-1">
              {primaryNav.map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#0F2942] text-white shadow-xs font-semibold'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`material-symbols-outlined text-[19px] ${isActive ? 'text-white' : 'text-slate-500'}`}>
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-slate-200 text-slate-700'} ${isActive ? '!bg-white/20 !text-white' : ''}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Navigation Section 2: Evaluasi & Administrasi Guru */}
          <div>
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Evaluasi & Asesmen
            </p>
            <nav className="space-y-1">
              {evaluationNav.map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#0F2942] text-white shadow-xs font-semibold'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`material-symbols-outlined text-[19px] ${isActive ? 'text-white' : 'text-slate-500'}`}>
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-slate-200 text-slate-700'} ${isActive ? '!bg-white/20 !text-white' : ''}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer: System Status */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/70">
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-medium">Status e-Rapor & Dapodik</span>
              <span className="font-data-mono text-xs font-bold text-emerald-700 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Terhubung Sinkron
              </span>
            </div>
            <span className="text-[11px] font-data-mono text-slate-400">v2.4.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};
