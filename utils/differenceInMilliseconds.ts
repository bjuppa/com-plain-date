/**
 * Get a function curried with a native JS `Date`, from which to get the
 * number of milliseconds between it and other JS `Date` objects.
 *
 * @param from A native JS `Date` object to calculate the difference from
 * @returns A curried function that operates on JS `Date` objects
 */
export function differenceInMilliseconds(from: Date): (to: Date) => number {
  return (to) => to.valueOf() - from.valueOf();
}
