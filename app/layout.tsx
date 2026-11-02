import type { Metadata } from 'next';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource-variable/jetbrains-mono';
import './globals.css';
import ServiceWorkerRegister from '@/components/pwa/sw-register';
import GoogleAnalytics from '@/components/analytics/google-analytics';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://chenekbalam.vercel.app'),
  title: 'CHENEK BALAM — Robot Acuático Recolector de Basura',
  description: 'Robot catamarán de operación teleoperada y semi-autónoma, con hoja de ruta hacia autonomía total, que recolecta residuos flotantes en ríos y lagos de Chiapas, México. Desarrollado por estudiantes del TecNM Tuxtla Gutiérrez.',
  keywords: ['Chenek Balam', 'robot acuático', 'recolector basura', 'Chiapas', 'TecNM', 'INNOVATEC', 'Cañón del Sumidero'],
  openGraph: {
    title: 'CHENEK BALAM — El jaguar que guarda el agua de Chiapas',
    description: 'Robot catamarán teleoperado y semi-autónomo que recolecta residuos flotantes en ríos y lagos.',
    images: ['/og-image.png'],
    type: 'website',
    locale: 'es_MX',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/icons/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Chenek Balam',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans antialiased bg-[#0A0A0F] text-[#F0F0F0] overflow-x-hidden">
        {children}
        <ServiceWorkerRegister />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
