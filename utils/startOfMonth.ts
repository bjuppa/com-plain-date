import { PlainDateMapFn } from "../support/function-signatures.ts";

export const startOfMonth: PlainDateMapFn = (plainDate) =>
  plainDate.map((x) => ({
    ...x,
    day: 1,
  }));
