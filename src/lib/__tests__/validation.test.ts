import { test } from 'node:test';
import assert from 'node:assert/strict';
import { quoteSubmissionSchema, normalizePhone } from '../validation';
import { signHmacSha256 } from '../webhook';

test('quoteSubmissionSchema valida datos correctos', () => {
  const valid = {
    fullName: 'Ing. Carlos Mendoza',
    company: 'Distribuidora Central C.A.',
    email: 'carlos.mendoza@empresa.com',
    phone: '0414-1234567',
    service: 'cctv',
    message: 'Requerimos 16 cámaras IP para galpón industrial.',
  };

  const res = quoteSubmissionSchema.safeParse(valid);
  assert.equal(res.success, true);
});

test('quoteSubmissionSchema rechaza correos inválidos y nombres cortos', () => {
  const invalid = {
    fullName: 'Al',
    company: 'D',
    email: 'correo-invalido',
    phone: '123',
    service: 'desconocido',
  };

  const res = quoteSubmissionSchema.safeParse(invalid);
  assert.equal(res.success, false);
  if (!res.success) {
    const fields = res.error.issues.map((i) => i.path[0]);
    assert.ok(fields.includes('fullName'));
    assert.ok(fields.includes('company'));
    assert.ok(fields.includes('email'));
    assert.ok(fields.includes('phone'));
    assert.ok(fields.includes('service'));
  }
});

test('normalizePhone normaliza números venezolanos a formato E.164', () => {
  assert.equal(normalizePhone('0414-1234567'), '+584141234567');
  assert.equal(normalizePhone('+58 412 9876543'), '+584129876543');
  assert.equal(normalizePhone('584241112233'), '+584241112233');
});

test('signHmacSha256 genera firma HMAC válida', () => {
  const secret = 'super-secret-key-123';
  const payload = JSON.stringify({ test: 'data' });
  const sig1 = signHmacSha256(payload, secret);
  const sig2 = signHmacSha256(payload, secret);
  assert.equal(sig1, sig2);
  assert.equal(typeof sig1, 'string');
  assert.equal(sig1.length, 64);
});

