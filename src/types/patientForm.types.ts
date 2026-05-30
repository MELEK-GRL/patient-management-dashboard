import { formatTodayDate } from '../utils/formatDate';

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
  isInsured: boolean;
  isFollowUp: boolean;
  isVaccinated: boolean;
};

export const createInitialPatientFormState = (): PatientFormState => {
  const today = formatTodayDate();

  return {
    firstName: '',
    lastName: '',
    birthDate: today,
    department: '',
    appointmentDate: today,
    status: '',
    priority: '',
    score: '',
    bloodType: '',
    diagnosis: '',
    note: '',
    isInsured: false,
    isFollowUp: false,
    isVaccinated: false,
  };
};