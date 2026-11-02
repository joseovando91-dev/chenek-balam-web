'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Newspaper, Handshake, Building2, Smartphone } from 'lucide-react';

const events = [
  { icon: Award, year: '2025', title: '1er Lugar INNOVATEC Local', desc: 'TecNM Tuxtla Gutiérrez — primer lugar en el certamen local de innovación tecnológica.', color: '#00C875' },
  { icon: Trophy, year: 'Nov 2025', title: 'Nacional INNOVATEC', desc: 'Representación en el certamen nacional en Pachuca, Hidalgo.', color: '#D4AF37' },
  { icon: Newspaper, year: '2026', title: 'Cobertura Nacional', desc: 'Canal de las Estrellas (Televisa), NMás, Heraldo de México y más de 9 medios cubren el proyecto.', color: '#0077B6' },
  { icon: Handshake, year: '2026', title: 'Acuerdo Gubernamental', desc: 'Convenio con la Secretaría de Pesca y Acuacultura de Chiapas.', color: '#00C875' },
  { icon: Building2, year: '2026', title: 'Presentación Presidencial', desc: 'Presentación ante la Presidenta Claudia Sheinbaum.', color: '#D4AF37' },
  { icon: Smartphone, year: '2026', title: 'El WALL-E Chiapaneco', desc: 'Apodo viral en medios nacionales e internacionales.', color: '#0077B6' },
];

export default function TimelineSection() {
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
    <section id="logros" ref={ref} className="py-24 bg-[#080812]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium mb-4">
            Logros y Reconocimientos
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight">
            Nuestro <span className="text-gradient-gold">recorrido</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00C875]/40 via-[#D4AF37]/40 to-[#0077B6]/40" />

          <div className="space-y-8 md:space-y-12">
            {events.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className={`md:flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="p-5 rounded-xl bg-[#111122]/60 border border-[#1a1a2e] hover:border-opacity-60 transition-all" style={{ borderColor: `${ev.color}20` }}>
                    <div className="flex items-center gap-3 mb-2" style={{ justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                      <ev.icon size={20} style={{ color: ev.color }} />
                      <span className="font-mono text-sm" style={{ color: ev.color }}>{ev.year}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg mb-1">{ev.title}</h3>
                    <p className="text-sm text-[#B0B0B0]">{ev.desc}</p>
                  </div>
                </div>
                {/* Center dot */}
                <div className="hidden md:flex items-center justify-center w-4 h-4 rounded-full border-2 flex-shrink-0" style={{ borderColor: ev.color, backgroundColor: `${ev.color}30` }} />
                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
