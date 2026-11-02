'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, Scale, Users, Ship, Waves, Globe2 } from 'lucide-react';

const rows = [
  {
    icon: Users,
    name: 'Cuadrillas manuales',
    badge: 'Rival más común',
    cons: [
      'Alto riesgo laboral: infecciones, ahogamiento y picaduras de fauna nociva.',
      'Rendimiento irregular y lento, limitado a las orillas.',
      'Costo acumulado elevado a largo plazo (salarios, seguros, incapacidades).',
    ],
    pros: [
      'Riesgo humano cero: operación remota y limpia.',
      'Acceso continuo a zonas pantanosas, cañones o aguas profundas inaccesibles para personas.',
      'Ahorro sostenido: inversión tecnológica amortizable con menor costo por tonelada extraída.',
    ],
  },
  {
    icon: Ship,
    name: 'Lanchas a motor con redes',
    cons: [
      'Motores de combustión que derraman aceites y emiten CO₂ en el agua.',
      'Alto calado: encallan en aguas someras y dañan la flora y fauna del fondo.',
      'Ruido excesivo que ahuyenta el turismo y altera las áreas naturales.',
    ],
    pros: [
      'Cero emisiones: propulsión eléctrica, silenciosa y amigable con áreas naturales protegidas (integración solar en desarrollo).',
      'Calado mínimo: navega en aguas poco profundas y orillas con alta acumulación de plástico.',
    ],
  },
  {
    icon: Waves,
    name: 'Barreras flotantes pasivas',
    cons: [
      'Solo retienen lo que la corriente lleva hacia ellas; si la corriente cambia o sopla el viento, no funcionan.',
      'Pueden romperse con las avenidas de agua y colapsar los cauces.',
    ],
    pros: [
      'Limpieza activa: CHENEK BALAM navega hacia los puntos críticos de basura sin depender del flujo del agua.',
    ],
  },
  {
    icon: Globe2,
    name: 'Robots extranjeros',
    badge: 'WasteShark · ClearBot · Jellyfishbot',
    cons: [
      'Precios prohibitivos en dólares o euros ($15,000 – $40,000+ USD).',
      'Sin refacciones locales: un fallo mecánico implica semanas o meses parado.',
      'Soporte técnico internacional poco accesible en Chiapas y México.',
    ],
    pros: [
      'Tecnología nacional: costo competitivo adaptado al mercado regional.',
      'Mantenimiento y repuestos locales inmediatos, respaldados por el talento del Tecnológico Nacional de México.',
      'Identidad biocultural: diseño único de jaguar que aporta valor turístico y educativo a la comunidad.',
    ],
  },
];

export default function ComparisonSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e?.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="comparativa" ref={ref} className="py-24 bg-[#08080d]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium mb-4">
            <Scale className="inline mr-2" size={16} />
            Comparativa
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight mb-4">
            ¿Por qué elegir <span className="text-gradient-green">CHENEK BALAM</span>?
          </h2>
          <p className="text-[#B0B0B0] max-w-2xl mx-auto">
            Frente a las cuadrillas manuales, las lanchas tradicionales, las barreras pasivas y los robots importados.
          </p>
        </motion.div>

        {/* Encabezados de columna (escritorio) */}
        <div className="hidden lg:grid grid-cols-[240px_1fr_1fr] gap-4 px-5 mb-3 text-xs font-bold uppercase tracking-wider">
          <span className="text-[#B0B0B0]">Solución alternativa</span>
          <span className="text-red-400">¿Por qué no comprarlas o contratarlas?</span>
          <span className="text-[#00C875]">¿Por qué sí elegir CHENEK BALAM?</span>
        </div>

        <div className="space-y-4">
          {rows.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              className="grid lg:grid-cols-[240px_1fr_1fr] gap-4 p-5 rounded-2xl bg-[#111122]/60 border border-[#1a1a2e]"
            >
              <div className="flex lg:flex-col items-center lg:items-start gap-3">
                <span className="w-11 h-11 rounded-lg bg-[#1a1a2e] flex items-center justify-center flex-shrink-0">
                  <r.icon size={22} className="text-[#D4AF37]" />
                </span>
                <div>
                  <h3 className="font-display font-bold text-lg leading-tight">{r.name}</h3>
                  {r.badge && <span className="text-[11px] text-[#D4AF37]">{r.badge}</span>}
                </div>
              </div>

              <div className="rounded-xl bg-red-500/5 border border-red-500/10 p-4">
                <p className="lg:hidden text-[11px] font-bold uppercase tracking-wider text-red-400 mb-2">¿Por qué no?</p>
                <ul className="space-y-2">
                  {r.cons.map((c) => (
                    <li key={c} className="flex gap-2 text-sm text-[#B0B0B0]">
                      <XCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" /> {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-[#00C875]/5 border border-[#00C875]/15 p-4">
                <p className="lg:hidden text-[11px] font-bold uppercase tracking-wider text-[#00C875] mb-2">¿Por qué sí CHENEK BALAM?</p>
                <ul className="space-y-2">
                  {r.pros.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-[#F0F0F0]">
                      <CheckCircle2 size={16} className="text-[#00C875] flex-shrink-0 mt-0.5" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
