/**
 * Check if a date is the first day of its year.
 */
export function isFirstDayOfYear({ month, day }: {
  month: number | string;
  day: number | string;
}): boolean {
  return Number(month) === 1 && Number(day) === 1;
}
