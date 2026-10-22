import React, { useState } from 'react';
import { ViewMode, UserRole, SourceDocument } from './types/accounting';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/views/DashboardView';
import { LkpdJournalView } from './components/views/LkpdJournalView';
import { GeneralLedgerView } from './components/views/GeneralLedgerView';
import { WorksheetView } from './components/views/WorksheetView';
import { CbtQuizView } from './components/views/CbtQuizView';
import { GradebookView } from './components/views/GradebookView';
import { PrintLegerView } from './components/views/PrintLegerView';
import { AttendanceView } from './components/views/AttendanceView';
import { DiagnosticView } from './components/views/DiagnosticView';
import { SourceDocumentModal } from './components/modals/SourceDocumentModal';
import { CreateModal } from './components/modals/CreateModal';

export default function App() {
  const [activeView, setActiveView] = useState<ViewMode>('dashboard');
  const [currentRole, setCurrentRole] = useState<UserRole>('teacher');
  const [selectedClass, setSelectedClass] = useState('x-akl-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<SourceDocument | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [globalToast, setGlobalToast] = useState<string | null>(null);

  const handleRoleToggle = () => {
    const newRole = currentRole === 'teacher' ? 'student' : 'teacher';
    setCurrentRole(newRole);
    setGlobalToast(
      newRole === 'teacher'
        ? 'Beralih ke Mode Guru (Ibu Ratna Dewi, S.Pd.)'
        : 'Beralih ke Mode Siswa (Siti Nurhaliza - NISN 00782194)'
    );
    setTimeout(() => setGlobalToast(null), 3000);
  };

  const showToast = (message: string) => {
    setGlobalToast(message);
    setTimeout(() => setGlobalToast(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Top Header */}
      <Header
        currentRole={currentRole}
        onRoleToggle={handleRoleToggle}
        selectedClass={selectedClass}
        onClassChange={setSelectedClass}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Container */}
      <div className="flex-1 flex pt-16">
        {/* Sidebar */}
        <Sidebar
          activeView={activeView}
          onNavigate={setActiveView}
          currentRole={currentRole}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Content Area */}
        <main className="flex-1 lg:pl-72 p-4 md:p-6 lg:p-8 min-w-0">
          {/* Global Toast Banner */}
          {globalToast && (
            <div className="mb-4 p-3 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400 text-[18px]">info</span>
                <span>{globalToast}</span>
              </div>
              <button onClick={() => setGlobalToast(null)} className="text-slate-400 hover:text-white">
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          )}

          {/* Active View Router */}
          {activeView === 'dashboard' && (
            <DashboardView
              currentRole={currentRole}
              onNavigate={setActiveView}
            />
          )}

          {activeView === 'lkpd' && (
            <LkpdJournalView
              currentRole={currentRole}
              onOpenDocument={setSelectedDoc}
              onNavigateToLedger={() => setActiveView('buku-besar')}
            />
          )}

          {activeView === 'buku-besar' && (
            <GeneralLedgerView />
          )}

          {activeView === 'neraca-lajur' && (
            <WorksheetView />
          )}

          {activeView === 'bank-soal' && (
            <CbtQuizView />
          )}

          {activeView === 'rekap-nilai' && (
            <GradebookView
              onNavigateToPrintLeger={() => setActiveView('cetak-leger')}
              onNavigateToDiagnostic={() => setActiveView('analisis-diagnostik')}
            />
          )}

          {activeView === 'cetak-leger' && (
            <PrintLegerView onBack={() => setActiveView('rekap-nilai')} />
          )}

          {activeView === 'presensi' && (
            <AttendanceView />
          )}

          {activeView === 'analisis-diagnostik' && (
            <DiagnosticView />
          )}
        </main>
      </div>

      {/* Source Document Modal */}
      <SourceDocumentModal
        document={selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />

      {/* "+ Buat" Create Modal */}
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreatedSuccess={showToast}
      />
    </div>
  );
}
