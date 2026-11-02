'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Eye, Navigation, Container, BatteryCharging } from 'lucide-react';

const steps = [
  {
    icon: Eye,
    title: 'Detección inteligente',
    desc: 'Sistema de visión artificial con YOLOv8 entrenado con el dataset TACO identifica residuos flotantes en tiempo real.',
  },
  {
    icon: Navigation,
    title: 'Operación teleoperada y semi-autónoma',
    desc: 'Control remoto RF con ESP32 como enlace primario, con hoja de ruta tecnológica hacia autonomía total.',
  },
  {
    icon: Container,
    title: 'Recolección por canal catamaran',
    desc: 'El agua y la basura entran por el canal entre los cascos y se acumulan en la malla trasera tipo bolsa.',
  },
  {
    icon: BatteryCharging,
    title: 'Energía sostenible',
    desc: 'Sistema de propulsión eléctrica actual con baterías LiPo, con etapa de integración solar MPPT en desarrollo.',
  },
];

export default function SolutionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry?.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="solucion" ref={ref} className="py-24 bg-[#0A0A0F]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#00C875]/10 text-[#00C875] text-sm font-medium mb-4">
            Nuestra Solución
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight mb-4">
            ¿Cómo <span className="text-gradient-green">funciona</span>?
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Robot render */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#111122] border border-[#1a1a2e] bg-glow-green">
              <Image
                src="/real/proto-side.jpg"
                alt="Prototipo real CHENEK BALAM recolectando residuos en el agua"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 px-4 py-2 bg-[#00C875] rounded-lg text-[#0A0A0F] font-bold text-sm">
              Prototipo real
            </div>
          </motion.div>

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                className="flex gap-4 p-5 rounded-xl bg-[#111122]/60 border border-[#1a1a2e] hover:border-[#00C875]/30 transition-all group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#00C875]/10 flex items-center justify-center group-hover:bg-[#00C875]/20 transition-colors">
                  <step.icon className="text-[#00C875]" size={24} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#F0F0F0] mb-1">{step.title}</h3>
                  <p className="text-sm text-[#B0B0B0]">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
