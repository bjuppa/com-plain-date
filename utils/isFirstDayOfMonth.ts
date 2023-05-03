import { PlainDatePredicateFn } from "../support/function-signatures.ts";

export const isFirstDayOfMonth: PlainDatePredicateFn = ({ day }) => day === 1;
