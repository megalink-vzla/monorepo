'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { MegalinkBrandMark } from './MegalinkBrandMark';

interface NavbarProps {
  onRequestQuote: () => void;
}

const NAV_LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#dimensionamiento', label: 'Dimensionamiento' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
];

export function Navbar({ onRequestQuote }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#D8D8D8]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Logo */}
        <a
          href="#inicio"
          className="flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB] rounded-sm"
          aria-label="MegaLink Inicio"
        >
          <MegalinkBrandMark variant="light" size="md" />
        </a>

        {/* Zone 2: Concise single-line nav links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#1C2541]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#2563EB] hover:text-[#2563EB] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+584122799653"
            className="hidden lg:inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E2E8F0] transition-colors tabular-nums"
          >
            VEN +58 412 279 9653
          </a>
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onRequestQuote}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#1C2541] hover:bg-[#2563EB] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
          >
            Solicitar Cotización
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#D8D8D8] text-[#111827] hover:bg-[#F1F5F9] transition-colors duration-150 cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-[#D8D8D8] px-4 py-4 space-y-2">
          <nav aria-label="Navegación móvil" className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="px-3 py-2.5 text-sm font-medium text-[#1C2541] rounded-lg hover:bg-[#F1F5F9] hover:text-[#2563EB] transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-[#D8D8D8]">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onRequestQuote();
              }}
              className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-[#1C2541] hover:bg-[#2563EB] rounded-lg transition-colors duration-150 cursor-pointer"
            >
              Solicitar Cotización
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
