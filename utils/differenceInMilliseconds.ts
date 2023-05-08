/**
 * Get a function curried with a native JS Date, from which to get the
 * number of milliseconds between it and other JS Date objects.
 */
export const differenceInMilliseconds = (from: Date) => (to: Date): number =>
  to.valueOf() - from.valueOf();
