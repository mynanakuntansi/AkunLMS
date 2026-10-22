import React from 'react';
import { SourceDocument } from '../../types/accounting';
import { formatRupiah } from '../../utils/formatters';

interface SourceDocumentModalProps {
  document: SourceDocument | null;
  onClose: () => void;
}

export const SourceDocumentModal: React.FC<SourceDocumentModalProps> = ({
  document,
  onClose
}) => {
  if (!document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[22px] text-amber-400">description</span>
            <div>
              <h3 className="font-bold text-sm tracking-wide uppercase">Dokumen Sumber Akuntansi</h3>
              <p className="text-[11px] text-slate-300 font-data-mono">Nomor Berkas: {document.documentNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Tutup Pratinjau Dokumen"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body: Realistic Indonesian Financial Voucher */}
        <div className="p-6 md:p-8 overflow-y-auto bg-amber-50/20 space-y-6">
          {/* Document Header Letterhead */}
          <div className="border-b-2 border-slate-800 pb-4 text-center relative">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">BENGKEL MAJU JAYA</h2>
            <p className="text-xs text-slate-600">Jl. Raya Darmo No. 45, Kota Surabaya • Telp. (031) 5678901</p>
            <p className="text-[11px] text-slate-500 font-medium">Spesialis Servis Mesin, Tune-Up, Kelistrikan & Suku Cadang Resmi</p>
            
            <div className="mt-3 inline-block border-2 border-slate-800 px-4 py-1 rounded bg-white shadow-2xs">
              <span className="font-bold text-sm text-slate-900 tracking-wider">
                {document.title}
              </span>
            </div>
          </div>

          {/* Document Metadata Row */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <span className="text-slate-500 w-24">Nomor Bukti:</span>
                <span className="font-data-mono font-bold text-slate-900">{document.documentNumber}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-slate-500 w-24">Tanggal:</span>
                <span className="font-semibold text-slate-800">{document.date}</span>
              </div>
              {document.paymentTerms && (
                <div className="flex items-center gap-1">
                  <span className="text-slate-500 w-24">Syarat Termin:</span>
                  <span className="font-data-mono font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    {document.paymentTerms}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-1 text-right">
              <p className="text-slate-500 text-[11px]">
                {document.type === 'BKM' ? 'Diterima Dari:' : document.type === 'BKK' ? 'Dibayarkan Kepada:' : 'Kepada Yth:'}
              </p>
              <p className="font-bold text-slate-900 text-sm">{document.partyName}</p>
            </div>
          </div>

          {/* Description Box */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Uraian / Keterangan Transaksi:</span>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              {document.description}
            </p>
          </div>

          {/* If Invoice items exist */}
          {document.items && document.items.length > 0 && (
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 font-semibold text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">Nama Barang / Jasa</th>
                    <th className="py-2 px-3 text-center">Banyaknya</th>
                    <th className="py-2 px-3 text-right">Harga Satuan</th>
                    <th className="py-2 px-3 text-right">Jumlah</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-data-mono">
                  {document.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-sans font-medium text-slate-800">{item.description}</td>
                      <td className="py-2 px-3 text-center">{item.quantity}</td>
                      <td className="py-2 px-3 text-right">{formatRupiah(item.unitPrice)}</td>
                      <td className="py-2 px-3 text-right font-bold text-slate-900">{formatRupiah(item.subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Total Amount Ribbon */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 text-white shadow-xs">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-300">Total Nominal Transaksi:</span>
            <span className="font-data-mono font-bold text-xl text-emerald-400 tracking-tight">
              {formatRupiah(document.amount)}
            </span>
          </div>

          {/* Signature Verification Block */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 text-center text-[11px] text-slate-600">
            <div className="space-y-12">
              <p className="font-semibold text-slate-700">Dibukukan Oleh,</p>
              <p className="border-t border-slate-300 pt-1 font-medium">( Siti Nurhaliza )</p>
            </div>
            <div className="space-y-12">
              <p className="font-semibold text-slate-700">Disetujui,</p>
              <p className="border-t border-slate-300 pt-1 font-medium">( Tn. Jaya - Pimpinan )</p>
            </div>
            <div className="space-y-12">
              <p className="font-semibold text-slate-700">Penerima / Kasir,</p>
              <p className="border-t border-slate-300 pt-1 font-medium">( {document.receivedBy} )</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
            <span className="material-symbols-outlined text-[15px] text-emerald-600">verified</span>
            Dokumen terverifikasi standar SMK Kurikulum Merdeka
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Kembali ke Jurnal
          </button>
        </div>
      </div>
    </div>
  );
};
