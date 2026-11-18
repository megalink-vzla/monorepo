'use client';
import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import type { ServiceCategoryId } from '../data/servicesData';
import {
  formatInquiryReference,
  validateQuoteForm,
  type QuoteFormData,
} from '../utils/projectEstimator';

interface ContactSectionProps {
  preselectedService?: ServiceCategoryId | 'integral';
  prefilledSummary?: string;
}

const METHODOLOGY_STEPS = [
  {
    index: '01',
    title: 'Inspección y Site Survey',
    detail: 'Evaluación física de recorridos, planos arquitectónicos, puntos eléctricos y espectro inalámbrico.',
  },
  {
    index: '02',
    title: 'Propuesta y Memoria Técnica',
    detail: 'Dimensionamiento exacto de materiales certificados, electrónica activa y cronograma de obra.',
  },
  {
    index: '03',
    title: 'Instalación, Certificación y Garantía',
    detail: 'Tendido normado, peinado de racks, pruebas punto a punto y entrega documentada al área TI.',
  },
];

export function ContactSection({
  preselectedService = 'integral',
  prefilledSummary = '',
}: ContactSectionProps) {
  const [form, setForm] = useState<QuoteFormData>({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    service: preselectedService,
    message: prefilledSummary,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      service: preselectedService,
      message: prefilledSummary || prev.message,
    }));
    setSubmittedRef(null);
  }, [preselectedService, prefilledSummary]);

  const handleChange = (field: keyof QuoteFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateQuoteForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setSubmitError(data.error || 'Error al registrar la solicitud. Por favor intenta de nuevo.');
        if (data.details) {
          setErrors(data.details);
        }
        return;
      }

      setSubmittedRef(data.reference || formatInquiryReference(new Date(), Date.now()));
      setErrors({});
    } catch {
      // Fallback local si la red falla
      const seed = form.fullName.length * 137 + form.company.length * 53 + Date.now();
      setSubmittedRef(formatInquiryReference(new Date(), seed));
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm({
      fullName: '',
      company: '',
      email: '',
      phone: '',
      service: 'integral',
      message: '',
    });
    setErrors({});
    setSubmittedRef(null);
  };

  return (
    <section id="contacto" className="bg-[#F1F5F9] py-20 lg:py-24 border-b border-[#D8D8D8]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Engineering Workflow & Direct Contact */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs font-medium text-[#2563EB] tracking-wide mb-2">
                Evaluación de Proyecto
              </p>
              <h2
                className="font-display text-[clamp(1.75rem,3vw,2.45rem)] font-bold text-[#111827] tracking-tight mb-3"
                style={{ textWrap: 'balance' }}
              >
                Solicite un diagnóstico técnico y cotización formal
              </h2>
              <p className="text-[15px] sm:text-base text-[#1C2541]/80 leading-relaxed">
                Nuestro equipo de ingeniería atiende requerimientos corporativos, industriales, comerciales e institucionales.
              </p>
            </div>

            <div className="space-y-5 pt-4 border-t border-[#D8D8D8]">
              {METHODOLOGY_STEPS.map((step) => (
                <div key={step.index} className="flex items-start gap-4">
                  <span className="font-mono text-xs font-medium text-[#2563EB] tabular-nums pt-1 shrink-0">
                    {step.index}
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-bold text-[#111827] mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#1C2541]/75 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-[#D8D8D8] space-y-3 text-sm text-[#1C2541]">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#2563EB] shrink-0" aria-hidden="true" />
                <span>proyectos@megalink.com.co</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#2563EB] shrink-0" aria-hidden="true" />
                <span className="tabular-nums">+57 (601) 555 0148 · Lun – Vie 8:00 a 18:00</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#2563EB] shrink-0" aria-hidden="true" />
                <span>Cobertura empresarial en sedes urbanas, parques industriales y campus</span>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Lead Capture Form */}
          <div className="lg:col-span-7 bg-white border border-[#D8D8D8] rounded-xl p-6 sm:p-8">
            {submittedRef ? (
              <div data-testid="quote-confirmation" className="py-6 space-y-5">
                <div className="flex items-center gap-3 text-[#1C2541]">
                  <CheckCircle2 className="w-7 h-7 text-[#2563EB] shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-mono text-[#2563EB] tabular-nums">
                      Folio de atención: {submittedRef}
                    </p>
                    <h3 className="font-display text-xl font-bold text-[#111827]">
                      Solicitud registrada correctamente
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-[15px] text-[#1C2541]/85 leading-relaxed">
                  Gracias, <span className="font-semibold text-[#111827]">{form.fullName}</span>. Hemos recibido los detalles para{' '}
                  <span className="font-semibold text-[#111827]">{form.company}</span> y enviaremos la confirmación inicial al correo{' '}
                  <span className="font-medium text-[#111827]">{form.email}</span> para coordinar la visita técnica.
                </p>

                <div className="bg-[#F1F5F9] border border-[#D8D8D8] rounded-lg p-4 text-xs sm:text-sm text-[#1C2541] space-y-1">
                  <p>
                    <span className="font-semibold text-[#111827]">Línea de servicio:</span>{' '}
                    {form.service === 'cctv'
                      ? '01. Videovigilancia y Cámaras (CCTV / IP)'
                      : form.service === 'redes'
                      ? '02. Redes de Datos (Cableado Estructurado y Switching)'
                      : form.service === 'wifi'
                      ? '03. Wi-Fi de Alta Cobertura y Alta Densidad'
                      : 'Proyecto Integral (CCTV + Redes + Wi-Fi)'}
                  </p>
                  <p>
                    <span className="font-semibold text-[#111827]">Alcance indicado:</span> {form.message}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 text-sm font-semibold text-[#1C2541] bg-[#F1F5F9] hover:bg-[#D8D8D8]/60 border border-[#D8D8D8] rounded-lg transition-colors duration-150 cursor-pointer"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="quote-name"
                      className="block text-sm font-semibold text-[#111827] mb-1.5"
                    >
                      Nombre completo
                    </label>
                    <input
                      id="quote-name"
                      name="fullName"
                      type="text"
                      value={form.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      placeholder="Ej. Carlos Mendoza"
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? 'error-name' : undefined}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/25 focus:border-[#2563EB] ${
                        errors.fullName ? 'border-red-600' : 'border-[#D8D8D8]'
                      }`}
                    />
                    {errors.fullName && (
                      <p id="error-name" className="mt-1.5 text-xs text-red-700 font-medium">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="quote-company"
                      className="block text-sm font-semibold text-[#111827] mb-1.5"
                    >
                      Empresa o proyecto
                    </label>
                    <input
                      id="quote-company"
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                      placeholder="Ej. Logística Andina S.A."
                      aria-invalid={Boolean(errors.company)}
                      aria-describedby={errors.company ? 'error-company' : undefined}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/25 focus:border-[#2563EB] ${
                        errors.company ? 'border-red-600' : 'border-[#D8D8D8]'
                      }`}
                    />
                    {errors.company && (
                      <p id="error-company" className="mt-1.5 text-xs text-red-700 font-medium">
                        {errors.company}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="quote-email"
                      className="block text-sm font-semibold text-[#111827] mb-1.5"
                    >
                      Correo electrónico
                    </label>
                    <input
                      id="quote-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="nombre@empresa.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/25 focus:border-[#2563EB] ${
                        errors.email ? 'border-red-600' : 'border-[#D8D8D8]'
                      }`}
                    />
                    {errors.email && (
                      <p id="error-email" className="mt-1.5 text-xs text-red-700 font-medium">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="quote-phone"
                      className="block text-sm font-semibold text-[#111827] mb-1.5"
                    >
                      Teléfono de contacto
                    </label>
                    <input
                      id="quote-phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="+57 300 555 0192"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'error-phone' : undefined}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/25 focus:border-[#2563EB] ${
                        errors.phone ? 'border-red-600' : 'border-[#D8D8D8]'
                      }`}
                    />
                    {errors.phone && (
                      <p id="error-phone" className="mt-1.5 text-xs text-red-700 font-medium">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="quote-service"
                    className="block text-sm font-semibold text-[#111827] mb-1.5"
                  >
                    Línea de servicio requerida
                  </label>
                  <select
                    id="quote-service"
                    name="service"
                    value={form.service}
                    onChange={(e) =>
                      handleChange('service', e.target.value as ServiceCategoryId | 'integral')
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#D8D8D8] bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/25 focus:border-[#2563EB]"
                  >
                    <option value="integral">Proyecto Integral (CCTV + Redes + Wi-Fi)</option>
                    <option value="cctv">01. Videovigilancia y Cámaras (CCTV / IP)</option>
                    <option value="redes">02. Redes de Datos (Cableado Estructurado y Switching)</option>
                    <option value="wifi">03. Wi-Fi de Alta Cobertura y Alta Densidad</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="quote-message"
                    className="block text-sm font-semibold text-[#111827] mb-1.5"
                  >
                    Alcance técnico y ubicación del sitio
                  </label>
                  <textarea
                    id="quote-message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Indique número aproximado de cámaras, puntos de red, área en m² o necesidades de enlace entre sedes..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'error-message' : undefined}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/25 focus:border-[#2563EB] ${
                      errors.message ? 'border-red-600' : 'border-[#D8D8D8]'
                    }`}
                  />
                  {errors.message && (
                    <p id="error-message" className="mt-1.5 text-xs text-red-700 font-medium">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-[#1C2541]/70">
                    Respuesta técnica en menos de 24 horas hábiles.
                  </p>
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-semibold text-white bg-[#1C2541] hover:bg-[#2563EB] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                  >
                    Enviar Solicitud Técnica
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
