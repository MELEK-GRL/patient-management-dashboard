import { describe, expect, it } from 'vitest';

import {
  isValidNameInput,
  sanitizeNameInput,
  sanitizeTagsInput,
  sanitizeTextInput,
} from '../inputValidation';

describe('inputValidation', () => {
  it('isim alanında özel karakterleri temizler', () => {
    expect(sanitizeNameInput('<span>Ali</span>')).toBe('spanAlispan');
    expect(sanitizeNameInput('Mehmet123!')).toBe('Mehmet');
    expect(sanitizeNameInput('Ayşe Güneş')).toBe('Ayşe Güneş');
    expect(sanitizeNameInput("Jean-Pierre O'Connor")).toBe("Jean-Pierre O'Connor");
  });

  it('metin alanında html karakterlerini temizler', () => {
    expect(sanitizeTextInput('Tanı: <script>alert(1)</script>')).toBe(
      'Tanı: scriptalert(1)script',
    );
    expect(sanitizeTextInput('Tip 2 diyabet, kontrol altında.')).toBe(
      'Tip 2 diyabet, kontrol altında.',
    );
  });

  it('etiket alanında geçersiz karakterleri temizler', () => {
    expect(sanitizeTagsInput('diyabet, hipertansiyon')).toBe(
      'diyabet, hipertansiyon',
    );
    expect(sanitizeTagsInput('tag<script>, test')).toBe('tagscript, test');
  });

  it('geçerli isim kontrolü yapar', () => {
    expect(isValidNameInput('Ali Veli')).toBe(true);
    expect(isValidNameInput('<Ali>')).toBe(false);
  });
});
