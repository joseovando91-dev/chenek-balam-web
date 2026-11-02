'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Hammer, Scissors, Wrench, Paintbrush } from 'lucide-react';

const steps = [
  { icon: Scissors, title: 'Esculpido del jaguar', desc: 'La cabeza y el cuerpo del jaguar se tallan a mano en espuma de alta densidad, dando forma al rostro y los rasgos del balam.' },
  { icon: Wrench, title: 'Estructura y flotación', desc: 'Se arma el bastidor metálico y los cascos tipo pontón que dan estabilidad y permiten que el robot flote como catamarán.' },
  { icon: Hammer, title: 'Ensamble del casco', desc: 'Se integran los cascos, la cubierta y el sistema de recolección sobre la estructura, listos para montar la electrónica.' },
  { icon: Paintbrush, title: 'Pintado y acabado', desc: 'El jaguar se pinta a mano con el patrón de manchas y los glifos mayas que le dan su identidad chiapaneca.' },
];

const photos = [
  { src: '/real/constr-foam.jpg', alt: 'Esculpido en espuma de la cabeza del jaguar' },
  { src: '/real/constr-frame.jpg', alt: 'Estructura metálica y cascos de flotación en construcción' },
  { src: '/real/constr-body.jpg', alt: 'Ensamble del cuerpo del jaguar en el taller' },
  { src: '/real/constr-paint2.jpg', alt: 'Pintado a mano del patrón de jaguar' },
  { src: '/real/constr-paint.jpg', alt: 'Jaguar terminado y pintado en el taller' },
  { src: '/real/proto-stand.jpg', alt: 'Prototipo terminado listo para exhibición' },
];

export default function ConstructionSection() {
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
    <section id="construccion" ref={ref} className="py-24 bg-[#0A0A0F]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium mb-4">
            <Hammer size={16} /> Proceso
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight">
            Así se <span className="text-[#D4AF37]">construyó</span>
          </h2>
          <p className="text-[#B0B0B0] text-sm mt-3 max-w-2xl mx-auto">
            De un bloque de espuma a un jaguar que flota: el trabajo artesanal y de ingeniería detrás del Chenek Balam, hecho por el equipo en el taller.
          </p>
        </motion.div>

        {/* Pasos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative p-5 rounded-2xl bg-[#111122]/60 border border-[#1a1a2e] hover:border-[#D4AF37]/40 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                  <s.icon className="text-[#D4AF37]" size={20} />
                </div>
                <span className="font-display font-black text-2xl text-[#1f1f33]">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="font-display font-bold text-[#F0F0F0] text-base mb-1">{s.title}</h3>
              <p className="text-xs text-[#B0B0B0] leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Galería del proceso */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {photos.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
              className="relative aspect-[4/3] rounded-xl overflow-hidden group bg-[#111122]"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <p className="text-xs text-white font-medium">{p.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
