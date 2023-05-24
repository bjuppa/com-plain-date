# ComPlainDate

Date-time handling in JavaScript has always been hard. While we're all waiting
for [Temporal](https://tc39.es/proposal-temporal/) to arrive, this is a
collection of tools for **expressive and timezone-safe manipulation of dates and
times** on top of the JavaScript features already available in today's browsers
and runtime systems.

It may well be that ComPlainDate will stay useful even after Temporal is
available — only time will tell...

[API documentation at deno.land](https://deno.land/x/complaindate/mod.ts)

## Installation

ComPlainDate is available as packages for both Deno and npm:

- [deno.land/x/complaindate](https://deno.land/x/complaindate/mod.ts)
- [npmjs.com/package/complaindate](https://www.npmjs.com/package/complaindate)

The footprint of a tree-shaken and compressed production build starts below
`1 kB` when using just the `PlainDate` object API.

## Quick example

```ts
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

// Some examples of quickly turning a plain-date into a localized string:
midsummersEve.toLocaleString("en"); // "6/23/23"
midsummersEve.toLocaleStringFull("sv"); // "fredag 23 juni 2023"
midsummersEve.dayNameShort("fr"); // "ven."

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
```

## Why another JavaScript date-time library?

Most other date-time libraries either don't provide any clear strategy for
timezone handling, for example [date-fns](https://date-fns.org), or keep the
timezone information hidden inside date-time objects, like
[Luxon](https://moment.github.io/luxon/) does. ComPlainDate takes a lot of
inspiration from both of them (while staying clear of their pitfalls) and also
adds in some very useful ideas from the
[suggested Temporal API](https://tc39.es/proposal-temporal/docs/index.html). The
combination makes calendar operations in any timezone very easy to implement and
maintain, for frontend and backend alike.

The entire ComPlainDate API is explicitly designed to prevent developers from
making hard-to-spot mistakes and aims to remove the need for testing of any
timezone related edge cases. This is achieved with a few core principles:

- [Explicit named timezones](#explicit-named-timezones) must be given to any
  operation that actually require a timezone for results to be correct and
  predictable.
- [Separate plain-date and plain-time objects](#separate-plain-date-and-plain-time-objects)
  and independent operations that naturally apply to each type of object.

The dangers of accidentally working in an ambiguous or incorrect timezone is
meant to be completely eliminated by design. There just is no way to
accidentally add hours to a plain-date, subtract days from a plain-time or move
to the start-of-day for a global instant in time. Every function accepts just
the shape of objects that makes sense for its purpose and all returned objects
make their meaning clear.

## Guiding principles

### Explicit named timezones

These utilities are designed to always require a named timezone as the first
parameter for every operation that would be ambiguous without one.

This avoids confusion caused by working with JavaScript `Date` or other
_DateTime_-like objects where the timezone information is hidden away. Something
that becomes especially problematic when passing such objects over context
boundaries.

### Separate plain-date and plain-time objects

By keeping the calendar date and the time-of-day information in separate objects
we are free to do any operations on them both in an expressive way, with no need
to worry about such things as crossings into daylight savings time (DST) or what
start-of-hour means in a timezone with a 30-minute offset.

The only operations where we need an explicit timezone are when we split a
universal representation of an instant (e.g. `Date` object) into separate
plain-date and plain-time objects, and when we merge them back together.

### Instants are represented by `Date` objects

The native JavaScript `Date` object is actually good enough for keeping
universal representations of specific instants in time. `Date` doesn't have the
prettiest interface, but it makes little sense to replace it here. ComPlainDate
provides some useful utilities for those operations that are relevant to do
directly on instants, but honestly, they are quite few.

### Composable functions

Inspired by concepts from functional programming, all functions are pure and
composable and all operations requiring multiple arguments are implemented as
higher-order functions for currying.

Also, there are no classes here, only objects adhering to interfaces and
accompanying factory functions to create them.

Please don't let this scare you, the ComPlainDate utilities are just as easy to
use in a non-functional paradigm too!

## Limitations

Current JavaScript `Date` objects support the Gregorian calendar only, and
therefore these tools have the same limitations.
