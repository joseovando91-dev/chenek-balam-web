'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Tv, Newspaper } from 'lucide-react';

type MediaItem = { name: string; url: string; note?: string; tv?: boolean };

// Cobertura destacada en televisión nacional
const featured: MediaItem[] = [
  {
    name: 'Canal de las Estrellas',
    url: 'https://www.youtube.com/results?search_query=Chenek+Balam+jaguar+robot',
    note: 'Televisa · Cobertura nacional',
    tv: true,
  },
  {
    name: 'NMás',
    url: 'https://www.nmas.com.mx/chiapas/ciencia-tecnologia/robot-de-chiapas-recoge-120-kilos-de-basura-en-rios-en-solo-30-minutos/',
    note: 'Robot recoge 120 kg de basura en 30 min',
    tv: true,
  },
  {
    name: 'Heraldo de México',
    url: 'https://heraldodemexico.com.mx/nacional/2026/5/26/estudiantes-crean-el-chenek-balam-un-vehiculo-para-limpiar-la-basura-en-los-rios-en-chiapas-819875.html',
    note: 'Estudiantes crean el Chenek Balam',
  },
];

// Resto de medios que cubrieron el proyecto
const media: MediaItem[] = [
  { name: 'Clic Noticias', url: 'https://www.clicnoticias.com.mx/chenek-balam-wall-e-chiapaneco/', note: 'El WALL-E chiapaneco' },
  { name: 'Cuarto Poder', url: 'https://www.cuartopoder.mx/chiapas/proyecto-podria-revolucionar-la-recoleccion-de-basura/552635', note: 'Podría revolucionar la recolección' },
  { name: 'Al Momento MX', url: 'https://almomento.mx/chenek-balam-el-robot-que-cuida-los-rios-de-chiapas/', note: 'El robot que cuida los ríos' },
  { name: 'Solo Buenas Noticias', url: 'https://solobuenasnoticias.news/robot-acuatico-chenek-balam-chiapas/', note: 'Robot acuático de Chiapas' },
  { name: 'El Centinela MX', url: 'http://www.elcentinelamx.com/2026/05/proyecto-estudiantil-simbolo-de.html', note: 'Proyecto estudiantil símbolo' },
  { name: 'Lo de Hoy', url: 'https://lodehoy.com.mx/tecnologia/2026/10/24/36604/chenek-balam-robot-chiapas-recoge-120-kilos-basura-30-minutos', note: 'Recoge 120 kilos de basura' },
  { name: 'Diario Puntual', url: 'https://diariopuntual.com/ciencia-y-tecnologia/2026/10/24/11951/robot-mexicano-busca-recoger-dos-toneladas-de-basura-en-rios', note: 'Busca recoger 2 toneladas' },
  { name: 'Ahora Tabasco', url: 'https://ahoratabasco.com/jovenes-chiapanecos-crean-robot-para-limpiar-rios-y-lagunas/', note: 'Jóvenes crean robot limpiador' },
  { name: 'TecNM Tuxtla', url: 'https://tuxtla.tecnm.mx/innovacion-chiapaneca-presenta-soluciones-tecnologicas-para-la-conservacion-ambiental-en-ecosistemas-acuaticos-y-costeros/', note: 'Innovación chiapaneca' },
];

export default function PressSection() {
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
    <section id="prensa" ref={ref} className="py-24 bg-[#0A0A0F]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#0077B6]/10 text-[#0077B6] text-sm font-medium mb-4">
            Prensa · Cobertura nacional
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight">
            En los <span className="text-[#0077B6]">medios</span>
          </h2>
          <p className="text-[#B0B0B0] text-sm mt-3 max-w-xl mx-auto">
            Toca cualquier medio para abrir la nota o el reportaje donde hablaron del proyecto.
          </p>
        </motion.div>

        {/* Cobertura destacada */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {featured.map((m, i) => (
            <motion.a
              key={i}
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative p-5 rounded-2xl bg-gradient-to-br from-[#0077B6]/15 to-[#111122] border border-[#0077B6]/30 hover:border-[#0077B6]/70 transition-all overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-[#0077B6]">
                  {m.tv ? <Tv size={12} /> : <Newspaper size={12} />} {m.tv ? 'Televisión' : 'Nota'}
                </span>
                <ExternalLink size={15} className="text-[#0077B6] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#F0F0F0] group-hover:text-white transition-colors">{m.name}</h3>
              {m.note && <p className="text-xs text-[#B0B0B0] mt-1">{m.note}</p>}
            </motion.a>
          ))}
        </div>

        {/* Resto de medios */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
          {media.map((m, i) => (
            <motion.a
              key={i}
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
              className="group p-4 rounded-xl bg-[#111122]/60 border border-[#1a1a2e] hover:border-[#0077B6]/40 hover:bg-[#111122] transition-all"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-[#F0F0F0] group-hover:text-white transition-colors">{m.name}</span>
                <ExternalLink size={13} className="text-[#0077B6] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </div>
              {m.note && <p className="text-[11px] text-[#808080] group-hover:text-[#B0B0B0] mt-1 leading-snug">{m.note}</p>}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
