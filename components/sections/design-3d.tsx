'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Rotate3d, MousePointer2 } from 'lucide-react';

const frames = [
  {
    src: '/real/proto-front.jpg',
    label: 'Vista Frontal',
    desc: 'Boca de admisión frontal y canal central donde entran el agua y los residuos.',
  },
  {
    src: '/real/proto-side.jpg',
    label: 'Perfil Lateral',
    desc: 'Cascos tipo pontón con línea de flotación estable y acabado de jaguar pintado a mano.',
  },
  {
    src: '/real/proto-rear.jpg',
    label: 'Sistema de Recolección',
    desc: 'Canasta trasera que captura y retiene las botellas y residuos flotantes.',
  },
  {
    src: '/real/proto-water.jpg',
    label: 'Prototipo en Operación',
    desc: 'El Chenek Pequeño navegando sobre el agua durante las pruebas reales.',
  },
];

export default function Design3DSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
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

  const activeIndex = Math.min(frames.length - 1, Math.floor(progress * frames.length));
  const rotateY = (progress - 0.5) * 36;
  const current = frames[activeIndex] ?? frames[0];

  return (
    <section id="diseno" ref={sectionRef} className="relative bg-[#06060c]" style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* ambient glow */}
        <div className="absolute inset-0 bg-glow-green opacity-30 pointer-events-none" />
        <div
          className="absolute top-1/2 left-1/2 w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,200,117,0.12) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 text-center mb-2 px-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00C875]/10 text-[#00C875] text-sm font-medium mb-3">
            <Rotate3d size={16} /> Prototipo real · Chenek Pequeño
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight">
            Explora el <span className="text-gradient-green">prototipo</span>
          </h2>
          <p className="text-[#808080] text-sm mt-2 flex items-center justify-center gap-2">
            <MousePointer2 size={14} /> Desliza para recorrer el robot real
          </p>
        </div>

        {/* 3D viewer */}
        <div className="relative z-10 w-full max-w-4xl aspect-[16/10] mx-auto" style={{ perspective: '1400px' }}>
          <div
            className="relative w-full h-full transition-transform duration-300 ease-out"
            style={{ transform: `rotateY(${rotateY}deg) scale(${0.9 + progress * 0.15})`, transformStyle: 'preserve-3d' }}
          >
            {frames.map((frame, i) => (
              <div
                key={frame.src}
                className="absolute inset-0 transition-opacity duration-500 rounded-2xl overflow-hidden border border-[#1a1a2e] shadow-2xl"
                style={{ opacity: i === activeIndex ? 1 : 0 }}
              >
                <Image
                  src={frame.src}
                  alt={`CHENEK BALAM — ${frame.label}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 900px"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* caption */}
        <div className="relative z-10 h-20 mt-2 px-4 text-center">
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

        {/* progress dots */}
        <div className="relative z-10 flex gap-2 mt-2">
          {frames.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-8 bg-[#00C875]' : 'w-1.5 bg-[#2a2a3e]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
