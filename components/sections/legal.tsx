'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Landmark, FileText } from 'lucide-react';

type Norm = { code: string; desc: string; app: string; kind: 'NOM' | 'Ley' | 'Reglamento' };

const norms: Norm[] = [
  { kind: 'NOM', code: 'NOM-083-SEMARNAT-2003', desc: 'Protección ambiental para sitios de disposición final de residuos sólidos urbanos y de manejo especial.', app: 'El residuo extraído del agua se traslada a sitios de disposición final legalmente autorizados.' },
  { kind: 'NOM', code: 'NOM-161-SEMARNAT-2011', desc: 'Criterios para clasificar los residuos de manejo especial y determinar cuáles están sujetos a plan de manejo.', app: 'Sustenta la separación y canalización de los plásticos de gran volumen recuperados en cuerpos de agua.' },
  { kind: 'NOM', code: 'NOM-055-SEMARNAT-2003', desc: 'Requisitos de los sitios destinados al confinamiento controlado de residuos peligrosos.', app: 'Protocolo preventivo ante la detección de envases tóxicos o hidrocarburos en zonas ribereñas.' },
  { kind: 'NOM', code: 'NOM-001-SEMARNAT-2021', desc: 'Límites permisibles de contaminantes en las descargas de aguas residuales en cuerpos receptores propiedad de la nación.', app: 'Referencia para la mitigación de agentes contaminantes en aguas de jurisdicción federal.' },
  { kind: 'NOM', code: 'NOM-011-CONAGUA-2015', desc: 'Conservación del recurso agua; especificaciones y método para determinar la disponibilidad media anual de las aguas nacionales.', app: 'Alineación con el monitoreo hidrológico y el diagnóstico del estado de las cuencas chiapanecas.' },
  { kind: 'Ley', code: 'LGPGIR', desc: 'Ley General para la Prevención y Gestión Integral de los Residuos.', app: 'Marco rector que promueve tecnologías para la valorización y recolección de residuos en ecosistemas.' },
  { kind: 'Ley', code: 'LGEEPA', desc: 'Ley General del Equilibrio Ecológico y la Protección al Ambiente.', app: 'Base legal para la restauración ecológica y la preservación de la flora y fauna acuática en cuencas.' },
  { kind: 'Ley', code: 'LGDFS', desc: 'Ley General de Desarrollo Forestal Sustentable.', app: 'Protección de cuencas hidrológico-forestales y riberas boscosas donde opera el equipo.' },
  { kind: 'Ley', code: 'Ley de Aguas Nacionales (LAN)', desc: 'Regula la explotación, uso, distribución, control y preservación de las aguas nacionales.', app: 'Sustento para acuerdos de saneamiento con CONAGUA en ríos, presas hidroeléctricas y lagunas.' },
  { kind: 'Reglamento', code: 'Reglamento de la LGEEPA en materia de ANP', desc: 'Regula las actividades y la preservación dentro de las Áreas Naturales Protegidas.', app: 'Marco para operar en zonas como el Cañón del Sumidero; la propulsión eléctrica reduce el ruido y evita el uso de hidrocarburos.' },
  { kind: 'Ley', code: 'Ley Ambiental para el Estado de Chiapas', desc: 'Normativa estatal de equilibrio ecológico y protección al ambiente.', app: 'Facilita convenios directos con ayuntamientos y dependencias ambientales del gobierno estatal.' },
];

const kindColor: Record<Norm['kind'], string> = {
  NOM: 'bg-[#0077B6]/15 text-[#4FB3E8]',
  Ley: 'bg-[#D4AF37]/15 text-[#D4AF37]',
  Reglamento: 'bg-[#00C875]/15 text-[#00C875]',
};

export default function LegalSection() {
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
    <section id="normatividad" ref={ref} className="py-24 bg-[#0A0A0F]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#0077B6]/10 text-[#4FB3E8] text-sm font-medium mb-4">
            <Landmark className="inline mr-2" size={16} />
            Cumplimiento Normativo
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight mb-4">
            Marco jurídico y <span className="text-gradient-gold">sustento legal</span>
          </h2>
          <p className="text-[#B0B0B0] max-w-2xl mx-auto">
            Normas oficiales mexicanas y leyes que dan sustento a la operación de CHENEK BALAM ante gobiernos, concesiones y alianzas con empresas ESG.
          </p>
        </motion.div>

        {/* Tabla (escritorio) */}
        <div className="hidden md:block rounded-2xl border border-[#1a1a2e] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#111122] text-left text-xs uppercase tracking-wider text-[#B0B0B0]">
              <tr>
                <th className="px-5 py-3 w-[26%]">Norma / Ley oficial</th>
                <th className="px-5 py-3 w-[37%]">Descripción oficial</th>
                <th className="px-5 py-3">Aplicación en CHENEK BALAM</th>
              </tr>
            </thead>
            <tbody>
              {norms.map((n, i) => (
                <motion.tr
                  key={n.code}
                  initial={{ opacity: 0 }}
                  animate={visible ? { opacity: 1 } : {}}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  className="border-t border-[#1a1a2e] odd:bg-[#0d0d18] align-top"
                >
                  <td className="px-5 py-4">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded mb-1.5 ${kindColor[n.kind]}`}>{n.kind}</span>
                    <div className="font-mono font-bold text-[#F0F0F0] text-[13px]">{n.code}</div>
                  </td>
                  <td className="px-5 py-4 text-[#B0B0B0]">{n.desc}</td>
                  <td className="px-5 py-4 text-[#F0F0F0]">{n.app}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tarjetas (móvil) */}
        <div className="md:hidden space-y-3">
          {norms.map((n) => (
            <div key={n.code} className="p-4 rounded-xl bg-[#111122]/60 border border-[#1a1a2e]">
              <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded mb-1.5 ${kindColor[n.kind]}`}>{n.kind}</span>
              <div className="font-mono font-bold text-sm mb-2">{n.code}</div>
              <p className="text-sm text-[#B0B0B0] mb-2">{n.desc}</p>
              <p className="text-sm text-[#F0F0F0] flex gap-2"><FileText size={14} className="text-[#00C875] flex-shrink-0 mt-0.5" />{n.app}</p>
            </div>
          ))}
        </div>

        <p className="mt-5 text-[11px] text-[#777] text-center max-w-3xl mx-auto">
          Marco de referencia normativo aplicable al proyecto. No constituye una certificación ni un dictamen de cumplimiento emitido por autoridad.
        </p>
      </div>
    </section>
  );
}
