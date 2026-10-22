import React, { useState } from 'react';
import { CBT_QUESTIONS } from '../../data/mockAccountingData';

export const CbtQuizView: React.FC = () => {
  const [questions, setQuestions] = useState(CBT_QUESTIONS);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({
    'q-09': 'opt-a',
    'q-14': 'opt-14-b',
    'q-18': 'opt-18-a'
  });
  const [showExplanation, setShowExplanation] = useState(true);
  const [examSubmitted, setExamSubmitted] = useState(false);

  const currentQ = questions[activeQuestionIndex] || questions[0];

  const handleSelectOption = (questionId: string, optionId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionId
    });
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      const chosen = selectedAnswers[q.id];
      const correct = q.options.find((o) => o.isCorrect)?.id;
      if (chosen === correct) {
        correctCount += 1;
      }
    });
    return Math.round((correctCount / questions.length) * 100);
  };

  const currentScore = calculateScore();

  return (
    <div className="space-y-6">
      {/* Top Banner / Sync Badge */}
      <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-emerald-800 uppercase tracking-wider">
            Bank Soal Terverifikasi Kurikulum Merdeka
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600">
            Fase E: Dasar-Dasar Akuntansi & Keuangan Lembaga (Kepmendikbudristek No. 262/M/2022)
          </span>
        </div>
        <div className="flex items-center gap-2 font-data-mono text-slate-500">
          <span>ID Repositori: <strong className="text-slate-800">AKL-E-2025.G</strong></span>
        </div>
      </div>

      {/* Header & Quick Action Hub */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <span>Pembelajaran</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>Evaluasi & Asesmen</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#0F2942] font-semibold">Bank Soal & Manajemen CBT</span>
          </nav>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl md:text-2xl font-bold text-[#0F2942] tracking-tight">
              Asesmen CBT: Analisis Transaksi & Siklus Akuntansi
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold">
              3 Butir Teruji • HOTS
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>Cetak Naskah</span>
          </button>
          <button
            onClick={() => setExamSubmitted(true)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#0F2942] hover:bg-[#163a5d] text-white text-xs font-bold shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">task_alt</span>
            <span>Selesaikan & Kunci CBT</span>
          </button>
        </div>
      </div>

      {/* CBT Score & Misconception Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Nilai CBT Peserta</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-data-mono font-extrabold text-3xl text-emerald-700">{currentScore}</span>
              <span className="text-slate-400 text-xs">/ 100</span>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">Memenuhi KKTP (Min 75)</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
            A
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Diagnosis Miskonsepsi</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">Terdeteksi</span>
          </div>
          <p className="font-bold text-xs text-slate-800">Pendekatan Aset vs Beban</p>
          <p className="text-[11px] text-slate-500">
            Sering tertukar antara pembayaran sewa/asuransi dimuka dengan beban tunai langsung.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Status Soal Selesai</span>
            <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold">100% Terisi</span>
          </div>
          <p className="font-bold text-xs text-slate-800">3 dari 3 Butir Terjawab</p>
          <p className="text-[11px] text-slate-500">
            Sisa waktu sesi pengerjaan: <strong className="text-slate-800 font-data-mono">35 Menit</strong>
          </p>
        </div>
      </div>

      {/* Main CBT Workbench Two-Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (8 cols): Question card & options */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Question Header */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#0F2942] text-white font-data-mono font-bold text-xs flex items-center justify-center">
                {currentQ.number}
              </span>
              <div>
                <span className="font-bold text-xs text-slate-900">{currentQ.category}</span>
                <span className="text-[11px] text-slate-500 block font-data-mono">{currentQ.code}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200 text-[11px] font-semibold">
                {currentQ.bloomLevel}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-semibold">
                {currentQ.difficulty}
              </span>
            </div>
          </div>

          {/* Question Body */}
          <div className="p-6 space-y-5">
            {currentQ.evidenceDocSnippet && (
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
                <span className="font-bold text-amber-900 flex items-center gap-1 uppercase text-[10px] tracking-wider">
                  <span className="material-symbols-outlined text-[15px]">receipt</span>
                  Kutipan Bukti Transaksi:
                </span>
                <p className="font-data-mono text-slate-800">{currentQ.evidenceDocSnippet}</p>
              </div>
            )}

            <p className="text-sm font-semibold text-slate-900 leading-relaxed">
              {currentQ.questionText}
            </p>

            {/* Multiple Choice Options */}
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((opt) => {
                const isSelected = selectedAnswers[currentQ.id] === opt.id;
                const isCorrect = opt.isCorrect;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(currentQ.id, opt.id)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-start gap-3 ${
                      isSelected
                        ? isCorrect
                          ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20'
                          : 'bg-rose-50 border-rose-300 ring-2 ring-rose-500/20'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full font-bold font-data-mono text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? isCorrect
                            ? 'bg-emerald-600 text-white'
                            : 'bg-rose-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {opt.label}
                    </span>
                    <div className="flex-1">
                      <p className={`font-medium ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                        {opt.text}
                      </p>
                      {isSelected && isCorrect && (
                        <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-1">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span>
                          Jawaban Tepat (Kunci Sesuai Standar Akuntansi)
                        </span>
                      )}
                      {isSelected && !isCorrect && (
                        <span className="text-[11px] text-rose-700 font-bold flex items-center gap-1 mt-1">
                          <span className="material-symbols-outlined text-[14px]">cancel</span>
                          Jawaban Kurang Tepat
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Misconception Diagnostic & Explanation */}
            {showExplanation && (
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                {currentQ.misconceptionAlert && (
                  <div className="flex items-start gap-2 text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                    <span className="material-symbols-outlined text-amber-600 text-[18px] shrink-0">psychology_alt</span>
                    <div>
                      <p className="font-bold text-[11px] uppercase tracking-wider">Peringatan Miskonsepsi Kognitif:</p>
                      <p className="text-[11px] leading-relaxed mt-0.5">{currentQ.misconceptionAlert}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-2 text-slate-800 pt-1">
                  <span className="material-symbols-outlined text-emerald-600 text-[18px] shrink-0">lightbulb</span>
                  <div>
                    <span className="font-bold text-[11px] uppercase tracking-wider text-slate-500">Pembahasan Pedagogis:</span>
                    <p className="text-slate-700 leading-relaxed mt-0.5">{currentQ.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation between questions */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={() => setActiveQuestionIndex(Math.max(0, activeQuestionIndex - 1))}
              disabled={activeQuestionIndex === 0}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 disabled:opacity-40 transition-colors"
            >
              ← Soal Sebelumnya
            </button>

            <span className="text-xs font-data-mono font-semibold text-slate-600">
              Butir {activeQuestionIndex + 1} dari {questions.length}
            </span>

            <button
              onClick={() => setActiveQuestionIndex(Math.min(questions.length - 1, activeQuestionIndex + 1))}
              disabled={activeQuestionIndex === questions.length - 1}
              className="px-3 py-1.5 rounded-lg bg-[#0F2942] text-white text-xs font-semibold hover:bg-[#163a5d] disabled:opacity-40 transition-colors"
            >
              Soal Selanjutnya →
            </button>
          </div>
        </div>

        {/* Right (4 cols): Number Navigator & CBT Timer */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Navigasi Nomor Soal
              </span>
              <span className="font-data-mono text-xs font-bold text-slate-800">
                Durasi: 45:00
              </span>
            </div>

            {/* Grid of numbers */}
            <div className="grid grid-cols-4 gap-2">
              {questions.map((q, idx) => {
                const isSelected = selectedAnswers[q.id] !== undefined;
                const isCurrent = activeQuestionIndex === idx;

                return (
                  <button
                    key={q.id}
                    onClick={() => setActiveQuestionIndex(idx)}
                    className={`py-2 rounded-lg font-data-mono font-bold text-xs transition-all border ${
                      isCurrent
                        ? 'border-[#0F2942] bg-[#0F2942] text-white shadow-xs'
                        : isSelected
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300" />
                <span>Terjawab & Tersimpan</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span className="w-3 h-3 rounded bg-[#0F2942]" />
                <span>Sedang Dilihat</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                <span>{showExplanation ? 'Sembunyikan Pembahasan' : 'Lihat Pembahasan & Kunci'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
