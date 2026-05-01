import { useState, useEffect, useCallback } from 'react';
import type { TweaksState } from '../types';

const STORAGE_KEY = 'conduit-tweaks';

/*EDITMODE-BEGIN*/
const DEFAULTS: TweaksState = {
  accent: 'emerald',
  density: 'comfortable',
  layout: 'default',
  feedSpeed: 12,
  showStats: true,
  newListingHighlight: true,
};
/*EDITMODE-END*/

export function useTweaks() {
  const [state, setState] = useState<TweaksState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...DEFAULTS, ...JSON.parse(stored) } : DEFAULTS;
    } catch {
      return DEFAULTS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    document.documentElement.setAttribute('data-accent', state.accent);
    document.documentElement.setAttribute('data-density', state.density);
    document.documentElement.setAttribute('data-layout', state.layout);
  }, [state]);

  const update = useCallback(<K extends keyof TweaksState>(key: K, value: TweaksState[K]) => {
    setState(prev => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => setState(DEFAULTS), []);

  return { state, update, reset };
}
