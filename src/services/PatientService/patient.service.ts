import api from '../api';
import type { Patient } from '../../types/patient.types';
import type { PatientFormState } from '../../types/patientForm.types';

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
  const parts = fullName.trim().split(/\s+/);
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
};

export const formatNoteForDisplay = (note: string) => note.trim() || EMPTY_NOTE;

const noteToForm = (note: string) => {
  const trimmed = note.trim();
  return trimmed === '' || trimmed === EMPTY_NOTE ? '' : trimmed;
};

export const getPatients = async () => {
  const { data } = await api.get<Patient[]>('/data');
  return data;
};

export const EditPatientForm = (
  patient: Patient,
  language = 'tr',
): PatientFormState => {
  const { firstName, lastName } = splitName(patient.fullName);
  const isEn = language === 'en';

  return {
    firstName,
    lastName,
    birthDate: toDate(patient.birthDate),
    department: patient.department,
    appointmentDate: toDate(patient.appointmentDate),
    status: patient.status,
    priority: patient.priority,
    score: String(patient.score),
    bloodType: patient.bloodType,
    diagnosis: isEn ? patient.diagnosis_en : patient.diagnosis_tr,
    note: noteToForm(isEn ? patient.note_en : patient.note_tr),
    isInsured: patient.isInsured,
    isFollowUp: patient.isFollowUp,
    isVaccinated: patient.isVaccinated,
  };
};

export const isPatientFormValid = (form: PatientFormState) =>
  REQUIRED_FIELDS.every((field) => form[field].trim() !== '');

export const SavePatientForm = (
  form: PatientFormState,
  existing?: Patient,
  language = 'tr',
): Patient => {
  const isEn = language === 'en';
  const note = formatNoteForDisplay(form.note);
  const diagnosis = form.diagnosis.trim();

  return {
    id: existing?.id ?? `pat-${Date.now()}`,
    fullName: `${form.firstName.trim()} ${form.lastName.trim()}`,
    birthDate: form.birthDate,
    appointmentDate: `${form.appointmentDate}T00:00:00`,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    department: form.department,
    status: form.status,
    priority: form.priority,
    bloodType: form.bloodType,
    score: Number(form.score),
    diagnosis_tr: isEn ? (existing?.diagnosis_tr ?? '') : diagnosis,
    diagnosis_en: isEn ? diagnosis : (existing?.diagnosis_en ?? diagnosis),
    note_tr: isEn ? (existing?.note_tr ?? '') : note,
    note_en: isEn ? note : (existing?.note_en ?? note),
    isInsured: form.isInsured,
    isFollowUp: form.isFollowUp,
    isVaccinated: form.isVaccinated,
    tags: existing?.tags ?? [],
    notes: existing?.notes ?? null,
  };
};
