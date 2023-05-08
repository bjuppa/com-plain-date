import { ComPlainDate } from "../PlainDate.ts";

// TODO: take SloppyDate instead!
/**
 * Check if a plain-date is the first day of its month.
 */
export const isFirstDayOfMonth = ({ day }: ComPlainDate) => day === 1;
