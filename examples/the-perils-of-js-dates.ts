/**
 * Using vanilla JS dates is hard, there are so many pitfalls.
 *
 * How would you create a `Date` object representing midnight at last new year's
 * eve in New York?
 */

// First, you might get the current year in NY, using localized strings:
const year = new Date().toLocaleString("en-US", {
  timeZone: "America/New_York",
  year: "numeric",
});
console.log(year);

// Next, you could get the timezone offset from UTC in NY at january 1 in that year:
const offset = new Date(Date.UTC(Number(year), 0, 1)).toLocaleString("en-US", {
  timeZone: "America/New_York",
  hour: 'numeric',
  timeZoneName: "longOffset",
}).match(/-?\d{2}:\d{2}$/)?.[0];
console.log(offset);
