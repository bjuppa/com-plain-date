import { daysInMonth } from "./daysInMonth.ts";

/**
 * Check if a date is the last day of its month.
 */
export function isLastDayOfMonth({ year, month, day }: {
  year: number | string;
  month: number | string;
  day: number | string;
}): boolean {
  return Number(day) === daysInMonth({ year, month });
}
