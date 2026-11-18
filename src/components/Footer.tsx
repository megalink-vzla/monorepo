'use client';
import { MegalinkBrandMark } from './MegalinkBrandMark';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111827] text-[#F1F5F9]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/15">
          <div className="md:col-span-5 space-y-4">
            <MegalinkBrandMark variant="dark" size="md" />
            <p className="text-sm text-[#D8D8D8] leading-relaxed max-w-sm">
              Ingeniería formal en videovigilancia CCTV/IP, redes de datos certificadas y conectividad inalámbrica empresarial de alta densidad.
            </p>
            <div className="pt-2 space-y-1.5 text-xs text-[#94A3B8]">
              <p>
                Email:{' '}
                <a href="mailto:megalink@megamercado.io" className="text-white hover:text-[#06B6D4] transition-colors">
                  megalink@megamercado.io
                </a>
              </p>
              <p className="tabular-nums">
                <span className="text-white font-medium">VEN:</span>{' '}
                <a href="tel:+584122799653" className="hover:text-[#06B6D4] transition-colors">
                  +58 412 279 9653
                </a>{' '}
                · <span className="text-white font-medium">COL:</span>{' '}
                <a href="tel:+573001950664" className="hover:text-[#06B6D4] transition-colors">
                  +57 300 195 0664
                </a>
              </p>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <h3 className="font-display text-sm font-semibold text-white">
              Navegación
            </h3>
            <ul className="space-y-2 text-sm text-[#D8D8D8]">
              <li>
                <a href="#inicio" className="hover:text-[#06B6D4] transition-colors duration-150">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-[#06B6D4] transition-colors duration-150">
                  Servicios Especializados
                </a>
              </li>
              <li>
                <a href="#dimensionamiento" className="hover:text-[#06B6D4] transition-colors duration-150">
                  Dimensionamiento Técnico
                </a>
              </li>
              <li>
                <a href="#proyectos" className="hover:text-[#06B6D4] transition-colors duration-150">
                  Proyectos
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-[#06B6D4] transition-colors duration-150">
                  Solicitar Cotización
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2.5">
            <h3 className="font-display text-sm font-semibold text-white">
              Líneas de Especialidad
            </h3>
            <ul className="space-y-2 text-sm text-[#D8D8D8]">
              <li>01. Videovigilancia y Cámaras (CCTV / IP)</li>
              <li>02. Redes de Datos y Cableado Estructurado</li>
              <li>03. Wi-Fi de Alta Cobertura y Radioenlaces</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#B7B7B7]">
          <p>© {currentYear} MegaLink Ingeniería y Telecomunicaciones. Todos los derechos reservados.</p>
          <p className="font-mono">TIA/EIA-568-D · PoE+ · Wi-Fi 6E / 7</p>
        </div>
      </div>
    </footer>
  );
}
