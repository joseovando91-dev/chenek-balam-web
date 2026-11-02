'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Weight, Maximize, Award, Newspaper } from 'lucide-react';

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setVal(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, end, duration]);
  return val;
}

const counters = [
  { icon: Weight, value: 120, suffix: ' kg', label: 'Recolectados por sesión (30 min)' },
  { icon: Maximize, value: 2, suffix: ' ton', label: 'Capacidad modelo grande' },
  { icon: Award, value: 3, suffix: '', label: 'Premios INNOVATEC' },
  { icon: Newspaper, value: 9, suffix: '+', label: 'Medios nacionales' },
];

export default function CountersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry?.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contadores" ref={ref} className="relative py-20 bg-[#0A0A0F]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {counters.map((c, i) => {
            const count = useCountUp(c.value, 2000, visible);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="text-center p-6 rounded-xl bg-[#111122]/60 border border-[#1a1a2e] hover:border-[#00C875]/30 transition-all"
              >
                <c.icon className="mx-auto mb-3 text-[#00C875]" size={32} />
                <div className="font-display font-black text-4xl sm:text-5xl text-[#F0F0F0] tracking-tight">
                  {count}{c.suffix}
                </div>
                <p className="text-sm text-[#B0B0B0] mt-2">{c.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
