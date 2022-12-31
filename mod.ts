/**
 * Date-time utilities that keeps timezones on the surface.
 *
 * Date-time handling in JavaScript has always been hard.
 * While we're all waiting for Temporal to arrive, this is a collection of
 * using the JavaScript features already available in today's browsers and
 * runtime systems.
 *
 * Confusion is often caused by doing operations on native `Date` or other
 * DateTime-like objects where the timezone information is hidden away.
 *
 * These utilities are explicit about the timezone used for every operation that
 * actually need one.
 *
 * @module()
 */

export { PlainDate } from "./PlainDate.ts";
