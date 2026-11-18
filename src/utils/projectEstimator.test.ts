import test from 'node:test';
import assert from 'node:assert/strict';
import {
  estimateInfrastructure,
  formatInquiryReference,
  validateQuoteForm,
  type QuoteFormData,
} from './projectEstimator';

test('estimateInfrastructure builds qualitative CCTV specification', () => {
  const res = estimateInfrastructure({
    category: 'cctv',
    outdoorOrLongRange: true,
    highRedundancy: true,
  });

  assert.equal(res.category, 'cctv');
  assert.match(res.architectureScope, /IR \/ ColorVu/);
  assert.match(res.primaryHardware, /RAID/);
  assert.match(res.switchingAndPower, /supresores de sobretensión/i);
});

test('estimateInfrastructure builds certified cabling & rack recommendation for redes', () => {
  const res = estimateInfrastructure({
    category: 'redes',
    outdoorOrLongRange: true,
    highRedundancy: true,
  });

  assert.match(res.architectureScope, /Cat6A/);
  assert.match(res.architectureScope, /fibra óptica/i);
  assert.match(res.switchingAndPower, /Capa 2\/3/);
});

test('estimateInfrastructure builds high-density Wi-Fi & PtP/PtMP recommendation', () => {
  const standard = estimateInfrastructure({
    category: 'wifi',
    outdoorOrLongRange: false,
    highRedundancy: false,
  });
  const extended = estimateInfrastructure({
    category: 'wifi',
    outdoorOrLongRange: true,
    highRedundancy: true,
  });

  assert.match(standard.architectureScope, /Site Survey/);
  assert.match(extended.architectureScope, /PtP \/ PtMP/);
  assert.match(extended.switchingAndPower, /roaming sin cortes/i);
});

test('validateQuoteForm catches missing fields and accepts valid corporate inquiry', () => {
  const invalid: QuoteFormData = {
    fullName: 'Al',
    company: '',
    email: 'correo-invalido',
    phone: '123',
    service: 'redes',
    message: 'Hola',
  };
  const errs = validateQuoteForm(invalid);
  assert.ok(errs.fullName);
  assert.ok(errs.company);
  assert.ok(errs.email);
  assert.ok(errs.phone);
  assert.ok(errs.message);

  const valid: QuoteFormData = {
    fullName: 'Carlos Mendoza',
    company: 'Logística Andina S.A.',
    email: 'cmendoza@logistica.com',
    phone: '+57 300 555 0192',
    service: 'redes',
    message: 'Requerimos certificación de puntos Cat6A y organización de rack principal.',
  };
  assert.deepEqual(validateQuoteForm(valid), {});
});

test('formatInquiryReference produces deterministic ML-YYYY-NNNN reference', () => {
  const ref = formatInquiryReference(new Date('2026-11-17T10:00:00Z'), 482);
  assert.equal(ref, 'ML-2026-1482');
});
