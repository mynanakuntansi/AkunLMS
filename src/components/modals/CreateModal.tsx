import React, { useState } from 'react';
import { CHART_OF_ACCOUNTS } from '../../data/mockAccountingData';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatedSuccess: (message: string) => void;
}

export const CreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  onClose,
  onCreatedSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'transaksi' | 'soal' | 'lkpd'>('transaksi');

  // Form states for transaction
  const [txDate, setTxDate] = useState('28/10/2026');
  const [txEvidence, setTxEvidence] = useState('BKM #003');
  const [txDesc, setTxDesc] = useState('');
  const [debitAccount, setDebitAccount] = useState('111');
  const [creditAccount, setCreditAccount] = useState('411');
  const [txAmount, setTxAmount] = useState('1500000');

  if (!isOpen) return null;

  const handleSubmitTx = (e: React.FormEvent) => {
    e.preventDefault();
    onCreatedSuccess(`Transaksi ${txEvidence} (${txDesc || 'Transaksi Baru'}) berhasil dibuat & dicatat ke sistem.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#0F2942] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-400">add_task</span>
            <h3 className="font-bold text-sm">Buat Entri Baru • AKUN LMS</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs">
          <button
            onClick={() => setActiveTab('transaksi')}
            className={`flex-1 py-2.5 font-semibold text-center transition-colors border-b-2 ${
              activeTab === 'transaksi'
                ? 'border-[#0F2942] text-[#0F2942] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Transaksi Jurnal
          </button>
          <button
            onClick={() => setActiveTab('soal')}
            className={`flex-1 py-2.5 font-semibold text-center transition-colors border-b-2 ${
              activeTab === 'soal'
                ? 'border-[#0F2942] text-[#0F2942] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Butir Soal CBT
          </button>
          <button
            onClick={() => setActiveTab('lkpd')}
            className={`flex-1 py-2.5 font-semibold text-center transition-colors border-b-2 ${
              activeTab === 'lkpd'
                ? 'border-[#0F2942] text-[#0F2942] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Paket LKPD Baru
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 overflow-y-auto">
          {activeTab === 'transaksi' && (
            <form onSubmit={handleSubmitTx} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tanggal Transaksi:</label>
                  <input
                    type="text"
                    value={txDate}
                    onChange={(e) => setTxDate(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nomor Bukti (Voucher):</label>
                  <input
                    type="text"
                    value={txEvidence}
                    onChange={(e) => setTxEvidence(e.target.value)}
                    placeholder="BKM #003, FK #104, dll"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7] font-data-mono font-semibold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Uraian Transaksi:</label>
                <input
                  type="text"
                  value={txDesc}
                  onChange={(e) => setTxDesc(e.target.value)}
                  placeholder="Misal: Penerimaan pendapatan jasa servis tuning mesin..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-emerald-800 block mb-1">Akun Sisi DEBIT:</label>
                  <select
                    value={debitAccount}
                    onChange={(e) => setDebitAccount(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7] font-medium"
                  >
                    {CHART_OF_ACCOUNTS.map((acc) => (
                      <option key={acc.code} value={acc.code}>
                        {acc.code} - {acc.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">Akun Sisi KREDIT:</label>
                  <select
                    value={creditAccount}
                    onChange={(e) => setCreditAccount(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7] font-medium"
                  >
                    {CHART_OF_ACCOUNTS.map((acc) => (
                      <option key={acc.code} value={acc.code}>
                        {acc.code} - {acc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nominal (Rupiah):</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">Rp</span>
                  <input
                    type="number"
                    value={txAmount}
                    onChange={(e) => setTxAmount(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7] font-data-mono font-bold text-slate-900"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#0F2942] hover:bg-[#163a5d] text-white font-bold"
                >
                  Simpan Transaksi
                </button>
              </div>
            </form>
          )}

          {activeTab === 'soal' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Pertanyaan Soal HOTS:</label>
                <textarea
                  rows={3}
                  placeholder="Ketik rumusan soal asesmen..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Taksonomi Bloom:</label>
                  <select className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium">
                    <option>C3 Menerapkan</option>
                    <option>C4 Menganalisis</option>
                    <option>C5 Mengevaluasi</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tingkat Kesukaran:</label>
                  <select className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium">
                    <option>Sedang</option>
                    <option>HOTS (Tinggi)</option>
                    <option>Mudah</option>
                  </select>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onCreatedSuccess('Butir Soal CBT Baru berhasil ditambahkan ke Bank Soal Fase E.');
                  onClose();
                }}
                className="w-full py-2.5 rounded-lg bg-[#0F2942] text-white font-bold"
              >
                Simpan ke Bank Soal
              </button>
            </div>
          )}

          {activeTab === 'lkpd' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Judul LKPD:</label>
                <input
                  type="text"
                  placeholder="Misal: LKPD 4 - Jurnal Penyesuaian Salon Cantik"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Profil Kasus Perusahaan:</label>
                <input
                  type="text"
                  placeholder="Nama UMKM / Perusahaan Jasa..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  onCreatedSuccess('Paket LKPD Baru berhasil diterbitkan untuk Rombel X AKL 1.');
                  onClose();
                }}
                className="w-full py-2.5 rounded-lg bg-[#0F2942] text-white font-bold"
              >
                Terbitkan LKPD untuk Siswa
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
