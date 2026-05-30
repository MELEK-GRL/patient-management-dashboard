import { describe, it, expect } from 'vitest';
import {
  formatDate,
  formatIdControl,
  formatTodayDate,
} from '../formatDate';

describe('formatIdControl', () => {
  it('boşlukları - çevirir ve küçük harfe alır', () => {
    expect(formatIdControl('Patient Name')).toBe('patient-name');
  });

  it('id varsa id döner', () => {
    expect(formatIdControl('Patient Name', 'abc-123')).toBe('abc-123');
  });
});

describe('formatDate', () => {
  it('tarihi tr-TR formatında döner', () => {
    expect(formatDate('2024-01-15')).toBe('15.01.2024');
  });
});

describe('formatTodayDate', () => {
  it('YYYY-MM-DD formatında bugünün tarihini döner', () => {
    const result = formatTodayDate();

    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    expect(result).toBe(`${year}-${month}-${day}`);
  });
});
