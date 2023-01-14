import { ordinal } from "./ordinal.ts";
import { PlainDate } from "../PlainDate.ts";
import { assertEquals } from "../testing/asserts.ts";

Deno.test("returns 1 for the first day of the year", () => {
  assertEquals(ordinal(PlainDate({ year: 2023, month: 1, day: 1 })), 1);
});

Deno.test("returns day of the year in a common year", () => {
  assertEquals(ordinal(PlainDate({ year: 2023, month: 12, day: 31 })), 365);
});

Deno.test("returns day of the year in a leap year", () => {
  assertEquals(ordinal(PlainDate({ year: 2004, month: 12, day: 31 })), 366);
});
