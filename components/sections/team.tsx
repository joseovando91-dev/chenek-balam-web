'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap } from 'lucide-react';

const members = [
  { name: 'Sergio Antonio Rayo Cabrera', role: 'Líder del proyecto', career: 'Ing. en Mecatrónica', isLead: true },
  { name: 'Eylan Jarib Cruz Gómez', role: 'Integrante', career: 'Ing. en Mecatrónica', isLead: false },
  { name: 'Ángel Adrián Moguel González', role: 'Integrante', career: 'Ing. en Sistemas Computacionales', isLead: false },
  { name: 'Brayam Alexis Ríos García', role: 'Integrante', career: 'Ing. en Mecatrónica', isLead: false },
  { name: 'Cristian Alfredo Ovando Pérez', role: 'Integrante', career: 'Ing. en Gestión Empresarial', isLead: false },
];

const advisors = [
  { name: 'Juan Humberto Carpio Tovilla', email: 'juan.ct@tuxtla.tecnm.mx' },
  { name: 'Jorge Arturo Sarmiento Torres', email: 'jorge.st@tuxtla.tecnm.mx' },
];

export default function TeamSection() {
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
    <section id="equipo" ref={ref} className="py-24 bg-[#0A0A0F]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#00C875]/10 text-[#00C875] text-sm font-medium mb-4">
            El Equipo
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight">
            Mentes detrás del <span className="text-gradient-green">jaguar</span>
          </h2>
          <p className="text-[#B0B0B0] mt-3 max-w-xl mx-auto">
            Estudiantes del TecNM Campus Tuxtla Gutiérrez, Chiapas.
          </p>
        </motion.div>

        {/* Members */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-12">
          {members.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group text-center p-5 rounded-xl bg-[#111122]/60 border border-[#1a1a2e] hover:border-[#00C875]/30 transition-all"
            >
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${
                m.isLead ? 'bg-[#00C875]/20 border-2 border-[#00C875]/40' : 'bg-[#1a1a2e]'
              }`}>
                <User size={24} className={m.isLead ? 'text-[#00C875]' : 'text-[#B0B0B0]'} />
              </div>
              <h3 className="font-display font-bold text-sm mb-1">{m.name}</h3>
              <p className="text-xs text-[#00C875]">{m.role}</p>
              <p className="text-xs text-[#B0B0B0] mt-1">{m.career}</p>
            </motion.div>
          ))}
        </div>

        {/* Advisors */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {advisors.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-[#111122]/60 border border-[#D4AF37]/10"
            >
              <GraduationCap className="text-[#D4AF37] flex-shrink-0" size={22} />
              <div>
                <p className="font-display font-bold text-sm">{a.name}</p>
                <p className="text-xs text-[#D4AF37]">Asesor</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
