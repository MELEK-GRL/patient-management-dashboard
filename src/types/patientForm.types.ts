import { formatTodayDate, formatTomorrowDate } from '../utils/formatDate';

export type PatientFormState = {
  firstName: string;
  lastName: string;
  birthDate: string;
  department: string;
  appointmentDate: string;
  status: string;
  priority: string;
  score: string;
  bloodType: string;
  diagnosis: string;
  note: string;
  tags: string;
  notes: string;
  isInsured: boolean;
  isFollowUp: boolean;
  isVaccinated: boolean;
};

export const createInitialPatientFormState = (): PatientFormState => {
  const today = formatTodayDate();
  const tomorrow = formatTomorrowDate();

  return {
    firstName: '',
    lastName: '',
    birthDate: today,
    department: '',
    appointmentDate: tomorrow,
    status: '',
    priority: '',
    score: '',
    bloodType: '',
    diagnosis: '',
    note: '',
    tags: '',
    notes: '',
    isInsured: false,
    isFollowUp: false,
    isVaccinated: false,
  };
};