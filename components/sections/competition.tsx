'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const photos = [
  { src: '/real/comp-trophy.jpg', alt: 'Equipo Chenek Balam con el reconocimiento en Innova TecNM 2025', span: 'md:col-span-2 md:row-span-2', big: true },
  { src: '/real/comp-certamen.jpg', alt: 'Premiación del Certamen de Proyectos INNOVATEC' },
  { src: '/real/comp-booth.jpg', alt: 'Stand del proyecto Chenek Balam en el certamen' },
  { src: '/real/comp-officials.jpg', alt: 'Presentación del proyecto ante autoridades del TecNM' },
  { src: '/real/comp-team.jpg', alt: 'El equipo en la etapa nacional en Pachuca' },
];

export default function CompetitionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry?.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="competencias" ref={ref} className="py-24 bg-[#080812]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium mb-4">
            <Trophy size={16} /> Competencias
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight">
            En las <span className="text-[#D4AF37]">competencias INNOVATEC</span>
          </h2>
          <p className="text-[#B0B0B0] text-sm mt-3 max-w-2xl mx-auto">
            1er lugar local en Sostenibilidad y Cambio Climático y representación en la etapa nacional en Pachuca, Hidalgo. El equipo presentando el Chenek Balam ante autoridades y jurados.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[160px] md:auto-rows-[190px]">
          {photos.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`relative rounded-xl overflow-hidden group bg-[#111122] ${p.span ?? ''}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes={p.big ? '(max-width: 768px) 100vw, 600px' : '(max-width: 768px) 50vw, 300px'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <p className="text-xs text-white font-medium">{p.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
