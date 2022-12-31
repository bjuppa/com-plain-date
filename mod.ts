/**
 * # ComPlainDate
 *
 * Date-time utilities that keeps timezones on the surface.
 *
 * Date-time handling in JavaScript has always been hard.
 * While we're all waiting for Temporal to arrive, this is a collection of
 * using the JavaScript features already available in today's browsers and
 * runtime systems.
 *
 * ## Explicit timezones
 *
 * These utilities are explicit about the timezone used for every operation that
 * actually need one. This avoids confusion caused by doing operations on native
 * `Date` or other DateTime-like objects where the timezone information is
 * hidden away.
 *
 * ## Immutable PlainDate objects
 *
 * For timezone-agnostic operations on days.
 *
 * ## Immutable PlainTime objects
 *
 * For timezone-agnostic operations on times.
 *
 * ## Composable functions
 *
 * @module()
 */

export { PlainDate } from "./PlainDate.ts";
