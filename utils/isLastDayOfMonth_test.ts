import { isLastDayOfMonth } from "./isLastDayOfMonth.ts";
import { PlainDate } from "../PlainDate.ts";
import { assert, assertFalse } from "../testing/asserts.ts";

Deno.test("true for last day of month", () => {
  assert(isLastDayOfMonth(PlainDate({ year: 2023, month: 2, day: 28 })));
});

Deno.test("false for first day of month", () => {
  assertFalse(isLastDayOfMonth(PlainDate({ year: 2023, month: 2, day: 1 })));
});
