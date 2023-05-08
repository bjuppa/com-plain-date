/**
 * Get a function curried with a native JS Date, from which to get the
 * number of milliseconds between it and other JS Date objects.
 */
export function differenceInMilliseconds(from: Date) {
  return (to: Date): number => to.valueOf() - from.valueOf();
}
