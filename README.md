# ComPlainDate

Date-time handling in JavaScript has always been hard. While we're all waiting
for [Temporal](https://tc39.es/proposal-temporal/) to arrive, this is a
collection of tools for **expressive and timezone-safe manipulation of dates and
times** on top of the JavaScript features already available in today's browsers
and runtime systems.

The central idea in ComPlainDate is to provide timezone-agnostic
[`PlainDate`](#plaindate-for-calendar-dates) and
[`PlainTime`](#plaintime-for-time-of-day) objects with composable utility
functions for common calendar and time related operations.

It may well be that ComPlainDate will stay useful even after Temporal is
available — only time will tell&hellip;

## API documentation

The full [API documentation](https://deno.land/x/complaindate/mod.ts) and
categorized lists of available functions are available at deno.land.

## Installation

ComPlainDate is distributed as an **npm** package as well as a **Deno** module:

- [npmjs.com/package/complaindate](https://www.npmjs.com/package/complaindate)
- [deno.land/x/complaindate](https://deno.land/x/complaindate/mod.ts)

## Table of contents

1. [Introduction](#introduction)
2. [Quick example](#quick-example)
3. [Working with timezone strings](#working-with-timezone-strings)
4. [Why another JavaScript date-time library?](#why-another-javascript-date-time-library)
5. [Guiding principles](#guiding-principles)
6. [Limitations](#limitations)

## Introduction

ComPlainDate provides a few special objects and a bunch of utility functions to
operate on those objects.

The main concepts we need to represent are:

- _instant_: a universal point in time.
- _calendar date_: a year, month, and day-of-month.
- _time-of-day_: a wall-time of hours, minutes, and seconds.

None of the concepts above have an inherent timezone, in themselves they are all
timezone-agnostic. But to convert an _instant_ to the corresponding local
_calendar date_ and _time-of-day_ at a specific place, and vice versa, we need
to add a supporting concept:

- _timezone_: a set of rules describing how local wall-time in an area relates
  to universal time.

Let's go through how ComPlainDate supports working with each of these four
concepts, starting with the simplest but perhaps most central one.

### _Timezones_ are just strings

Modern JavaScript engines know the rules for
[timezones](https://en.wikipedia.org/wiki/Time_zone) around the globe through
[`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl),
and although it's not entirely straight-forward we can tap into that knowledge
using some clever tricks. The main purpose of ComPlainDate is to abstract those
tricks away.

All we need is the name of a timezone, and those names are represented by simple
strings with underscore replacing space, like `"Africa/Dar_es_Salaam"`.

ComPlainDate has utility functions that helps parse, validate, sanitize and
format timezone strings.

### What, no `Instant`?

Surprisingly, ComPlainDate does not provide any special object representing a
universal _instant_ in time.

JavaScript's
[`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
is basically a wrapper around a UNIX timestamp (the number of milliseconds since
1970-01-01 00:00 UTC) and doesn't know about timezones. This
[UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)-centric aspect
of `Date` is good for timezone-agnostic operations such as comparing universal
points in time and adding or subtracting _time_ in hours, minutes, or seconds.

ComPlainDate has a few utility functions supporting those operations and you
should aim to use native JavaScript `Date` objects as much as you can. When you
need to do an operation that the provided instant-utilities doesn't support it's
time to reach for the other concepts, described below!

### `PlainDate` for _calendar dates_

Plain-date objects adhere to a
[contract](https://deno.land/x/complaindate/mod.ts?s=ComPlainDate) and have
three numeric properties (`year`, `month`, and `day`) used for most operations.
The `iso` property and
[string coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion)
produces a string in the format `yyyy-mm-dd` that can be used for simple display
purposes, while the `toLocaleString` method is good for tailored formatting of
dates in user interfaces.

Plain-dates have a `map` method taking a callback function that makes it easy to
build a new plain-date that represents some modification of an existing
plain-date. They also have a `pipe` method that applies any number of
operations, from left to right, returning a new plain-date. The provided
plain-date utility functions can be used with `map` and `pipe`, and you are
encouraged to build your own mapper functions on top of the existing ones.

### `PlainTime` for _time-of-day_

Plain-time objects adhere to a
[contract](https://deno.land/x/complaindate/mod.ts?s=ComPlainTime) and have four
numeric properties (`hour`, `minute`, `second`, and `millisecond`), that may be
used for operations, but they are surprisingly uncommon. The `iso` property is a
string in the format `Thh:mm:ss.sss` that is mostly used for technical purposes.

For display,
[string coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion)
will give the shortest of the formats `hh:mm` / `hh:mm:ss` / `hh:mm:ss.sss`
depending on the resolution of the specific plain-time. Of course, the
`toLocaleString` method is best for controlled formatting in user interfaces.

## Quick example

This will show you how to split a native JavaScript `Date` into separate
plain-date and plain-time objects.

We'll navigate from that plain-date to another using a _pipeline_ of operations,
and then we'll describe how to use utility functions _independently_ for
navigation and getting information about a plain-date.

The final step will merge a plain-date and a plain-time into a native JavaScript
`Date`, completing the circle.

```ts
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
```

## Working with timezone strings

JavaScript throws `RangeError` whenever it encounters an invalid timezone name.
User input timezones will clearly need validation before use, but support for a
specific timezone name may also differ between JavaScript engines. For example,
a timezone supported in your backend may not be supported in the user's current
browser.

Before using a timezone string in frontend code, pass it through the
[`safeTimezone`](https://deno.land/x/complaindate/mod.ts?s=safeTimezone) utility
to get a string guaranteed to be a valid timezone in the local system. Should
the given timezone name be unsuitable, it will return the operating system's
named timezone instead, or `"UTC"` if no timezone can be determined. For the
user, this should make for the best possible graceful degradation when their
preferred timezone is unavailable.

When your application doesn't support timezone as a user preference, the
[`localTimezone`](https://deno.land/x/complaindate/mod.ts?s=localTimezone)
utility can be used to retrieve a relevant timezone for the current view.
Although, be careful with server side rendering&hellip;

### Show the timezone name in the user interface

Because the timezone used may be a fallback and not what the user expects, it's
important to _always_ display the actual timezone name whenever time information
is present in the user interface.

[`formatTimezone`](https://deno.land/x/complaindate/mod.ts?s=formatTimezone)
will make a timezone name look pretty for the user. It replaces underscores with
spaces to give a less technical impression, for example `"Africa/Dar es Salaam"`
instead of `"Africa/Dar_es_Salaam"`.

### Guided timezone preference input

If your user interface provides a way for users to select their preferred
timezone, use
[`supportedCanonicalTimezones`](https://deno.land/x/complaindate/mod.ts?s=supportedCanonicalTimezones)
to get a list of all the named timezones in the system. You may even create an
endpoint that returns the timezones supported by your backend and intersect that
with the browser's timezones to really make sure no unhandled timezone is
suggested.

You may populate an HTML `<datalist id="availableTimezones">` with all relevant
timezones, enabling an ordinary `<input type="text" list="availableTimezones">`
to become an autocomplete "combobox" for the user to select from. See the
[datalist documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist)
for details and examples.

Don't forget to use
[`localTimezone`](https://deno.land/x/complaindate/mod.ts?s=localTimezone) to
set a sensible initial value for the input!

### Validating timezones

User input can be run through
[`sanitizeTimezone`](https://deno.land/x/complaindate/mod.ts?s=sanitizeTimezone)
to clean up a timezone string, removing some common user typos and converting
whitespace to underscore. The result can be checked with
[`isTimezone`](https://deno.land/x/complaindate/mod.ts?s=isTimezone).

If you'd rather throw `RangeError` on failure, or want to extract a timezone
name that is part of a longer string, use
[`parseTimezone`](https://deno.land/x/complaindate/mod.ts?s=parseTimezone)
directly to both sanitize and validate the result.

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
making hard-to-spot mistakes and aims to remove the need for testing of timezone
related edge cases in local code. This is achieved with a few core principles:

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
context boundaries. With ComPlainDate, developers are compelled to pass the
timezone separate from the date-time objects, making that timezone very visible.

### Separate plain-date and plain-time objects

By keeping the calendar date and the time-of-day information in separate objects
we are free to do any operations on them both in an expressive way, with no need
to worry about such things as crossings into daylight savings time (DST) or what
start-of-hour means in a timezone with a half-hour offset.

The only operations where we need an explicit timezone are when we split a
universal representation of an instant (e.g. `Date` object) into separate
plain-date and plain-time objects, and when we merge them back together.

### Instants are represented by `Date` objects

The native JavaScript `Date` object is actually good enough for keeping
universal representations of specific instants in time. `Date` doesn't have the
prettiest interface, but it makes little sense to replace it here. ComPlainDate
provides some useful utilities for those operations that are relevant to do
directly on instants, but honestly, they are quite few.

### Allow partial and relaxed objects where possible

Many operations that take some date or time representation as input don't
actually require the full object to produce correct results. For example, to
determine if a given calendar date is in a leap year, we don't care about the
month or day-of-month, only the year of the date has any significance.

Functions in ComPlainDate use object destructuring of parameters to extract only
the properties that are actually needed.

It still makes sense to keep a common expected _shape_ of objects, with some
shared properties that can be mixed and matched for different purposes:

- `year`
- `month`
- `day`

- `hour`
- `minute`
- `second`
- `millisecond`

The plain-date and plain-time objects are the strictest forms of this common
shape where every property exists as an integer.

Whenever possible, relaxed objects having interchangeable number or string type
properties can also be passed to functions, making it easier to combine user
input into valid parameters.

### Avoid type aliases

We've chosen not to extract type aliases for reuse within ComPlainDate, but
instead type every function parameter explicitly making IDE tools and the API
documentation show the expected object shapes up front. There exists some type
aliases but those are meant to support developers when implementing their own
utilities outside of ComPlainDate.

### Composable functions

Inspired by concepts from functional programming, all functions are pure and
composable and all operations requiring multiple arguments are implemented as
higher-order functions for currying.

Also, there are no classes here, only objects adhering to interfaces and
accompanying factory functions to create them.

Please don't let this scare you, the ComPlainDate utilities are just as easy to
use in a non-functional paradigm too!

### Coerce objects to relevant primitive types

Constructed objects include implementations of the common `valueOf`, `toString`,
`toJSON`, and `toLocaleString` methods, making their behavior and use similar to
JavaScript's `Date` objects when converting to primitive types. This enables
comparing objects of the same type with operators `<`, `>`, `<=`, and `>=`.

### Allow for the smallest possible bundle size

First of all, there are no external dependencies, and there will never be any.

The base [`PlainDate`](https://deno.land/x/complaindate/mod.ts?s=ComPlainDate)
and [`PlainTime`](https://deno.land/x/complaindate/mod.ts?s=ComPlainTime)
objects are carefully composed to be _minimal loveable objects_, containing only
what is needed for a neat developer experience. The utility functions are meant
to be imported and applied with these base objects when required.

When bundle size is not an issue (i.e. server-side), you can work with full
[`ExPlainDate`](https://deno.land/x/complaindate/mod.ts?s=ExtendedPlainDate)
objects if you want to call available operations directly on the plain-date
object. This may sound convenient, but it is very hard to tree-shake, making
your bundle size unnecessary big when used.

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

The [IANA timezone database](https://www.iana.org/time-zones) is constantly
being updated and it takes a little while before changes are available in new
releases of browsers and runtime systems. This means that timezone operations
are dependent of the version of the JavaScript engine running the code. The
results of the same operation may differ between systems depending on their
version and there is no guarantee that the same code running in a browser and on
a server produces identical results.
