'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Droplets, Thermometer, Waves, Wind, FlaskConical, Pause, Play } from 'lucide-react';

/**
 * Monitoreo de parámetros del agua (SIMULADO).
 * Representa las lecturas de los sensores del robot en una pecera de pruebas:
 * valores estables con variaciones mínimas alrededor de un punto base.
 * Cuando los sensores reales envíen datos, basta con reemplazar `nextReading`
 * por la lectura que llegue del ESP32 / API.
 */

type ParamKey = 'temp' | 'ph' | 'od' | 'tds' | 'turb';

type Param = {
  key: ParamKey;
  label: string;
  unit: string;
  icon: typeof Activity;
  color: string;
  base: number;      // valor típico en la pecera
  noise: number;     // variación máxima por lectura
  decimals: number;
  ideal: [number, number];   // rango óptimo para peces de agua dulce
  scale: [number, number];   // escala de la barra
  sensor: string;
};

const PARAMS: Param[] = [
  { key: 'temp', label: 'Temperatura', unit: '°C', icon: Thermometer, color: '#F59E0B', base: 25.6, noise: 0.04, decimals: 1, ideal: [24, 28], scale: [20, 32], sensor: 'Sonda de temperatura sumergible' },
  { key: 'ph', label: 'pH', unit: '', icon: FlaskConical, color: '#00C875', base: 7.18, noise: 0.012, decimals: 2, ideal: [6.5, 8.0], scale: [5, 9], sensor: 'Sonda de pH' },
  { key: 'od', label: 'Oxígeno disuelto', unit: 'mg/L', icon: Wind, color: '#38BDF8', base: 7.4, noise: 0.03, decimals: 2, ideal: [6, 9], scale: [3, 10], sensor: 'Sonda de oxígeno disuelto' },
  { key: 'tds', label: 'Sólidos disueltos (TDS)', unit: 'ppm', icon: Droplets, color: '#A78BFA', base: 218, noise: 0.8, decimals: 0, ideal: [100, 400], scale: [0, 600], sensor: 'Sensor TDS' },
  { key: 'turb', label: 'Turbidez', unit: 'NTU', icon: Waves, color: '#D4AF37', base: 2.6, noise: 0.06, decimals: 1, ideal: [0, 5], scale: [0, 15], sensor: 'Sensor de turbidez óptico' },
];

const HISTORY = 60;      // lecturas en la gráfica
const INTERVAL_MS = 2000; // una lectura cada 2 s

type Readings = Record<ParamKey, number[]>;

// Paseo aleatorio que regresa suavemente al valor base (variaciones mínimas).
function nextReading(p: Param, prev: number) {
  const pull = (p.base - prev) * 0.15;
  const jitter = (Math.random() * 2 - 1) * p.noise;
  return prev + pull + jitter;
}

function seedHistory(): Readings {
  const out = {} as Readings;
  for (const p of PARAMS) {
    const arr: number[] = [];
    let v = p.base;
    for (let i = 0; i < HISTORY; i++) { v = nextReading(p, v); arr.push(v); }
    out[p.key] = arr;
  }
  return out;
}

const last = (a: number[] | undefined, n = 1) => (a ? a[a.length - n] : undefined);

function fmt(p: Param, v: number) {
  return v.toFixed(p.decimals);
}

function Sparkline({ data, color, minSpan, height = 44 }: { data: number[]; color: string; minSpan: number; height?: number }) {
  const w = 200;
  const lo = Math.min(...data), hi = Math.max(...data);
  const span = Math.max(hi - lo, minSpan);
  const min = (lo + hi) / 2 - span / 2;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${height - 4 - ((v - min) / span) * (height - 8)}`);
  const line = `M${pts.join(' L')}`;
  const area = `${line} L${w},${height} L0,${height} Z`;
  const gid = `g-${color.replace('#', '')}`;
  return (
    <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" className="w-full" style={{ height }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.8" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  );
}

function BigChart({ p, data }: { p: Param; data: number[] }) {
  const box = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(640);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => e && setW(Math.max(260, Math.round(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const h = w < 500 ? 190 : 230, padL = 48, padB = 22, padT = 10;
  const min = Math.min(...data), max = Math.max(...data);
  const mid = (min + max) / 2;
  const half = Math.max((max - min) / 2, p.noise * 4) * 1.25;
  const lo = mid - half, hi = mid + half;
  const x = (i: number) => padL + (i / (data.length - 1)) * (w - padL - 8);
  const y = (v: number) => padT + (1 - (v - lo) / (hi - lo)) * (h - padT - padB);
  const line = data.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const ticks = [lo, mid, hi];
  const last = data[data.length - 1] ?? p.base;
  return (
    <div ref={box} className="w-full min-w-0 overflow-hidden">
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="block" role="img" aria-label={`Gráfica de ${p.label}`}>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={padL} x2={w - 8} y1={y(t)} y2={y(t)} stroke="#1a1a2e" />
          <text x={padL - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#808080" fontFamily="var(--font-mono)">{t.toFixed(p.decimals + (p.decimals < 2 ? 1 : 0))}</text>
        </g>
      ))}
      <text x={padL} y={h - 4} fontSize="11" fill="#808080">hace 2 min</text>
      <text x={w - 8} y={h - 4} fontSize="11" fill="#808080" textAnchor="end">ahora</text>
      <path d={line} fill="none" stroke={p.color} strokeWidth="2.2" strokeLinejoin="round" />
      <circle cx={x(data.length - 1)} cy={y(last)} r="4.5" fill={p.color} />
      <circle cx={x(data.length - 1)} cy={y(last)} r="9" fill={p.color} opacity="0.2">
        <animate attributeName="r" values="5;11;5" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
    </div>
  );
}

export default function WaterMonitorSection() {
  const [data, setData] = useState<Readings | null>(null);
  const [selected, setSelected] = useState<ParamKey>('temp');
  const [running, setRunning] = useState(true);
  const [time, setTime] = useState('');
  const ref = useRef<HTMLElement>(null);
  const [onScreen, setOnScreen] = useState(false);

  // Se genera en el navegador para evitar diferencias con el render del servidor.
  useEffect(() => { setData(seedHistory()); }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setOnScreen(!!e?.isIntersecting), { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!running || !onScreen) return;
    const tick = () => {
      setData((d) => {
        if (!d) return d;
        const n = {} as Readings;
        for (const p of PARAMS) {
          const arr = d[p.key];
          n[p.key] = [...arr.slice(1), nextReading(p, arr[arr.length - 1] ?? p.base)];
        }
        return n;
      });
      setTime(new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    tick();
    const id = setInterval(tick, INTERVAL_MS);
    return () => clearInterval(id);
  }, [running, onScreen]);

  const sel = PARAMS.find((p) => p.key === selected)!;
  const stats = useMemo(() => {
    if (!data) return null;
    const arr = data[selected];
    return {
      min: Math.min(...arr),
      max: Math.max(...arr),
      avg: arr.reduce((a, b) => a + b, 0) / arr.length,
    };
  }, [data, selected]);

  const allOk = data ? PARAMS.every((p) => { const v = last(data[p.key])!; return v >= p.ideal[0] && v <= p.ideal[1]; }) : true;

  return (
    <section id="monitoreo" ref={ref} className="py-24 bg-[#08080d]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] text-sm font-medium mb-4">
            <Activity className="inline mr-2" size={16} />
            Monitoreo IoT
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight mb-4">
            Calidad del agua <span className="text-gradient-green">en tiempo real</span>
          </h2>
          <p className="text-[#B0B0B0] max-w-2xl mx-auto">
            Los sensores de CHENEK BALAM miden los parámetros del agua mientras navega y los envían al panel de control.
          </p>
        </motion.div>

        {/* Barra de estado */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 px-4 py-3 rounded-xl bg-[#111122]/70 border border-[#1a1a2e]">
          <div className="flex items-center gap-3 text-sm">
            <span className="relative flex h-2.5 w-2.5">
              {running && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C875] opacity-60" />}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${running ? 'bg-[#00C875]' : 'bg-[#808080]'}`} />
            </span>
            <span className="font-semibold">{running ? 'EN VIVO' : 'EN PAUSA'}</span>
            <span className="text-[#808080] hidden sm:inline">· Pecera de pruebas · lectura cada 2 s</span>
            {time && <span className="font-mono text-xs text-[#808080]">{time}</span>}
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${allOk ? 'bg-[#00C875]/15 text-[#00C875]' : 'bg-amber-500/15 text-amber-400'}`}>
              {allOk ? 'Agua en condiciones óptimas' : 'Revisar parámetros'}
            </span>
            <button
              onClick={() => setRunning((r) => !r)}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-[#1a1a2e] hover:border-[#00C875]/40 text-[#B0B0B0] hover:text-[#F0F0F0] transition-colors"
              aria-label={running ? 'Pausar monitoreo' : 'Reanudar monitoreo'}
            >
              {running ? <Pause size={13} /> : <Play size={13} />} {running ? 'Pausar' : 'Reanudar'}
            </button>
          </div>
        </div>

        {/* Tarjetas */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-5">
          {PARAMS.map((p) => {
            const arr = data?.[p.key];
            const v = last(arr) ?? p.base;
            const prev = last(arr, 2) ?? v;
            const diff = v - prev;
            const ok = v >= p.ideal[0] && v <= p.ideal[1];
            const active = p.key === selected;
            return (
              <button
                key={p.key}
                onClick={() => setSelected(p.key)}
                className={`text-left p-4 rounded-xl border transition-all ${active ? 'bg-[#111122] border-[color:var(--c)]' : 'bg-[#111122]/50 border-[#1a1a2e] hover:border-[#2a2a3e]'} ${p.key === 'turb' ? 'col-span-2 lg:col-span-1' : ''}`}
                style={{ ['--c' as string]: p.color }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5 text-xs text-[#B0B0B0]">
                    <p.icon size={14} style={{ color: p.color }} /> {p.label}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${ok ? 'bg-[#00C875]' : 'bg-amber-400'}`} title={ok ? 'En rango' : 'Fuera de rango'} />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono font-bold text-2xl tabular-nums">{fmt(p, v)}</span>
                  <span className="text-xs text-[#808080]">{p.unit}</span>
                  <span className={`ml-auto hidden sm:inline font-mono text-[10px] tabular-nums ${Math.abs(diff) < p.noise / 10 ? 'text-[#808080]' : diff > 0 ? 'text-[#00C875]' : 'text-[#38BDF8]'}`}>
                    {diff >= 0 ? '▲' : '▼'} {Math.abs(diff).toFixed(p.decimals === 0 ? 1 : p.decimals + 1)}
                  </span>
                </div>
                <div className="mt-2">{arr && <Sparkline data={arr} color={p.color} minSpan={p.noise * 12} />}</div>
              </button>
            );
          })}
        </div>

        {/* Detalle del parámetro seleccionado */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-4">
          <div className="min-w-0 p-5 rounded-2xl bg-[#111122]/60 border border-[#1a1a2e]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold flex items-center gap-2">
                <sel.icon size={18} style={{ color: sel.color }} /> {sel.label}
                {sel.unit && <span className="text-sm font-normal text-[#808080]">({sel.unit})</span>}
              </h3>
              <span className="text-xs text-[#808080]">Últimos 2 minutos</span>
            </div>
            {data && <BigChart p={sel} data={data[selected]} />}
          </div>

          <div className="min-w-0 p-5 rounded-2xl bg-[#111122]/60 border border-[#1a1a2e] flex flex-col gap-4">
            {stats && (
              <div className="grid grid-cols-3 gap-2 text-center">
                {([['Mín', stats.min], ['Prom', stats.avg], ['Máx', stats.max]] as const).map(([l, v]) => (
                  <div key={l} className="rounded-lg bg-[#0A0A0F] py-2">
                    <div className="text-[10px] uppercase tracking-wider text-[#808080]">{l}</div>
                    <div className="font-mono font-bold tabular-nums">{fmt(sel, v)}</div>
                  </div>
                ))}
              </div>
            )}

            <div>
              <div className="flex justify-between text-xs text-[#B0B0B0] mb-1.5">
                <span>Rango óptimo</span>
                <span className="font-mono">{sel.ideal[0]} – {sel.ideal[1]} {sel.unit}</span>
              </div>
              {(() => {
                const [s0, s1] = sel.scale;
                const pct = (v: number) => `${Math.min(100, Math.max(0, ((v - s0) / (s1 - s0)) * 100))}%`;
                const cur = last(data?.[selected]) ?? sel.base;
                return (
                  <div className="relative h-2.5 rounded-full bg-[#1a1a2e]">
                    <div className="absolute h-full rounded-full bg-[#00C875]/35" style={{ left: pct(sel.ideal[0]), width: `calc(${pct(sel.ideal[1])} - ${pct(sel.ideal[0])})` }} />
                    <div className="absolute -top-1 w-1.5 h-[18px] rounded-full bg-white shadow transition-all duration-700" style={{ left: `calc(${pct(cur)} - 3px)` }} />
                  </div>
                );
              })()}
              <div className="flex justify-between text-[10px] text-[#808080] mt-1 font-mono">
                <span>{sel.scale[0]}</span><span>{sel.scale[1]}</span>
              </div>
            </div>

            <div className="text-xs text-[#B0B0B0] space-y-1.5 border-t border-[#1a1a2e] pt-3">
              <p><span className="text-[#808080]">Sensor:</span> {sel.sensor}</p>
              <p><span className="text-[#808080]">Transmisión:</span> ESP32 → MQTT → panel web</p>
              <p><span className="text-[#808080]">Frecuencia:</span> 1 lectura cada 2 segundos</p>
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-[11px] text-[#777]">
          Datos simulados de demostración que representan las condiciones de una pecera de pruebas. Se reemplazarán por las lecturas reales de los sensores del robot.
        </p>
      </div>
    </section>
  );
}
