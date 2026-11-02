'use client';
import { useEffect, useState, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Module-level store so the single beforeinstallprompt event is shared across
// hook instances. Listeners are attached lazily inside useEffect (browser only).
let deferred: BeforeInstallPromptEvent | null = null;
const listeners = new Set<() => void>();
let globalAttached = false;

function ensureGlobalListeners() {
  if (globalAttached || typeof window === 'undefined') return;
  globalAttached = true;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferred = e as BeforeInstallPromptEvent;
    listeners.forEach((l) => l());
  });
  window.addEventListener('appinstalled', () => {
    deferred = null;
    listeners.forEach((l) => l());
  });
}

export function useInstallPrompt() {
  const [canInstall, setCanInstall] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    ensureGlobalListeners();
    const update = () => setCanInstall(!!deferred);
    listeners.add(update);
    update();
    setIsStandalone(
      window.matchMedia('(display-mode: standalone)').matches ||
      // @ts-ignore iOS
      window.navigator.standalone === true
    );
    return () => { listeners.delete(update); };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferred) return 'unavailable';
    await deferred.prompt();
    const choice = await deferred.userChoice;
    deferred = null;
    listeners.forEach((l) => l());
    return choice.outcome;
  }, []);

  return { canInstall, isStandalone, promptInstall };
}
