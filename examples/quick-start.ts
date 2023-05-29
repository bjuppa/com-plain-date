// If you're using Deno, you can import directly from deno.land
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
// ...and note that doing so requires a timezone
const [june6, time1337] = splitDateTime("Europe/Stockholm")(
  // Sweden is at UTC+2 in June, so this `Date` represents 13:37 wall-time there
  new Date("2023-06-06T13:37+0200"),
  // Note: Leaving this parameter empty will give you current wall-time (now)
);

// The plain-date part is an object adhering to the full ComPlainDate interface
june6; // { year: 2023, month: 6, day: 6, iso: "2023-06-06", ...}

// The plain-time part is a simple object
time1337; // { hour: 13, minute: 37, second: 0, millisecond: 0 }

// Apply any pipeline of operations to get a new plain-date
// ...free from any hassle involving timezones!
const midsummersEve = june6.pipe(
  startOfMonth, // Go back to the 1st day of the month
  addDays(18), // Move to the first possible midsummer's eve candidate (June 19)
  firstWeekDay(WeekDay.FRIDAY), // Find the first Friday
); // 2023-06-23

// Quickly turn a plain-date into a localized string:
midsummersEve.toLocaleString("en"); // "6/23/23"
// Any valid combination of `Intl` options can be used:
midsummersEve.toLocaleString(
  "sv",
  { dateStyle: "full" },
); // "fredag 23 juni 2023"

// Utility functions can be used independently with plain-dates, for example:
const newYearsDay = startOfYear(midsummersEve); // 2023-01-01
daysInMonth(newYearsDay); // 31
isLastDayOfMonth(newYearsDay); // false
weekDayNumber(midsummersEve); // 5 (equal to `WeekDay.FRIDAY`)
differenceInMonths(midsummersEve)(newYearsDay); // -5

// Quickly turn a plain-date into a UTC "instant", a JS `Date` at UTC midnight
newYearsDay.toUtcInstant(); // 2023-01-01T00:00:00.000Z

// Combine any plain-date with any plain-time into an "instant", a JS `Date`
// ...and note that doing so requires a timezone
createInstant(
  "Europe/Vienna", // The Wiener Musikverein is at UTC+1 in January
)({
  ...newYearsDay,
  ...{ hour: 11, minute: 15 },
}); // 2023-01-01T10:15:00.000Z
