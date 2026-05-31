import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import T from '../../atoms/Text/T';
import type { Patient } from '../../../types/patient.types';
import { getPatientDetails } from './PatientData/PatientDetailData';
import { formatDate } from '../../../utils/formatDate';

interface PatientDetailProps {
  patient: Patient;
}

const PanelSection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <div>
    <div className="border-b border-slate-100 bg-slate-50 px-4 py-2.5">
      <T font="small" className="font-semibold text-slate-600">
        {title}
      </T>
    </div>

    <div>{children}</div>
  </div>
);

const DataRow = ({
  label,
  value,
  lineLength = false,
}: {
  label: string;
  value: ReactNode;
  lineLength?: boolean;
}) => (
  <div
    className={
      lineLength
        ? 'flex flex-col gap-2 border-b border-slate-100 px-4 py-3.5 last:border-b-0'
        : 'flex flex-col gap-1 border-b border-slate-100 px-4 py-3.5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6'
    }
  >
    <T font="small" className="shrink-0 text-slate-700">
      {label}
    </T>

    <T
      font="small"
      as="div"
      className={`text-slate-500 ${lineLength ? 'leading-relaxed' : 'sm:text-right'}`}
    >
      {value}
    </T>
  </div>
);

const PatientDetail = ({ patient }: PatientDetailProps) => {
  const { t, i18n } = useTranslation();

  const patientDetails = useMemo(
    () => getPatientDetails(patient, t, i18n.language),
    [patient, t, i18n.language],
  );

  const appointmentLabel = formatDate(patient.appointmentDate);

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <T font="semiBold" className="text-lg text-slate-900">
            {patient.fullName}
          </T>

          <T font="xsmall" className="mt-1 block text-slate-500">
            {patient.department}
          </T>
        </div>

        <div className="flex shrink-0 flex-col items-end">
          <T font="semiBold" className="text-lg text-slate-900">
            {t('appointmentDate')}
          </T>
          <T font="xsmall" className="mt-1 block text-slate-500">
            {appointmentLabel}
          </T>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200">
        <PanelSection title={t('information')}>
          {patientDetails
            .filter((row) => row.value)
            .map((row) => (
              <DataRow
                key={row.label}
                label={row.label}
                value={row.value}
                lineLength={row.lineLength}
              />
            ))}
        </PanelSection>
      </div>
    </div>
  );
};

export default PatientDetail;
