export type ServiceCategoryId = 'cctv' | 'redes' | 'wifi';

export interface SubService {
  id: string;
  title: string;
  description: string;
  normOrTech: string;
}

export interface ServicePillar {
  id: ServiceCategoryId;
  index: string;
  shortLabel: string;
  title: string;
  summary: string;
  imageUrl: string;
  imageAlt: string;
  deliverables: string;
  items: SubService[];
}

export interface CaseStudy {
  id: string;
  category: ServiceCategoryId;
  categoryLabel: string;
  clientSector: string;
  title: string;
  summary: string;
  deliverableNote: string;
}

export interface InstitutionalStandard {
  code: string;
  title: string;
  detail: string;
}

export const INSTITUTIONAL_STANDARDS: InstitutionalStandard[] = [
  {
    code: 'TIA/EIA-568-D',
    title: 'Cableado Certificado',
    detail: 'Pruebas de desempeño en par trenzado Cat6/Cat6A y fibra óptica con reporte técnico.',
  },
  {
    code: 'PoE+ / RAID',
    title: 'Videovigilancia Continua',
    detail: 'Respaldo eléctrico UPS, redundancia en discos y monitoreo 24/7.',
  },
  {
    code: 'Capa 2 / Capa 3',
    title: 'Switching y Seguridad',
    detail: 'Segmentación mediante VLANs, QoS, firewall perimetral y multi-WAN.',
  },
  {
    code: 'Wi-Fi 6 / 6E / 7',
    title: 'Alta Densidad y Roaming',
    detail: 'Site survey predictivo, control centralizado y enlaces PtP / PtMP.',
  },
];

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: 'cctv',
    index: '01',
    shortLabel: 'Videovigilancia CCTV / IP',
    title: 'Videovigilancia y Cámaras (CCTV / IP)',
    summary:
      'Arquitecturas de seguridad electrónica diseñadas para visibilidad perimetral e interior continua, almacenamiento redundante y analítica de eventos en tiempo real.',
    imageUrl: '/images/service_cctv_surveillance_1794936140214.jpg',
    imageAlt: 'Cámaras IP tipo domo y bullet instaladas en fachada corporativa',
    deliverables: 'Plano de cobertura, memoria técnica y capacitación operativa',
    items: [
      {
        id: 'cctv-diseno',
        title: 'Diseño e instalación de sistemas de cámaras IP y analógicas HD',
        description:
          'Cobertura perimetral, interior, visión nocturna (IR / ColorVu) y cámaras PTZ motorizadas.',
        normOrTech: 'IP / HD · IR · ColorVu · PTZ',
      },
      {
        id: 'cctv-grabacion',
        title: 'Grabación y almacenamiento centralizado',
        description:
          'Configuración de NVR/DVR, arreglos de discos de grado videovigilancia (RAID) y respaldo en la nube.',
        normOrTech: 'NVR / DVR · RAID · Respaldo Cloud',
      },
      {
        id: 'cctv-analitica',
        title: 'Monitoreo remoto y analítica inteligente',
        description:
          'Acceso desde dispositivos móviles/PC, detección de movimiento, cruce de línea, reconocimiento facial y lectura de matrículas (LPR).',
        normOrTech: 'LPR · Cruce de línea · Acceso remoto',
      },
      {
        id: 'cctv-energia',
        title: 'Alimentación y protección',
        description:
          'Implementación de switches PoE dedicados, respaldo eléctrico con UPS y protección contra sobretensiones en exteriores.',
        normOrTech: 'Switches PoE · UPS · Supresores',
      },
    ],
  },
  {
    id: 'redes',
    index: '02',
    shortLabel: 'Redes de Datos',
    title: 'Redes de Datos (Cableado Estructurado y Switching)',
    summary:
      'Infraestructura física y lógica de alto rendimiento para interconectar estaciones, servidores y sucursales bajo estándares internacionales de telecomunicaciones.',
    imageUrl: '/images/service_structured_cabling_1794936140986.jpg',
    imageAlt: 'Patch panel certificado con cables Cat6A azul y fibra óptica cian en rack',
    deliverables: 'Certificación punto a punto, diagrama lógico y etiquetado normado',
    items: [
      {
        id: 'redes-cableado',
        title: 'Cableado estructurado certificado',
        description:
          'Tendido, ponchado y certificación de red en categorías Cat6, Cat6A y fibra óptica (monomodo/multimodo) para enlaces de alta velocidad o largas distancias.',
        normOrTech: 'Cat6 / Cat6A · Fibra SM / MM',
      },
      {
        id: 'redes-racks',
        title: 'Organización de cuartos de telecomunicaciones (Racks)',
        description:
          'Instalación y peinado de gabinetes, patch panels, organizadores de cables y etiquetado normado de puntos de red.',
        normOrTech: 'Gabinetes · Patch Panels · Etiquetado',
      },
      {
        id: 'redes-switching',
        title: 'Switching y segmentación de red',
        description:
          'Configuración de switches administrables (Capa 2 y Capa 3), creación de VLANs para aislar tráfico (administración, invitados, cámaras, telefonía IP) y calidad de servicio (QoS).',
        normOrTech: 'L2 / L3 · VLANs · QoS',
      },
      {
        id: 'redes-seguridad',
        title: 'Seguridad perimetral y enrutamiento',
        description:
          'Instalación de firewalls, balanceo de carga multi-WAN (redundancia de proveedores de internet) y túneles VPN sitio-a-sitio o para trabajo remoto.',
        normOrTech: 'Firewall · Multi-WAN · VPN S2S',
      },
    ],
  },
  {
    id: 'wifi',
    index: '03',
    shortLabel: 'Wi-Fi Alta Cobertura',
    title: 'Wi-Fi de Alta Cobertura y Alta Densidad',
    summary:
      'Conectividad inalámbrica corporativa planificada mediante análisis de espectro y planos, diseñada para soportar alta concurrencia sin caídas ni zonas muertas.',
    imageUrl: '/images/service_enterprise_wifi_1794936141907.jpg',
    imageAlt: 'Access Point empresarial Wi-Fi 7 montado en techo de oficinas corporativas',
    deliverables: 'Mapa de calor Site Survey, políticas de acceso y optimización RF',
    items: [
      {
        id: 'wifi-survey',
        title: 'Estudio de cobertura (Site Survey)',
        description:
          'Análisis de planos, medición de interferencias, materiales de construcción y cálculo de ubicación óptima de puntos de acceso (Access Points) para eliminar zonas muertas.',
        normOrTech: 'Análisis RF · Planos · Mapa de calor',
      },
      {
        id: 'wifi-despliegue',
        title: 'Despliegue de redes inalámbricas empresariales',
        description:
          'Instalación de Access Points Wi-Fi 6 / Wi-Fi 6E / Wi-Fi 7 de techo, pared o exterior con alimentación PoE.',
        normOrTech: 'Wi-Fi 6 / 6E / 7 · PoE',
      },
      {
        id: 'wifi-roaming',
        title: 'Roaming sin cortes y control centralizado',
        description:
          'Configuración de controladoras de red (estilo UniFi, Omada, Aruba o Cisco Meraki) para que los dispositivos cambien de antena automáticamente sin perder conexión ni llamadas.',
        normOrTech: 'UniFi · Omada · Aruba · Meraki',
      },
      {
        id: 'wifi-portales',
        title: 'Portales cautivos y control de ancho de banda',
        description:
          'Redes aisladas para invitados con página de bienvenida personalizada, límites de velocidad por usuario y filtrado de contenido.',
        normOrTech: 'Portal Cautivo · Aislamiento · QoS',
      },
      {
        id: 'wifi-enlaces',
        title: 'Enlaces inalámbricos punto a punto (PtP) y punto a multipunto (PtMP)',
        description:
          'Interconexión inalámbrica de edificios, galpones o fincas a varios kilómetros de distancia mediante radioenlaces.',
        normOrTech: 'Radioenlaces PtP / PtMP · Largo Alcance',
      },
    ],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'caso-logistico',
    category: 'cctv',
    categoryLabel: 'Videovigilancia y Seguridad Perimetral',
    clientSector: 'Centro de Distribución Logística',
    title: 'Cobertura perimetral LPR y almacenamiento redundante',
    summary:
      'Sustitución de sistema analógico fragmentado por arquitectura IP ColorVu con lectura automática de matrículas en bahías de carga, respaldo eléctrico UPS y arreglos RAID.',
    deliverableNote: 'NVR centralizado · Switches PoE dedicados · Respaldo UPS y supresores exteriores',
  },
  {
    id: 'caso-corporativo',
    category: 'redes',
    categoryLabel: 'Cableado Estructurado y Switching',
    clientSector: 'Sede Corporativa Multi-nivel',
    title: 'Certificación Cat6A, backbone de fibra y segmentación VLAN',
    summary:
      'Reestructuración completa del cuarto principal de telecomunicaciones, troncal en fibra óptica multimodo entre pisos y firewall perimetral con balanceo multi-WAN activo.',
    deliverableNote: 'Certificación TIA/EIA-568-D · Peinado de rack · VLANs y QoS Capa 2/3',
  },
  {
    id: 'caso-campus',
    category: 'wifi',
    categoryLabel: 'Wi-Fi de Alta Densidad y Radioenlaces',
    clientSector: 'Complejo Empresarial e Industrial',
    title: 'Despliegue Wi-Fi 6E con roaming continuo y enlace PtMP',
    summary:
      'Site survey previo sobre planos arquitectónicos, instalación de Access Points gestionados desde controladora central y radioenlace inalámbrico entre edificio administrativo y galpones.',
    deliverableNote: 'Mapa de calor RF · Portal cautivo aislado · Interconexión inalámbrica PtMP',
  },
];
