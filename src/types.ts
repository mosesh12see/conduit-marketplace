export type Vertical = 'solar' | 'roofing' | 'insurance' | 'b2b';
export type Tier = 'platinum' | 'gold' | 'silver';
export type BidStatus = 'leading' | 'outbid' | 'won' | 'lost';
export type Density = 'compact' | 'comfortable' | 'spacious';
export type Layout = 'default' | 'dense' | 'focus';
export type Accent = 'emerald' | 'indigo' | 'amber' | 'rose';

export interface Listing {
  id: string;
  name: string;
  initials: string;
  vertical: Vertical;
  city: string;
  state: string;
  tier: Tier;
  price: number;
  tags: string[];
  source: string;
  age: number;
  expiresIn: number;
  bids: number;
  score: number;
  contactWindow: number;
  fresh?: boolean;
}

export interface ActiveBid {
  id: string;
  listingId: string;
  name: string;
  initials: string;
  vertical: Vertical;
  city: string;
  state: string;
  tier: Tier;
  yourBid: number;
  topBid: number;
  status: BidStatus;
  expiresIn: number;
}

export interface WonLead {
  id: string;
  name: string;
  vertical: Vertical;
  price: number;
  wonAt: string;
}

export interface TweaksState {
  accent: Accent;
  density: Density;
  layout: Layout;
  feedSpeed: number;
  showStats: boolean;
  newListingHighlight: boolean;
}

export interface Toast {
  id: string;
  message: string;
  variant: 'default' | 'win' | 'warn';
  icon?: string;
}

export interface TransferPackage {
  id: string;
  name: string;
  transfers: number;
  pricePerTransfer: number;
  total: number;
  popular?: boolean;
}

export interface TransferOrder {
  id: string;
  vertical: Vertical;
  tier: Tier;
  package: TransferPackage;
  bidFloor: number;
  pitchScript: string;
  targetStates: string[];
  status: 'pending' | 'active' | 'completed';
  transfersDelivered: number;
  createdAt: string;
}
