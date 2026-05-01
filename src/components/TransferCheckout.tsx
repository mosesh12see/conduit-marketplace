import { useState, useEffect } from 'react';
import type { Vertical, Tier, TransferPackage } from '../types';
import { VERTICALS, VERTICAL_LABELS, VERTICAL_ICONS } from '../data/constants';
import Icon from './Icon';

interface Props {
  onComplete: (order: {
    vertical: Vertical;
    tier: Tier;
    package: TransferPackage;
    bidFloor: number;
    pitchScript: string;
    targetStates: string[];
  }) => void;
}

const PACKAGES: TransferPackage[] = [
  { id: 'starter', name: 'Starter', transfers: 20, pricePerTransfer: 35, total: 700 },
  { id: 'growth', name: 'Growth', transfers: 50, pricePerTransfer: 30, total: 1500, popular: true },
  { id: 'scale', name: 'Scale', transfers: 100, pricePerTransfer: 25, total: 2500 },
  { id: 'enterprise', name: 'Enterprise', transfers: 250, pricePerTransfer: 22, total: 5500 },
];

const VERTICAL_DESCRIPTIONS: Record<Vertical, string> = {
  solar: 'Homeowners interested in solar installation',
  roofing: 'Property owners needing roof repair or replacement',
  insurance: 'Consumers shopping for insurance coverage',
  b2b: 'Decision makers at mid-market companies',
};

const TIER_INFO: { tier: Tier; label: string; description: string }[] = [
  { tier: 'platinum', label: 'Platinum', description: 'Highest intent, verified contact' },
  { tier: 'gold', label: 'Gold', description: 'Qualified interest, strong signal' },
  { tier: 'silver', label: 'Silver', description: 'Early interest, cost-effective' },
];

const DEFAULT_PITCH_SCRIPTS: Record<Vertical, string> = {
  solar:
    "Hi, I'm calling about a special solar program in your area. Based on your home's energy usage, you may qualify for significant savings on your electric bill. Can I connect you with one of our solar specialists to review your options?",
  roofing:
    "Hi, I'm reaching out about a free roof inspection program. With recent weather in your area, many homeowners are finding damage they didn't know about. Can I connect you with a roofing expert for a no-cost assessment?",
  insurance:
    "Hi, I'm calling about new insurance rates in your area. Many people are finding they can get better coverage at a lower price. Can I connect you with a licensed agent to compare your options?",
  b2b:
    "Hi, I'm reaching out from Conduit. We've identified your company as a strong fit for our platform. I'd love to connect you with a specialist who can walk you through how we help companies like yours. Do you have a few minutes?",
};

const TARGET_STATES = [
  'AZ', 'CA', 'CO', 'FL', 'GA', 'ID', 'IL', 'NC', 'NM', 'NV', 'OH', 'OR', 'TN', 'TX', 'UT', 'WA',
];

const STEP_LABELS = ['Type', 'Package', 'Customize', 'Account', 'Review'];

const STARTER_PRICE = 35;

function formatCurrency(n: number): string {
  return n.toLocaleString('en-US');
}

export default function TransferCheckout({ onComplete }: Props) {
  const [step, setStep] = useState<number>(0);
  const [selectedVertical, setSelectedVertical] = useState<Vertical | null>(null);
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<TransferPackage | null>(null);
  const [bidFloor, setBidFloor] = useState<number>(35);
  const [pitchScript, setPitchScript] = useState<string>('');
  const [targetStates, setTargetStates] = useState<string[]>([]);
  const [accountName, setAccountName] = useState('');
  const [accountEmail, setAccountEmail] = useState('');
  const [accountCompany, setAccountCompany] = useState('');
  const [accountPhone, setAccountPhone] = useState('');

  // On step 2 mount, set default pitch script if empty
  useEffect(() => {
    if (step === 2 && pitchScript === '' && selectedVertical) {
      setPitchScript(DEFAULT_PITCH_SCRIPTS[selectedVertical]);
    }
  }, [step, pitchScript, selectedVertical]);

  function toggleState(st: string) {
    setTargetStates((prev) =>
      prev.includes(st) ? prev.filter((s) => s !== st) : [...prev, st]
    );
  }

  function handlePlaceOrder() {
    if (!selectedVertical || !selectedTier || !selectedPackage) return;
    onComplete({
      vertical: selectedVertical,
      tier: selectedTier,
      package: selectedPackage,
      bidFloor,
      pitchScript,
      targetStates,
    });
  }

  const subtotal = selectedPackage?.total ?? 0;
  const platformFee = Math.round(subtotal * 0.03 * 100) / 100;
  const orderTotal = subtotal + platformFee;

  return (
    <div className="checkout-container">
      {/* Step indicator */}
      <div className="checkout-steps">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className={`checkout-step ${i < step ? 'done' : ''} ${i === step ? 'active' : ''}`}>
            <div className="checkout-step-circle">
              {i < step ? <Icon name="check" size={14} /> : i + 1}
            </div>
            <span className="checkout-step-label">{label}</span>
          </div>
        ))}
      </div>

      {/* Step 0 — Choose vertical + tier */}
      {step === 0 && (
        <div className="checkout-section">
          <h2 className="checkout-title">What type of transfers do you need?</h2>

          <div className="checkout-vertical-grid">
            {VERTICALS.map((v) => (
              <button
                key={v}
                className={`checkout-vertical-card ${selectedVertical === v ? 'active' : ''}`}
                onClick={() => setSelectedVertical(v)}
              >
                <Icon name={VERTICAL_ICONS[v]} size={24} />
                <span style={{ fontSize: 14, fontWeight: 600 }}>{VERTICAL_LABELS[v]}</span>
                <span style={{ fontSize: 12 }} className="ink-4">
                  {VERTICAL_DESCRIPTIONS[v]}
                </span>
              </button>
            ))}
          </div>

          <div className="checkout-tier-section">
            <label className="checkout-label">Quality tier</label>
            <div className="checkout-tier-group">
              {TIER_INFO.map(({ tier, label, description }) => (
                <button
                  key={tier}
                  className={`checkout-tier-btn ${selectedTier === tier ? 'active' : ''}`}
                  onClick={() => setSelectedTier(tier)}
                >
                  <strong>{label}</strong>
                  <span className="ink-4">{description}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            className="checkout-next-btn"
            disabled={!selectedVertical || !selectedTier}
            onClick={() => setStep(1)}
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 1 — Choose package */}
      {step === 1 && (
        <div className="checkout-section">
          <h2 className="checkout-title">Choose your package</h2>
          <p className="checkout-subtitle">
            Minimum 20 transfers per order. All transfers are live — real-time phone connections.
          </p>

          <div className="checkout-package-grid">
            {PACKAGES.map((pkg) => {
              const savings =
                pkg.id !== 'starter'
                  ? Math.round(((STARTER_PRICE - pkg.pricePerTransfer) / STARTER_PRICE) * 100)
                  : 0;

              return (
                <button
                  key={pkg.id}
                  className={`checkout-package-card ${selectedPackage?.id === pkg.id ? 'active' : ''} ${pkg.popular ? 'popular' : ''}`}
                  onClick={() => setSelectedPackage(pkg)}
                >
                  {pkg.popular && <span className="popular-badge">Most popular</span>}
                  <span style={{ fontSize: 16, fontWeight: 600 }}>{pkg.name}</span>
                  <span className="checkout-transfer-count">
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700 }}>
                      {pkg.transfers}
                    </span>{' '}
                    transfers
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14 }}>
                    ${pkg.pricePerTransfer}
                    <span className="ink-4">/transfer</span>
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 600 }}>
                    ${formatCurrency(pkg.total)}
                  </span>
                  {savings > 0 && (
                    <span className="accent-ink" style={{ fontSize: 13 }}>
                      Save {savings}% vs Starter
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="checkout-nav">
            <button className="checkout-back-btn" onClick={() => setStep(0)}>
              Back
            </button>
            <button
              className="checkout-next-btn"
              disabled={!selectedPackage}
              onClick={() => setStep(2)}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 2 — Customize */}
      {step === 2 && (
        <div className="checkout-section">
          <h2 className="checkout-title">Customize your order</h2>

          <div className="checkout-customize-grid">
            {/* Left column */}
            <div className="checkout-customize-col">
              <label className="checkout-label">Minimum bid per transfer</label>
              <p className="checkout-description">
                Set the minimum you're willing to pay per transfer. Lower bids may take longer to fill.
              </p>
              <div className="checkout-bid-row">
                <span className="checkout-bid-prefix">$</span>
                <input
                  type="number"
                  className="checkout-bid-input"
                  min={25}
                  value={bidFloor}
                  onChange={(e) => setBidFloor(Number(e.target.value))}
                />
              </div>
              {bidFloor < 25 && (
                <span className="checkout-warning">Minimum bid is $25 per transfer</span>
              )}

              <label className="checkout-label" style={{ marginTop: 24 }}>
                Target states
              </label>
              <p className="checkout-description">
                Select states where you want transfers from. Leave empty for nationwide.
              </p>
              <div className="checkout-state-grid">
                {TARGET_STATES.map((st) => (
                  <button
                    key={st}
                    className={`checkout-state-chip ${targetStates.includes(st) ? 'active' : ''}`}
                    onClick={() => toggleState(st)}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="checkout-customize-col">
              <label className="checkout-label">Your pitch script</label>
              <p className="checkout-description">
                This is what our agents will say when connecting you with leads. Customize to match your
                offer.
              </p>
              <textarea
                className="checkout-pitch-input"
                rows={8}
                maxLength={500}
                value={pitchScript}
                placeholder={selectedVertical ? DEFAULT_PITCH_SCRIPTS[selectedVertical] : ''}
                onChange={(e) => setPitchScript(e.target.value)}
              />
              <span className="checkout-char-count">{pitchScript.length}/500 characters</span>
            </div>
          </div>

          <div className="checkout-nav">
            <button className="checkout-back-btn" onClick={() => setStep(1)}>
              Back
            </button>
            <button
              className="checkout-next-btn"
              disabled={bidFloor < 25}
              onClick={() => setStep(3)}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — Create account */}
      {step === 3 && (
        <div className="checkout-section">
          <h2 className="checkout-title">Create your account</h2>
          <p className="checkout-subtitle">
            Set up your buyer account to place orders and receive transfers.
          </p>

          <div className="checkout-account-grid">
            <div className="checkout-account-field">
              <label className="checkout-label">Full name</label>
              <input
                type="text"
                className="checkout-text-input"
                placeholder="John Smith"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
            </div>
            <div className="checkout-account-field">
              <label className="checkout-label">Work email</label>
              <input
                type="email"
                className="checkout-text-input"
                placeholder="john@company.com"
                value={accountEmail}
                onChange={(e) => setAccountEmail(e.target.value)}
              />
            </div>
            <div className="checkout-account-field">
              <label className="checkout-label">Company name</label>
              <input
                type="text"
                className="checkout-text-input"
                placeholder="Acme Solar LLC"
                value={accountCompany}
                onChange={(e) => setAccountCompany(e.target.value)}
              />
            </div>
            <div className="checkout-account-field">
              <label className="checkout-label">Phone number</label>
              <input
                type="tel"
                className="checkout-text-input"
                placeholder="(555) 123-4567"
                value={accountPhone}
                onChange={(e) => setAccountPhone(e.target.value)}
              />
            </div>
          </div>

          <p className="checkout-account-terms">
            By creating an account you agree to Conduit's Terms of Service and Privacy Policy.
          </p>

          <div className="checkout-nav">
            <button className="checkout-back-btn" onClick={() => setStep(2)}>
              Back
            </button>
            <button
              className="checkout-next-btn"
              disabled={!accountName.trim() || !accountEmail.trim() || !accountPhone.trim()}
              onClick={() => setStep(4)}
            >
              Continue to review
            </button>
          </div>
        </div>
      )}

      {/* Step 4 — Review */}
      {step === 4 && selectedVertical && selectedTier && selectedPackage && (
        <div className="checkout-section">
          <h2 className="checkout-title">Review your order</h2>

          <div className="checkout-summary-card">
            <div className="checkout-summary-row">
              <span>Vertical</span>
              <span>
                {VERTICAL_LABELS[selectedVertical]}{' '}
                <span className="checkout-tier-badge">{selectedTier}</span>
              </span>
            </div>
            <div className="checkout-summary-row">
              <span>Package</span>
              <span>
                {selectedPackage.name} — {selectedPackage.transfers} transfers
              </span>
            </div>
            <div className="checkout-summary-row">
              <span>Price per transfer</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>${selectedPackage.pricePerTransfer}</span>
            </div>
            <div className="checkout-summary-row">
              <span>Bid floor</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>${bidFloor}</span>
            </div>
            <div className="checkout-summary-row">
              <span>Target states</span>
              <span>{targetStates.length > 0 ? targetStates.join(', ') : 'Nationwide'}</span>
            </div>

            <div className="checkout-divider" />

            <div className="checkout-summary-row">
              <span>Subtotal</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>${formatCurrency(subtotal)}</span>
            </div>
            <div className="checkout-summary-row">
              <span>Platform fee (3%)</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>${formatCurrency(platformFee)}</span>
            </div>

            <div className="checkout-divider" />

            <div className="checkout-summary-row checkout-total">
              <span>Total</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                ${formatCurrency(orderTotal)}
              </span>
            </div>
          </div>

          <div className="checkout-pitch-preview">
            <label className="checkout-label">Your pitch script</label>
            <div className="checkout-pitch-box">{pitchScript}</div>
          </div>

          <div className="checkout-nav">
            <button className="checkout-back-btn" onClick={() => setStep(2)}>
              Back
            </button>
            <button className="checkout-place-btn" onClick={handlePlaceOrder}>
              Place order
            </button>
          </div>

          <p className="checkout-disclaimer">
            You'll be charged when transfers begin delivery. Cancel anytime for unused transfers.
          </p>
        </div>
      )}
    </div>
  );
}
