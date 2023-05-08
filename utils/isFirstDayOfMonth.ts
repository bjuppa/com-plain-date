import { ComPlainDate } from "../PlainDate.ts";

/**
 * Check if a plain-date is the first day of its month.
 */
export const isFirstDayOfMonth = ({ day }: ComPlainDate) => day === 1;
