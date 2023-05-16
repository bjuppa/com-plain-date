import {
  addDays, // Utility function
  ComPlainDate, // The plain-date interface, useful for types
  createInstant, // Utility function
  ExPlainDate, // Factory
  firstWeekDay, // Utility function
  splitDateTime, // Utility function
  startOfMonth, // Utility function
  WeekDay, // Enum
} from "./mod.ts";

// Extract a plain-date and a plain-time representing current time in Sweden
const [today, time] = splitDateTime("Europe/Stockholm")();

// The plain-date part is an object adhering to the full ComPlainDate interface
today; // { year: 2023, month: 5, day: 16, iso: "2023-05-16", ...}

// The plain-time part is a simple object
time; // { hour: 14, minute: 40, second: 44, millisecond: 122 }

/**
 * Compose complex operations from utility functions, and use them with date-time objects
 */

// Get the plain-date for the second Tuesday of the month of a given plain-date
function secondTuesdayOfMonth<T extends ComPlainDate>(date: T) {
  return addDays(7)(firstWeekDay(WeekDay.TUESDAY)(startOfMonth(date)));
}

const importantDate = secondTuesdayOfMonth(today);

// Casting a plain-date object to string or converting to JSON will give the ISO 8601 string from the `iso` property
importantDate.iso; // "2023-05-09"

// A plain-date can quickly be formatted for a given locale
importantDate.toLocaleString("en"); // "5/9/2023"

// ...with optional Intl options
importantDate.toLocaleString("sv", { dateStyle: "full" }); // "tisdag 9 maj 2023"

// A plain-date can quickly be converted to a JS `Date` object with a time-of-day in UTC
importantDate.toUtcInstant({ hour: 12, minute: 15 }); // 2023-05-09T12:15:00.000Z

// Use utilities to get a JS `Date` object in any timezone (Sweden is UTC +02:00 in May)
createInstant("Europe/Stockholm")(importantDate); // 2023-05-08T22:00:00.000Z

// A specific time of day can be merged too...
createInstant("Europe/Stockholm")({ ...importantDate, hour: 19, minute: 30 }); // 2023-05-09T17:30:00.000Z

// The ExPlainDate factory can be used to create an extended plain-date allowing chained operations
const sameDate = ExPlainDate(today).startOfMonth().firstTuesday().addDays(7);

// Extended plain-date objects have more methods that can be called directly on the object, some quick examples:
sameDate.toInstant("Europe/Stockholm", { hour: 12 }); // 2023-05-09T10:00:00.000Z
sameDate.isBusinessDay(); // true
sameDate.quarter(); // 2
