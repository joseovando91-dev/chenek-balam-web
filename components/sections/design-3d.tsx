'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rotate3d, MousePointer2, Hand } from 'lucide-react';
import Model3D from '@/components/model-3d';

const views = [
  {
    label: 'Vista Frontal',
    desc: 'Boca de admisión con compuertas, sensores ultrasónicos de obstáculos y cámara en la cabeza del jaguar.',
  },
  {
    label: 'Perfil Lateral',
    desc: 'Cascos gemelos tipo pontón que dan estabilidad sobre el agua y cubierta central con acabado de jaguar.',
  },
  {
    label: 'Sistema de Recolección',
    desc: 'Canasta trasera de malla donde se acumulan las botellas y residuos flotantes, fácil de vaciar en tierra.',
  },
  {
    label: 'Electrónica a Bordo',
    desc: 'Caja estanca con la electrónica de control y módulo solar en etapa de integración (en desarrollo).',
  },
];

export default function Design3DSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLElement & { cameraOrbit?: string }>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        setProgress(total > 0 ? scrolled / total : 0);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // El scroll gira el robot 330° y baja un poco la cámara a la mitad del recorrido.
  const theta = -30 + progress * 330;
  const phi = 76 - 12 * Math.sin(progress * Math.PI);
  const orbit = `${theta.toFixed(1)}deg ${phi.toFixed(1)}deg auto`;

  useEffect(() => {
    const v = viewerRef.current;
    if (v) v.cameraOrbit = orbit;
  }, [orbit]);

  const activeIndex = Math.min(views.length - 1, Math.floor(progress * views.length));
  const current = views[activeIndex] ?? views[0];

  return (
    <section id="diseno" ref={sectionRef} className="relative bg-[#06060c]" style={{ height: '320vh' }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
        <div
          className="absolute top-1/2 left-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,200,117,0.14) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 text-center px-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00C875]/10 text-[#00C875] text-sm font-medium mb-3">
            <Rotate3d size={16} /> Modelo 3D · Diseño final
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight">
            Explora el <span className="text-gradient-green">robot en 3D</span>
          </h2>
          <p className="text-[#808080] text-xs sm:text-sm mt-2 flex items-center justify-center gap-x-4 gap-y-1 flex-wrap">
            <span className="flex items-center gap-1.5"><MousePointer2 size={14} /> Desliza para girarlo</span>
            <span className="flex items-center gap-1.5"><Hand size={14} /> Arrastra o pellizca para explorarlo</span>
          </p>
        </div>

        <div className="relative z-10 w-full max-w-5xl flex-1 max-h-[46vh] sm:max-h-[58vh] min-h-[260px] mx-auto">
          <Model3D
            ref={viewerRef}
            cameraOrbit={orbit}
            className="block w-full h-full"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        <div className="relative z-10 min-h-[5.5rem] px-6 sm:px-4 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-display font-bold text-xl text-[#00C875]">{current.label}</h3>
              <p className="text-sm text-[#B0B0B0] max-w-md mx-auto mt-1">{current.desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-10 flex gap-2 mt-1 mb-20 sm:mb-6">
          {views.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-[#00C875]' : 'w-1.5 bg-[#2a2a3e]'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
