'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ImageIcon } from 'lucide-react';

const images = [
  { src: '/real/proto-float.jpg', alt: 'Prototipo Chenek Balam flotando y recolectando residuos en el agua', span: 'col-span-2 row-span-2' },
  { src: '/real/proto-front.jpg', alt: 'Vista frontal del prototipo con el equipo en el agua', span: '' },
  { src: '/real/proto-rear.jpg', alt: 'Sistema de recolección trasero capturando botellas de plástico', span: '' },
  { src: '/real/proto-action.jpg', alt: 'El robot recolectando basura flotante durante las pruebas', span: 'col-span-2' },
  { src: '/real/proto-team.jpg', alt: 'Estudiantes del equipo colocando el prototipo en el agua', span: '' },
  { src: '/real/comp-mascot.jpg', alt: 'La mascota jaguar del equipo Chenek Balam', span: '' },
  { src: '/real/comp-officials.jpg', alt: 'Presentación del proyecto ante autoridades del TecNM', span: 'col-span-2' },
  { src: '/real/comp-trophy.jpg', alt: 'Equipo Chenek Balam premiado en INNOVATEC 2025', span: '' },
  { src: '/real/proto-stand.jpg', alt: 'Prototipo exhibido en el stand del certamen', span: '' },
];

export default function GallerySection() {
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
    <section id="galeria" ref={ref} className="py-24 bg-[#080812]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#0077B6]/10 text-[#0077B6] text-sm font-medium mb-4">
            <ImageIcon className="inline mr-2" size={16} />
            Galería
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight">
            El proyecto en <span className="text-[#0077B6]">imágenes</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[200px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`relative rounded-xl overflow-hidden group ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <p className="text-xs text-white font-medium">{img.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
