import { isFirstDayOfMonth } from "./isFirstDayOfMonth.ts";
import { PlainDate } from "../PlainDate.ts";
import { assert, assertFalse } from "../testing/asserts.ts";

Deno.test("true for first day of month", () => {
  assert(isFirstDayOfMonth(PlainDate({ year: 2023, month: 2, day: 1 })));
});

Deno.test("false for last day of month", () => {
  assertFalse(isFirstDayOfMonth(PlainDate({ year: 2023, month: 2, day: 28 })));
});
