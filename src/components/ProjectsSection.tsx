'use client';
import { CASE_STUDIES } from '../data/servicesData';

export function ProjectsSection() {
  return (
    <section id="proyectos" className="bg-white py-20 lg:py-24 border-b border-[#D8D8D8]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-medium text-[#2563EB] tracking-wide mb-2">
            Implementaciones Verificadas
          </p>
          <h2
            className="font-display text-[clamp(1.75rem,3vw,2.45rem)] font-bold text-[#111827] tracking-tight mb-3"
            style={{ textWrap: 'balance' }}
          >
            Soluciones ejecutadas en entornos corporativos e industriales
          </h2>
          <p className="text-base text-[#1C2541]/80 leading-relaxed">
            Cada proyecto se entrega con memoria técnica, pruebas de certificación y soporte operativo post-implementación.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study) => (
            <article
              key={study.id}
              className="bg-white border border-[#D8D8D8] rounded-xl p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <p className="text-xs text-[#1C2541]/70 mb-3">
                  <span>{study.clientSector}</span>
                  <span aria-hidden="true"> · </span>
                  <span className="text-[#2563EB] font-medium">{study.categoryLabel}</span>
                </p>

                <h3 className="font-display text-lg sm:text-xl font-bold text-[#111827] leading-snug mb-3">
                  {study.title}
                </h3>

                <p className="text-sm text-[#1C2541]/80 leading-relaxed mb-6">
                  {study.summary}
                </p>
              </div>

              <p className="pt-4 border-t border-[#D8D8D8] text-xs font-medium text-[#1C2541]/75">
                {study.deliverableNote}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
