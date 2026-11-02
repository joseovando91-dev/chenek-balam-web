'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, Weight, MapPin, ArrowRight, ZoomIn, X } from 'lucide-react';

const models = [
  {
    name: 'CHENEK BALAM Normal',
    size: '1.30 × 1.10 × 0.80 m',
    capacity: '120 kg / sesión',
    use: 'Ríos, zonas turísticas y canales',
    desc: 'Prototipo compacto y transportable. Ideal para operaciones de limpieza en cuerpos de agua medianos.',
    tag: 'Prototipo Actual',
    tagColor: 'bg-[#00C875]',
    img: '/real/proto-side.jpg',
  },
  {
    name: 'CHENEK BALAM Grande',
    size: '4 × 2.5 × 2.5 m',
    capacity: '500 kg – 2 ton',
    use: 'Lagos, presas y cañones',
    desc: 'Estructura de fibra de vidrio con forma de jaguar. Malla trasera de 4 a 5 metros para máxima recolección.',
    tag: 'En Desarrollo',
    tagColor: 'bg-[#D4AF37]',
    img: '/real/constr-paint.jpg',
  },
  {
    name: 'CHENEK BALAM Comercial',
    size: 'Personalizado',
    capacity: 'Según requerimiento',
    use: 'Municipios y empresas privadas',
    desc: 'Versión de venta con soporte, instalación, capacitación, mantenimiento y panel de datos incluido.',
    tag: 'Disponible bajo pedido',
    tagColor: 'bg-[#0077B6]',
    img: '/real/proto-action.jpg',
  },
];

export default function ModelsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setZoom(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoom]);

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
    <section id="modelos" ref={ref} className="py-24 bg-[#0A0A0F]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium mb-4">
            Catálogo de Modelos
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight">
            Una solución para cada <span className="text-gradient-gold">escala</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {models.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="group rounded-2xl bg-[#111122]/60 border border-[#1a1a2e] hover:border-[#D4AF37]/30 transition-all overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setZoom({ src: m.img, alt: m.name })}
                aria-label={`Ampliar foto de ${m.name}`}
                className="relative block w-full aspect-[4/3] bg-[#0d0d1a] cursor-zoom-in"
              >
                <Image
                  src={m.img}
                  alt={m.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 380px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/40 to-transparent" />
                <div className={`absolute top-3 left-3 ${m.tagColor} text-[#0A0A0F] text-xs font-bold px-3 py-1 rounded-full`}>
                  {m.tag}
                </div>
                <div className="absolute bottom-3 right-3 p-2 rounded-full bg-black/50 text-white opacity-80 group-hover:opacity-100 transition-opacity">
                  <ZoomIn size={16} />
                </div>
              </button>
              <div className="p-6">
                <h3 className="font-display font-bold text-xl mb-2">{m.name}</h3>
                <p className="text-sm text-[#B0B0B0] mb-4">{m.desc}</p>
                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-sm text-[#B0B0B0]">
                    <Ruler size={14} className="text-[#D4AF37]" /> {m.size}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#B0B0B0]">
                    <Weight size={14} className="text-[#D4AF37]" /> {m.capacity}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#B0B0B0]">
                    <MapPin size={14} className="text-[#D4AF37]" /> {m.use}
                  </div>
                </div>
                <button
                  onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-2.5 rounded-lg border border-[#D4AF37] text-[#D4AF37] text-sm font-bold hover:bg-[#D4AF37]/10 transition-all flex items-center justify-center gap-2"
                >
                  Solicitar cotización <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(null)}
            className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setZoom(null)}
              aria-label="Cerrar"
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X size={22} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl aspect-[4/3]"
            >
              <Image src={zoom.src} alt={zoom.alt} fill className="object-contain" sizes="100vw" />
            </motion.div>
            <p className="absolute bottom-6 left-0 right-0 text-center text-sm text-white/80">{zoom.alt}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
