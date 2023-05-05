import { HODifferenceFn } from "../support/function-signatures.ts";

/**
 * Get a function curried with a native JS Date, from which to get the
 * number of milliseconds between it and other JS Date objects.
 */
export const differenceInMilliseconds: HODifferenceFn<Date> = (from) => (to) =>
  to.valueOf() - from.valueOf();
