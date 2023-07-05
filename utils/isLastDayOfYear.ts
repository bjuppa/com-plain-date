/**
 * Check if a date is the last day of its year.
 */
export function isLastDayOfYear({ month, day }: {
  month: number | string;
  day: number | string;
}): boolean {
  return Number(month) === 12 && Number(day) === 31;
}
