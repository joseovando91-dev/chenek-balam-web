'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Model3D from '@/components/model-3d';
import { Cpu, Radio, Satellite, Wifi, Camera, BatteryCharging, Gauge, ShieldCheck } from 'lucide-react';

const parts = [
  { n: '01', title: 'Cascos gemelos tipo pontón', desc: 'Estructura catamaran en fibra de vidrio que brinda estabilidad ante oleaje y corrientes.' },
  { n: '02', title: 'Canal central de admisión', desc: 'El agua y los residuos flotantes entran por el canal entre los cascos hacia la malla.' },
  { n: '03', title: 'Malla trasera tipo canasta', desc: 'Almacena la basura recolectada; de fácil extracción y vaciado en tierra.' },
  { n: '04', title: 'Domo electrónico estanco IP68', desc: 'Encapsulado sellado con triple junta que protege la electrónica del agua.' },
  { n: '05', title: 'Propulsión eléctrica + integración solar', desc: 'Sistema de propulsión eléctrica actual con etapa de integración solar MPPT en desarrollo.' },
  { n: '06', title: 'Thrusters sumergibles', desc: 'Dos motores con ESCs impermeables para propulsión y maniobra precisa.' },
];

const comms = [
  { icon: Radio, title: 'Control remoto RF + ESP32', tag: 'Enlace primario actual', desc: 'Teleoperación por radiofrecuencia vinculada al microcontrolador ESP32 en caja estanca IP68. Es el enlace de control en operación hoy.' },
  { icon: Cpu, title: 'ESP32-S3 N16R8', tag: 'Controlador principal', desc: 'Doble núcleo con 16 MB flash y 8 MB PSRAM. Ejecuta el control en tiempo real y la lógica de navegación.' },
  { icon: Camera, title: 'IA en el borde (Edge AI)', tag: 'Visión', desc: 'Cámara con YOLOv8 para detección y clasificación a bordo en 4 categorías: plástico, metal, orgánico y otros.' },
  { icon: Radio, title: 'Telemetría LoRa SX1262', tag: 'En fase de homologación', desc: 'Enlace de bajo consumo y varios kilómetros para telemetría donde no hay cobertura celular. Actualmente en pruebas.' },
  { icon: Wifi, title: '4G LTE (SIM7670G)', tag: 'Enlace de datos IoT', desc: 'Transmisión de datos y comandos vía MQTT sobre TLS, con reconexión automática y failover.' },
  { icon: Satellite, title: 'GPS + Starlink (planeado)', tag: 'Ubicación y video', desc: 'Posicionamiento preciso y, a futuro, video en vivo vía satélite en zonas remotas.' },
  { icon: Gauge, title: 'Sensores de a bordo', tag: 'Telemetría', desc: 'IMU de 9 ejes, ultrasónicos de obstáculos, celda de carga HX711 y sonda de calidad del agua.' },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e?.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function EngineeringSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="ingenieria" ref={ref} className="py-24 bg-[#0A0A0F] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#00C875]/10 text-[#00C875] text-sm font-medium mb-4">
            Despiece Técnico
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight mb-4">
            Cada pieza con un <span className="text-gradient-green">propósito</span>
          </h2>
          <p className="text-[#B0B0B0] max-w-2xl mx-auto">
            Un rediseño enfocado en mejores protocolos de comunicación, electrónica más robusta y mantenimiento sencillo.
          </p>
        </motion.div>

        {/* Modelo 3D interactivo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative aspect-[4/3] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-[#1a1a2e] mb-8 bg-[#06060c]"
        >
          {visible && (
            <Model3D autoRotate cameraOrbit="35deg 70deg auto" className="block w-full h-full" style={{ width: '100%', height: '100%' }} />
          )}
          <p className="absolute bottom-3 left-0 right-0 text-center text-xs text-[#808080] pointer-events-none">
            Modelo 3D del diseño final · arrastra para girar
          </p>
        </motion.div>

        {/* Parts grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {parts.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
              className="p-5 rounded-xl bg-[#111122]/60 border border-[#1a1a2e] hover:border-[#00C875]/30 transition-all"
            >
              <div className="font-mono text-[#00C875]/60 text-sm mb-2">{p.n}</div>
              <h3 className="font-display font-bold text-base mb-1">{p.title}</h3>
              <p className="text-sm text-[#B0B0B0]">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Improved electronics / comms */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium mb-4">
            <ShieldCheck size={16} /> Electrónica y protocolos mejorados
          </span>
          <h3 className="font-display font-black text-2xl sm:text-4xl tracking-tight">
            Comunicación redundante y confiable
          </h3>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#1a1a2e] bg-[#06060c]"
          >
            <Image src="/models/chenek-balam-electronica.webp" alt="Caja estanca con la electrónica de control del robot CHENEK BALAM" fill className="object-cover" sizes="(max-width: 768px) 100vw, 550px" />
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {comms.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                className="p-4 rounded-xl bg-[#111122]/60 border border-[#1a1a2e] hover:border-[#D4AF37]/30 transition-all"
              >
                <c.icon className="text-[#D4AF37] mb-2" size={22} />
                <div className="text-[10px] uppercase tracking-wider text-[#D4AF37]/70 font-mono mb-1">{c.tag}</div>
                <h4 className="font-display font-bold text-sm mb-1">{c.title}</h4>
                <p className="text-xs text-[#B0B0B0]">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
