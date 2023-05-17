import {
  addDays, // Utility function
  createInstant, // Utility function
  daysInMonth, // Utility function
  differenceInMonths, // Utility function
  firstWeekDay, // Utility function
  isLeapYear, // Utility function
  splitDateTime, // Utility function
  startOfMonth, // Utility function
  startOfYear, // Utility function
  WeekDay, // Enum
} from "https://deno.land/x/complaindate/mod.ts";

// Extract a plain-date and a plain-time from any JS `Date`
// ...and note that doing this requires a timezone
const [dateA, timeA] = splitDateTime("Europe/Stockholm")(
  // Sweden is UTC+2 in June, so this `Date` represents 13:30 wall-time there
  new Date("2023-06-12T13:30:00+02:00"),
  // Note: Leaving this parameter empty will give you current wall-time (now)
);

// The plain-date part is an object adhering to the full ComPlainDate interface
dateA; // { year: 2023, month: 6, day: 12, iso: "2023-06-12", ...}

// The plain-time part is a simple object
timeA; // { hour: 13, minute: 30, second: 0, millisecond: 0 }

// Apply a pipeline of operations to get a new plain-date
const secondTuesdayOfMonth = dateA.pipe(
  startOfMonth, // Go back to the 1st day of the month
  firstWeekDay(WeekDay.TUESDAY), // Find the first Tuesday
  addDays(7), // Move one week ahead
); // 2023-06-13

// A plain-date can quickly be formatted for a given locale in different formats
secondTuesdayOfMonth.toLocaleString("en"); // "6/13/23"
secondTuesdayOfMonth.toLocaleStringFull("sv"); // "tisdag 13 juni 2023"
secondTuesdayOfMonth.dayNameShort("fr"); // "mar."

// Utility functions can be called directly with plain-dates
const dateB = startOfYear(dateA); // 2023-01-01
daysInMonth(dateB); // 31
isLeapYear(dateB); // false
differenceInMonths(dateA)(dateB); // -5

// Combine a plain-date and a plain-time into an "instant", a JS `Date`
// ...and note that doing this requires a timezone
createInstant(
  "Europe/London", // The UK is UTC+0 in January
)({
  ...dateB, // Spread the plain-date
  hour: timeA.hour, // Take only the hour from the plain-time, truncating time
}); // 2023-01-01T13:00:00.000Z
