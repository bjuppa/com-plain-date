import { isLeapYear } from "./isLeapYear.ts";
import { assert, assertFalse } from "../testing/asserts.ts";

Deno.test("1900 was a common year", () => {
  assertFalse(isLeapYear({ year: 1900 }));
});

Deno.test("2000 was a leap year", () => {
  assert(isLeapYear({ year: 2000 }));
});

Deno.test("2001 was a common year", () => {
  assertFalse(isLeapYear({ year: 2001 }));
});

Deno.test("2004 was a leap year", () => {
  assert(isLeapYear({ year: 2004 }));
});
