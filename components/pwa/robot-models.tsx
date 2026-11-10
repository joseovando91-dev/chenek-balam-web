'use client';
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { Check, Minus, Rotate3d } from 'lucide-react';

const MODELS = [
  {
    id: 'CHB01-27',
    name: 'Catamarán',
    img: '/app-models/chb01-27.webp',
    tagline: 'La plataforma probada, lista para equipar.',
  },
  {
    id: 'CHB02-27',
    name: 'Jaguar Inteligente',
    img: '/app-models/chb02-27.webp',
    tagline: 'El robot completo: recolecta, navega y mide la calidad del agua.',
  },
] as const;

const FEATURES: [string, boolean, boolean][] = [
  ['Catamarán de fibra de vidrio 3.31 × 1.69 m', true, true],
  ['Compartimentos estancos para electrónica', true, true],
  ['Figura de jaguar', false, true],
  ['Motores eléctricos y baterías de litio', false, true],
  ['Banda recolectora y báscula', false, true],
  ['GPS, control remoto y regreso a base', false, true],
  ['Cámara con IA que identifica basura', false, true],
  ['Sensores de calidad del agua y datos en la app', false, true],
];

export default function RobotModels() {
  const [sel, setSel] = useState(1);
  const m = MODELS[sel]!;
  return (
    <div className="rounded-2xl border border-[#1a1a2e] bg-[#0d0d1a] overflow-hidden">
      <div className="flex items-center justify-between px-4 pt-3">
        <h2 className="font-display font-bold text-sm flex items-center gap-2">
          <Rotate3d size={15} className="text-[#00C875]" /> Modelos 3D
        </h2>
        <span className="text-[10px] font-mono text-[#808080]">Línea CHB-27</span>
      </div>

      <div className="grid grid-cols-2 gap-2 p-3">
        {MODELS.map((x, i) => (
          <button
            key={x.id}
            onClick={() => setSel(i)}
            className={`rounded-xl px-2 py-2 text-left border transition-colors ${
              i === sel ? 'border-[#00C875] bg-[#00C875]/10' : 'border-[#1a1a2e] bg-[#111122]'
            }`}
          >
            <span className={`block font-mono text-xs font-bold ${i === sel ? 'text-[#00C875]' : 'text-[#B0B0B0]'}`}>{x.id}</span>
            <span className="block text-[11px] text-[#808080]">{x.name}</span>
          </button>
        ))}
      </div>

      <div
        className="relative mx-3 rounded-xl aspect-[4/3] flex items-center justify-center"
        style={{ background: 'radial-gradient(circle at 50% 60%, rgba(0,200,117,0.16), transparent 70%)' }}
      >
        <img key={m.img} src={m.img} alt={`Modelo 3D del ${m.id} ${m.name} girando`} className="max-w-[88%] max-h-[92%] object-contain drop-shadow-2xl" />
        <span className="absolute bottom-2 right-2 text-[10px] font-mono text-[#808080] bg-black/40 px-2 py-0.5 rounded">3D · 360°</span>
      </div>

      <div className="p-4 pt-3">
        <p className="font-display font-bold">{m.id} · <span className="text-[#00C875]">{m.name}</span></p>
        <p className="text-xs text-[#B0B0B0] mb-3">{m.tagline}</p>
        <ul className="space-y-1.5">
          {FEATURES.map(([label, a, b]) => {
            const has = sel === 0 ? a : b;
            return (
              <li key={label} className={`flex items-center gap-2 text-xs ${has ? 'text-[#F0F0F0]' : 'text-[#555]'}`}>
                {has ? <Check size={13} className="text-[#00C875] flex-shrink-0" /> : <Minus size={13} className="flex-shrink-0" />}
                {label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
