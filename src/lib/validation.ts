import { z } from 'zod';

export const quoteSubmissionSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(120, 'El nombre no puede exceder 120 caracteres'),
  company: z
    .string()
    .trim()
    .min(2, 'La empresa debe tener al menos 2 caracteres')
    .max(150, 'El nombre de empresa es muy largo'),
  email: z
    .string()
    .trim()
    .email('Formato de correo electrónico inválido')
    .toLowerCase(),
  phone: z
    .string()
    .trim()
    .min(7, 'El teléfono debe tener al menos 7 dígitos')
    .max(25, 'El teléfono es muy largo'),
  service: z.enum(['cctv', 'redes', 'wifi', 'integral']),
  message: z.string().trim().max(2000, 'El mensaje no puede exceder 2000 caracteres').optional().default(''),
  utm: z
    .object({
      source: z.string().optional(),
      medium: z.string().optional(),
      campaign: z.string().optional(),
      term: z.string().optional(),
      content: z.string().optional(),
    })
    .optional(),
});

export type QuoteSubmissionInput = z.infer<typeof quoteSubmissionSchema>;

export function normalizePhone(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, '');
  if (digits.startsWith('+')) {
    return digits;
  }
  if (digits.startsWith('0')) {
    return `+58${digits.slice(1)}`;
  }
  if (digits.startsWith('58')) {
    return `+${digits}`;
  }
  return `+58${digits}`;
}

