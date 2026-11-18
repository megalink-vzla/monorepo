import { NextRequest, NextResponse } from 'next/server';
import { connectMongo } from '@/lib/db';
import { MegalinkLead } from '@/lib/models/Lead';
import { MegalinkWebhookEvent } from '@/lib/models/WebhookEvent';
import { quoteSubmissionSchema, normalizePhone } from '@/lib/validation';
import { dispatchRetiaWebhook } from '@/lib/webhook';
import { formatInquiryReference } from '@/utils/projectEstimator';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json().catch(() => null);

    if (!rawBody) {
      return NextResponse.json(
        { error: 'Cuerpo de solicitud inválido o vacío' },
        { status: 400 }
      );
    }

    const parseResult = quoteSubmissionSchema.safeParse(rawBody);

    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parseResult.error.issues) {
        const path = issue.path.join('.');
        fieldErrors[path] = issue.message;
      }
      return NextResponse.json(
        { error: 'Datos de formulario inválidos', details: fieldErrors },
        { status: 400 }
      );
    }

    const data = parseResult.data;
    const normalizedPhone = normalizePhone(data.phone);

    // Generar referencia única
    const seed = data.fullName.length * 137 + data.company.length * 53 + Date.now();
    const reference = formatInquiryReference(new Date(), seed);

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';
    const referer = req.headers.get('referer') || '';

    // Patrón Store-First: Guardar en MongoDB Atlas
    let leadDoc = null;
    try {
      if (process.env.MONGODB_URI) {
        await connectMongo();
        leadDoc = await MegalinkLead.create({
          reference,
          fullName: data.fullName,
          company: data.company,
          email: data.email,
          phone: normalizedPhone,
          service: data.service,
          message: data.message || '',
          ip,
          userAgent,
          referer,
          utm: data.utm,
          webhookStatus: 'pending',
        });
      }
    } catch (dbErr: any) {
      console.error('[Store-First] Error persistiendo lead en MongoDB:', dbErr);
    }

    // Despacho asíncrono a Retia CRM Gateway
    const webhookPayload = {
      reference,
      fullName: data.fullName,
      company: data.company,
      email: data.email,
      phone: normalizedPhone,
      service: data.service,
      message: data.message,
      source: 'megalink.vzla.online',
      ip,
      utm: data.utm,
      timestamp: new Date().toISOString(),
    };

    const webhookResult = await dispatchRetiaWebhook(webhookPayload);

    // Registro de evento de webhook en outbox
    try {
      if (process.env.MONGODB_URI) {
        await MegalinkWebhookEvent.create({
          eventType: 'lead.created',
          payload: webhookPayload,
          status: webhookResult.success ? 'delivered' : 'failed',
          attempts: 1,
          lastAttemptAt: new Date(),
          lastError: webhookResult.error,
          responseStatus: webhookResult.status,
        });

        if (leadDoc) {
          await MegalinkLead.updateOne(
            { _id: leadDoc._id },
            {
              webhookStatus: webhookResult.success ? 'delivered' : 'failed',
              webhookError: webhookResult.error,
            }
          );
        }
      }
    } catch (whLogErr) {
      console.error('[Webhook Outbox] Error registrando evento:', whLogErr);
    }

    return NextResponse.json({
      success: true,
      reference,
      message: 'Solicitud de evaluación y cotización recibida exitosamente.',
    });
  } catch (err: any) {
    console.error('Error procesando cotización:', err);
    return NextResponse.json(
      { error: 'Error interno del servidor al procesar la solicitud' },
      { status: 500 }
    );
  }
}

