import { useMemo, useState, type ReactElement } from 'react';
import clsx from 'clsx';
import {
  HiOutlinePencil,
  HiOutlineTrash,
} from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Badge from '../../atoms/Badge/Badge';
import Button from '../../atoms/Button/Button';
import EmptyState from '../../atoms/FeedBack/EmptyState';
import PopupModal from '../../atoms/Modal/PopupModal';
import T from '../../atoms/Text/T';
import Pagination from '../../molecules/Pagination/Pagination';
import { deletePatient } from '../../../store/patient.store';
import type { Patient } from '../../../types/patient.types';
import { formatDate } from '../../../utils/formatDate';
import { formatPriority } from '../../../utils/patientStatus';

interface PatientTableProps {
  patients: Patient[];
  totalCount?: number;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  showPagination?: boolean;
  onPatientClick?: (patient: Patient) => void;
  onDeletePatient?: (patientId: string) => void;
  onAddPatient?: () => void;
  onEditPatient?: (patient: Patient) => void;
}

const tableHeaders = [
  { id: 'fullName', labelKey: 'tableHeaderFullName' },
  { id: 'department', labelKey: 'tableHeaderDepartment' },
  { id: 'appointment', labelKey: 'tableHeaderAppointment' },
  { id: 'status', labelKey: 'tableHeaderStatus' },
  { id: 'priority', labelKey: 'tableHeaderPriority' },
  { id: 'blood', labelKey: 'tableHeaderBlood' },
  { id: 'score', labelKey: 'tableHeaderScore' },
  { id: 'actions', labelKey: 'tableHeaderActions' },
] as const;

const PatientTable = ({
  patients,
  totalCount,
  page = 1,
  totalPages = 1,
  onPageChange,
  showPagination = false,
  onPatientClick,
  onDeletePatient,
  onAddPatient,
  onEditPatient,
}: PatientTableProps): ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [patientToDelete, setPatientToDelete] =
    useState<Patient | null>(null);
  const [isDeleteSuccessOpen, setIsDeleteSuccessOpen] = useState(false);

  const handleCloseDeleteModal = () => {
    setPatientToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (!patientToDelete) {
      return;
    }

    dispatch(deletePatient(patientToDelete.id));
    onDeletePatient?.(patientToDelete.id);
    setPatientToDelete(null);
    setIsDeleteSuccessOpen(true);
  };

  const headers = useMemo(
    () =>
      tableHeaders.map((header) => ({
        ...header,
        label: t(header.labelKey),
      })),
    [t],
  );

  return (
    <div className="rounded-md bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <T font="medium" className="text-2xl">
          {t('patientList')}
        </T>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5">
            <T font="small" className="text-slate-500">
              {t('patientCount')}
            </T>
            <T
              font="small"
              className="tabular-nums font-medium text-slate-800"
            >
              {totalCount ?? patients.length}
            </T>
          </div>

          <Button backgroundColor="primary" onClick={onAddPatient}>
            {t('addPatient')}
          </Button>
        </div>
      </div>

      <div className="scrollbar-themed max-h-[520px] overflow-x-auto overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="border-b border-slate-200">
              {headers.map((header) => (
                <th
                  key={header.id}
                  className={clsx(
                    'py-4 text-sm font-medium text-slate-500',
                    header.id === 'actions'
                      ? 'pr-2 text-right'
                      : 'text-left',
                    header.id === 'fullName' ? 'pl-5' : 'pl-4',
                  )}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="p-4">
                  <EmptyState />
                </td>
              </tr>
            ) : (
              patients.map((patient) => {
                const appointmentLabel = formatDate(
                  patient.appointmentDate,
                );

                return (
                  <tr
                    key={patient.id}
                    onClick={() => onPatientClick?.(patient)}
                    className={clsx(
                      'border-b border-slate-100 transition-colors',
                      onPatientClick &&
                        'cursor-pointer hover:bg-slate-50',
                    )}
                  >
                    <td className="py-5 pl-5">
                      <T>{patient.fullName}</T>
                    </td>

                    <td className="py-5 pl-4">
                      <T>{patient.department}</T>
                    </td>

                    <td className="py-5 pl-4">
                      <T>{appointmentLabel}</T>
                    </td>

                    <td className="align-middle py-5 pl-4">
                      <Badge
                        label={patient.status}
                        status={patient.status}
                      />
                    </td>

                    <td className="align-middle py-5 pl-4">
                      <Badge
                        label={formatPriority(patient.priority, t)}
                        status={patient.priority}
                      />
                    </td>

                    <td className="py-5 pl-4">
                      <T>{patient.bloodType}</T>
                    </td>

                    <td className="py-5 pl-4">
                      <T>{patient.score}</T>
                    </td>

                    <td className="py-5 pr-2 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          aria-label={t('edit')}
                          onClick={(event) => {
                            event.stopPropagation();
                            onEditPatient?.(patient);
                          }}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                          <HiOutlinePencil className="h-5 w-5" />
                        </button>

                        <button
                          type="button"
                          aria-label={t('delete')}
                          onClick={(event) => {
                            event.stopPropagation();
                            setPatientToDelete(patient);
                          }}
                          className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                        >
                          <HiOutlineTrash className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {showPagination && onPageChange && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          className="mt-4 border-t border-slate-100 pt-4"
        />
      )}

      <PopupModal
        open={patientToDelete !== null}
        onClose={handleCloseDeleteModal}
        status="danger"
        message={t('deleteConfirmMessage')}
        leftButtonText={t('cancel')}
        rightButtonText={t('delete')}
        onLeftButtonClick={handleCloseDeleteModal}
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
    </div>
  );
};

export default PatientTable;
