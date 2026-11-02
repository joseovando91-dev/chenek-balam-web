'use client';
import { CONTACT, whatsappLink } from '@/lib/contact';

export function WhatsAppIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.42 9.42 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44a9.4 9.4 0 0 1 6.68 2.77 9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.45 9.44m8.04-17.48A11.3 11.3 0 0 0 12.04.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.95 1.52 5.67L.58 23.6l6.03-1.58a11.33 11.33 0 0 0 5.43 1.38h.01c6.26 0 11.36-5.1 11.36-11.36 0-3.03-1.18-5.89-3.32-8.03" />
    </svg>
  );
}

function InstagramIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21.9v-7.5h2.5l.4-3h-2.9V9.5c0-.86.24-1.45 1.48-1.45h1.58V5.37a21 21 0 0 0-2.3-.12c-2.28 0-3.84 1.39-3.84 3.95v2.2H7.85v3h2.57v7.5H13.5z" />
    </svg>
  );
}

const btn =
  'group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform';

function Tooltip({ text }: { text: string }) {
  return (
    <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-[#111122] border border-[#1a1a2e] px-2.5 py-1 text-xs text-[#F0F0F0] opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
      {text}
    </span>
  );
}

/** Botones flotantes de redes sociales (esquina inferior izquierda). */
export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-5 left-5 z-40 flex flex-col gap-3">
      <a
        href={CONTACT.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Síguenos en Instagram"
        className={`${btn} shadow-[#DD2A7B]/30`}
        style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}
      >
        <InstagramIcon className="w-6 h-6 sm:w-7 sm:h-7" />
        <Tooltip text={`Instagram ${CONTACT.instagramLabel}`} />
      </a>
      <a
        href={CONTACT.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Síguenos en Facebook"
        className={`${btn} bg-[#1877F2] shadow-[#1877F2]/30`}
      >
        <FacebookIcon className="w-7 h-7 sm:w-8 sm:h-8" />
        <Tooltip text={`Facebook · ${CONTACT.facebookLabel}`} />
      </a>
      <a
        href={whatsappLink(CONTACT.whatsappGreeting)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className={`${btn} bg-[#25D366] shadow-[#25D366]/30`}
      >
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7" />
        <Tooltip text={`WhatsApp ${CONTACT.phoneDisplay}`} />
      </a>
    </div>
  );
}
