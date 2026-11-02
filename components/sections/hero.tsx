'use client';
import LogoBadge from '@/components/logo-badge';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; r: number; vy: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        vy: -(Math.random() * 0.5 + 0.2),
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 200, 117, ${p.alpha})`;
        ctx.fill();
        p.y += p.vy;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const scrollToNext = () => {
    document.querySelector('#contadores')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/real/proto-water.jpg"
          alt="Prototipo Chenek Balam navegando sobre el agua"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/85 via-[#0A0A0F]/75 to-[#0A0A0F]" />
      </div>

      {/* Particle canvas */}
      <canvas ref={canvasRef} id="particle-canvas" className="absolute inset-0 z-[1]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6"
        >
          <LogoBadge className="w-32 h-32 sm:w-40 sm:h-40 mx-auto border-2 border-[#00C875]/30 bg-glow-green" />
        </motion.div>

        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight mb-4"
        >
          <span className="text-gradient-green">CHENEK</span>{' '}
          <span className="text-[#F0F0F0]">BALAM</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-display text-lg sm:text-xl md:text-2xl text-[#B0B0B0] mb-8 tracking-tight"
        >
          El jaguar que guarda el agua de Chiapas
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => document.querySelector('#solucion')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-[#00C875] text-[#0A0A0F] font-bold rounded-lg hover:bg-[#00E896] transition-all duration-200 hover:shadow-lg hover:shadow-[#00C875]/20"
          >
            Conocer el Proyecto
          </button>
          <button
            onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] font-bold rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-200"
          >
            Solicitar Demostración
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 z-10 text-[#00C875]/60 hover:text-[#00C875]"
        aria-label="Scroll hacia abajo"
      >
        <ChevronDown size={36} />
      </motion.button>
    </section>
  );
}
