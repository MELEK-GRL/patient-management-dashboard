import api from '../api';
import type { Patient } from '../../types/patient.types';
import type { PatientFormState } from '../../types/patientForm.types';

export const getPatients = async () => {
  const response = await api.get<Patient[]>('/data');
  return response.data;
};

export const savePatient = async (patient: Patient) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return patient;
};

const toDate = (date: string) => date.split('T')[0] ?? date;

const splitName = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/);
  return {
    firstName: parts[0] ?? '',
    lastName: parts.slice(1).join(' '),
  };
};

export const mapPatientToForm = (
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
    note: isEn ? patient.note_en : patient.note_tr,
    isInsured: patient.isInsured,
    isFollowUp: patient.isFollowUp,
    isVaccinated: patient.isVaccinated,
  };
};

export const isPatientFormValid = (form: PatientFormState) =>
  form.firstName.trim() !== '' &&
  form.lastName.trim() !== '' &&
  form.birthDate !== '' &&
  form.department !== '' &&
  form.appointmentDate !== '' &&
  form.status !== '' &&
  form.priority !== '' &&
  form.score !== '' &&
  form.bloodType !== '' &&
  form.diagnosis.trim() !== '' &&
  form.note.trim() !== '';

export const mapFormToPatient = (
  form: PatientFormState,
  existing?: Patient,
  language = 'tr',
): Patient => {
  const note = form.note.trim();
  const diagnosis = form.diagnosis.trim();
  const isEn = language === 'en';

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
