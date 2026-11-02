'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, CheckCircle, Phone, Instagram, Facebook, Clock } from 'lucide-react';
import { CONTACT, whatsappLink } from '@/lib/contact';
import { WhatsAppIcon } from '@/components/whatsapp-button';

const WATER_TYPES: Record<string, string> = {
  rio: 'Río', lago: 'Lago', presa: 'Presa', laguna: 'Laguna', costa: 'Zona costera', canal: 'Canal',
};
const INTERESTS: Record<string, string> = {
  demo: 'Solicitar demostración', cotizacion: 'Cotización', alianza: 'Alianza estratégica', prensa: 'Prensa',
};

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '', organization: '', email: '', phone: '',
    waterType: '', interest: '', message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      'Hola, equipo CHENEK BALAM. Les escribo desde su página web.',
      '',
      `*Nombre:* ${form.name}`,
      form.organization && `*Organización:* ${form.organization}`,
      form.email && `*Correo:* ${form.email}`,
      form.phone && `*Teléfono:* ${form.phone}`,
      form.waterType && `*Cuerpo de agua:* ${WATER_TYPES[form.waterType]}`,
      form.interest && `*Interés:* ${INTERESTS[form.interest]}`,
      form.message && `*Mensaje:* ${form.message}`,
    ].filter(Boolean);
    window.open(whatsappLink(lines.join('\n')), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const inputCls = 'w-full px-4 py-3 rounded-lg bg-[#111122] border border-[#1a1a2e] text-[#F0F0F0] placeholder-[#555] focus:border-[#00C875] focus:outline-none focus:ring-1 focus:ring-[#00C875]/30 transition-colors text-sm';

  const channels = [
    { icon: <WhatsAppIcon className="w-5 h-5" />, label: 'WhatsApp', value: CONTACT.phoneDisplay, href: whatsappLink(CONTACT.whatsappGreeting), color: '#25D366' },
    { icon: <Phone size={20} />, label: 'Teléfono', value: CONTACT.phoneDisplay, href: `tel:${CONTACT.phoneTel}`, color: '#00C875' },
    { icon: <Mail size={20} />, label: 'Correo', value: CONTACT.email, href: `mailto:${CONTACT.email}`, color: '#0077B6' },
    { icon: <Instagram size={20} />, label: 'Instagram', value: CONTACT.instagramLabel, href: CONTACT.instagram, color: '#E1306C' },
    { icon: <Facebook size={20} />, label: 'Facebook', value: CONTACT.facebookLabel, href: CONTACT.facebook, color: '#1877F2' },
  ];

  return (
    <section id="contacto" className="py-24 bg-[#0A0A0F]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#00C875]/10 text-[#00C875] text-sm font-medium mb-4">
            <Mail className="inline mr-2" size={16} />
            Contacto
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight mb-2">
            ¿Listo para <span className="text-gradient-green">limpiar</span> tu cuerpo de agua?
          </h2>
          <p className="text-[#B0B0B0]">Escríbenos por el canal que prefieras. Respondemos en menos de 24 horas.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6">
          {/* Canales directos */}
          <div className="space-y-3">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-[#111122]/60 border border-[#1a1a2e] hover:border-[#00C875]/40 transition-colors group"
              >
                <span
                  className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${c.color}1f`, color: c.color }}
                >
                  {c.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-[#B0B0B0]">{c.label}</span>
                  <span className="block font-medium text-sm text-[#F0F0F0] truncate group-hover:text-[#00C875] transition-colors">
                    {c.value}
                  </span>
                </span>
              </a>
            ))}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-[#00C875]/5 border border-[#00C875]/20 text-sm text-[#B0B0B0]">
              <Clock size={18} className="text-[#00C875] flex-shrink-0 mt-0.5" />
              <span>Te respondemos en <strong className="text-[#F0F0F0]">menos de 24 horas</strong>.</span>
            </div>
            <div className="flex items-center gap-2 px-1 text-sm text-[#B0B0B0]">
              <MapPin size={14} className="text-[#00C875]" />
              {CONTACT.location}
            </div>
          </div>

          {/* Formulario → WhatsApp */}
          {sent ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center p-10 rounded-2xl bg-[#111122]/80 border border-[#00C875]/20 flex flex-col items-center justify-center"
            >
              <CheckCircle className="text-[#00C875] mb-4" size={48} />
              <h3 className="font-display font-bold text-xl mb-2">¡Gracias por escribirnos!</h3>
              <p className="text-[#B0B0B0] max-w-sm">
                Se abrió WhatsApp con tu solicitud. Solo presiona <strong>Enviar</strong> en el chat.
                Te responderemos en menos de 24 horas.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 px-6 py-2 rounded-lg bg-[#00C875] text-[#0A0A0F] font-bold text-sm hover:bg-[#00E896] transition-colors"
              >
                Enviar otra solicitud
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-[#111122]/60 border border-[#1a1a2e] space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input required placeholder="Nombre completo *" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
                <input placeholder="Organización" value={form.organization}
                  onChange={(e) => setForm({ ...form, organization: e.target.value })} className={inputCls} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="email" placeholder="Correo electrónico" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
                <input placeholder="Teléfono" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <select value={form.waterType} onChange={(e) => setForm({ ...form, waterType: e.target.value })} className={inputCls}>
                  <option value="">Tipo de cuerpo de agua</option>
                  {Object.entries(WATER_TYPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
                <select value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} className={inputCls}>
                  <option value="">Nivel de interés</option>
                  {Object.entries(INTERESTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <textarea rows={4} placeholder="Mensaje (opcional)" value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputCls} />
              <p className="text-xs text-[#777]">
                Al presionar el botón se abrirá WhatsApp con tu solicitud lista para enviar. No guardamos tus datos en ningún servidor.
              </p>
              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-[#25D366] text-[#0A0A0F] font-bold text-base hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <Send size={18} /> Enviar solicitud por WhatsApp
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
