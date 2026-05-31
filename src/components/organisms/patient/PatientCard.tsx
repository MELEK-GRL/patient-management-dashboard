import { useMemo, useState, type ReactElement } from 'react';
import clsx from 'clsx';
import {
  HiOutlineDotsVertical,
  HiOutlinePencil,
  HiOutlineTrash,
} from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  LeadingActions,
  SwipeAction,
  SwipeableListItem,
  TrailingActions,
} from 'react-swipeable-list';
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
  slideSwipeable?: boolean;
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
  slideSwipeable = false,
  onPatientClick,
  onDeletePatient,
  onEditPatient,
}: PatientCardProps): ReactElement => {
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

  const leftActionSwipeable = useMemo(
    () => (
      <LeadingActions>
        <SwipeAction onClick={() => onEditPatient?.(patient)}>
          <div
            className="flex h-full w-full min-w-20 items-center justify-start gap-2 px-4 text-white"
            style={{ backgroundColor: colors.buttonPrimary }}
            aria-label={t('edit')}
          >
            <HiOutlinePencil className="h-5 w-5 shrink-0" />
            <T font="semiBold" as="span" className="text-sm text-white">
              {t('edit')}
            </T>
          </div>
        </SwipeAction>
      </LeadingActions>
    ),
    [onEditPatient, patient, t],
  );

  const rightActionSwipeable = useMemo(
    () => (
      <TrailingActions>
        <SwipeAction destructive onClick={() => setIsDeleteOpen(true)}>
          <div
            className="flex h-full w-full min-w-20 items-center justify-end gap-2 px-4 text-white"
            style={{ backgroundColor: colors.buttonDanger }}
            aria-label={t('delete')}
          >
            <T font="semiBold" as="span" className="text-sm text-white">
              {t('delete')}
            </T>
            <HiOutlineTrash className="h-5 w-5 shrink-0" />
          </div>
        </SwipeAction>
      </TrailingActions>
    ),
    [t],
  );

  const patientInfo = useMemo(
    () => [
      {
        label: t('status'),
        value: (
          <Badge
            label={patient.status}
            status={patient.status}
            size="sm"
          />
        ),
      },
      {
        label: t('priority'),
        value: (
          <Badge
            label={formatPriority(patient.priority, t)}
            status={patient.priority}
            size="sm"
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

  const modals = (
    <>
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

  const cardContent = (
    <article
      onClick={() => onPatientClick?.(patient)}
      className={clsx(
        CARD_LAYOUT,
        'w-full min-w-0',
        onPatientClick && 'cursor-pointer',
      )}
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
              <T font="xsmall">{patient.department}</T>
            </div>
          </div>

          <T font="xsmall">{appointmentLabel}</T>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
          {patientInfo.map((item) => (
            <div
              key={item.label}
              className="flex min-w-0 items-center gap-2"
            >
              <T font="xsmall" as="span" className="shrink-0 text-slate-500">
                {item.label}
              </T>

              {item.value}
            </div>
          ))}
        </div>
      </div>
    </article>
  );

  if (slideSwipeable) {
    return (
      <SwipeableListItem
        leadingActions={leftActionSwipeable}
        trailingActions={rightActionSwipeable}
        scrollStartThreshold={10}
        swipeStartThreshold={10}
        threshold={0.35}
      >
        {cardContent}
        {modals}
      </SwipeableListItem>
    );
  }

  return (
    <>
      {cardContent}
      {modals}
    </>
  );
};

export default PatientCard;
