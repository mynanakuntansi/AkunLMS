import React, { useState } from 'react';
import { STUDENTS_DATA, ATTENDANCE_TODAY } from '../../data/mockAccountingData';
import { Student } from '../../types/accounting';

export const AttendanceView: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(STUDENTS_DATA);
  const [sessionNotes, setSessionNotes] = useState(ATTENDANCE_TODAY.notes);
  const [isLocked, setIsLocked] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Recalculate attendance stats
  const hadirCount = students.filter((s) => s.attendanceStatus === 'hadir').length;
  const sakitCount = students.filter((s) => s.attendanceStatus === 'sakit').length;
  const izinCount = students.filter((s) => s.attendanceStatus === 'izin').length;
  const alpaCount = students.filter((s) => s.attendanceStatus === 'alpa').length;
  const total = students.length;

  const hadirPct = Math.round((hadirCount / total) * 100);

  const toggleStudentStatus = (studentId: string, newStatus: 'hadir' | 'sakit' | 'izin' | 'alpa') => {
    if (isLocked) return;
    setStudents(
      students.map((s) => (s.id === studentId ? { ...s, attendanceStatus: newStatus } : s))
    );
  };

  const handleSaveSession = () => {
    setIsLocked(true);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Save Toast */}
      {showSavedToast && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center justify-between text-xs shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600">lock</span>
            <div>
              <p className="font-bold">Jurnal Pembelajaran Berhasil Dikunci & Tersimpan!</p>
              <p className="text-emerald-700 text-[11px]">
                Presensi 33 Hadir, 1 Sakit, 2 Izin telah disinkronkan ke Berita Acara Pembelajaran (BAP).
              </p>
            </div>
          </div>
          <button onClick={() => setShowSavedToast(false)} className="text-emerald-700 font-bold">
            Tutup
          </button>
        </div>
      )}

      {/* Header & Session Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <span>Pembelajaran</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#0F2942] font-semibold">Presensi & Jurnal Tatap Muka</span>
          </nav>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl md:text-2xl font-bold text-[#0F2942] tracking-tight">
              Presensi & Jurnal Mengajar Tatap Muka
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Sesi Berlangsung (08.00 - 09.40 WIB)
            </span>
          </div>
        </div>

        {/* Quick action toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>Cetak BAP</span>
          </button>

          <button
            onClick={handleSaveSession}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold shadow-xs transition-colors ${
              isLocked
                ? 'bg-emerald-700 text-white'
                : 'bg-[#0F2942] hover:bg-[#163a5d] text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isLocked ? 'lock' : 'lock_open'}
            </span>
            <span>{isLocked ? 'Jurnal Terkunci' : 'Kunci & Simpan Jurnal'}</span>
          </button>
        </div>
      </div>

      {/* Session Metadata Controls Strip */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap text-xs">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Rombel:</span>
            <span className="font-semibold text-slate-900">{ATTENDANCE_TODAY.rombel}</span>
          </div>
          <div className="hidden sm:block h-6 w-px bg-slate-200" />
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Sesi Pertemuan:</span>
            <span className="font-semibold text-slate-900">
              Pertemuan Ke-{ATTENDANCE_TODAY.meetingNumber} • {ATTENDANCE_TODAY.date}
            </span>
          </div>
          <div className="hidden sm:block h-6 w-px bg-slate-200" />
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Ruang / Lab:</span>
            <span className="font-semibold text-slate-900">{ATTENDANCE_TODAY.room}</span>
          </div>
        </div>

        <span className="font-data-mono text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
          Sisa Sesi: 38 Menit
        </span>
      </div>

      {/* 4 Attendance Counter Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Hadir */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Hadir (H)
            </span>
            <span className="font-data-mono font-bold text-xs text-emerald-700">{hadirPct}%</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-data-mono font-extrabold text-3xl text-slate-900">{hadirCount}</span>
            <span className="text-xs text-slate-400">/ {total} Siswa</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${hadirPct}%` }} />
          </div>
          <p className="text-[10px] text-slate-400">Tap kartu RFID Lab selesai</p>
        </div>

        {/* Sakit */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              Sakit (S)
            </span>
            <span className="font-data-mono font-bold text-xs text-amber-700">
              {Math.round((sakitCount / total) * 100)}%
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-data-mono font-extrabold text-3xl text-amber-700">{sakitCount}</span>
            <span className="text-xs text-slate-400">Siswa</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(sakitCount / total) * 100}%` }} />
          </div>
          <p className="text-[10px] text-slate-400">1 surat dokter terlampir</p>
        </div>

        {/* Izin */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
              Izin (I)
            </span>
            <span className="font-data-mono font-bold text-xs text-sky-700">
              {Math.round((izinCount / total) * 100)}%
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-data-mono font-extrabold text-3xl text-sky-700">{izinCount}</span>
            <span className="text-xs text-slate-400">Siswa</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-sky-500 h-full rounded-full" style={{ width: `${(izinCount / total) * 100}%` }} />
          </div>
          <p className="text-[10px] text-slate-400">Dispensasi lomba LKS</p>
        </div>

        {/* Alpa */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              Alpa (A)
            </span>
            <span className="font-data-mono font-bold text-xs text-slate-400">0%</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-data-mono font-extrabold text-3xl text-slate-900">{alpaCount}</span>
            <span className="text-xs text-slate-400">Siswa</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-rose-500 h-full rounded-full" style={{ width: `0%` }} />
          </div>
          <p className="text-[10px] text-emerald-600 font-medium">Nihil tanpa keterangan</p>
        </div>
      </div>

      {/* Student Attendance List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-slate-700">group</span>
            <h3 className="font-bold text-sm text-slate-900">Daftar Presensi Peserta Didik X AKL 1</h3>
          </div>
          <span className="text-xs text-slate-500">
            Klik status (H / S / I / A) untuk mengubah kehadiran siswa
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                <th className="py-2.5 px-3 w-12 text-center">No</th>
                <th className="py-2.5 px-4">Nama Siswa</th>
                <th className="py-2.5 px-3 w-28">NISN</th>
                <th className="py-2.5 px-3 w-24">Waktu Tap</th>
                <th className="py-2.5 px-4 text-center w-52">Status Kehadiran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((std, idx) => (
                <tr key={std.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2 px-3 text-center font-data-mono text-slate-400">{idx + 1}</td>
                  <td className="py-2 px-4 font-semibold text-slate-900 flex items-center gap-2.5">
                    <img src={std.avatarUrl} alt="" className="w-7 h-7 rounded-full object-cover" />
                    <span>{std.name}</span>
                  </td>
                  <td className="py-2 px-3 font-data-mono text-slate-500">{std.nisn}</td>
                  <td className="py-2 px-3 font-data-mono text-slate-600">{std.attendanceTime || '-'}</td>
                  <td className="py-2 px-4">
                    <div className="flex items-center justify-center gap-1">
                      {(['hadir', 'sakit', 'izin', 'alpa'] as const).map((status) => {
                        const isCurrent = std.attendanceStatus === status;
                        const label = status === 'hadir' ? 'H' : status === 'sakit' ? 'S' : status === 'izin' ? 'I' : 'A';
                        const colorClass =
                          status === 'hadir'
                            ? 'bg-emerald-600 text-white'
                            : status === 'sakit'
                            ? 'bg-amber-500 text-white'
                            : status === 'izin'
                            ? 'bg-sky-500 text-white'
                            : 'bg-rose-600 text-white';

                        return (
                          <button
                            key={status}
                            disabled={isLocked}
                            onClick={() => toggleStudentStatus(std.id, status)}
                            className={`w-8 h-7 rounded-md font-bold font-data-mono text-xs transition-all ${
                              isCurrent
                                ? `${colorClass} shadow-2xs`
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            } disabled:opacity-80`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Teaching Journal & Class Reflection Box */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#0F2942]">menu_book</span>
            <span>Jurnal Mengajar & Catatan Refleksi Guru</span>
          </h3>
          <span className="text-[11px] text-slate-500">Sinkron ke Berita Acara (BAP)</span>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Agenda & Refleksi Kelas:</label>
          <textarea
            value={sessionNotes}
            onChange={(e) => setSessionNotes(e.target.value)}
            disabled={isLocked}
            rows={3}
            className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7] leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};
