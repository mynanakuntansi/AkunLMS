import React, { useState } from 'react';
import { CHART_OF_ACCOUNTS, INITIAL_JOURNAL_TRANSACTIONS } from '../../data/mockAccountingData';
import { formatRupiah } from '../../utils/formatters';

interface LedgerPostRow {
  date: string;
  txDesc: string;
  ref: string;
  debit: number;
  credit: number;
  balanceDebit: number;
  balanceCredit: number;
}

export const GeneralLedgerView: React.FC = () => {
  const [selectedAccountFilter, setSelectedAccountFilter] = useState<string>('all');
  const [ledgerLayout, setLedgerLayout] = useState<'four-column' | 't-account'>('four-column');

  // Compute ledger postings for each account from the transactions
  const accountLedgers = CHART_OF_ACCOUNTS.map((acc) => {
    let runningDebit = 0;
    let runningCredit = 0;
    const postings: LedgerPostRow[] = [];

    INITIAL_JOURNAL_TRANSACTIONS.forEach((tx) => {
      tx.rows.forEach((row) => {
        if (row.accountCode === acc.code) {
          const debitVal = row.debit || 0;
          const creditVal = row.credit || 0;

          if (acc.normalBalance === 'debit') {
            runningDebit = runningDebit + debitVal - creditVal;
          } else {
            runningCredit = runningCredit + creditVal - debitVal;
          }

          postings.push({
            date: tx.date,
            txDesc: tx.description,
            ref: 'JU-01',
            debit: debitVal,
            credit: creditVal,
            balanceDebit: acc.normalBalance === 'debit' ? runningDebit : 0,
            balanceCredit: acc.normalBalance === 'credit' ? runningCredit : 0
          });
        }
      });
    });

    const finalBalance = acc.normalBalance === 'debit' ? runningDebit : runningCredit;

    return {
      account: acc,
      postings,
      finalBalance,
      hasActivity: postings.length > 0
    };
  });

  const filteredLedgers = selectedAccountFilter === 'all'
    ? accountLedgers.filter((l) => l.hasActivity)
    : accountLedgers.filter((l) => l.account.code === selectedAccountFilter);

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <span>Siklus Akuntansi</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#0F2942] font-semibold">Buku Besar Utama (General Ledger)</span>
          </nav>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl md:text-2xl font-bold text-[#0F2942] tracking-tight">
              Buku Besar & Pemindahbukuan (Posting)
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
              Tersinkron Jurnal Umum
            </span>
          </div>
        </div>

        {/* Filter and View Format Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Format Toggle */}
          <div className="flex items-center p-1 rounded-lg bg-slate-100 border border-slate-200 text-xs">
            <button
              onClick={() => setLedgerLayout('four-column')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                ledgerLayout === 'four-column'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Format 4 Kolom
            </button>
            <button
              onClick={() => setLedgerLayout('t-account')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                ledgerLayout === 't-account'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bentuk T (T-Account)
            </button>
          </div>

          {/* Account selector */}
          <select
            value={selectedAccountFilter}
            onChange={(e) => setSelectedAccountFilter(e.target.value)}
            className="bg-white border border-slate-200 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
          >
            <option value="all">Semua Akun Aktif (8 Akun)</option>
            {CHART_OF_ACCOUNTS.map((acc) => (
              <option key={acc.code} value={acc.code}>
                {acc.code} - {acc.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Posting Status Card */}
      <div className="p-4 rounded-xl bg-slate-900 text-white shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <span className="material-symbols-outlined text-[24px]">sync_alt</span>
          </div>
          <div>
            <h4 className="font-bold text-sm">Status Pemindahbukuan: 100% Terposting</h4>
            <p className="text-xs text-slate-300">
              6 ayat jurnal dari Bengkel Maju Jaya berhasil ditransfer ke masing-masing rekening buku besar.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-data-mono">
          <span className="px-3 py-1 rounded-lg bg-slate-800 text-emerald-400 border border-slate-700">
            Saldo Kas Akhir: Rp26.300.000 (D)
          </span>
        </div>
      </div>

      {/* LEDGERS CONTAINER */}
      <div className="space-y-6">
        {filteredLedgers.map(({ account, postings, finalBalance }) => {
          if (ledgerLayout === 't-account') {
            // T-Account layout
            const debitItems = postings.filter((p) => p.debit > 0);
            const creditItems = postings.filter((p) => p.credit > 0);
            const sumDebit = debitItems.reduce((s, i) => s + i.debit, 0);
            const sumCredit = creditItems.reduce((s, i) => s + i.credit, 0);

            return (
              <div key={account.code} className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
                <div className="flex items-center justify-between border-b-2 border-slate-900 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-data-mono font-bold text-base text-[#0F2942]">
                      Akun: {account.name}
                    </span>
                    <span className="text-xs text-slate-500">({account.category})</span>
                  </div>
                  <span className="font-data-mono font-bold text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded border border-slate-200">
                    No. Akun: {account.code}
                  </span>
                </div>

                {/* T-Table */}
                <div className="grid grid-cols-2 divide-x-2 divide-slate-900 text-xs">
                  {/* Debit Side */}
                  <div className="pr-4 space-y-2">
                    <p className="font-bold text-slate-700 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-200">
                      DEBIT (D)
                    </p>
                    <div className="space-y-1.5 min-h-[90px]">
                      {debitItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between font-data-mono">
                          <span className="text-slate-500 text-[11px]">{item.date.split('/')[0]} Okt • {item.txDesc.slice(0, 26)}...</span>
                          <span className="font-semibold text-slate-900">{formatRupiah(item.debit)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between font-data-mono font-bold">
                      <span>Total Debit</span>
                      <span>{formatRupiah(sumDebit)}</span>
                    </div>
                  </div>

                  {/* Credit Side */}
                  <div className="pl-4 space-y-2">
                    <p className="font-bold text-slate-700 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-200">
                      KREDIT (K)
                    </p>
                    <div className="space-y-1.5 min-h-[90px]">
                      {creditItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between font-data-mono">
                          <span className="text-slate-500 text-[11px]">{item.date.split('/')[0]} Okt • {item.txDesc.slice(0, 26)}...</span>
                          <span className="font-semibold text-slate-900">{formatRupiah(item.credit)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between font-data-mono font-bold">
                      <span>Total Kredit</span>
                      <span>{formatRupiah(sumCredit)}</span>
                    </div>
                  </div>
                </div>

                {/* T-Account Ending Balance Footer */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-600">Saldo Akhir Akun:</span>
                  <span className="font-data-mono font-bold text-sm text-emerald-800">
                    {formatRupiah(finalBalance)} ({account.normalBalance.toUpperCase()})
                  </span>
                </div>
              </div>
            );
          }

          // 4-Column Layout (Indonesian Standard)
          return (
            <div key={account.code} className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              {/* Account header strip */}
              <div className="p-4 bg-slate-50/90 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">
                    Nama Akun: {account.name}
                  </span>
                  <span className="text-xs text-slate-500">• {account.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">Saldo Normal: <strong className="uppercase text-emerald-700">{account.normalBalance}</strong></span>
                  <span className="font-data-mono font-bold text-xs bg-white text-slate-900 px-3 py-1 rounded border border-slate-200 shadow-2xs">
                    Kode: {account.code}
                  </span>
                </div>
              </div>

              {/* 4-Column Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                      <th rowSpan={2} className="py-2.5 px-3 w-20 border-r border-slate-200">Tanggal</th>
                      <th rowSpan={2} className="py-2.5 px-4 border-r border-slate-200">Keterangan</th>
                      <th rowSpan={2} className="py-2.5 px-3 w-16 text-center border-r border-slate-200">Ref</th>
                      <th rowSpan={2} className="py-2.5 px-4 w-32 text-right border-r border-slate-200">Debit (Rp)</th>
                      <th rowSpan={2} className="py-2.5 px-4 w-32 text-right border-r border-slate-200">Kredit (Rp)</th>
                      <th colSpan={2} className="py-1 px-4 text-center border-b border-slate-200 bg-slate-200/60">
                        Saldo Akhir (Rp)
                      </th>
                    </tr>
                    <tr className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                      <th className="py-1.5 px-4 w-32 text-right border-r border-slate-200">Debit</th>
                      <th className="py-1.5 px-4 w-32 text-right">Kredit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-data-mono">
                    {postings.map((p, pIdx) => (
                      <tr key={pIdx} className="hover:bg-slate-50">
                        <td className="py-2 px-3 text-slate-500 border-r border-slate-100">{p.date}</td>
                        <td className="py-2 px-4 font-sans text-slate-800 border-r border-slate-100">{p.txDesc}</td>
                        <td className="py-2 px-3 text-center text-slate-500 border-r border-slate-100">{p.ref}</td>
                        <td className="py-2 px-4 text-right border-r border-slate-100">
                          {p.debit > 0 ? formatRupiah(p.debit, false) : '-'}
                        </td>
                        <td className="py-2 px-4 text-right border-r border-slate-100">
                          {p.credit > 0 ? formatRupiah(p.credit, false) : '-'}
                        </td>
                        <td className="py-2 px-4 text-right font-semibold text-slate-900 border-r border-slate-100">
                          {p.balanceDebit > 0 ? formatRupiah(p.balanceDebit, false) : '-'}
                        </td>
                        <td className="py-2 px-4 text-right font-semibold text-slate-900">
                          {p.balanceCredit > 0 ? formatRupiah(p.balanceCredit, false) : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {/* Account Summary Row */}
                  <tfoot>
                    <tr className="bg-slate-50 font-bold border-t border-slate-200">
                      <td colSpan={5} className="py-2.5 px-4 text-right font-sans uppercase text-slate-600">
                        Saldo Akhir {account.name}:
                      </td>
                      <td className="py-2.5 px-4 text-right text-emerald-800 border-r border-slate-200">
                        {account.normalBalance === 'debit' ? formatRupiah(finalBalance, false) : '-'}
                      </td>
                      <td className="py-2.5 px-4 text-right text-emerald-800">
                        {account.normalBalance === 'credit' ? formatRupiah(finalBalance, false) : '-'}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
