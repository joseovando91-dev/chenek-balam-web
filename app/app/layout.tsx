import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'CHENEK BALAM — Control',
  description: 'Panel de control y monitoreo del robot recolector CHENEK BALAM.',
};

export const viewport: Viewport = {
  themeColor: '#06060c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#06060c]">{children}</div>;
}
