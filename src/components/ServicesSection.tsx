'use client';
import { useState } from 'react';
import { ArrowRight, Camera, Network, Wifi } from 'lucide-react';
import { SERVICE_PILLARS, type ServiceCategoryId } from '../data/servicesData';

interface ServicesSectionProps {
  onSelectServiceForQuote: (category: ServiceCategoryId) => void;
}

type PillarFilter = 'all' | ServiceCategoryId;

export function ServicesSection({ onSelectServiceForQuote }: ServicesSectionProps) {
  const [activeFilter, setActiveFilter] = useState<PillarFilter>('all');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const visiblePillars =
    activeFilter === 'all'
      ? SERVICE_PILLARS
      : SERVICE_PILLARS.filter((pillar) => pillar.id === activeFilter);

  const renderFallbackIcon = (id: ServiceCategoryId) => {
    if (id === 'cctv') return <Camera className="w-8 h-8 text-[#1C2541]" aria-hidden="true" />;
    if (id === 'redes') return <Network className="w-8 h-8 text-[#1C2541]" aria-hidden="true" />;
    return <Wifi className="w-8 h-8 text-[#1C2541]" aria-hidden="true" />;
  };

  return (
    <section id="servicios" className="bg-[#F1F5F9] py-20 lg:py-24 border-b border-[#D8D8D8]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Segmented Pillar Filter */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="text-xs font-medium text-[#2563EB] tracking-wide mb-2">
              Portafolio de Ingeniería
            </p>
            <h2
              className="font-display text-[clamp(1.75rem,3vw,2.4rem)] font-bold text-[#111827] tracking-tight mb-3"
              style={{ textWrap: 'balance' }}
            >
              Tres pilares técnicos para operación continua y segura
            </h2>
            <p className="text-base text-[#1C2541]/80 leading-relaxed">
              Ejecución llave en mano desde el levantamiento en plano hasta la certificación, documentación y puesta en marcha.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="tablist"
            aria-label="Filtrar pilares de servicio"
            className="inline-flex flex-wrap sm:flex-nowrap items-center gap-1 p-1 bg-white border border-[#D8D8D8] rounded-lg self-start xl:self-auto shrink-0"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-2 text-xs sm:text-[13px] font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#1C2541] text-white'
                  : 'text-[#1C2541] hover:bg-[#F1F5F9]'
              }`}
            >
              Todos
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'cctv'}
              onClick={() => setActiveFilter('cctv')}
              className={`px-3 py-2 text-xs sm:text-[13px] font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                activeFilter === 'cctv'
                  ? 'bg-[#1C2541] text-white'
                  : 'text-[#1C2541] hover:bg-[#F1F5F9]'
              }`}
            >
              01. Videovigilancia
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'redes'}
              onClick={() => setActiveFilter('redes')}
              className={`px-3 py-2 text-xs sm:text-[13px] font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                activeFilter === 'redes'
                  ? 'bg-[#1C2541] text-white'
                  : 'text-[#1C2541] hover:bg-[#F1F5F9]'
              }`}
            >
              02. Redes de Datos
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'wifi'}
              onClick={() => setActiveFilter('wifi')}
              className={`px-3 py-2 text-xs sm:text-[13px] font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                activeFilter === 'wifi'
                  ? 'bg-[#1C2541] text-white'
                  : 'text-[#1C2541] hover:bg-[#F1F5F9]'
              }`}
            >
              03. Wi-Fi Empresarial
            </button>
          </div>
        </div>

        {/* Service Pillars */}
        <div className="space-y-10">
          {visiblePillars.map((pillar) => (
            <article
              key={pillar.id}
              className="bg-white border border-[#D8D8D8] rounded-xl overflow-hidden"
            >
              {/* Top Pillar Summary & Architectural Image */}
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch border-b border-[#D8D8D8]">
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <p className="font-mono text-xs font-medium text-[#2563EB] tabular-nums mb-2">
                      Pilar {pillar.index}
                    </p>
                    <h3 className="font-display text-2xl sm:text-[26px] font-bold text-[#111827] tracking-tight mb-3">
                      {pillar.index}. {pillar.title}
                    </h3>
                    <p className="text-[15px] sm:text-base text-[#1C2541]/80 leading-relaxed max-w-2xl mb-6">
                      {pillar.summary}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-[#D8D8D8]">
                    <p className="text-xs text-[#1C2541]/75 leading-relaxed">
                      <span className="font-semibold text-[#111827]">Entregables:</span> {pillar.deliverables}
                    </p>
                    <button
                      type="button"
                      onClick={() => onSelectServiceForQuote(pillar.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-[#2563EB] hover:text-white bg-[#F1F5F9] hover:bg-[#2563EB] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                    >
                      <span>Cotizar este pilar</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#F1F5F9] border-t lg:border-t-0 lg:border-l border-[#D8D8D8] min-h-[240px]">
                  {!failedImages[pillar.id] ? (
                    <img
                      src={pillar.imageUrl}
                      alt={pillar.imageAlt}
                      className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto"
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [pillar.id]: true }))
                      }
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                      {renderFallbackIcon(pillar.id)}
                      <p className="mt-3 font-display text-sm font-semibold text-[#111827]">
                        {pillar.shortLabel}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Sub-services Grid separated by clean whitespace & hairline dividers */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:gap-px bg-[#D8D8D8]">
                {pillar.items.map((sub, idx) => {
                  const isLastOdd =
                    pillar.items.length % 2 !== 0 && idx === pillar.items.length - 1;
                  return (
                    <div
                      key={sub.id}
                      className={`bg-white p-6 sm:p-8 flex flex-col justify-between ${
                        isLastOdd ? 'md:col-span-2' : ''
                      }`}
                    >
                      <div>
                        <div className="flex items-baseline justify-between gap-4 mb-2">
                          <h4 className="font-display text-base sm:text-[17px] font-bold text-[#111827] leading-snug">
                            {sub.title}
                          </h4>
                          <span className="font-mono text-xs text-[#B7B7B7] tabular-nums shrink-0">
                            {pillar.index}.{idx + 1}
                          </span>
                        </div>
                        <p className="text-sm sm:text-[15px] text-[#1C2541]/80 leading-relaxed mb-4">
                          {sub.description}
                        </p>
                      </div>

                      <p className="font-mono text-xs text-[#1C2541]/65 tracking-tight">
                        {sub.normOrTech}
                      </p>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
