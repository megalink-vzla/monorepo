import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'MegaLink — Telecomunicaciones, Videovigilancia y Redes Empresariales',
  description:
    'Ingeniería en videovigilancia CCTV/IP, redes de datos con cableado estructurado certificado y soluciones Wi-Fi de alta cobertura y densidad en Venezuela.',
  keywords: [
    'MegaLink',
    'CCTV Venezuela',
    'Videovigilancia IP',
    'Cableado Estructurado',
    'Redes Corporativas',
    'Wi-Fi Empresarial',
    'Telecomunicaciones Venezuela',
    'Site Survey',
  ],
  authors: [{ name: 'MegaLink Telecomunicaciones' }],
  creator: 'MegaLink',
  openGraph: {
    title: 'MegaLink — Telecomunicaciones, Videovigilancia y Redes Empresariales',
    description:
      'Ingeniería en videovigilancia CCTV/IP, redes de datos con cableado estructurado certificado y soluciones Wi-Fi de alta cobertura y densidad.',
    type: 'website',
    locale: 'es_VE',
    siteName: 'MegaLink',
    images: [
      {
        url: '/images/hero_network_infrastructure_1794936139485.jpg',
        width: 1200,
        height: 630,
        alt: 'MegaLink Infraestructura de Redes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MegaLink — Telecomunicaciones, Videovigilancia y Redes Empresariales',
    description:
      'Ingeniería en videovigilancia CCTV/IP, redes de datos con cableado estructurado certificado y soluciones Wi-Fi corporativas.',
    images: ['/images/hero_network_infrastructure_1794936139485.jpg'],
  },
  icons: {
    icon: '/assets/aistudio/logo-megalink-06_3f254d85.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`scroll-smooth ${inter.variable}`}>
      <body className="bg-white text-[#111827] antialiased selection:bg-[#00519E] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}

