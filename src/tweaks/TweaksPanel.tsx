import { useState } from 'react';
import Icon from '../components/Icon';
import type { TweaksState, Accent, Density, Layout } from '../types';

interface Props {
  state: TweaksState;
  onUpdate: <K extends keyof TweaksState>(key: K, value: TweaksState[K]) => void;
}

const ACCENTS: Accent[] = ['emerald', 'indigo', 'amber', 'rose'];
const DENSITIES: Density[] = ['compact', 'comfortable', 'spacious'];
const LAYOUTS: { value: Layout; label: string }[] = [
  { value: 'default', label: '3-col' },
  { value: 'dense', label: 'Dense' },
  { value: 'focus', label: 'Focus' },
];

export default function TweaksPanel({ state, onUpdate }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="tweaks-toggle" onClick={() => setOpen(!open)} title="Tweaks">
        <Icon name="settings" size={18} />
      </button>
      {open && (
        <div className="tweaks-panel">
          <div className="tweaks-section">
            <div className="tweaks-section-title">Look</div>
            <div className="tweaks-row">
              <span>Accent</span>
              <div className="tweaks-radio-group">
                {ACCENTS.map(a => (
                  <button
                    key={a}
                    className={`tweaks-radio${state.accent === a ? ' active' : ''}`}
                    onClick={() => onUpdate('accent', a)}
                  >
                    {a[0].toUpperCase() + a.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="tweaks-row">
              <span>Density</span>
              <div className="tweaks-radio-group">
                {DENSITIES.map(d => (
                  <button
                    key={d}
                    className={`tweaks-radio${state.density === d ? ' active' : ''}`}
                    onClick={() => onUpdate('density', d)}
                  >
                    {d[0].toUpperCase() + d.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="tweaks-row">
              <span>Layout</span>
              <div className="tweaks-radio-group">
                {LAYOUTS.map(l => (
                  <button
                    key={l.value}
                    className={`tweaks-radio${state.layout === l.value ? ' active' : ''}`}
                    onClick={() => onUpdate('layout', l.value)}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="tweaks-section">
            <div className="tweaks-section-title">Behavior</div>
            <div className="tweaks-row">
              <span>Feed speed</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="range"
                  className="tweaks-slider"
                  min={3}
                  max={30}
                  value={state.feedSpeed}
                  onChange={e => onUpdate('feedSpeed', Number(e.target.value))}
                />
                <span className="mono" style={{ fontSize: 11, width: 28, textAlign: 'right' }}>{state.feedSpeed}s</span>
              </div>
            </div>
            <div className="tweaks-row">
              <span>Show stats</span>
              <div
                className={`tweaks-toggle-switch${state.showStats ? ' on' : ''}`}
                onClick={() => onUpdate('showStats', !state.showStats)}
              />
            </div>
            <div className="tweaks-row">
              <span>Highlight new</span>
              <div
                className={`tweaks-toggle-switch${state.newListingHighlight ? ' on' : ''}`}
                onClick={() => onUpdate('newListingHighlight', !state.newListingHighlight)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
