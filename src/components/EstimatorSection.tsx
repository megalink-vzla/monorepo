'use client';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { ServiceCategoryId } from '../data/servicesData';
import { estimateInfrastructure } from '../utils/projectEstimator';

interface EstimatorSectionProps {
  onApplyEstimateToQuote: (category: ServiceCategoryId, summary: string) => void;
}

const CATEGORY_OPTIONS: Array<{
  id: ServiceCategoryId;
  label: string;
  outdoorLabel: string;
  redundancyLabel: string;
}> = [
  {
    id: 'cctv',
    label: '01. Videovigilancia CCTV / IP',
    outdoorLabel: 'Incluye cámaras exteriores IR / ColorVu o PTZ con protección contra sobretensiones',
    redundancyLabel: 'Almacenamiento RAID de videovigilancia + respaldo en la nube y analítica LPR / facial',
  },
  {
    id: 'redes',
    label: '02. Redes y Cableado Estructurado',
    outdoorLabel: 'Enlace troncal en fibra óptica (monomodo / multimodo)',
    redundancyLabel: 'Switches administrables Capa 2/3 (VLAN + QoS), firewall Multi-WAN y VPN',
  },
  {
    id: 'wifi',
    label: '03. Wi-Fi Alta Cobertura',
    outdoorLabel: 'Cobertura exterior o interconexión mediante radioenlace PtP / PtMP',
    redundancyLabel: 'Alta densidad de usuarios, roaming sin cortes y portal cautivo segmentado',
  },
];

export function EstimatorSection({ onApplyEstimateToQuote }: EstimatorSectionProps) {
  const [category, setCategory] = useState<ServiceCategoryId>('redes');
  const [outdoorOrLongRange, setOutdoorOrLongRange] = useState<boolean>(true);
  const [highRedundancy, setHighRedundancy] = useState<boolean>(true);

  const activeConfig =
    CATEGORY_OPTIONS.find((opt) => opt.id === category) ?? CATEGORY_OPTIONS[1];

  const result = estimateInfrastructure({
    category,
    outdoorOrLongRange,
    highRedundancy,
  });

  return (
    <section id="dimensionamiento" className="bg-[#1C2541] text-white py-20 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Engineering Guidance & Pillar Selection */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium text-[#06B6D4] tracking-wide mb-2">
              Configuración de Alcance
            </p>
            <h2
              className="font-display text-[clamp(1.75rem,3vw,2.45rem)] font-bold text-white tracking-tight mb-4"
              style={{ textWrap: 'balance' }}
            >
              Defina la arquitectura técnica de su proyecto
            </h2>
            <p className="text-[15px] sm:text-base text-[#F1F5F9]/80 leading-relaxed mb-8">
              Seleccione el área de infraestructura y los requerimientos operativos para estructurar una propuesta base de equipamiento, switching y protección eléctrica.
            </p>

            <div className="space-y-2.5" role="radiogroup" aria-label="Área de arquitectura">
              {CATEGORY_OPTIONS.map((opt) => {
                const selected = opt.id === category;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setCategory(opt.id)}
                    className={`w-full text-left px-4 py-3.5 rounded-lg border transition-colors duration-150 cursor-pointer flex items-center justify-between ${
                      selected
                        ? 'bg-[#2563EB] border-[#2563EB] text-white font-semibold'
                        : 'bg-[#111827]/50 border-white/15 text-[#F1F5F9] hover:border-white/35'
                    }`}
                  >
                    <span className="text-sm">{opt.label}</span>
                    <span className="font-mono text-xs opacity-80">
                      {selected ? 'Activo' : 'Seleccionar'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Clean Technical Specification Builder (No Slider / No Numeric Estimates) */}
          <div className="lg:col-span-7 bg-white text-[#111827] rounded-xl p-6 sm:p-8 border border-[#D8D8D8]">
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-base font-bold text-[#111827] mb-3">
                  Requerimientos operativos para {activeConfig.label}
                </h3>

                <div className="space-y-3 pt-2 border-t border-[#D8D8D8]">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={outdoorOrLongRange}
                      onChange={(e) => setOutdoorOrLongRange(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-[#B7B7B7] text-[#2563EB] accent-[#2563EB] cursor-pointer"
                    />
                    <span className="text-sm text-[#1C2541] leading-snug">
                      {activeConfig.outdoorLabel}
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={highRedundancy}
                      onChange={(e) => setHighRedundancy(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-[#B7B7B7] text-[#2563EB] accent-[#2563EB] cursor-pointer"
                    />
                    <span className="text-sm text-[#1C2541] leading-snug">
                      {activeConfig.redundancyLabel}
                    </span>
                  </label>
                </div>
              </div>

              {/* Qualitative Output Specification */}
              <div
                data-testid="estimator-output"
                className="bg-[#F1F5F9] border border-[#D8D8D8] rounded-lg p-5 space-y-3"
              >
                <div className="pb-3 border-b border-[#D8D8D8]">
                  <span className="text-xs font-semibold text-[#1C2541]/70">
                    Arquitectura Base Sugerida
                  </span>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-xs text-[#1C2541]/65 mb-0.5">Enfoque de Cobertura</dt>
                    <dd className="font-semibold text-[#111827] leading-snug">
                      {result.architectureScope}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#1C2541]/65 mb-0.5">Infraestructura Principal</dt>
                    <dd className="font-semibold text-[#111827] leading-snug">
                      {result.primaryHardware}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#1C2541]/65 mb-0.5">Switching, Control y Energía</dt>
                    <dd className="text-[#1C2541] leading-snug">
                      {result.switchingAndPower}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#1C2541]/65 mb-0.5">Criterio Normativo</dt>
                    <dd className="text-[#1C2541] leading-snug">
                      {result.standardApplied}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                <p className="text-xs text-[#1C2541]/70">
                  La especificación definitiva se valida en sitio mediante inspección física y revisión de planos.
                </p>
                <button
                  type="button"
                  onClick={() => onApplyEstimateToQuote(category, result.summaryForQuote)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1C2541] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                >
                  <span>Incluir en cotización</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
