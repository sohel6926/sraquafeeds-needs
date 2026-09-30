export const STANDARD_UNITS = ['kg', 'Litres', 'Tonnes', 'Grams', 'Units'];

export function sanitizeProductUnit(raw?: string): string {
  if (!raw) return 'kg';
  const val = raw.toLowerCase().trim();

  if (val === 'kg') return 'kg';
  if (val === 'litres' || val === 'litre' || val === 'ltr') return 'Litres';
  if (val === 'tonnes' || val === 'tonne' || val === 'ton' || val === 'tons') return 'Tonnes';
  if (val === 'grams' || val === 'gram' || val === 'gm' || val === 'g') return 'Grams';
  if (val === 'units' || val === 'unit' || val === 'pcs' || val === 'pieces') return 'Units';

  if (val.includes('litre') || val.includes('ltr')) return 'Litres';
  if (val.includes('tonne') || val.includes('ton')) return 'Tonnes';
  if (val.includes('gram') || val.includes('gm')) return 'Grams';
  if (val.includes('unit')) return 'Units';
  if (val.includes('kg') || val.includes('bag') || val.includes('pack') || val.includes('bucket')) return 'kg';

  return 'kg';
}
