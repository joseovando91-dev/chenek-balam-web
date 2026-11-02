'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Box, Wifi, BatteryCharging, Eye, Weight } from 'lucide-react';

const specs = [
  {
    icon: Box,
    title: 'Estructura',
    items: ['Doble casco tipo catamaran', 'Fibra de vidrio y aluminio', 'Canal central para recolección', 'Malla trasera tipo bolsa'],
  },
  {
    icon: Cpu,
    title: 'Electrónica',
    items: ['ESP32-S3 N16R8', 'HuskyLens (visión)', 'Cámara ESP32-CAM', 'Celda de carga HX711'],
  },
  {
    icon: Eye,
    title: 'Inteligencia Artificial',
    items: ['YOLOv8 + dataset TACO', 'Detección de residuos en tiempo real', '4 categorías: plástico, metal, orgánico y otros', 'En desarrollo continuo'],
  },
  {
    icon: Wifi,
    title: 'Conectividad',
    items: ['Control remoto RF + ESP32 (enlace primario)', 'Telemetría LoRa en fase de homologación', 'Módulo SIM7670G (4G)', 'GPS integrado · Starlink planeado'],
  },
  {
    icon: BatteryCharging,
    title: 'Energía',
    items: ['Propulsión eléctrica actual', 'Baterías LiPo selladas y thrusters sumergibles', 'ESCs impermeables', 'Integración solar MPPT en desarrollo'],
  },
  {
    icon: Weight,
    title: 'Capacidad',
    items: ['120 kg / 30 min (prototipo)', 'Caja estanca IP68', 'Sellado triple en juntas', 'Cables de silicona'],
  },
];

export default function SpecsSection() {
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
    <section id="specs" ref={ref} className="py-24 bg-[#080812]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#0077B6]/10 text-[#0077B6] text-sm font-medium mb-4">
            Especificaciones Técnicas
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight">
            Tecnología de <span className="text-[#0077B6]">vanguardia</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specs.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-6 rounded-xl bg-[#111122]/60 border border-[#1a1a2e] hover:border-[#0077B6]/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0077B6]/10 flex items-center justify-center mb-4 group-hover:bg-[#0077B6]/20 transition-colors">
                <s.icon className="text-[#0077B6]" size={22} />
              </div>
              <h3 className="font-display font-bold text-lg mb-3">{s.title}</h3>
              <ul className="space-y-2">
                {s.items.map((item, j) => (
                  <li key={j} className="text-sm text-[#B0B0B0] flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0077B6] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
