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
