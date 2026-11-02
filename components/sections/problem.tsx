'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AlertTriangle, Droplets, Fish } from 'lucide-react';

export default function ProblemSection() {
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
    <section id="problema" ref={ref} className="relative py-24 overflow-hidden">
      {/* Parallax BG */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://cdn.prod.website-files.com/6763c964d123d97fef0f8990/677f948a7f64252e76f529df_DJI_0111b-1320x880.jpg"
          alt="Contaminación en ríos y lagos"
          fill
          className="object-cover"
          style={{ transform: 'scale(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-[#0A0A0F]/85 to-[#0A0A0F]" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            <AlertTriangle className="inline mr-2" size={16} />
            Crisis Ambiental
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight mb-4">
            Un problema que <span className="text-red-400">ahoga</span> nuestros ecosistemas
          </h2>
          <p className="text-[#B0B0B0] max-w-2xl mx-auto text-lg">
            Los cuerpos de agua de México enfrentan una emergencia silenciosa que amenaza la biodiversidad, el turismo y la salud de millones.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Droplets,
              stat: '45,000',
              unit: 'toneladas/año',
              text: 'de desechos sólidos se acumulan en el Cañón del Sumidero, Chiapas.',
              source: 'López Pimentel, A. L. (2015), tesis de maestría, UNAM; CONANP.',
            },
            {
              icon: AlertTriangle,
              stat: '59.1%',
              unit: '',
              text: 'de los cuerpos de agua monitoreados en México están contaminados.',
              source: 'CONAGUA; SEMARNAT.',
            },
            {
              icon: Fish,
              stat: '11M',
              unit: 'toneladas',
              text: 'de plástico llegan a los océanos cada año. Los ríos son la vía principal.',
              source: 'PNUMA (Programa de las Naciones Unidas para el Medio Ambiente).',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              className="p-6 rounded-xl bg-[#111122]/80 border border-red-500/10 hover:border-red-500/30 transition-all backdrop-blur-sm"
            >
              <item.icon className="text-red-400 mb-3" size={28} />
              <div className="font-display font-black text-3xl text-[#F0F0F0] tracking-tight">
                {item.stat} <span className="text-base font-normal text-[#B0B0B0]">{item.unit}</span>
              </div>
              <p className="text-[#B0B0B0] mt-2 text-sm">{item.text}</p>
              <p className="text-[#777] mt-3 text-[11px] leading-snug">Fuente: {item.source}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 text-center text-[11px] text-[#777]">
          Fuentes: CONANP, SEMARNAT, CONAGUA, PNUMA.
        </p>
      </div>
    </section>
  );
}
