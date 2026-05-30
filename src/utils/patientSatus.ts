import type { TFunction } from 'i18next';

export const formatPriority = (priority: string, t: TFunction) => {
  if (priority === 'acil') {
    return t('priorityUrgent');
  }

  if (priority === 'normal') {
    return t('priorityNormal');
  }

  return priority;
};

export const formatBoolean = (value: boolean, t: TFunction) =>
  value ? t('yes') : t('no');
