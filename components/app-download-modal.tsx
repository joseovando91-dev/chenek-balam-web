'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Download, Gauge, Droplets, BatteryCharging, MapPin, ArrowUpRight } from 'lucide-react';
import { useInstallPrompt } from '@/components/pwa/use-install-prompt';

const features = [
  { icon: Gauge, text: 'Velocidad y control del robot en tiempo real' },
  { icon: Droplets, text: 'Parámetros de calidad del agua (pH, turbidez, O₂)' },
  { icon: BatteryCharging, text: 'Nivel de batería, voltaje y autonomía' },
  { icon: MapPin, text: 'Ubicación GPS y kilos recolectados' },
];

export default function AppDownloadModal() {
  const [open, setOpen] = useState(false);
  const { canInstall, isStandalone, promptInstall } = useInstallPrompt();

  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener('open-app-modal', openHandler);

    // Auto-open once per session after scrolling into the page
    let fired = false;
    const onScroll = () => {
      if (fired) return;
      if (window.scrollY > window.innerHeight * 2.5) {
        fired = true;
        if (!sessionStorage.getItem('appModalShown')) {
          sessionStorage.setItem('appModalShown', '1');
          setOpen(true);
        }
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('open-app-modal', openHandler);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleInstall = async () => {
    const res = await promptInstall();
    if (res === 'unavailable') {
      // Fallback: open the app so the browser offers "Add to home screen"
      window.open('/app', '_blank');
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-[#00C875] text-[#06060c] font-bold shadow-lg shadow-[#00C875]/30 hover:bg-[#00E896] transition-all"
        aria-label="Descargar aplicación"
      >
        <Smartphone size={20} />
        <span className="hidden sm:inline">Descargar App</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 300 }}
              className="relative w-full max-w-lg rounded-2xl bg-[#0d0d1a] border border-[#00C875]/20 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-[#1a1a2e]/80 text-[#B0B0B0] hover:text-white transition-colors"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>

              {/* Header gradient */}
              <div className="relative p-6 pb-4 bg-gradient-to-br from-[#00C875]/15 to-transparent">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-[#00C875]/15 flex items-center justify-center">
                    <Smartphone className="text-[#00C875]" size={26} />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-xl tracking-tight">App CHENEK BALAM</h3>
                    <p className="text-xs text-[#00C875]">Control y monitoreo · PWA instalable</p>
                  </div>
                </div>
                <p className="text-sm text-[#B0B0B0]">
                  Lleva el control del Chenek en tu bolsillo. Mira lo que mide el robot y la calidad del agua desde tu celular.
                </p>
              </div>

              {/* Features */}
              <div className="px-6 py-4 space-y-3">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#111122] flex items-center justify-center flex-shrink-0">
                      <f.icon className="text-[#00C875]" size={16} />
                    </div>
                    <span className="text-sm text-[#E0E0E0]">{f.text}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="px-6 pb-6 pt-2 flex flex-col sm:flex-row gap-3">
                {!isStandalone && (
                  <button
                    onClick={handleInstall}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#00C875] text-[#06060c] font-bold hover:bg-[#00E896] transition-all"
                  >
                    <Download size={18} />
                    {canInstall ? 'Instalar aplicación' : 'Instalar en mi celular'}
                  </button>
                )}
                <Link
                  href="/app"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[#00C875]/40 text-[#00C875] font-bold hover:bg-[#00C875]/10 transition-all"
                >
                  Abrir aplicación <ArrowUpRight size={18} />
                </Link>
              </div>
              <p className="px-6 pb-5 -mt-2 text-[11px] text-[#808080] text-center">
                En celular: abre la app y elige “Agregar a pantalla de inicio” para instalarla.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
