/* eslint-disable @next/next/no-img-element */

/**
 * Logotipo dentro de un contenedor centrado con margen interno para que el
 * jaguar y la leyenda "CHENEK BALAM" queden completos, sin recortes.
 */
export default function LogoBadge({ className = '', rounded = 'rounded-full' }: { className?: string; rounded?: string }) {
  const pad = rounded === 'rounded-full' ? 14 : 8; // % por lado
  return (
    <div className={`relative overflow-hidden bg-[#EAE3D1] flex-shrink-0 ${rounded} ${className}`}>
      <img
        src="/logo-jaguar.jpg"
        alt="Logo Chenek Balam"
        className="absolute object-contain"
        style={{ top: `${pad}%`, left: `${pad}%`, width: `${100 - 2 * pad}%`, height: `${100 - 2 * pad}%` }}
      />
    </div>
  );
}
