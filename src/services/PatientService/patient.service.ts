import api from '../api';
import type { Patient } from '../../types/patient.types';
import { formatTodayDate } from '../../utils/formatDate';
import type { PatientFormState } from '../../types/patientForm.types';
import {
  isValidNameInput,
  isValidScoreInput,
  isValidTagsInput,
  isValidTextInput,
  sanitizeNameInput,
  sanitizeScoreInput,
  sanitizeTagsInput,
  sanitizeTextInput,
} from '../../utils/inputValidation';

const EMPTY_NOTE = '-';

const REQUIRED_FIELDS = [
  'firstName',
  'lastName',
  'birthDate',
  'department',
  'appointmentDate',
  'status',
  'priority',
  'score',
  'bloodType',
  'diagnosis',
] as const;

const toDate = (date: string) => date.split('T')[0];

const splitName = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return { firstName: '', lastName: '' };
  }

  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '' };
  }

  return {
    firstName: parts.slice(0, -1).join(' '),
    lastName: parts[parts.length - 1],
  };
};

export const formatNoteForDisplay = (note: string) => note.trim() || EMPTY_NOTE;

const noteToForm = (note: string) => {
  const trimmed = note.trim();
  return trimmed === '' || trimmed === EMPTY_NOTE ? '' : trimmed;
};

export const tagsToForm = (tags: string[]) => tags.join(', ');

export const tagsFromForm = (tags: string) =>
  tags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

export const getPatients = async () => {
  const { data } = await api.get<Patient[]>('/data');
  return data;
};

export const editPatientForm = (
  patient: Patient,
  language = 'tr',
): PatientFormState => {
  const { firstName, lastName } = splitName(patient.fullName);
  const isEn = language === 'en';

  return {
    firstName: sanitizeNameInput(firstName),
    lastName: sanitizeNameInput(lastName),
    birthDate: toDate(patient.birthDate),
    department: patient.department,
    appointmentDate: toDate(patient.appointmentDate),
    status: patient.status,
    priority: patient.priority,
    score: sanitizeScoreInput(String(patient.score)),
    bloodType: patient.bloodType,
    diagnosis: sanitizeTextInput(isEn ? patient.diagnosis_en : patient.diagnosis_tr),
    note: sanitizeTextInput(
      noteToForm(isEn ? patient.note_en : patient.note_tr),
    ),
    tags: sanitizeTagsInput(tagsToForm(patient.tags)),
    notes: sanitizeTextInput(patient.notes?.trim() ?? ''),
    isInsured: patient.isInsured,
    isFollowUp: patient.isFollowUp,
    isVaccinated: patient.isVaccinated,
  };
};

export const isPatientFormValid = (form: PatientFormState) =>
  REQUIRED_FIELDS.every((field) => form[field].trim() !== '') &&
  form.birthDate <= formatTodayDate() &&
  form.appointmentDate > formatTodayDate() &&
  isValidNameInput(form.firstName) &&
  isValidNameInput(form.lastName) &&
  isValidTextInput(form.diagnosis) &&
  isValidTextInput(form.note) &&
  isValidTextInput(form.notes) &&
  isValidTagsInput(form.tags) &&
  isValidScoreInput(form.score);

export const savePatientForm = (
  form: PatientFormState,
  existing?: Patient,
  language = 'tr',
): Patient => {
  const isEn = language === 'en';
  const note = formatNoteForDisplay(sanitizeTextInput(form.note));
  const diagnosis = sanitizeTextInput(form.diagnosis.trim());
  const firstName = sanitizeNameInput(form.firstName.trim());
  const lastName = sanitizeNameInput(form.lastName.trim());

  return {
    id: existing?.id ?? `pat-${Date.now()}`,
    fullName: [firstName, lastName].filter(Boolean).join(' '),
    birthDate: form.birthDate,
    appointmentDate: `${form.appointmentDate}T00:00:00`,
    createdAt: existing?.createdAt ?? `${formatTodayDate()}T00:00:00`,
    department: form.department,
    status: form.status,
    priority: form.priority,
    bloodType: form.bloodType,
    score: Number(sanitizeScoreInput(form.score)),
    diagnosis_tr: isEn ? (existing?.diagnosis_tr ?? '') : diagnosis,
    diagnosis_en: isEn ? diagnosis : (existing?.diagnosis_en ?? diagnosis),
    note_tr: isEn ? (existing?.note_tr ?? '') : note,
    note_en: isEn ? note : (existing?.note_en ?? note),
    isInsured: form.isInsured,
    isFollowUp: form.isFollowUp,
    isVaccinated: form.isVaccinated,
    tags: tagsFromForm(sanitizeTagsInput(form.tags)),
    notes: sanitizeTextInput(form.notes.trim()) || null,
  };
};
