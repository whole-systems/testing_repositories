export const isDateValid = (date: unknown): date is Date => {
  if (date === undefined) return false;

  try {
    new Date(date as Date);
    return true;
  } catch (error) {
    console.warn(`Invalid date provided: ${date}`);
    return false;
  }
};
