import type { TFunction } from 'i18next';
import type { ReactNode } from 'react';

import type { Patient } from '../../../../types/patient.types';
import {
  formatNoteForDisplay,
  tagsToForm,
} from '../../../../services/PatientService/patient.service';
import { formatDate } from '../../../../utils/formatDate';
import { formatBoolean } from '../../../../utils/patientStatus';

export type PatientDetailRow = {
  label: string;
  value: ReactNode;
  multiline?: boolean;
};

export const getPatientDetails = (
  patient: Patient,
  t: TFunction,
  language = 'tr',
): PatientDetailRow[] => {
  const isEn = language === 'en';

  return [
    {
      label: t('appointment'),
      value: formatDate(patient.appointmentDate),
    },
    {
      label: t('birthDate'),
      value: formatDate(patient.birthDate),
    },
    {
      label: t('bloodGroup'),
      value: patient.bloodType,
    },
    {
      label: t('score'),
      value: patient.score,
    },
    {
      label: t('insured'),
      value: formatBoolean(patient.isInsured, t),
    },
    {
      label: t('followUp'),
      value: formatBoolean(patient.isFollowUp, t),
    },
    {
      label: t('vaccinated'),
      value: formatBoolean(patient.isVaccinated, t),
    },
    {
      label: t('diagnosis'),
      value: isEn ? patient.diagnosis_en : patient.diagnosis_tr,
      multiline: true,
    },
    {
      label: t('note'),
      value: formatNoteForDisplay(isEn ? patient.note_en : patient.note_tr),
      multiline: true,
    },
    {
      label: t('tags'),
      value: patient.tags.length > 0 ? tagsToForm(patient.tags) : null,
    },
    {
      label: t('notes'),
      value: patient.notes?.trim() || null,
      multiline: true,
    },
  ];
};
