import {
  ExPlainDate,
  splitDateTime,
} from "https://deno.land/x/complaindate/mod.ts";

// Extract a plain-date and a plain-time representing current wall-time in Sweden
const [today, time] = splitDateTime("Europe/Stockholm")();

// The plain-date part is an object adhering to the full ComPlainDate interface
today; // { year: 2023, month: 5, day: 16, iso: "2023-05-16", ...}

// The plain-time part is a simple object
time; // { hour: 14, minute: 40, second: 44, millisecond: 122 }

/* Note: From here, this example uses `ExPlainDate`, an extended plain-date with many utility functions */

// Get the 2nd Tuesday of that month (see, no timezone needed here!)
const t2 = ExPlainDate(today).startOfMonth().firstTuesday().addDays(7); // 2023-05-09

// A plain-date can quickly be formatted for a given locale
t2.toLocaleString("en"); // "5/9/2023"
t2.toLocaleStringFull("sv"); // "tisdag 9 maj 2023"

// Get a JS `Date` with the original time-of-day truncated to the hour
t2.toInstant("Europe/Stockholm", { hour: time.hour }); // 2023-05-09T12:00:00.000Z
