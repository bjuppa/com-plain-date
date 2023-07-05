/**
 * Get a function curried with a date, from which to get the number of
 * crossings over years between it and other dates.
 *
 * @param from A date to calculate the difference from
 * @returns A curried function that operates on dates
 */
export function differenceInYears(
  from: { year: number | string },
): (to: { year: number | string }) => number {
  return (to) => Number(to.year) - Number(from.year);
}
