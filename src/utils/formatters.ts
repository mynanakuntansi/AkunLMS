export function formatRupiah(value: number, showSymbol = true): string {
  const formatted = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
  
  return showSymbol ? `Rp${formatted}` : formatted;
}

export function formatRupiahWithCents(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2
  }).format(value);
}

export function parseRupiahInput(input: string): number {
  const clean = input.replace(/[^0-9]/g, '');
  return parseInt(clean, 10) || 0;
}
