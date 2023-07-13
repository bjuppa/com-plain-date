// Deno users can import directly from deno.land, like this:
import {
  addDays,
  createInstant,
  daysInMonth,
  differenceInMonths,
  firstWeekDay,
  isLastDayOfMonth,
  splitDateTime,
  startOfMonth,
  startOfYear,
  WeekDay,
  weekDayNumber,
} from "https://deno.land/x/complaindate/mod.ts";

// Extract a plain-date and a plain-time from any JS `Date`
const [june6, time1337] = splitDateTime(
  "Europe/Stockholm", // Note: A timezone is required for this operation
)(
  // Sweden is at UTC+2 in June, so this `Date` represents 13:37 wall-time there
  new Date("2023-06-06T13:37+0200"),
); // Note: When called without a `Date`, this produces current wall-time (now)

// The plain-date part is an object adhering to the full ComPlainDate interface
june6; // { year: 2023, month: 6, day: 6, iso: "2023-06-06", ...}
june6.toLocaleString("en"); // "6/6/23"
june6.is({ month: 6, day: 6 }); // true

// The plain-time part is an object adhering to the full ComPlainTime interface
time1337; // { hour: 13, minute: 37, second: 0, millisecond: 0, ... }
time1337.toLocaleString("en"); // "1:37 PM"

// Apply any pipeline of operations to get a new plain-date
// ...free from any hassle involving timezones!
const midsummersEve = june6.pipe(
  startOfMonth, // Go back to the 1st day of June
  addDays(18), // Move to the first possible midsummer's eve candidate (June 19)
  firstWeekDay(WeekDay.FRIDAY), // Find the first Friday
); // 2023-06-23

// Objects can be compared
midsummersEve.is(june6); // false
midsummersEve > june6; // true

// Utility functions can be used independently with plain-dates, for example:
const newYearsDay = startOfYear(midsummersEve); // 2023-01-01
daysInMonth(newYearsDay); // 31
isLastDayOfMonth(newYearsDay); // false
weekDayNumber(midsummersEve); // 5 (equal to `WeekDay.FRIDAY`)
differenceInMonths(midsummersEve)(newYearsDay); // -5

// Quickly turn a plain-date into a UTC "instant", a JS `Date` at UTC midnight
newYearsDay.toUtcInstant(); // 2023-01-01T00:00:00.000Z

// Combine any shape of local date & time into an "instant", a JS `Date`
createInstant(
  // The Wiener Musikverein is at UTC+1 in January
  "Europe/Vienna", // Note: A timezone is required for this operation
)({
  ...newYearsDay,
  ...{ hour: 11, minute: 15 },
}); // 2023-01-01T10:15:00.000Z
