import crypto from 'crypto';

export function signHmacSha256(payload: string, secret: string): string {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  return hmac.digest('hex');
}

export async function dispatchRetiaWebhook(
  leadData: Record<string, any>
): Promise<{ success: boolean; status?: number; error?: string }> {
  const webhookUrl = process.env.RETIA_WEBHOOK_URL;
  const webhookSecret = process.env.RETIA_WEBHOOK_SECRET;

  if (!webhookUrl) {
    return { success: false, error: 'RETIA_WEBHOOK_URL no configurada' };
  }

  const rawBody = JSON.stringify(leadData);
  const signature = webhookSecret ? signHmacSha256(rawBody, webhookSecret) : '';

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(signature
          ? {
              'X-Webhook-Signature': `sha256=${signature}`,
              'X-Retia-Signature': `sha256=${signature}`,
            }
          : {}),
      },
      body: rawBody,
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      return { success: false, status: res.status, error: `HTTP ${res.status}: ${errText}` };
    }

    return { success: true, status: res.status };
  } catch (err: any) {
    return { success: false, error: err.message || 'Error de red en webhook' };
  }
}

