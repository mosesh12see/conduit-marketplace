import type { Listing, Vertical, Tier } from '../types';
import { FIRST_NAMES, LAST_INITIALS, CITIES, SOURCES, INTENT_TAGS, PRICE_RANGES, VERTICALS } from './constants';

let counter = 0;

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickTier(): Tier {
  const r = Math.random();
  if (r < 0.30) return 'platinum';
  if (r < 0.65) return 'gold';
  return 'silver';
}

export function makeListing(ageOverride?: number): Listing {
  counter++;
  const firstName = pick(FIRST_NAMES);
  const lastInit = pick(LAST_INITIALS);
  const name = `${firstName} ${lastInit}`;
  const initials = `${firstName[0]}${lastInit[0]}`;
  const vertical: Vertical = pick(VERTICALS);
  const [city, state] = pick(CITIES);
  const tier = pickTier();
  const [minP, maxP] = PRICE_RANGES[vertical][tier];
  const price = randInt(minP, maxP);
  const tags = pickN(INTENT_TAGS[vertical], 3);
  const source = pick(SOURCES);
  const age = ageOverride ?? randInt(30, 600);
  const expiresIn = randInt(45, 600);
  const bids = randInt(0, 6);
  const score = randInt(72, 98);
  const contactWindow = randInt(30, 180);

  return {
    id: `LD-${Date.now()}-${counter}-${randInt(1000, 9999)}`,
    name, initials, vertical, city, state, tier, price, tags, source,
    age, expiresIn, bids, score, contactWindow,
  };
}

export function makeFeed(count: number = 20): Listing[] {
  return Array.from({ length: count }, () => makeListing());
}
