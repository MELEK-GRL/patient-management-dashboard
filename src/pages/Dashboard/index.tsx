import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/atoms/Button/Button';
import Loading from '../../components/atoms/FeedBack/Loading';
import CenterModal from '../../components/atoms/Modal/CenterModal';
import PopupModal from '../../components/atoms/Modal/PopupModal';
import T from '../../components/atoms/Text/T';
import Dropdown from '../../components/molecules/Dropdown/Dropdown';
import EmptyState from '../../components/atoms/FeedBack/EmptyState';
import SearchInput from '../../components/atoms/Input/SearchInput';
import PatientCard from '../../components/organisms/patient/PatientCard';
import PatientDetail from '../../components/organisms/patient/PatientDetail';
import PatientForm from '../../components/organisms/patient/PatientForm';
import PatientTable from '../../components/organisms/patient/PatientTable';
import Pagination from '../../components/molecules/Pagination/Pagination';
import { usePagination } from '../../components/molecules/Pagination/usePagination';
import { getPatients } from '../../services/PatientService/patient.service';
import { setPatients } from '../../store/patient.store';
import type { Patient } from '../../types/patient.types';
import type { RootState } from '../../store/store';

export default function Dashboard() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const patients = useSelector(
    (state: RootState) => state.patient.patients,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isListLoading, setIsListLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [dateSort, setDateSort] = useState('old');
  const [selectedPatientId, setSelectedPatientId] =
    useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPatientId, setEditingPatientId] =
    useState<string | null>(null);
  const [loadErrorOpen, setLoadErrorOpen] = useState(false);

  const fetchPatients = useCallback(async () => {
    setIsLoading(true);
    setLoadErrorOpen(false);

    try {
      const data = await getPatients();
      console.log("--->data",JSON.stringify(data,null,2));
      dispatch(setPatients(data));
    } catch (error) {
      console.error(error);
      setLoadErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const selectedPatient = useMemo(
    () =>
      patients.find((patient) => patient.id === selectedPatientId) ??
      null,
    [patients, selectedPatientId],
  );

  const editingPatient = useMemo(
    () =>
      editingPatientId
        ? (patients.find((patient) => patient.id === editingPatientId) ??
          null)
        : null,
    [patients, editingPatientId],
  );

  const dateSortOptions = useMemo(
    () => [
      { value: 'old', label: t('sortNewToOld') },
      { value: 'new', label: t('sortOldToNew') },
    ],
    [t],
  );

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatientId(patient.id);
  };

  const handleCloseDetail = () => {
    setSelectedPatientId(null);
  };

  const handleOpenAddForm = () => {
    setEditingPatientId(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (patient: Patient) => {
    setEditingPatientId(patient.id);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingPatientId(null);
  };

  const handleStatusChange = (value: string) => {
    setIsListLoading(true);
    setStatus(value);
  };

  const handleDateSortChange = (value: string) => {
    setIsListLoading(true);
    setDateSort(value);
  };

  useEffect(() => {
    if (!isListLoading) return;

    const timer = window.setTimeout(() => {
      setIsListLoading(false);
    }, 350);

    return () => window.clearTimeout(timer);
  }, [status, dateSort, isListLoading]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const statusOptions = useMemo(() => {
    const statuses = [
      ...new Set(patients.map((patient) => patient.status)),
    ].sort();

    return [
      { value: '', label: t('all') },
      ...statuses.map((item) => ({
        value: item,
        label: item,
      })),
    ];
  }, [patients, t]);

  const filteredPatients = useMemo(() => {
    const sortMultiplier = dateSort === 'new' ? 1 : -1;

    return patients
      .filter((patient) => {
        const searchStatus = patient.fullName
          .toLowerCase()
          .includes(search.toLowerCase());

        const dropdownStatus =
          !status || patient.status === status;

        return searchStatus && dropdownStatus;
      })
      .sort(
        (a, b) =>
          sortMultiplier *
          (new Date(a.appointmentDate).getTime() -
            new Date(b.appointmentDate).getTime()),
      );
  }, [patients, search, status, dateSort]);

  const {
    paginatedItems,
    page,
    totalPages,
    setPage,
    showPagination,
  } = usePagination(filteredPatients);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <PopupModal
        open={loadErrorOpen}
        onClose={() => setLoadErrorOpen(false)}
        status="error"
        message={t('loadPatientsErrorMessage')}
        leftButtonText={t('cancel')}
        rightButtonText={t('retry')}
        onLeftButtonClick={() => setLoadErrorOpen(false)}
        onRightButtonClick={fetchPatients}
      />

      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
        <div className="min-w-0 flex-1">
          <SearchInput value={search} onChange={setSearch} />
        </div>

        <Dropdown
          value={status}
          options={statusOptions}
          onChange={handleStatusChange}
          fontWeight="normal"
          className="lg:w-44"
        />

        <Dropdown
          value={dateSort}
          options={dateSortOptions}
          onChange={handleDateSortChange}
          fontWeight="normal"
          className="lg:w-48"
        />
      </div>

      <CenterModal
        open={selectedPatientId !== null}
        title={t('patientDetail')}
        onClose={handleCloseDetail}
      >
        {selectedPatient && (
          <PatientDetail patient={selectedPatient} />
        )}
      </CenterModal>

      <CenterModal
        open={isFormOpen}
        title={t(editingPatientId ? 'editPatient' : 'newPatient')}
        size="lg"
        onClose={handleCloseForm}
      >
        <PatientForm
          key={editingPatientId ?? 'new'}
          patient={editingPatient}
          showHeader={false}
          onCancel={handleCloseForm}
          onSuccess={handleCloseForm}
        />
      </CenterModal>

      <div className="relative hidden min-h-[280px] md:block">
        {isListLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
            <Loading />
          </div>
        )}

        <PatientTable
          patients={paginatedItems}
          totalCount={filteredPatients.length}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          showPagination={showPagination}
          onPatientClick={handlePatientClick}
          onAddPatient={handleOpenAddForm}
          onEditPatient={handleOpenEditForm}
          onDeletePatient={(patientId) => {
            if (selectedPatientId === patientId) {
              setSelectedPatientId(null);
            }
          }}
        />
      </div>

      <div className="relative md:hidden">
        <div className="mb-4 flex flex-col gap-2.5">
          <T font="medium" className="text-lg text-slate-900">
            {t('patientList')}
          </T>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 whitespace-nowrap rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1">
              <T font="xsmall" className="text-slate-500">
                {t('patientCount')}
              </T>

              <T
                font="xsmall"
                className="tabular-nums font-semibold text-slate-800"
              >
                {filteredPatients.length}
              </T>
            </div>

            <Button
              backgroundColor="primary"
              onClick={handleOpenAddForm}
              className="shrink-0 px-3 py-1.5 text-xs"
            >
              {t('addPatient')}
            </Button>
          </div>
        </div>

        <div className="relative min-h-[200px]">
          {isListLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
              <Loading />
            </div>
          )}

          {filteredPatients.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="space-y-2.5">
                {paginatedItems.map((patient) => (
                  <PatientCard
                    key={patient.id}
                    patient={patient}
                    onPatientClick={handlePatientClick}
                    onEditPatient={handleOpenEditForm}
                    onDeletePatient={(patientId) => {
                      if (selectedPatientId === patientId) {
                        setSelectedPatientId(null);
                      }
                    }}
                  />
                ))}
              </div>

              {showPagination && (
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                  className="mt-4"
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
