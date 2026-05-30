import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../atoms/Button/Button';
import {
  CheckBox,
  DatePicker,
  Input,
  Textarea,
} from '../../atoms/Input';
import Loading from '../../atoms/FeedBack/Loading';
import PopupModal from '../../atoms/Modal/PopupModal';
import Dropdown from '../../molecules/Dropdown/Dropdown';
import T from '../../atoms/Text/T';
import {
  isPatientFormValid,
  mapFormToPatient,
  mapPatientToForm,
  savePatient,
} from '../../../services/PatientService/patient.service';
import { useDispatch } from 'react-redux';
import { addPatient, updatePatient } from '../../../store/patient.store';
import type { Patient } from '../../../types/patient.types';
import {
  createInitialPatientFormState,
  type PatientFormState,
} from '../../../types/patientForm.types';
import { colors } from '../../../styles/colors';
import { formatPriority } from '../../../utils/patientSatus';
import {
  bloodTypeValues,
  departmentValues,
  priorityValues,
  statusValues,
} from './PatientData/PatientFormData';

interface PatientFormProps {
  patient?: Patient | null;
  showHeader?: boolean;
  onCancel?: () => void;
  onSuccess?: () => void;
}

const PatientForm = ({
  patient,
  showHeader = true,
  onCancel,
  onSuccess,
}: PatientFormProps) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const isEdit = Boolean(patient);
  const [form, setForm] = useState(() =>
    patient
      ? mapPatientToForm(patient, i18n.language)
      : createInitialPatientFormState(),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isValidationModalOpen, setIsValidationModalOpen] =
    useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const departmentOptions = useMemo(
    () =>
      departmentValues.map((value) => ({
        value,
        label: value,
      })),
    [],
  );

  const statusOptions = useMemo(
    () =>
      statusValues.map((value) => ({
        value,
        label: value,
      })),
    [],
  );

  const priorityOptions = useMemo(
    () =>
      priorityValues.map((value) => ({
        value,
        label: formatPriority(value, t),
      })),
    [t],
  );

  const bloodTypeOptions = useMemo(
    () =>
      bloodTypeValues.map((value) => ({
        value,
        label: value,
      })),
    [],
  );

  const updateField = <K extends keyof PatientFormState>(
    key: K,
    value: PatientFormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!isPatientFormValid(form)) {
      setIsValidationModalOpen(true);
      return;
    }

    setIsSaving(true);

    try {
      const savedPatient = mapFormToPatient(
        form,
        patient ?? undefined,
        i18n.language,
      );

      await savePatient(savedPatient);

      if (isEdit) {
        dispatch(updatePatient(savedPatient));
      } else {
        dispatch(addPatient(savedPatient));
      }

      setForm(createInitialPatientFormState());
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error(error);
      setIsErrorModalOpen(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseSuccess = () => {
    setIsSuccessModalOpen(false);
    onSuccess?.();
  };

  return (
    <div className="relative w-full">
      {isSaving && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/90">
          <Loading />
        </div>
      )}

      {showHeader ? (
        <header className="mb-6">
          <T font="medium" className="text-2xl text-slate-900">
            {t(isEdit ? 'patientFormTitleEdit' : 'patientFormTitleNew')}
          </T>
          <T font="small" className="mt-1 block text-slate-500">
            {t(
              isEdit
                ? 'patientFormSubtitleEdit'
                : 'patientFormSubtitleNew',
            )}
          </T>
        </header>
      ) : null}

      <form
        className="space-y-5"
        onSubmit={(event) => event.preventDefault()}
        noValidate
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label={t('firstName')}
            required
            placeholder={t('patientFormFirstNamePlaceholder')}
            value={form.firstName}
            disabled={isSaving}
            onChange={(value) => updateField('firstName', value)}
          />

          <Input
            label={t('lastName')}
            required
            placeholder={t('patientFormLastNamePlaceholder')}
            value={form.lastName}
            disabled={isSaving}
            onChange={(value) => updateField('lastName', value)}
          />

          <DatePicker
            label={t('birthDate')}
            required
            value={form.birthDate}
            disabled={isSaving}
            onChange={(value) => updateField('birthDate', value)}
          />

          <Dropdown
            label={t('department')}
            required
            placeholder={t('patientFormDepartmentPlaceholder')}
            value={form.department}
            options={departmentOptions}
            onChange={(value) => updateField('department', value)}
          />

          <DatePicker
            label={t('appointmentDate')}
            required
            value={form.appointmentDate}
            disabled={isSaving}
            onChange={(value) => updateField('appointmentDate', value)}
          />

          <Dropdown
            label={t('status')}
            required
            placeholder={t('select')}
            value={form.status}
            options={statusOptions}
            onChange={(value) => updateField('status', value)}
          />

          <Dropdown
            label={t('priority')}
            required
            placeholder={t('select')}
            value={form.priority}
            options={priorityOptions}
            onChange={(value) => updateField('priority', value)}
          />

          <Input
            label={t('score')}
            required
            type="number"
            min={0}
            max={10}
            placeholder="0"
            value={form.score}
            disabled={isSaving}
            onChange={(value) => updateField('score', value)}
          />

          <Dropdown
            label={t('bloodGroup')}
            required
            placeholder={t('patientFormBloodTypePlaceholder')}
            value={form.bloodType}
            options={bloodTypeOptions}
            onChange={(value) => updateField('bloodType', value)}
          />
        </div>

        <div className="border-t border-slate-100 pt-5">
          <div className="mb-3 flex items-center gap-1">
            <T
              as="span"
              font="small"
              className="text-sm font-bold tracking-wide"
              style={{ color: colors.formLabel }}
            >
              {t('patientFormExtraConditions')}
            </T>
            <span
              className="text-sm font-bold"
              style={{ color: colors.formRequired }}
              aria-hidden
            >
              *
            </span>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <CheckBox
              text={t('insured')}
              required
              checked={form.isInsured}
              disabled={isSaving}
              onChange={(checked) => updateField('isInsured', checked)}
            />
            <CheckBox
              text={t('followUp')}
              required
              checked={form.isFollowUp}
              disabled={isSaving}
              onChange={(checked) => updateField('isFollowUp', checked)}
            />
            <CheckBox
              text={t('vaccinated')}
              required
              checked={form.isVaccinated}
              disabled={isSaving}
              onChange={(checked) => updateField('isVaccinated', checked)}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Textarea
            label={t('diagnosis')}
            required
            placeholder={t('patientFormDiagnosisPlaceholder')}
            rows={2}
            value={form.diagnosis}
            disabled={isSaving}
            onChange={(value) => updateField('diagnosis', value)}
          />

          <Textarea
            label={t('note')}
            placeholder={t('patientFormNotePlaceholder')}
            rows={2}
            value={form.note}
            disabled={isSaving}
            onChange={(value) => updateField('note', value)}
          />
        </div>

        <div className="flex flex-row items-center justify-center gap-3 pt-2">
          <Button
            backgroundColor="cancel"
            className="min-w-28 px-6 sm:w-auto"
            disabled={isSaving}
            onClick={onCancel}
          >
            {t('cancel')}
          </Button>

          <Button
            backgroundColor="primary"
            className="min-w-28 px-6 sm:w-auto"
            disabled={isSaving}
            onClick={handleSave}
          >
            {t(isEdit ? 'update' : 'save')}
          </Button>
        </div>
      </form>

      <PopupModal
        open={isValidationModalOpen}
        onClose={() => setIsValidationModalOpen(false)}
        status="info"
        message={t('patientFormValidationMessage')}
        rightButtonText={t('ok')}
        rightButtonVariant="primary"
        onRightButtonClick={() => setIsValidationModalOpen(false)}
      />

      <PopupModal
        open={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        status="error"
        message={t('savePatientErrorMessage')}
        rightButtonText={t('ok')}
        rightButtonVariant="primary"
        onRightButtonClick={() => setIsErrorModalOpen(false)}
      />

      <PopupModal
        open={isSuccessModalOpen}
        onClose={handleCloseSuccess}
        status="success"
        message={t(
          isEdit
            ? 'updatePatientSuccessMessage'
            : 'savePatientSuccessMessage',
        )}
        rightButtonText={t('ok')}
        rightButtonVariant="primary"
        onRightButtonClick={handleCloseSuccess}
      />
    </div>
  );
};

export default PatientForm;
