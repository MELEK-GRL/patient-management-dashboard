import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Badge from '../../atoms/Badge/Badge';
import T from '../../atoms/Text/T';
import type { Patient } from '../../../types/patient.types';
import { getPatientDetails } from './PatientData/PatientDetailData';
import { formatPriority } from '../../../utils/patientSatus';

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
      <T font="xsmall" className="font-semibold text-slate-600">
        {title}
      </T>
    </div>

    <div>{children}</div>
  </div>
);

const DataRow = ({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: ReactNode;
  multiline?: boolean;
}) => (
  <div
    className={
      multiline
        ? 'flex flex-col gap-2 border-b border-slate-100 px-4 py-3.5 last:border-b-0'
        : 'flex flex-col gap-1 border-b border-slate-100 px-4 py-3.5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6'
    }
  >
    <T font="xsmall" className="shrink-0 text-slate-500">
      {label}
    </T>

    <div
      className={
        multiline
          ? 'text-sm font-normal leading-relaxed text-slate-800'
          : 'text-sm font-normal text-slate-500 sm:text-right'
      }
    >
      {value}
    </div>
  </div>
);

const PatientDetail = ({ patient }: PatientDetailProps) => {
  const { t, i18n } = useTranslation();

  const statusHeaders = useMemo(
    () => [
      { id: 'status' as const, label: t('patientDetailStatus') },
      { id: 'priority' as const, label: t('patientDetailPriority') },
    ],
    [t],
  );

  const patientDetails = useMemo(
    () => getPatientDetails(patient, t, i18n.language),
    [patient, t, i18n.language],
  );

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

        <div className="flex shrink-0 gap-4">
          {statusHeaders.map((header) => (
            <div
              key={header.id}
              className="flex flex-col items-center"
            >
              <T
                font="xsmall"
                className="mb-1.5 text-center text-slate-500"
              >
                {header.label}
              </T>

              <Badge
                label={
                  header.id === 'status'
                    ? patient.status
                    : formatPriority(patient.priority, t)
                }
                status={
                  header.id === 'status'
                    ? patient.status
                    : patient.priority
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200">
        <PanelSection title={t('information')}>
          {patientDetails
            .filter((row) => row.value)
            .map((row) => (
              <DataRow
                key={row.label}
                label={row.label}
                value={row.value}
                multiline={row.multiline}
              />
            ))}
        </PanelSection>
      </div>
    </div>
  );
};

export default PatientDetail;
