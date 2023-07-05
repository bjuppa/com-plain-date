/**
 * Check if a date is the first day of its month.
 */
export function isFirstDayOfMonth({ day }: { day: number | string }): boolean {
  return Number(day) === 1;
}
