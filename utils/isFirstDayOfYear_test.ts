import { isFirstDayOfYear } from "./isFirstDayOfYear.ts";
import { PlainDate } from "../PlainDate.ts";
import { assert, assertFalse } from "../testing/asserts.ts";

Deno.test("true for Jan 1", () => {
  assert(isFirstDayOfYear(PlainDate({ year: 2023, month: 1, day: 1 })));
});

Deno.test("false for Feb 1", () => {
  assertFalse(isFirstDayOfYear(PlainDate({ year: 2023, month: 2, day: 1 })));
});
