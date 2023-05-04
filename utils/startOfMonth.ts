import { PlainDateMapFn } from "../support/function-signatures.ts";

export const startOfMonth: PlainDateMapFn = (date) =>
  date.map((x) => ({ ...x, day: 1 }));
