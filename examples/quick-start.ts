// If you're using Deno, you can import from deno.land
import {
  addDays,
  createInstant,
  DAYS_IN_WEEK,
  daysInMonth,
  differenceInMonths,
  firstWeekDay,
  isLastDayOfMonth,
  splitDateTime,
  startOfMonth,
  startOfYear,
  WeekDay,
} from "https://deno.land/x/complaindate/mod.ts";

// Extract a plain-date and a plain-time from any JS `Date`
// ...and note that doing so requires a timezone
const [june6, time1337] = splitDateTime("Europe/Stockholm")(
  // Sweden is UTC+2 in June, so this `Date` represents 13:37 wall-time there
  new Date("2023-06-06T13:37+0200"),
  // Note: Leaving this parameter empty will give you current wall-time (now)
);

// The plain-date part is an object adhering to the full ComPlainDate interface
june6; // { year: 2023, month: 6, day: 6, iso: "2023-06-06", ...}

// The plain-time part is a simple object
time1337; // { hour: 13, minute: 37, second: 0, millisecond: 0 }

// Apply any pipeline of operations to get a new plain-date
// ...free from any hassle involving timezones!
const secondTuesdayOfJune = june6.pipe(
  startOfMonth, // Go back to the 1st day of the month
  firstWeekDay(WeekDay.TUESDAY), // Find the first Tuesday
  addDays(DAYS_IN_WEEK), // Move 7 days forward
); // 2023-06-13

// Some examples of quickly turning a plain-date into a localized string:
secondTuesdayOfJune.toLocaleString("en"); // "6/13/23"
secondTuesdayOfJune.toLocaleStringFull("sv"); // "tisdag 13 juni 2023"
secondTuesdayOfJune.dayNameShort("fr"); // "mar."

// Utility functions can be called independently with plain-dates, for example:
const newYearsDay = startOfYear(june6); // 2023-01-01
daysInMonth(newYearsDay); // 31
isLastDayOfMonth(newYearsDay); // false
differenceInMonths(june6)(newYearsDay); // -5

// Quickly turn a plain-date into a UTC "instant", a JS `Date` at UTC midnight
newYearsDay.toUtcInstant(); // 2023-01-01T00:00:00.000Z

// Combine a plain-date and a plain-time into an "instant", a JS `Date`
// ...and note that doing so requires a timezone
createInstant(
  "Europe/Vienna", // The Wiener Musikverein is UTC+1 in January
)({
  ...newYearsDay,
  ...{ hour: 11, minute: 15 },
}); // 2023-01-01T10:15:00.000Z
