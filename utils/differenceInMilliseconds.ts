import { HODifferenceFn } from "../support/function-signatures.ts";

export const differenceInMilliseconds: HODifferenceFn<Date> = (from) => (to) =>
  to.valueOf() - from.valueOf();
