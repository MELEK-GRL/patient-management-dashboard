import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Badge from '../../atoms/Badge/Badge';
import PopupModal from '../../atoms/Modal/PopupModal';
import T from '../../atoms/Text/T';
import { deletePatient } from '../../../store/patient.store';
import type { Patient } from '../../../types/patient.types';
import { colors } from '../../../styles/colors';
import { formatDate } from '../../../utils/formatDate';
import { formatPriority } from '../../../utils/patientStatus';

interface PatientCardProps {
  patient: Patient;
  onPatientClick?: (patient: Patient) => void;
  onDeletePatient?: (patientId: string) => void;
  onEditPatient?: (patient: Patient) => void;
}

const priorityBorderColors: Record<string, string> = {
  acil: colors.patientCardBorderUrgent,
  Acil: colors.patientCardBorderUrgent,
  normal: colors.patientCardBorderNormal,
  Normal: colors.patientCardBorderNormal,
};

const getPriorityBorderColor = (priority: string) =>
  priorityBorderColors[priority] ?? colors.patientCardBorderDefault;

const CARD_LAYOUT =
  'relative rounded-lg border border-slate-200 border-l-[3px] bg-white shadow-sm transition-shadow hover:shadow-md';

const PatientCard = ({
  patient,
  onPatientClick,
  onDeletePatient,
  onEditPatient,
}: PatientCardProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteSuccessOpen, setIsDeleteSuccessOpen] = useState(false);

  const appointmentLabel = formatDate(patient.appointmentDate);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleOpenEdit = () => {
    setIsMenuOpen(false);
    onEditPatient?.(patient);
  };

  const handleOpenDelete = () => {
    setIsMenuOpen(false);
    setIsDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
  };

  const handleConfirmDelete = () => {
    dispatch(deletePatient(patient.id));
    onDeletePatient?.(patient.id);
    setIsDeleteOpen(false);
    setIsDeleteSuccessOpen(true);
  };

  const patientInfo = useMemo(
    () => [
      {
        label: t('status'),
        value: (
          <Badge
            label={patient.status}
            status={patient.status}
          />
        ),
      },
      {
        label: t('priority'),
        value: (
          <Badge
            label={formatPriority(patient.priority, t)}
            status={patient.priority}
          />
        ),
      },
      {
        label: t('bloodGroupShort'),
        value: <T font="semiBold">{patient.bloodType}</T>,
      },
      {
        label: t('score'),
        value: <T font="semiBold">{patient.score}</T>,
      },
    ],
    [patient, t],
  );

  return (
    <>
      <article
        onClick={() => onPatientClick?.(patient)}
        className={clsx(CARD_LAYOUT, onPatientClick && 'cursor-pointer')}
        style={{ borderLeftColor: getPriorityBorderColor(patient.priority) }}
      >
        <button
          type="button"
          aria-label={t('actions')}
          onClick={(event) => {
            event.stopPropagation();
            setIsMenuOpen(true);
          }}
          className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-slate-500"
        >
          <HiOutlineDotsVertical className="h-5 w-5" />
        </button>

        <div className="p-4 pr-12">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="min-w-0 [&_p]:m-0">
              <T font="semiBold">{patient.fullName}</T>

              <div className="mt-1 text-slate-500">
                <T font="xsmall">
                  {patient.department}
                </T>
              </div>
            </div>

            <T font="xsmall">{appointmentLabel}</T>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {patientInfo.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2"
              >
                <span className="text-xs text-slate-500">
                  {item.label}
                </span>

                {item.value}
              </div>
            ))}
          </div>
        </div>
      </article>

      <PopupModal
        open={isMenuOpen}
        onClose={handleCloseMenu}
        status="info"
        message={t('patientActionMessage')}
        leftButtonText={t('edit')}
        rightButtonText={t('delete')}
        leftButtonVariant="cancel"
        onLeftButtonClick={handleOpenEdit}
        onRightButtonClick={handleOpenDelete}
      />

      <PopupModal
        open={isDeleteOpen}
        onClose={handleCloseDelete}
        status="danger"
        message={t('deleteConfirmMessage')}
        leftButtonText={t('cancel')}
        rightButtonText={t('delete')}
        onLeftButtonClick={handleCloseDelete}
        onRightButtonClick={handleConfirmDelete}
      />

      <PopupModal
        open={isDeleteSuccessOpen}
        onClose={() => setIsDeleteSuccessOpen(false)}
        status="success"
        message={t('deletePatientSuccessMessage')}
        rightButtonText={t('ok')}
        rightButtonVariant="primary"
        onRightButtonClick={() => setIsDeleteSuccessOpen(false)}
      />
    </>
  );
};

export default PatientCard;
