'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Trash2, Recycle, Waves } from 'lucide-react';

export default function SimulatorSection() {
  const [hours, setHours] = useState(1);

  // 120 kg / 0.5 hours = 240 kg/hr
  const kgCollected = hours * 240;
  // Average PET 500ml bottle weighs ~25g
  const bottles = Math.round(kgCollected / 0.025);
  // Approx 500 m2 per hour
  const area = hours * 500;

  return (
    <section id="simulador" className="py-24 bg-gradient-to-b from-[#0A0A0F] to-[#0a1a0f]">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#00C875]/10 text-[#00C875] text-sm font-medium mb-4">
            <Calculator className="inline mr-2" size={16} />
            Simulador de Impacto
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight">
            Calcula el <span className="text-gradient-green">impacto</span> ambiental
          </h2>
        </div>

        <div className="p-8 rounded-2xl bg-[#111122]/80 border border-[#00C875]/10">
          <label className="block text-sm text-[#B0B0B0] mb-2">Horas de operación</label>
          <input
            type="range"
            min={0.5}
            max={12}
            step={0.5}
            value={hours}
            onChange={(e) => setHours(parseFloat(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer bg-[#1a1a2e] accent-[#00C875]"
          />
          <div className="text-center font-display font-black text-3xl text-[#00C875] mt-2 mb-8">
            {hours} {hours === 1 ? 'hora' : 'horas'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div
              key={`kg-${kgCollected}`}
              initial={{ scale: 0.9, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center p-5 rounded-xl bg-[#0a1a0f] border border-[#00C875]/10"
            >
              <Trash2 className="mx-auto mb-2 text-[#00C875]" size={28} />
              <div className="font-display font-black text-2xl">{kgCollected.toLocaleString('es-MX')}</div>
              <p className="text-xs text-[#B0B0B0] mt-1">kg de basura recolectados</p>
            </motion.div>

            <motion.div
              key={`bot-${bottles}`}
              initial={{ scale: 0.9, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center p-5 rounded-xl bg-[#0a1a0f] border border-[#00C875]/10"
            >
              <Recycle className="mx-auto mb-2 text-[#D4AF37]" size={28} />
              <div className="font-display font-black text-2xl">{bottles.toLocaleString('es-MX')}</div>
              <p className="text-xs text-[#B0B0B0] mt-1">botellas PET 500ml equivalentes</p>
            </motion.div>

            <motion.div
              key={`area-${area}`}
              initial={{ scale: 0.9, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center p-5 rounded-xl bg-[#0a1a0f] border border-[#00C875]/10"
            >
              <Waves className="mx-auto mb-2 text-[#0077B6]" size={28} />
              <div className="font-display font-black text-2xl">{area.toLocaleString('es-MX')}</div>
              <p className="text-xs text-[#B0B0B0] mt-1">m² de agua limpiada</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
