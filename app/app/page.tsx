'use client';
import LogoBadge from '@/components/logo-badge';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Battery, Gauge, Droplets, MapPin, Wifi, Satellite, Radio, Camera,
  Thermometer, Wind, Activity, Navigation2, Power, ChevronLeft, Download,
  AlertTriangle, Waves, Recycle, TriangleAlert,
} from 'lucide-react';
import { useInstallPrompt } from '@/components/pwa/use-install-prompt';
import RobotModels from '@/components/pwa/robot-models';

function clamp(v: number, min: number, max: number) { return Math.min(max, Math.max(min, v)); }

export default function ControlApp() {
  const { canInstall, isStandalone, promptInstall } = useInstallPrompt();
  const [mode, setMode] = useState<'manual' | 'auto'>('auto');
  const [throttle, setThrottle] = useState(45);

  // Live-ish telemetry (deterministic initial values -> SSR-safe)
  const [battery, setBattery] = useState(78);
  const [voltage, setVoltage] = useState(24.6);
  const [speed, setSpeed] = useState(1.4);
  const [collected, setCollected] = useState(63.5);
  const [meshFill, setMeshFill] = useState(52);
  const [ph, setPh] = useState(7.3);
  const [turbidity, setTurbidity] = useState(18);
  const [temp, setTemp] = useState(26.4);
  const [oxygen, setOxygen] = useState(6.8);
  const [tds, setTds] = useState(240);
  const [heading, setHeading] = useState(128);
  const [distance, setDistance] = useState(2.3);
  const [motorTemp, setMotorTemp] = useState(38);
  const [signal, setSignal] = useState(82);
  const [sats, setSats] = useState(11);
  const [dotPos, setDotPos] = useState({ x: 40, y: 55 });

  useEffect(() => {
    const id = setInterval(() => {
      const w = (base: number, amp: number, min: number, max: number) =>
        clamp(base + (Math.random() - 0.5) * amp, min, max);
      setSpeed((s) => parseFloat(w(s, 0.3 * (throttle / 50), 0, 3.2).toFixed(2)));
      setBattery((b) => clamp(b - Math.random() * 0.05, 5, 100));
      setVoltage((v) => parseFloat(w(v, 0.1, 22, 25.2).toFixed(1)));
      setCollected((c) => parseFloat((c + Math.random() * 0.12).toFixed(1)));
      setMeshFill((m) => clamp(m + Math.random() * 0.08, 0, 100));
      setPh((p) => parseFloat(w(p, 0.08, 6.5, 8.5).toFixed(2)));
      setTurbidity((t) => parseFloat(w(t, 1.2, 5, 40).toFixed(0)));
      setTemp((t) => parseFloat(w(t, 0.15, 24, 29).toFixed(1)));
      setOxygen((o) => parseFloat(w(o, 0.12, 4, 9).toFixed(1)));
      setTds((t) => parseFloat(w(t, 6, 150, 400).toFixed(0)));
      setHeading((h) => Math.round(w(h, 6, 0, 359)));
      setDistance((d) => parseFloat((d + Math.random() * 0.01).toFixed(2)));
      setMotorTemp((t) => parseFloat(w(t, 0.6, 30, 55).toFixed(0)));
      setSignal((s) => Math.round(w(s, 4, 55, 100)));
      setSats((s) => Math.round(w(s, 0.6, 8, 14)));
      setDotPos((p) => ({
        x: clamp(p.x + (Math.random() - 0.5) * 2.5, 12, 88),
        y: clamp(p.y + (Math.random() - 0.5) * 2.5, 12, 88),
      }));
    }, 1500);
    return () => clearInterval(id);
  }, [throttle]);

  const runtime = Math.round((battery / 100) * 210); // minutes estimate

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#06060c] text-[#F0F0F0] pb-10">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#06060c]/90 backdrop-blur-md border-b border-[#1a1a2e] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <LogoBadge className="w-9 h-9" rounded="rounded-lg" />
            <div>
              <div className="font-display font-bold text-sm leading-tight">CHENEK BALAM</div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C875] animate-pulse" />
                <span className="text-[10px] text-[#00C875]">En línea · Unidad #01</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[#B0B0B0]">
            <div className="flex items-center gap-1" title="Señal 4G">
              <Wifi size={15} className="text-[#00C875]" />
              <span className="text-[10px] font-mono">{signal}%</span>
            </div>
            <div className="flex items-center gap-1" title="Satélites GPS">
              <Satellite size={15} className="text-[#00C875]" />
              <span className="text-[10px] font-mono">{sats}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 space-y-4 pt-4">
        {/* Back + install */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 text-xs text-[#808080] hover:text-[#00C875]">
            <ChevronLeft size={14} /> Sitio web
          </Link>
          {!isStandalone && (
            <button
              onClick={() => { promptInstall(); }}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-[#00C875]/10 text-[#00C875] border border-[#00C875]/30"
            >
              <Download size={13} /> {canInstall ? 'Instalar app' : 'Agregar a inicio'}
            </button>
          )}
        </div>

        {/* Modelos 3D */}
        <RobotModels />

        {/* Camera live view */}
        <div className="relative rounded-2xl overflow-hidden border border-[#1a1a2e] aspect-video bg-[#0d0d1a]">
          <Image src="/real/proto-action.jpg" alt="Vista de cámara" fill className="object-cover opacity-80" sizes="(max-width: 768px) 100vw, 448px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06060c] via-transparent to-transparent" />
          {/* scanning line */}
          <div className="absolute left-0 right-0 h-0.5 bg-[#00C875]/60 animate-[scan_3s_linear_infinite]" style={{ top: '30%' }} />
          <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/60">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-mono text-white">EN VIVO</span>
          </div>
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/60">
            <Camera size={12} className="text-[#00C875]" />
            <span className="text-[10px] font-mono text-[#B0B0B0]">Cámara IA · detección activa</span>
          </div>
        </div>

        {/* Mode toggle */}
        <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#111122] border border-[#1a1a2e]">
          {(['auto', 'manual'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`py-2 rounded-lg text-sm font-bold transition-all ${
                mode === m ? 'bg-[#00C875] text-[#06060c]' : 'text-[#808080]'
              }`}
            >
              {m === 'auto' ? 'Autónomo' : 'Manual'}
            </button>
          ))}
        </div>

        {/* Primary stats */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon={Battery} color="#00C875" label="Batería" value={`${Math.round(battery)}%`} sub={`${runtime} min`} />
          <StatCard icon={Gauge} color="#0077B6" label="Velocidad" value={`${speed.toFixed(1)}`} sub="m/s" />
          <StatCard icon={Recycle} color="#D4AF37" label="Recolectado" value={`${collected.toFixed(0)}`} sub="kg" />
        </div>

        {/* Speed control */}
        <Panel title="Control de velocidad" icon={Navigation2}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#808080]">Aceleración</span>
            <span className="font-mono text-sm text-[#00C875]">{throttle}%</span>
          </div>
          <input
            type="range" min={0} max={100} value={throttle}
            onChange={(e) => setThrottle(parseInt(e.target.value))}
            disabled={mode === 'auto'}
            className="w-full accent-[#00C875] disabled:opacity-40"
          />
          <div className="flex justify-between text-[10px] text-[#606060] mt-1">
            <span>Detenido</span><span>Crucero</span><span>Máx</span>
          </div>
          {mode === 'auto' && (
            <p className="text-[10px] text-[#D4AF37] mt-2 flex items-center gap-1">
              <AlertTriangle size={11} /> En modo autónomo el robot regula su velocidad.
            </p>
          )}
        </Panel>

        {/* Water quality */}
        <Panel title="Calidad del agua" icon={Droplets}>
          <div className="grid grid-cols-2 gap-3">
            <Metric icon={Waves} label="pH" value={ph.toFixed(1)} status={ph >= 6.5 && ph <= 8.5 ? 'ok' : 'warn'} />
            <Metric icon={Wind} label="Turbidez" value={`${turbidity} NTU`} status={turbidity < 25 ? 'ok' : 'warn'} />
            <Metric icon={Thermometer} label="Temp. agua" value={`${temp.toFixed(1)}°C`} status="ok" />
            <Metric icon={Activity} label="Oxígeno" value={`${oxygen.toFixed(1)} mg/L`} status={oxygen > 5 ? 'ok' : 'warn'} />
            <Metric icon={Droplets} label="TDS" value={`${tds} ppm`} status={tds < 350 ? 'ok' : 'warn'} />
            <Metric icon={Thermometer} label="Temp. motor" value={`${motorTemp}°C`} status={motorTemp < 50 ? 'ok' : 'warn'} />
          </div>
        </Panel>

        {/* Collection classification */}
        <Panel title="Clasificación de residuos" icon={Recycle}>
          <Bar label="Plástico" pct={58} color="#00C875" />
          <Bar label="Orgánico" pct={22} color="#D4AF37" />
          <Bar label="Metal" pct={11} color="#0077B6" />
          <Bar label="Otros" pct={9} color="#808080" />
          <div className="mt-3 pt-3 border-t border-[#1a1a2e] flex items-center justify-between">
            <span className="text-xs text-[#808080]">Llenado de malla</span>
            <span className="font-mono text-sm text-[#D4AF37]">{Math.round(meshFill)}%</span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-[#1a1a2e] overflow-hidden">
            <div className="h-full rounded-full bg-[#D4AF37] transition-all duration-700" style={{ width: `${meshFill}%` }} />
          </div>
          {meshFill > 85 && (
            <p className="text-[10px] text-[#D4AF37] mt-2 flex items-center gap-1">
              <TriangleAlert size={11} /> Malla casi llena — regresar a punto de descarga.
            </p>
          )}
        </Panel>

        {/* Navigation / map */}
        <Panel title="Navegación" icon={MapPin}>
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#0a0a14] border border-[#1a1a2e]">
            {/* stylized water map */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#15223a" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <path d="M0,40 Q80,20 160,60 T360,50" fill="none" stroke="#0077B6" strokeWidth="18" opacity="0.25" />
            </svg>
            <div
              className="absolute w-4 h-4 -ml-2 -mt-2 transition-all duration-1000 ease-linear"
              style={{ left: `${dotPos.x}%`, top: `${dotPos.y}%` }}
            >
              <span className="absolute inset-0 rounded-full bg-[#00C875] animate-ping opacity-60" />
              <span className="absolute inset-0 rounded-full bg-[#00C875] border-2 border-white/80" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3 text-center">
            <div><div className="font-mono text-sm text-[#00C875]">{heading}°</div><div className="text-[10px] text-[#808080]">Rumbo</div></div>
            <div><div className="font-mono text-sm text-[#00C875]">{distance.toFixed(2)} km</div><div className="text-[10px] text-[#808080]">Recorrido</div></div>
            <div><div className="font-mono text-sm text-[#00C875]">16.75, -93.11</div><div className="text-[10px] text-[#808080]">GPS</div></div>
          </div>
        </Panel>

        {/* Connectivity */}
        <Panel title="Conectividad" icon={Radio}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <LinkStat icon={Radio} label="RF + ESP32" value="Activo" ok />
            <LinkStat icon={Wifi} label="4G LTE" value={`${signal}%`} ok={signal > 60} />
            <LinkStat icon={Radio} label="LoRa" value="En pruebas" ok={false} />
            <LinkStat icon={Satellite} label="GPS" value={`${sats} sats`} ok={sats >= 8} />
          </div>
          <div className="mt-3 pt-3 border-t border-[#1a1a2e] flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs text-[#808080]"><Battery size={14} className="text-[#00C875]" /> Voltaje batería</span>
            <span className="font-mono text-sm text-[#00C875]">{voltage.toFixed(1)} V</span>
          </div>
        </Panel>

        <p className="text-center text-[10px] text-[#606060] pt-2">
          CHENEK BALAM Control · Datos de demostración · TecNM Tuxtla Gutiérrez
        </p>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 8%; opacity: 0.2; }
          50% { opacity: 0.8; }
          100% { top: 85%; opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}

function StatCard({ icon: Icon, color, label, value, sub }: any) {
  return (
    <div className="p-3 rounded-xl bg-[#111122] border border-[#1a1a2e]">
      <Icon size={18} style={{ color }} />
      <div className="font-display font-black text-xl mt-1.5 leading-none">{value}</div>
      <div className="text-[10px] text-[#808080] mt-1">{label} · {sub}</div>
    </div>
  );
}

function Panel({ title, icon: Icon, children }: any) {
  return (
    <div className="p-4 rounded-2xl bg-[#0d0d1a] border border-[#1a1a2e]">
      <div className="flex items-center gap-2 mb-3">
        <Icon size={16} className="text-[#00C875]" />
        <h2 className="font-display font-bold text-sm">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Metric({ icon: Icon, label, value, status }: any) {
  const col = status === 'ok' ? '#00C875' : '#D4AF37';
  return (
    <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#111122]">
      <Icon size={16} style={{ color: col }} />
      <div>
        <div className="font-mono text-sm leading-none">{value}</div>
        <div className="text-[10px] text-[#808080] mt-0.5">{label}</div>
      </div>
    </div>
  );
}

function Bar({ label, pct, color }: any) {
  return (
    <div className="mb-2">
      <div className="flex justify-between text-[11px] mb-1">
        <span className="text-[#B0B0B0]">{label}</span>
        <span className="font-mono text-[#808080]">{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-[#1a1a2e] overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

function LinkStat({ icon: Icon, label, value, ok }: any) {
  return (
    <div className="p-2.5 rounded-lg bg-[#111122]">
      <Icon size={16} className="mx-auto" style={{ color: ok ? '#00C875' : '#808080' }} />
      <div className="font-mono text-xs mt-1">{value}</div>
      <div className="text-[10px] text-[#808080]">{label}</div>
    </div>
  );
}
