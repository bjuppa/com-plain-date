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

## Quick example

This will show you how to split a native JavaScript `Date` into separate
plain-date and plain-time objects.

We'll navigate from that plain-date to another using a _pipeline_ of operations,
and then we'll describe how to use utility functions _independently_ for
navigation and getting information about a plain-date.

The final step will merge a plain-date and a plain-time into a native JavaScript
`Date`, completing the circle.

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
const [june6, time1337] = splitDateTime(
  "Europe/Stockholm", // Note: A timezone is required for this operation
)(
  // Sweden is at UTC+2 in June, so this `Date` represents 13:37 wall-time there
  new Date("2023-06-06T13:37+0200"),
); // Note: When called without a `Date`, this gives current wall-time (now)

// The plain-date part is an object adhering to the full ComPlainDate interface
june6; // { year: 2023, month: 6, day: 6, iso: "2023-06-06", ...}
june6.toLocaleString("en"); // "6/6/23"

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

// Utility functions can be used independently with plain-dates, for example:
const newYearsDay = startOfYear(midsummersEve); // 2023-01-01
daysInMonth(newYearsDay); // 31
isLastDayOfMonth(newYearsDay); // false
weekDayNumber(midsummersEve); // 5 (equal to `WeekDay.FRIDAY`)
differenceInMonths(midsummersEve)(newYearsDay); // -5

// Quickly turn a plain-date into a UTC "instant", a JS `Date` at UTC midnight
newYearsDay.toUtcInstant(); // 2023-01-01T00:00:00.000Z

// Combine any shape of date & time into an "instant", a JS `Date`
createInstant(
  // The Wiener Musikverein is at UTC+1 in January
  "Europe/Vienna", // Note: A timezone is required for this operation
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

These utilities are designed to always require a named timezone for every
operation that would be ambiguous without one. The timezone is the very first
argument given to such functions, showing how important it is.

This avoids confusion caused by working with JavaScript `Date` or other
_DateTime_-like objects where the timezone information is hidden away. Timezones
set inside objects are especially problematic when passing those objects over
context boundaries.

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

### Allow for the smallest possible bundle size

First of all, there are no external dependencies, and there will never be any.

The base [`PlainDate`](https://deno.land/x/complaindate/mod.ts?s=ComPlainDate)
and [`PlainTime`](https://deno.land/x/complaindate/mod.ts?s=ComPlainTime)
objects are carefully composed to be _minimal loveable objects_, containing only
what is needed for a neat developer experience. The utility functions are meant
to be imported and applied with these base objects when required.

When bundle size is not an issue (i.e. server-side), you can work with full
[`ExPlainDate`]((https://deno.land/x/complaindate/mod.ts?s=ExtendedPlainDate))
objects if you want to call available operations directly on the plain-date
object. This may sound convenient, but it is very hard to tree-shake, making
your bundle size unnecessary big.

There is no extended interface for the plain-time objects, because there are
actually very few complex operations to do on a wall-time object. Plain-time
objects are most often used for display purposes, they seldom need to be
manipulated.

The footprint of a tree-shaken and compressed production build starts below
`1 kB` when using just the `PlainDate` object API. This will increase a little
with every imported utility, but you'll probably find that most projects require
very few of them.

### Unambiguous function names

The unfortunate choice of name for `Date` in JavaScript makes any function with
the word `date` difficult to quickly assess from the name alone. Does it operate
on `Date` or not? Had `Date` been called `Instant` or even `DateTime`, the
single word `date` could have been used in the names of our utility functions
that operates on plain-date objects.

Now that's not the case so a deliberate decision has been made to use the longer
but less ambiguous `PlainDate` and `PlainTime` in function names. For example,
our utilities are called `parsePlainDate` and `formatPlainDate`, even though
`parseDate` and `formatDate` would have been more succinct.

Functions related to JavaScript `Date` objects have the word `Instant` in their
names whenever needed for clarity.

## Limitations

Current JavaScript `Date` objects support the Gregorian calendar only, and
therefore these tools have the same limitations.
