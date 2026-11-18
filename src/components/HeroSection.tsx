'use client';
import { useState } from 'react';
import { ArrowRight, Server } from 'lucide-react';
import { INSTITUTIONAL_STANDARDS } from '../data/servicesData';

interface HeroSectionProps {
  onRequestEvaluation: () => void;
}

export function HeroSection({ onRequestEvaluation }: HeroSectionProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="inicio" className="bg-white border-b border-[#D8D8D8]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 lg:pt-16 lg:pb-18">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Formal Editorial Proposition */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs sm:text-[13px] font-medium text-[#1C2541]/75 tracking-wide mb-4">
              Ingeniería en Telecomunicaciones <span aria-hidden="true">·</span> Seguridad Electrónica <span aria-hidden="true">·</span> Conectividad
            </p>

            <h1
              className="font-display text-[clamp(2.15rem,3.6vw,3.25rem)] font-bold leading-[1.12] tracking-tight text-[#111827] mb-5"
              style={{ textWrap: 'balance' }}
            >
              Infraestructura de red, videovigilancia y Wi-Fi de grado empresarial.
            </h1>

            <p className="text-base sm:text-[17px] leading-[1.65] text-[#1C2541]/85 max-w-xl mb-8">
              Diseñamos, instalamos y certificamos sistemas de cámaras CCTV/IP, cableado estructurado Cat6A y fibra óptica, switching administrado Capa 2/3 y cobertura inalámbrica de alta densidad con respaldo operativo continuo.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onRequestEvaluation}
                className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1C2541] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                <span>Solicitar Evaluación Técnica</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href="#servicios"
                className="inline-flex items-center px-4 py-3 text-sm font-semibold text-[#1C2541] hover:text-[#2563EB] underline underline-offset-4 decoration-[#D8D8D8] hover:decoration-[#2563EB] transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                Explorar líneas de servicio
              </a>
            </div>
          </div>

          {/* Right Column: Clean Architectural Media */}
          <div className="lg:col-span-6">
            <div className="h-full min-h-[280px] sm:min-h-[340px] lg:min-h-[400px] rounded-xl overflow-hidden border border-[#D8D8D8] bg-[#F1F5F9]">
              {!imgError ? (
                <img
                  src="/images/hero_network_infrastructure_1794936139485.jpg"
                  alt="Cuarto de telecomunicaciones corporativo con racks organizados y cableado estructurado certificado"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#F1F5F9] to-[#D8D8D8]/40">
                  <Server className="w-10 h-10 text-[#1C2541] mb-3" aria-hidden="true" />
                  <p className="font-display font-semibold text-[#111827]">
                    Infraestructura de Telecomunicaciones MegaLink
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Institutional Standards Strip */}
        <div className="mt-12 pt-8 border-t border-[#D8D8D8] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {INSTITUTIONAL_STANDARDS.map((item) => (
            <div key={item.code} className="space-y-1.5">
              <p className="font-mono text-xs font-medium text-[#2563EB] tabular-nums">
                {item.code}
              </p>
              <h2 className="font-display text-base font-semibold text-[#111827]">
                {item.title}
              </h2>
              <p className="text-sm leading-relaxed text-[#1C2541]/75">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
