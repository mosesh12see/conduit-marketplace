import { useState, useEffect, useCallback } from 'react';
import type { Listing as ListingType, ActiveBid, WonLead, Toast, Vertical } from './types';
import { makeListing, makeFeed } from './data/generators';
import { VERTICALS, VERTICAL_LABELS, INITIAL_STATS } from './data/constants';
import { useTweaks } from './tweaks/useTweaks';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ListingCard from './components/Listing';
import StatCard from './components/StatCard';
import Rail from './components/Rail';
import BidModal from './components/BidModal';
import ToastStack from './components/ToastStack';
import Tabs from './components/Tabs';
import TweaksPanel from './tweaks/TweaksPanel';
import Icon from './components/Icon';

import './styles.css';

let toastCounter = 0;
function makeToast(message: string, variant: Toast['variant'] = 'default'): Toast {
  return { id: `t-${++toastCounter}`, message, variant };
}

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}m ${sec < 10 ? '0' : ''}${sec}s`;
}

export default function App() {
  const { state: tweaks, update: updateTweak } = useTweaks();
  const [feed, setFeed] = useState<ListingType[]>(() => makeFeed(20));
  const [activeTab, setActiveTab] = useState('live');
  const [activeVertical, setActiveVertical] = useState('all');
  const [modalListing, setModalListing] = useState<ListingType | null>(null);
  const [wonIds, setWonIds] = useState<Set<string>>(new Set());
  const [activeBids, setActiveBids] = useState<ActiveBid[]>([
    {
      id: 'bid-1', listingId: 'mock-1', name: 'Elena T.', initials: 'ET',
      vertical: 'solar', city: 'Phoenix', state: 'AZ', tier: 'platinum',
      yourBid: 142, topBid: 142, status: 'leading', expiresIn: 340,
    },
    {
      id: 'bid-2', listingId: 'mock-2', name: 'Tariq B.', initials: 'TB',
      vertical: 'roofing', city: 'Austin', state: 'TX', tier: 'gold',
      yourBid: 65, topBid: 72, status: 'outbid', expiresIn: 180,
    },
  ]);
  const [wonLeads, setWonLeads] = useState<WonLead[]>([
    { id: 'won-1', name: 'Wei S.', vertical: 'solar', price: 128, wonAt: '2h ago' },
    { id: 'won-2', name: 'Priya K.', vertical: 'insurance', price: 48, wonAt: '4h ago' },
    { id: 'won-3', name: 'Liam R.', vertical: 'b2b', price: 245, wonAt: 'yesterday' },
  ]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [platinumOnly, setPlatinumOnly] = useState(false);
  const [topScore, setTopScore] = useState(false);

  const addToast = useCallback((message: string, variant: Toast['variant'] = 'default') => {
    const toast = makeToast(message, variant);
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== toast.id)), 4500);
  }, []);

  // New listing every feedSpeed seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nl = makeListing(0);
      nl.fresh = true;
      setFeed((prev) => [nl, ...prev].slice(0, 50));
      setTimeout(() => setFeed((prev) => prev.map((l) => (l.id === nl.id ? { ...l, fresh: false } : l))), 4000);
    }, tweaks.feedSpeed * 1000);
    return () => clearInterval(interval);
  }, [tweaks.feedSpeed]);

  // 1s tick: age + expiresIn
  useEffect(() => {
    const tick = setInterval(() => {
      setFeed((prev) => prev.map((l) => ({ ...l, age: l.age + 1, expiresIn: Math.max(0, l.expiresIn - 1) })));
      setActiveBids((prev) => prev.map((b) => ({ ...b, expiresIn: Math.max(0, b.expiresIn - 1) })));
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  // Outbid simulation every 18s
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.3) return;
      setActiveBids((prev) => {
        const leading = prev.filter((b) => b.status === 'leading');
        if (!leading.length) return prev;
        const target = leading[Math.floor(Math.random() * leading.length)];
        const bump = Math.floor(Math.random() * 8) + 3;
        addToast(`Outbid on ${target.name} — new top: $${target.yourBid + bump}`, 'warn');
        return prev.map((b) => b.id === target.id ? { ...b, status: 'outbid' as const, topBid: b.yourBid + bump } : b);
      });
    }, 18000);
    return () => clearInterval(interval);
  }, [addToast]);

  const handleBidSubmit = useCallback((listing: ListingType, amount: number) => {
    setModalListing(null);
    if (Math.random() < 0.6) {
      setWonIds((prev) => new Set(prev).add(listing.id));
      setWonLeads((prev) => [{ id: `won-${Date.now()}`, name: listing.name, vertical: listing.vertical, price: amount, wonAt: 'just now' }, ...prev]);
      addToast(`Won transfer · ${listing.name} · $${amount}. Contact details unlocked.`, 'win');
    } else {
      setActiveBids((prev) => [{
        id: `bid-${Date.now()}`, listingId: listing.id, name: listing.name, initials: listing.initials,
        vertical: listing.vertical, city: listing.city, state: listing.state, tier: listing.tier,
        yourBid: amount, topBid: amount, status: 'leading', expiresIn: listing.expiresIn,
      }, ...prev]);
      addToast(`Bid placed · ${listing.name} · $${amount}`, 'default');
    }
  }, [addToast]);

  // Filter feed
  let filtered = activeVertical === 'all' ? feed : feed.filter((l) => l.vertical === activeVertical);
  if (platinumOnly) filtered = filtered.filter((l) => l.tier === 'platinum');
  if (topScore) filtered = [...filtered].sort((a, b) => b.score - a.score);

  const verticalCounts: Record<string, number> = { all: feed.length };
  for (const v of VERTICALS) verticalCounts[v] = feed.filter((l) => l.vertical === v).length;

  const activeBidCount = activeBids.filter((b) => b.status === 'leading' || b.status === 'outbid').length;

  return (
    <div className="app-shell">
      <Header />
      <Sidebar activeVertical={activeVertical} onVerticalChange={setActiveVertical} verticalCounts={verticalCounts} />
      <main className="main">
        <Tabs
          active={activeTab}
          onChange={setActiveTab}
          tabs={[
            { id: 'live', label: 'Live feed', count: filtered.length },
            { id: 'deals', label: 'Active deals', count: activeBidCount + wonLeads.length },
          ]}
        />
        <div className="main-content">
          {activeTab === 'live' && (
            <>
              {tweaks.showStats && (
                <div className="stats-strip">
                  <StatCard label="Spend today" value={`$${INITIAL_STATS.spendToday.toLocaleString()}`} delta={`+${INITIAL_STATS.spendDelta}% vs yesterday`} positive />
                  <StatCard label="Leads acquired" value={String(INITIAL_STATS.leadsAcquired)} delta={`+${INITIAL_STATS.leadsLastHour} in last hour`} positive />
                  <StatCard label="Avg cost per lead" value={`$${INITIAL_STATS.avgCpl.toFixed(2)}`} delta={`${INITIAL_STATS.cplDelta}% vs 7d`} positive={INITIAL_STATS.cplDelta < 0} />
                  <StatCard label="Conversion rate" value={`${INITIAL_STATS.conversionRate}%`} delta={`+${INITIAL_STATS.conversionDelta}pt vs 7d`} positive />
                </div>
              )}
              <div className="feed-header">
                <h2 className="feed-title">{activeVertical === 'all' ? 'All verticals' : VERTICAL_LABELS[activeVertical as Vertical]}</h2>
                <span className="live-pill"><span className="live-dot" /><span className="mono">LIVE</span></span>
                <div className="feed-toolbar">
                  <button className={`chip${platinumOnly ? ' active' : ''}`} onClick={() => setPlatinumOnly(!platinumOnly)}>Platinum only</button>
                  <button className={`chip${topScore ? ' active' : ''}`} onClick={() => setTopScore(!topScore)}>
                    <Icon name="trending" size={13} /> Top score
                  </button>
                  <button className="chip"><Icon name="filter" size={13} /> Filters</button>
                </div>
              </div>
              <div className="feed-list">
                {filtered.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} onBid={setModalListing} isWon={wonIds.has(listing.id)} />
                ))}
              </div>
            </>
          )}
          {activeTab === 'deals' && (
            <div className="deals-wrap">
              <table className="deals-table">
                <thead>
                  <tr>
                    <th>Tier</th><th>Lead</th><th>Vertical</th><th>Your bid</th><th>Top bid</th><th>Closes in</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activeBids.map((bid) => (
                    <tr key={bid.id}>
                      <td><span className={`tier-badge ${bid.tier}`}>{bid.tier}</span></td>
                      <td style={{ fontWeight: 500 }}>{bid.name}</td>
                      <td>{VERTICAL_LABELS[bid.vertical]}</td>
                      <td className="mono">${bid.yourBid}</td>
                      <td className="mono">${bid.topBid}</td>
                      <td className="mono">{formatTime(bid.expiresIn)}</td>
                      <td><span className={`deals-status ${bid.status}`}>{bid.status}</span></td>
                    </tr>
                  ))}
                  {wonLeads.map((w) => (
                    <tr key={w.id} className="won-row">
                      <td>—</td>
                      <td style={{ fontWeight: 500 }}>{w.name}</td>
                      <td>{VERTICAL_LABELS[w.vertical]}</td>
                      <td className="mono" style={{ color: 'var(--accent-ink)' }}>${w.price}</td>
                      <td>—</td>
                      <td>{w.wonAt}</td>
                      <td><span className="deals-status won">won</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Rail activeBids={activeBids} wonLeads={wonLeads} />
      <BidModal listing={modalListing} onClose={() => setModalListing(null)} onSubmit={handleBidSubmit} />
      <ToastStack toasts={toasts} />
      <TweaksPanel state={tweaks} onUpdate={updateTweak} />
    </div>
  );
}
