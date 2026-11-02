'use client';
import LogoBadge from '@/components/logo-badge';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#problema', label: 'Problema' },
  { href: '#solucion', label: 'Solución' },
  { href: '#diseno', label: 'Diseño' },
  { href: '#construccion', label: 'Construcción' },
  { href: '#modelos', label: 'Modelos' },
  { href: '#comparativa', label: 'Comparativa' },
  { href: '#competencias', label: 'Competencias' },
  { href: '#logros', label: 'Logros' },
  { href: '#normatividad', label: 'Normatividad' },
  { href: '#equipo', label: 'Equipo' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0A0A0F]/90 backdrop-blur-md shadow-lg border-b border-[#00C875]/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 h-16">
          <button onClick={() => handleClick('#inicio')} className="flex items-center gap-2">
            <LogoBadge className="w-10 h-10" />
            <span className="font-display font-bold text-lg tracking-tight whitespace-nowrap hidden sm:block xl:hidden 2xl:block">CHENEK BALAM</span>
          </button>

          <div className="hidden xl:flex items-center gap-3.5">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="text-[13px] whitespace-nowrap text-[#B0B0B0] hover:text-[#00C875] transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => window.dispatchEvent(new Event('open-app-modal'))}
              className="flex items-center gap-2 text-sm font-semibold whitespace-nowrap px-4 py-2 rounded-full bg-[#00C875] text-[#06060c] hover:bg-[#00e085] transition-colors duration-200"
            >
              <Download size={16} /> Descargar App
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 text-[#B0B0B0] hover:text-[#00C875]"
            aria-label="Menú"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0A0A0F]/95 backdrop-blur-lg pt-20 px-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className="text-xl text-[#F0F0F0] hover:text-[#00C875] transition-colors py-3 border-b border-[#1a1a2e] text-left"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  window.dispatchEvent(new Event('open-app-modal'));
                }}
                className="flex items-center justify-center gap-2 text-lg font-semibold py-3 mt-2 rounded-full bg-[#00C875] text-[#06060c]"
              >
                <Download size={20} /> Descargar App
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
