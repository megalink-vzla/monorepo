import type { ServiceCategoryId } from '../data/servicesData';

export interface EstimatorInput {
  category: ServiceCategoryId;
  outdoorOrLongRange: boolean;
  highRedundancy: boolean;
}

export interface EstimatorResult {
  category: ServiceCategoryId;
  architectureScope: string;
  primaryHardware: string;
  switchingAndPower: string;
  standardApplied: string;
  summaryForQuote: string;
}

export interface QuoteFormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  service: ServiceCategoryId | 'integral';
  message: string;
}

export function estimateInfrastructure(input: EstimatorInput): EstimatorResult {
  if (input.category === 'cctv') {
    const scope = input.outdoorOrLongRange
      ? 'Cobertura IP / HD interior y perimetral (visión nocturna IR / ColorVu y PTZ)'
      : 'Cobertura IP / HD para áreas interiores y puntos críticos de acceso';
    const storageTier = input.highRedundancy
      ? 'NVR / DVR centralizado con arreglo RAID de videovigilancia y respaldo en la nube'
      : 'Grabación centralizada NVR / DVR con discos de grado videovigilancia';
    const powerDetail = input.outdoorOrLongRange
      ? 'Switches PoE dedicados, respaldo eléctrico UPS y supresores de sobretensión exteriores'
      : 'Switches PoE dedicados y respaldo eléctrico mediante UPS';

    return {
      category: 'cctv',
      architectureScope: scope,
      primaryHardware: storageTier,
      switchingAndPower: powerDetail,
      standardApplied: 'Analítica inteligente (cruce de línea, reconocimiento facial, LPR) y acceso remoto',
      summaryForQuote: `Videovigilancia CCTV/IP: ${scope}. ${storageTier}. ${powerDetail}.`,
    };
  }

  if (input.category === 'redes') {
    const scope = input.outdoorOrLongRange
      ? 'Cableado horizontal Cat6 / Cat6A certificado y enlaces troncales en fibra óptica (monomodo / multimodo)'
      : 'Cableado estructurado certificado Cat6 / Cat6A para estaciones y servidores';
    const rackSpec = 'Organización de cuarto de telecomunicaciones (Rack), patch panels y etiquetado normado';
    const securitySpec = input.highRedundancy
      ? 'Switches administrables Capa 2/3 (VLANs y QoS), firewall, balanceo multi-WAN y VPN'
      : 'Switches administrables Capa 2 con segmentación por VLANs y calidad de servicio (QoS)';

    return {
      category: 'redes',
      architectureScope: scope,
      primaryHardware: rackSpec,
      switchingAndPower: securitySpec,
      standardApplied: 'Certificación de enlace y documentación lógica de red bajo normativa TIA/EIA-568-D',
      summaryForQuote: `Redes de Datos: ${scope}. ${rackSpec}. ${securitySpec}.`,
    };
  }

  // Wi-Fi Alta Cobertura
  const scope = input.outdoorOrLongRange
    ? 'Estudio Site Survey, cobertura Wi-Fi 6 / 6E / 7 PoE y radioenlace PtP / PtMP entre sedes'
    : 'Estudio Site Survey sobre planos y despliegue de Access Points Wi-Fi 6 / 6E / 7 PoE';
  const controllerDetail = input.highRedundancy
    ? 'Controladora centralizada para roaming sin cortes, portal cautivo y control de ancho de banda'
    : 'Controladora de red centralizada con aislamiento para invitados y optimización RF';

  return {
    category: 'wifi',
    architectureScope: scope,
    primaryHardware: 'Ubicación óptima de Access Points de techo, pared o exterior para eliminar zonas muertas',
    switchingAndPower: controllerDetail,
    standardApplied: 'Roaming continuo, filtrado de contenido y segmentación de tráfico inalámbrico',
    summaryForQuote: `Wi-Fi Alta Cobertura: ${scope}. ${controllerDetail}.`,
  };
}

export function validateQuoteForm(form: QuoteFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (form.fullName.trim().length < 3) {
    errors.fullName = 'Ingrese su nombre completo (mínimo 3 caracteres).';
  }
  if (form.company.trim().length < 2) {
    errors.company = 'Indique el nombre de su empresa, institución o proyecto.';
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(form.email.trim())) {
    errors.email = 'Ingrese un correo electrónico corporativo o personal válido.';
  }
  const digitsOnly = form.phone.replace(/\D/g, '');
  if (digitsOnly.length < 7) {
    errors.phone = 'Ingrese un número de teléfono o WhatsApp válido (mínimo 7 dígitos).';
  }
  if (form.message.trim().length < 10) {
    errors.message = 'Describa brevemente el alcance o requerimiento técnico (mínimo 10 caracteres).';
  }

  return errors;
}

export function formatInquiryReference(date: Date, seed: number): string {
  const year = date.getFullYear();
  const normalized = Math.abs(Math.floor(seed)) % 9000 + 1000;
  return `ML-${year}-${normalized}`;
}
