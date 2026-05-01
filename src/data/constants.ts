import type { Vertical, Tier } from '../types';

export const FIRST_NAMES = [
  'Marcus', 'Priya', 'Jordan', 'Elena', 'Tariq', 'Sasha', 'Wei', 'Diana',
  'Kenji', 'Aisha', 'Liam', 'Noor', 'Mateo', 'Imani', 'Daniel', 'Ravi',
  'Sofia', 'Owen', 'Yara', 'Hugo',
];

export const LAST_INITIALS = ['R.', 'K.', 'M.', 'T.', 'B.', 'L.', 'S.', 'P.', 'A.', 'D.'];

export const CITIES: [string, string][] = [
  ['Austin', 'TX'], ['Phoenix', 'AZ'], ['San Diego', 'CA'], ['Denver', 'CO'],
  ['Tampa', 'FL'], ['Charlotte', 'NC'], ['Nashville', 'TN'], ['Sacramento', 'CA'],
  ['Las Vegas', 'NV'], ['Raleigh', 'NC'], ['Albuquerque', 'NM'], ['Boise', 'ID'],
  ['Tucson', 'AZ'], ['Mesa', 'AZ'], ['Fresno', 'CA'], ['Orlando', 'FL'],
];

export const SOURCES = ['Organic search', 'Meta ad', 'Google ad', 'Referral', 'Comparison site', 'Webinar'];

export const INTENT_TAGS: Record<Vertical, string[]> = {
  solar: ['Bill > $300/mo', 'Owns home', 'Roof < 10yr', 'Quote requested', 'Spoke to rep'],
  roofing: ['Storm damage', 'Insurance claim filed', 'Inspection booked', 'Replacing < 90d'],
  insurance: ['Term life quote', 'Health enrollment', 'Auto bundle', 'Renewal in 30d'],
  b2b: ['50-200 employees', 'Demo requested', 'Decision maker', 'Budget $25k+', 'Q3 timeline'],
};

export const PRICE_RANGES: Record<Vertical, Record<Tier, [number, number]>> = {
  solar:     { platinum: [78, 145],  gold: [38, 72],  silver: [15, 32] },
  roofing:   { platinum: [95, 180],  gold: [42, 85],  silver: [20, 40] },
  insurance: { platinum: [55, 120],  gold: [28, 55],  silver: [12, 28] },
  b2b:       { platinum: [180, 380], gold: [85, 175], silver: [35, 80] },
};

export const VERTICALS: Vertical[] = ['solar', 'roofing', 'insurance', 'b2b'];

export const VERTICAL_LABELS: Record<Vertical, string> = {
  solar: 'Solar',
  roofing: 'Roofing',
  insurance: 'Insurance',
  b2b: 'B2B SaaS',
};

export const VERTICAL_ICONS: Record<Vertical, string> = {
  solar: 'sun',
  roofing: 'home',
  insurance: 'shield',
  b2b: 'building',
};

export const TIER_ORDER: Tier[] = ['platinum', 'gold', 'silver'];

export const INITIAL_STATS = {
  spendToday: 1284,
  spendDelta: 18,
  leadsAcquired: 23,
  leadsLastHour: 5,
  avgCpl: 55.80,
  cplDelta: -3.4,
  conversionRate: 14.2,
  conversionDelta: 1.2,
};

export const MOCK_ACTIVE_BIDS = [
  { name: 'Elena T.', initials: 'ET', vertical: 'solar' as Vertical, city: 'Phoenix', state: 'AZ', tier: 'platinum' as Tier, yourBid: 142, topBid: 142, status: 'leading' as const },
  { name: 'Tariq B.', initials: 'TB', vertical: 'roofing' as Vertical, city: 'Austin', state: 'TX', tier: 'gold' as Tier, yourBid: 65, topBid: 72, status: 'outbid' as const },
];

export const MOCK_WON_LEADS = [
  { name: 'Wei S.', vertical: 'solar' as Vertical, price: 128, wonAt: '2h ago' },
  { name: 'Priya K.', vertical: 'insurance' as Vertical, price: 48, wonAt: '4h ago' },
  { name: 'Liam R.', vertical: 'b2b' as Vertical, price: 245, wonAt: 'yesterday' },
];
