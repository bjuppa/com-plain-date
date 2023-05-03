/**
 * # ComPlainDate
 *
 * Date-time utilities that keeps timezones on the surface.
 *
 * Date-time handling in JavaScript has always been hard.
 * While we're all waiting for `Temporal` to arrive, this is a collection of
 * tools for manipulation of dates and times on top of the JavaScript features
 * already available in today's browsers and runtime systems.
 *
 * ## Explicit timezones
 *
 * These utilities are designed to always require a named timezone as the first
 * parameter for every operation that would be ambiguous without one.
 *
 * This avoids confusion caused by working with native `Date` or other
 * DateTime-like objects where the timezone information is hidden away.
 * Something that becomes especially problematic when passing such objects over
 * context boundaries.
 *
 * ## Separate plain date and plain time objects
 *
 * By keeping the calendar date and the time-of-day information in separate
 * objects we are free to do any operations on them both in an expressive way,
 * with no need to worry about such things as crossings into daylight savings
 * time (DST) or what start-of-hour means in a timezone with a 30-minute offset.
 *
 * The only operations where we need an explicit timezone are when we split a
 * universal representation of an instant (e.g. `Date` object) into separate
 * plain date and plain time objects, and when we merge them back together.
 *
 * ## Composable functions
 *
 * Inspired by concepts from functional programming, all functions are pure and
 * composable and all operations requiring multiple arguments are implemented as
 * higher-order functions for currying.
 *
 * Don't let this scare you, the utilities are just as easy to use in a
 * non-functional paradigm too!
 *
 * ## Limitations
 *
 * Current JavaScript `Date` objects support the Gregorian calendar only,
 * and therefore these tools have the same limitations.
 *
 * @module()
 */
export * from "./PlainDate.ts";
export * from "./ExPlainDate.ts";
export * from "./constants.ts";
