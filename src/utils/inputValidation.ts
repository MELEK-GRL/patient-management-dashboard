const NAME_INVALID_CHARS = /[^\p{L}\s'-]/gu;
const TEXT_INVALID_CHARS = /[^\p{L}\d\s,.():;-]/gu;
const TAGS_INVALID_CHARS = /[^\p{L}\d\s,-]/gu;
const SCORE_MAX_LENGTH = 3;

const hasInvalidChars = (value: string, pattern: RegExp) =>
  new RegExp(pattern.source, 'u').test(value);

export type InputSanitizeMode = 'name' | 'text' | 'tags' | 'score';

export const sanitizeNameInput = (value: string) =>
  value.replace(NAME_INVALID_CHARS, '');

export const sanitizeTextInput = (value: string) =>
  value.replace(TEXT_INVALID_CHARS, '');

export const sanitizeTagsInput = (value: string) =>
  value.replace(TAGS_INVALID_CHARS, '');

export const sanitizeScoreInput = (value: string) =>
  value.replace(/\D/g, '').slice(0, SCORE_MAX_LENGTH);

export const sanitizeInput = (value: string, mode: InputSanitizeMode) => {
  switch (mode) {
    case 'name':
      return sanitizeNameInput(value);
    case 'text':
      return sanitizeTextInput(value);
    case 'tags':
      return sanitizeTagsInput(value);
    case 'score':
      return sanitizeScoreInput(value);
  }
};

export const isValidNameInput = (value: string) =>
  !hasInvalidChars(value, NAME_INVALID_CHARS);

export const isValidTextInput = (value: string) =>
  !hasInvalidChars(value, TEXT_INVALID_CHARS);

export const isValidTagsInput = (value: string) =>
  !hasInvalidChars(value, TAGS_INVALID_CHARS);

export const isValidScoreInput = (value: string) =>
  /^\d{1,3}$/.test(value);
