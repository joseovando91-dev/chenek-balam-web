'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Telescope } from 'lucide-react';

export default function MissionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry?.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="mision" ref={ref} className="py-24 bg-[#080812]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl bg-[#111122]/60 border border-[#00C875]/10 hover:border-[#00C875]/30 transition-all"
          >
            <div className="w-14 h-14 rounded-xl bg-[#00C875]/10 flex items-center justify-center mb-6">
              <Target className="text-[#00C875]" size={28} />
            </div>
            <h3 className="font-display font-black text-2xl tracking-tight mb-4">
              <span className="text-gradient-green">Misión</span>
            </h3>
            <p className="text-[#B0B0B0] leading-relaxed">
              Desarrollar tecnología robótica accesible para la recolección teleoperada y semi-autónoma de residuos, con hoja de ruta hacia la autonomía total, en cuerpos de agua, protegiendo los ecosistemas acuáticos de Chiapas y México.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="p-8 rounded-2xl bg-[#111122]/60 border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all"
          >
            <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-6">
              <Telescope className="text-[#D4AF37]" size={28} />
            </div>
            <h3 className="font-display font-black text-2xl tracking-tight mb-4">
              <span className="text-gradient-gold">Visión</span>
            </h3>
            <p className="text-[#B0B0B0] leading-relaxed">
              Ser el referente nacional en robótica ambiental acuática, escalando la tecnología Chenek Balam a nivel federal e internacional para 2030.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
