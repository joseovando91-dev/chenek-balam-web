'use client';
import LogoBadge from '@/components/logo-badge';
import { CONTACT } from '@/lib/contact';
import Image from 'next/image';

const links = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#solucion', label: 'Solución' },
  { href: '#modelos', label: 'Modelos' },
  { href: '#logros', label: 'Logros' },
  { href: '#equipo', label: 'Equipo' },
  { href: '#contacto', label: 'Contacto' },
];

export default function FooterSection() {
  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-[#060610] border-t border-[#1a1a2e]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + name */}
          <div className="flex items-center gap-3">
            <LogoBadge className="w-10 h-10" />
            <div>
              <span className="font-display font-bold text-sm">CHENEK BALAM</span>
              <p className="text-xs text-[#B0B0B0]">El jaguar que guarda el agua</p>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-4">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleClick(l.href)}
                className="text-xs text-[#B0B0B0] hover:text-[#00C875] transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[#B0B0B0]">
          <a href={`tel:${CONTACT.phoneTel}`} className="hover:text-[#00C875]">Tel. / WhatsApp: {CONTACT.phoneDisplay}</a>
          <a href={`mailto:${CONTACT.email}`} className="hover:text-[#00C875]">{CONTACT.email}</a>
          <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#00C875]">Instagram: {CONTACT.instagramLabel}</a>
          <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-[#00C875]">Facebook: {CONTACT.facebookLabel}</a>
        </div>

        <div className="mt-6 pt-6 border-t border-[#1a1a2e] text-center">
          <p className="text-xs text-[#555]">
            Desarrollado en TecNM Tuxtla Gutiérrez — Chiapas, México
          </p>
          <p className="text-xs text-[#333] mt-1" suppressHydrationWarning>
            © 2026 Chenek Balam. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
