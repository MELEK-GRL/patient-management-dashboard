export const formatDate = (
  date: string,
  locale = 'tr-TR',
) =>
  new Date(date).toLocaleDateString(locale);

export const formatIdControl = (label?: string, id?: string) =>
  id ?? label?.toLowerCase().replace(/\s+/g, '-');

export const formatTodayDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatDateOffsetFromToday = (days: number) => {
  const now = new Date();
  now.setDate(now.getDate() + days);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatTomorrowDate = () => formatDateOffsetFromToday(1);
