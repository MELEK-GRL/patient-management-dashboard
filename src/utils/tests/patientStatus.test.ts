import type { TFunction } from 'i18next';
import { describe, it, expect } from 'vitest';
import { formatBoolean, formatPriority } from '../patientStatus';

const t = ((key: string) => key) as TFunction;

describe('formatPriority', () => {
  it('acil için priorityUrgent döner', () => {
    expect(formatPriority('acil', t)).toBe('priorityUrgent');
  });

  it('normal için priorityNormal döner', () => {
    expect(formatPriority('normal', t)).toBe('priorityNormal');
  });

  it('bilinmeyen değeri olduğu gibi döner', () => {
    expect(formatPriority('düşük', t)).toBe('düşük');
  });
});

describe('formatBoolean', () => {
  it('true için yes döner', () => {
    expect(formatBoolean(true, t)).toBe('yes');
  });

  it('false için no döner', () => {
    expect(formatBoolean(false, t)).toBe('no');
  });
});
