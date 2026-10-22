import React, { useState } from 'react';
import { CHART_OF_ACCOUNTS } from '../../data/mockAccountingData';
import { formatRupiah } from '../../utils/formatters';

interface WorksheetItem {
  code: string;
  name: string;
  category: string;
  // 1-2: Neraca Saldo
  nsDebit: number;
  nsCredit: number;
  // 3-4: Penyesuaian (AJP)
  ajpDebit: number;
  ajpCredit: number;
}

export const WorksheetView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'trial-balance' | 'worksheet-10'>('worksheet-10');

  // Baseline data from Bengkel Maju Jaya
  const [items] = useState<WorksheetItem[]>([
    { code: '111', name: 'Kas di Tangan', category: 'Aset Lancar', nsDebit: 26300000, nsCredit: 0, ajpDebit: 0, ajpCredit: 0 },
    { code: '112', name: 'Piutang Usaha', category: 'Aset Lancar', nsDebit: 1350000, nsCredit: 0, ajpDebit: 0, ajpCredit: 0 },
    { code: '113', name: 'Perlengkapan Bengkel', category: 'Aset Lancar', nsDebit: 1500000, nsCredit: 0, ajpDebit: 0, ajpCredit: 600000 },
    { code: '114', name: 'Sewa Bengkel Dibayar di Muka', category: 'Aset Lancar', nsDebit: 6000000, nsCredit: 0, ajpDebit: 0, ajpCredit: 500000 },
    { code: '121', name: 'Peralatan Bengkel & Mesin', category: 'Aset Tetap', nsDebit: 7500000, nsCredit: 0, ajpDebit: 0, ajpCredit: 0 },
    { code: '122', name: 'Akumulasi Penyusutan Peralatan', category: 'Aset Tetap', nsDebit: 0, nsCredit: 0, ajpDebit: 0, ajpCredit: 125000 },
    { code: '211', name: 'Utang Usaha', category: 'Liabilitas', nsDebit: 0, nsCredit: 7500000, ajpDebit: 0, ajpCredit: 0 },
    { code: '212', name: 'Utang Gaji', category: 'Liabilitas', nsDebit: 0, nsCredit: 0, ajpDebit: 0, ajpCredit: 150000 },
    { code: '311', name: 'Modal Tn. Jaya', category: 'Ekuitas', nsDebit: 0, nsCredit: 30000000, ajpDebit: 0, ajpCredit: 0 },
    { code: '312', name: 'Prive Tn. Jaya', category: 'Ekuitas', nsDebit: 0, nsCredit: 0, ajpDebit: 0, ajpCredit: 0 },
    { code: '411', name: 'Pendapatan Jasa Servis', category: 'Pendapatan Usaha', nsDebit: 0, nsCredit: 5100000, ajpDebit: 0, ajpCredit: 0 },
    { code: '511', name: 'Beban Gaji Mekanik & Teknisi', category: 'Beban Operasional', nsDebit: 450000, nsCredit: 0, ajpDebit: 150000, ajpCredit: 0 },
    { code: '513', name: 'Beban Perlengkapan Bengkel', category: 'Beban Operasional', nsDebit: 0, nsCredit: 0, ajpDebit: 600000, ajpCredit: 0 },
    { code: '514', name: 'Beban Sewa Bengkel', category: 'Beban Operasional', nsDebit: 0, nsCredit: 0, ajpDebit: 500000, ajpCredit: 0 },
    { code: '515', name: 'Beban Penyusutan Peralatan', category: 'Beban Operasional', nsDebit: 0, nsCredit: 0, ajpDebit: 125000, ajpCredit: 0 }
  ]);

  // Compute computed columns for each account:
  // 5-6: NSD (Neraca Saldo Disesuaikan)
  // 7-8: Laba Rugi (Pendapatan & Beban)
  // 9-10: Neraca (Harta, Liabilitas, Ekuitas, Prive)
  const computedRows = items.map((item) => {
    const netDebit = item.nsDebit + item.ajpDebit - item.nsCredit - item.ajpCredit;
    const nsdDebit = netDebit > 0 ? netDebit : 0;
    const nsdCredit = netDebit < 0 ? Math.abs(netDebit) : 0;

    const isIncomeOrExpense = item.category === 'Pendapatan Usaha' || item.category === 'Beban Operasional';

    const lrDebit = isIncomeOrExpense ? nsdDebit : 0;
    const lrCredit = isIncomeOrExpense ? nsdCredit : 0;

    const neracaDebit = !isIncomeOrExpense ? nsdDebit : 0;
    const neracaCredit = !isIncomeOrExpense ? nsdCredit : 0;

    return {
      ...item,
      nsdDebit,
      nsdCredit,
      lrDebit,
      lrCredit,
      neracaDebit,
      neracaCredit
    };
  });

  // Calculate totals for all 10 columns
  const totNsDebit = computedRows.reduce((s, r) => s + r.nsDebit, 0);
  const totNsCredit = computedRows.reduce((s, r) => s + r.nsCredit, 0);

  const totAjpDebit = computedRows.reduce((s, r) => s + r.ajpDebit, 0);
  const totAjpCredit = computedRows.reduce((s, r) => s + r.ajpCredit, 0);

  const totNsdDebit = computedRows.reduce((s, r) => s + r.nsdDebit, 0);
  const totNsdCredit = computedRows.reduce((s, r) => s + r.nsdCredit, 0);

  const totLrDebit = computedRows.reduce((s, r) => s + r.lrDebit, 0);
  const totLrCredit = computedRows.reduce((s, r) => s + r.lrCredit, 0);
  const netProfit = totLrCredit - totLrDebit; // Laba Bersih

  const totNeracaDebit = computedRows.reduce((s, r) => s + r.neracaDebit, 0);
  const totNeracaCredit = computedRows.reduce((s, r) => s + r.neracaCredit, 0);

  return (
    <div className="space-y-6">
      {/* Title & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <span>Siklus Akuntansi</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#0F2942] font-semibold">Kertas Kerja & Neraca Lajur</span>
          </nav>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl md:text-2xl font-bold text-[#0F2942] tracking-tight">
              Neraca Lajur 10 Kolom (Worksheet)
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
              Bengkel Maju Jaya • 31 Okt 2026
            </span>
          </div>
        </div>

        {/* View switcher */}
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-slate-100 border border-slate-200 text-xs flex">
            <button
              onClick={() => setActiveTab('worksheet-10')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                activeTab === 'worksheet-10' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Kertas Kerja 10 Kolom
            </button>
            <button
              onClick={() => setActiveTab('trial-balance')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                activeTab === 'trial-balance' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Ringkasan Neraca Saldo
            </button>
          </div>
        </div>
      </div>

      {/* Net Profit Summary KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Pendapatan Jasa</span>
          <p className="font-data-mono font-bold text-xl text-emerald-700">{formatRupiah(totLrCredit)}</p>
          <p className="text-[11px] text-slate-500">Pendapatan servis motor 1 bulan</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Beban Operasional</span>
          <p className="font-data-mono font-bold text-xl text-rose-700">{formatRupiah(totLrDebit)}</p>
          <p className="text-[11px] text-slate-500">Gaji, perlengkapan, sewa, penyusutan</p>
        </div>
        <div className="p-4 rounded-xl bg-[#0F2942] text-white shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Laba Bersih Usaha (Net Profit)</span>
          <p className="font-data-mono font-bold text-2xl text-emerald-400">{formatRupiah(netProfit)}</p>
          <p className="text-[11px] text-slate-300">Laba menambah ekuitas pemilik</p>
        </div>
      </div>

      {/* 10-COLUMN WORKSHEET TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#0284C7]">receipt_long</span>
            <span className="font-bold text-sm text-slate-900">
              Kertas Kerja 10 Kolom (Sesuai Kurikulum Merdeka Fase E)
            </span>
          </div>
          <span className="font-data-mono text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Status: Seimbang (Rp{formatRupiah(totNsdDebit, false)})
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              {/* Top grouping row */}
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-center">
                <th rowSpan={2} className="py-2.5 px-3 w-16 border-r border-slate-200">Kode</th>
                <th rowSpan={2} className="py-2.5 px-4 min-w-[200px] border-r border-slate-200 text-left">Nama Akun</th>
                <th colSpan={2} className="py-1 px-2 border-r border-slate-200 bg-slate-200/50">Neraca Saldo</th>
                <th colSpan={2} className="py-1 px-2 border-r border-slate-200 bg-amber-50">Penyesuaian (AJP)</th>
                <th colSpan={2} className="py-1 px-2 border-r border-slate-200 bg-sky-50">NS Disesuaikan</th>
                <th colSpan={2} className="py-1 px-2 border-r border-slate-200 bg-rose-50">Laba / Rugi</th>
                <th colSpan={2} className="py-1 px-2 bg-emerald-50">Neraca Keuangan</th>
              </tr>
              {/* Sub-columns (Debit, Kredit) */}
              <tr className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200 text-center">
                <th className="py-1 px-2 w-24 border-r border-slate-200 text-right">Debit</th>
                <th className="py-1 px-2 w-24 border-r border-slate-200 text-right">Kredit</th>
                <th className="py-1 px-2 w-24 border-r border-slate-200 text-right bg-amber-50/70">Debit</th>
                <th className="py-1 px-2 w-24 border-r border-slate-200 text-right bg-amber-50/70">Kredit</th>
                <th className="py-1 px-2 w-24 border-r border-slate-200 text-right bg-sky-50/70">Debit</th>
                <th className="py-1 px-2 w-24 border-r border-slate-200 text-right bg-sky-50/70">Kredit</th>
                <th className="py-1 px-2 w-24 border-r border-slate-200 text-right bg-rose-50/70">Debit</th>
                <th className="py-1 px-2 w-24 border-r border-slate-200 text-right bg-rose-50/70">Kredit</th>
                <th className="py-1 px-2 w-24 border-r border-slate-200 text-right bg-emerald-50/70">Debit</th>
                <th className="py-1 px-2 w-24 text-right bg-emerald-50/70">Kredit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-data-mono">
              {computedRows.map((row) => (
                <tr key={row.code} className="hover:bg-slate-50">
                  <td className="py-1.5 px-3 font-bold text-slate-700 border-r border-slate-100">{row.code}</td>
                  <td className="py-1.5 px-4 font-sans font-medium text-slate-800 border-r border-slate-100">{row.name}</td>
                  
                  {/* Neraca Saldo */}
                  <td className="py-1.5 px-2 text-right border-r border-slate-100">{row.nsDebit > 0 ? formatRupiah(row.nsDebit, false) : '-'}</td>
                  <td className="py-1.5 px-2 text-right border-r border-slate-100">{row.nsCredit > 0 ? formatRupiah(row.nsCredit, false) : '-'}</td>
                  
                  {/* AJP */}
                  <td className="py-1.5 px-2 text-right border-r border-slate-100 bg-amber-50/30 font-semibold text-amber-900">{row.ajpDebit > 0 ? formatRupiah(row.ajpDebit, false) : '-'}</td>
                  <td className="py-1.5 px-2 text-right border-r border-slate-100 bg-amber-50/30 font-semibold text-amber-900">{row.ajpCredit > 0 ? formatRupiah(row.ajpCredit, false) : '-'}</td>
                  
                  {/* NSD */}
                  <td className="py-1.5 px-2 text-right border-r border-slate-100 bg-sky-50/30 font-semibold text-sky-950">{row.nsdDebit > 0 ? formatRupiah(row.nsdDebit, false) : '-'}</td>
                  <td className="py-1.5 px-2 text-right border-r border-slate-100 bg-sky-50/30 font-semibold text-sky-950">{row.nsdCredit > 0 ? formatRupiah(row.nsdCredit, false) : '-'}</td>
                  
                  {/* Laba Rugi */}
                  <td className="py-1.5 px-2 text-right border-r border-slate-100 bg-rose-50/30 text-rose-800">{row.lrDebit > 0 ? formatRupiah(row.lrDebit, false) : '-'}</td>
                  <td className="py-1.5 px-2 text-right border-r border-slate-100 bg-rose-50/30 text-emerald-800">{row.lrCredit > 0 ? formatRupiah(row.lrCredit, false) : '-'}</td>
                  
                  {/* Neraca */}
                  <td className="py-1.5 px-2 text-right border-r border-slate-100 bg-emerald-50/30">{row.neracaDebit > 0 ? formatRupiah(row.neracaDebit, false) : '-'}</td>
                  <td className="py-1.5 px-2 text-right bg-emerald-50/30">{row.neracaCredit > 0 ? formatRupiah(row.neracaCredit, false) : '-'}</td>
                </tr>
              ))}
            </tbody>

            {/* Subtotal Row */}
            <tfoot className="border-t-2 border-slate-400 font-data-mono font-bold bg-slate-100 text-slate-800">
              <tr>
                <td colSpan={2} className="py-2 px-3 font-sans uppercase text-right border-r border-slate-200">
                  Jumlah Subtotal :
                </td>
                <td className="py-2 px-2 text-right border-r border-slate-200">{formatRupiah(totNsDebit, false)}</td>
                <td className="py-2 px-2 text-right border-r border-slate-200">{formatRupiah(totNsCredit, false)}</td>
                <td className="py-2 px-2 text-right border-r border-slate-200 bg-amber-100/70">{formatRupiah(totAjpDebit, false)}</td>
                <td className="py-2 px-2 text-right border-r border-slate-200 bg-amber-100/70">{formatRupiah(totAjpCredit, false)}</td>
                <td className="py-2 px-2 text-right border-r border-slate-200 bg-sky-100/70">{formatRupiah(totNsdDebit, false)}</td>
                <td className="py-2 px-2 text-right border-r border-slate-200 bg-sky-100/70">{formatRupiah(totNsdCredit, false)}</td>
                <td className="py-2 px-2 text-right border-r border-slate-200 bg-rose-100/70">{formatRupiah(totLrDebit, false)}</td>
                <td className="py-2 px-2 text-right border-r border-slate-200 bg-rose-100/70">{formatRupiah(totLrCredit, false)}</td>
                <td className="py-2 px-2 text-right border-r border-slate-200 bg-emerald-100/70">{formatRupiah(totNeracaDebit, false)}</td>
                <td className="py-2 px-2 text-right bg-emerald-100/70">{formatRupiah(totNeracaCredit, false)}</td>
              </tr>

              {/* Laba Bersih Balancing Row */}
              <tr className="bg-emerald-50 font-bold text-emerald-950">
                <td colSpan={2} className="py-2 px-3 font-sans uppercase text-right text-emerald-900 border-r border-emerald-200">
                  Laba Bersih Usaha (Net Profit) :
                </td>
                <td colSpan={6} className="py-2 px-2 text-center text-xs text-slate-400 border-r border-slate-200">
                  -
                </td>
                <td className="py-2 px-2 text-right font-extrabold text-emerald-800 border-r border-slate-200">
                  {formatRupiah(netProfit, false)}
                </td>
                <td className="py-2 px-2 text-right text-slate-400 border-r border-slate-200">-</td>
                <td className="py-2 px-2 text-right text-slate-400 border-r border-slate-200">-</td>
                <td className="py-2 px-2 text-right font-extrabold text-emerald-800">
                  {formatRupiah(netProfit, false)}
                </td>
              </tr>

              {/* Grand Total Row with double underline */}
              <tr className="bg-[#0F2942] text-white font-bold">
                <td colSpan={2} className="py-2.5 px-3 font-sans uppercase text-right border-r border-slate-700">
                  TOTAL AKHIR SEIMBANG :
                </td>
                <td className="py-2.5 px-2 text-right border-r border-slate-700 text-emerald-300">{formatRupiah(totNsDebit, false)}</td>
                <td className="py-2.5 px-2 text-right border-r border-slate-700 text-emerald-300">{formatRupiah(totNsCredit, false)}</td>
                <td className="py-2.5 px-2 text-right border-r border-slate-700 text-amber-300">{formatRupiah(totAjpDebit, false)}</td>
                <td className="py-2.5 px-2 text-right border-r border-slate-700 text-amber-300">{formatRupiah(totAjpCredit, false)}</td>
                <td className="py-2.5 px-2 text-right border-r border-slate-700 text-sky-300">{formatRupiah(totNsdDebit, false)}</td>
                <td className="py-2.5 px-2 text-right border-r border-slate-700 text-sky-300">{formatRupiah(totNsdCredit, false)}</td>
                <td className="py-2.5 px-2 text-right border-r border-slate-700 text-emerald-300 border-b-4 border-double border-emerald-400">
                  {formatRupiah(totLrCredit, false)}
                </td>
                <td className="py-2.5 px-2 text-right border-r border-slate-700 text-emerald-300 border-b-4 border-double border-emerald-400">
                  {formatRupiah(totLrCredit, false)}
                </td>
                <td className="py-2.5 px-2 text-right border-r border-slate-700 text-emerald-300 border-b-4 border-double border-emerald-400">
                  {formatRupiah(totNeracaDebit, false)}
                </td>
                <td className="py-2.5 px-2 text-right text-emerald-300 border-b-4 border-double border-emerald-400">
                  {formatRupiah(totNeracaDebit, false)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
